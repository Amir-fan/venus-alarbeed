import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas';
import { parseReceiptText, validateReceipt } from './receipt-parser.mjs';

globalThis.DOMMatrix ??= DOMMatrix;
globalThis.ImageData ??= ImageData;
globalThis.Path2D ??= Path2D;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const port = Number(process.env.PORT ?? 8787);
const maxFileBytes = 10 * 1024 * 1024;
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,http://127.0.0.1:3000')
  .split(',').map((origin) => origin.trim()).filter(Boolean);
const bookPaths = {
  en: path.resolve(process.env.BOOK_EN_PATH ?? path.join(projectRoot, 'private-books', 'conscious-diplomacy-en.pdf')),
  ar: path.resolve(process.env.BOOK_AR_PATH ?? path.join(projectRoot, 'private-books', 'conscious-diplomacy-ar.pdf')),
};
const bookNames = {
  en: 'Conscious-Diplomacy-English-Venus-Alarbeed.pdf',
  ar: 'Conscious-Diplomacy-Arabic-Venus-Alarbeed.pdf',
};
const messages = {
  en: {
    approved: 'Payment approved. You can now read or download your book.',
    invalid_request: 'Attach a clear receipt and confirm that you made the payment.',
    invalid_file: 'Upload a clear JPG, PNG, WEBP or one-page PDF receipt smaller than 10 MB.',
    too_many_attempts: 'Too many verification attempts. Please wait one hour before trying again.',
    duplicate_receipt: 'This transaction was already used for the other book edition.',
    not_sham_cash: 'The file could not be confirmed as a Sham Cash receipt.',
    wrong_payment: 'The recipient, Venus account, amount or currency does not match this purchase.',
    invalid_transaction: 'The transaction number or date could not be read from this receipt.',
    low_confidence: 'The receipt is unclear. Upload the original generated receipt or a sharper image.',
    service_unavailable: 'Receipt verification is temporarily unavailable. Please try again shortly.',
  },
  ar: {
    approved: 'تم قبول الدفع. يمكنك الآن قراءة الكتاب أو تنزيله.',
    invalid_request: 'أرفق إيصالاً واضحاً وأكد أنك أجريت عملية الدفع.',
    invalid_file: 'ارفع إيصال JPG أو PNG أو WEBP أو PDF من صفحة واحدة وبحجم أقل من 10 ميغابايت.',
    too_many_attempts: 'عدد محاولات التحقق كبير. يرجى الانتظار ساعة قبل المحاولة مجدداً.',
    duplicate_receipt: 'تم استخدام هذه العملية سابقاً لنسخة الكتاب الأخرى.',
    not_sham_cash: 'تعذر التأكد من أن الملف إيصال صادر عن شام كاش.',
    wrong_payment: 'المستلم أو حساب فينوس أو المبلغ أو العملة لا تطابق عملية الشراء.',
    invalid_transaction: 'تعذر قراءة رقم العملية أو تاريخها من هذا الإيصال.',
    low_confidence: 'الإيصال غير واضح. ارفع الإيصال الأصلي أو صورة أوضح.',
    service_unavailable: 'خدمة التحقق غير متاحة مؤقتاً. حاول مرة أخرى بعد قليل.',
  },
};

function envList(name, fallback) {
  return (process.env[name] ?? fallback).split('|').map((value) => value.trim()).filter(Boolean);
}

function getTokenSecret() {
  const secret = process.env.BOOK_TOKEN_SECRET;
  if (!secret || secret.length < 32) throw new Error('BOOK_TOKEN_SECRET must contain at least 32 characters.');
  return secret;
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function signPayload(payload) {
  const encoded = encodeBase64Url(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', getTokenSecret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function verifyToken(token, expectedType) {
  const [encoded, suppliedSignature] = String(token ?? '').split('.');
  if (!encoded || !suppliedSignature) return null;
  const expectedSignature = crypto.createHmac('sha256', getTokenSecret()).update(encoded).digest('base64url');
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) return null;
  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
  if (!['en', 'ar'].includes(payload.edition) || !Number.isFinite(payload.exp) || payload.exp < Date.now()) return null;
  if (payload.type !== expectedType) return null;
  return payload;
}

function publicServerUrl(request) {
  return (process.env.PUBLIC_SERVER_URL ?? `${request.protocol}://${request.get('host')}`).replace(/\/$/, '');
}

function createBookLinks(request, entitlement) {
  const ttlSeconds = Math.min(3600, Math.max(300, Number(process.env.BOOK_LINK_TTL_SECONDS ?? 1800)));
  const token = signPayload({
    type: 'book-link',
    edition: entitlement.edition,
    exp: Date.now() + ttlSeconds * 1000,
    tx: entitlement.tx,
    receipt: entitlement.receipt,
  });
  const baseUrl = publicServerUrl(request);
  const bookUrl = `${baseUrl}/book/${entitlement.edition}?token=${encodeURIComponent(token)}`;
  return {
    readUrl: `${bookUrl}&mode=inline`,
    downloadUrl: `${bookUrl}&mode=download`,
    expiresIn: ttlSeconds,
  };
}

function createAccessPass(entitlement) {
  const days = Math.min(730, Math.max(1, Number(process.env.BOOK_ACCESS_TTL_DAYS ?? 365)));
  const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
  return {
    token: signPayload({ type: 'book-access', ...entitlement, exp: expiresAt }),
    expiresAt,
  };
}

function detectFileType(buffer) {
  if (buffer.subarray(0, 4).equals(Buffer.from('%PDF'))) return 'application/pdf';
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP') return 'image/webp';
  return null;
}

async function renderPdf(buffer) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), disableWorker: true }).promise;
  if (pdf.numPages !== 1) throw new Error('Only one-page receipt PDFs are allowed.');
  const page = await pdf.getPage(1);
  const original = page.getViewport({ scale: 1 });
  const scale = Math.min(2.5, 1800 / original.width, 2400 / original.height);
  const viewport = page.getViewport({ scale });
  if (viewport.width < 300 || viewport.height < 300 || viewport.width * viewport.height > 5_000_000) {
    throw new Error('PDF page dimensions are invalid.');
  }
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas.toBuffer('image/png');
}

async function prepareReceiptImages(buffer, fileType) {
  const source = fileType === 'application/pdf' ? await renderPdf(buffer) : buffer;
  const image = sharp(source, { limitInputPixels: 40_000_000 }).rotate();
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height || metadata.width < 300 || metadata.height < 300) {
    throw new Error('Receipt image dimensions are invalid.');
  }

  const topHeight = Math.max(300, Math.round(metadata.height * 0.64));
  const full = await image
    .clone()
    .extract({ left: 0, top: 0, width: metadata.width, height: Math.min(metadata.height, topHeight) })
    .resize({ width: Math.min(1800, Math.max(1200, metadata.width * 2)), withoutEnlargement: false })
    .grayscale()
    .normalize()
    .sharpen()
    .png()
    .toBuffer();

  const createDigitRegion = (topRatio, heightRatio) => image
    .clone()
    .extract({
      left: Math.round(metadata.width * 0.16),
      top: Math.round(metadata.height * topRatio),
      width: Math.round(metadata.width * 0.72),
      height: Math.round(metadata.height * heightRatio),
    })
    .resize({ width: 1400, withoutEnlargement: false })
    .grayscale()
    .normalize()
    .sharpen()
    .threshold(175)
    .png()
    .toBuffer();

  const [accountRegion, amountRegion] = await Promise.all([
    createDigitRegion(0.26, 0.10),
    createDigitRegion(0.31, 0.11),
  ]);
  return { full, accountRegion, amountRegion };
}

let workerPromise;
let ocrQueue = Promise.resolve();

function getWorker() {
  workerPromise ??= createWorker('eng+ara', 1, {
    cachePath: path.resolve(process.env.TESSERACT_CACHE_PATH ?? path.join(projectRoot, 'server-data', 'tessdata')),
  });
  return workerPromise;
}

function recognizeReceipt(images) {
  const job = ocrQueue.then(async () => {
    const worker = await getWorker();
    await worker.setParameters({ tessedit_char_whitelist: '', tessedit_pageseg_mode: '6' });
    const result = await worker.recognize(images.full);
    await worker.setParameters({ tessedit_char_whitelist: '0123456789.$,', tessedit_pageseg_mode: '6' });
    const account = await worker.recognize(images.accountRegion);
    const amount = await worker.recognize(images.amountRegion);
    await worker.setParameters({ tessedit_char_whitelist: '', tessedit_pageseg_mode: '6' });
    return {
      text: result.data.text,
      confidence: result.data.confidence,
      accountDigits: account.data.text.replace(/\D/g, ''),
      amountCandidates: [...amount.data.text.matchAll(/\d+(?:[.,]\d{1,2})?/g)]
        .map((match) => Number(match[0].replace(',', '.')))
        .filter(Number.isFinite),
    };
  });
  ocrQueue = job.catch(() => undefined);
  return job;
}

const attemptsByIp = new Map();
const usedTransactions = new Map();

function pruneMemory() {
  const hourAgo = Date.now() - 60 * 60 * 1000;
  for (const [ip, attempts] of attemptsByIp) {
    const recent = attempts.filter((timestamp) => timestamp >= hourAgo);
    if (recent.length) attemptsByIp.set(ip, recent);
    else attemptsByIp.delete(ip);
  }
  for (const [transaction, record] of usedTransactions) {
    if (record.expiresAt < Date.now()) usedTransactions.delete(transaction);
  }
}

function rateLimited(ip) {
  pruneMemory();
  const attempts = attemptsByIp.get(ip) ?? [];
  if (attempts.length >= Number(process.env.MAX_ATTEMPTS_PER_HOUR ?? 6)) return true;
  attempts.push(Date.now());
  attemptsByIp.set(ip, attempts);
  return false;
}

function primaryFailure(failures) {
  if (failures.includes('not_sham_cash')) return 'not_sham_cash';
  if (failures.some((code) => ['wrong_recipient', 'wrong_account', 'wrong_amount', 'wrong_currency'].includes(code))) return 'wrong_payment';
  if (failures.includes('low_confidence')) return 'low_confidence';
  return 'invalid_transaction';
}

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)), methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '8kb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1, fileSize: maxFileBytes, fields: 5 },
});

app.get('/health', (_request, response) => {
  response.json({ ok: true, verifier: 'local-tesseract-ocr', database: false });
});

app.post('/refresh-book-access', (request, response) => {
  const locale = request.body?.uiLanguage === 'ar' ? 'ar' : 'en';
  try {
    const entitlement = verifyToken(request.body?.accessPass, 'book-access');
    if (!entitlement) {
      return response.status(401).json({
        approved: false,
        reasonCode: 'access_expired',
        message: locale === 'ar'
          ? 'انتهت صلاحية الوصول المحفوظ. ارفع إيصال الدفع مرة أخرى لاستعادته.'
          : 'Your saved access has expired. Upload the payment receipt again to restore it.',
      });
    }

    return response.json({
      approved: true,
      restored: true,
      message: locale === 'ar'
        ? 'تمت استعادة نسختك المحفوظة.'
        : 'Your saved book access has been restored.',
      ...createBookLinks(request, entitlement),
    });
  } catch {
    return response.status(401).json({ approved: false, reasonCode: 'access_expired' });
  }
});

app.post('/verify-receipt', upload.single('receipt'), async (request, response) => {
  const locale = request.body.uiLanguage === 'ar' ? 'ar' : 'en';
  const edition = request.body.bookLanguage === 'ar' ? 'ar' : 'en';
  const reply = (code, status = 422, extra = {}) => response.status(status).json({
    approved: false,
    reasonCode: code,
    message: messages[locale][code],
    ...extra,
  });

  try {
    if (!request.file || request.body.confirmation !== 'on') return reply('invalid_request', 400);
    if (rateLimited(request.ip ?? 'unknown')) return reply('too_many_attempts', 429);

    const fileType = detectFileType(request.file.buffer);
    if (!fileType) return reply('invalid_file', 400);
    const receiptHash = crypto.createHash('sha256').update(request.file.buffer).digest('hex');
    const prepared = await prepareReceiptImages(request.file.buffer, fileType);
    const recognized = await recognizeReceipt(prepared);
    const extracted = parseReceiptText(recognized.text, recognized.confidence);
    const allowedAmounts = (process.env.RECEIPT_ALLOWED_AMOUNTS ?? '2.99,3.00,3.10')
      .split(',').map(Number).filter(Number.isFinite);
    const expectedSuffix = process.env.RECEIPT_EXPECTED_ACCOUNT_SUFFIX ?? '4742';
    if (recognized.accountDigits.includes(expectedSuffix)) extracted.recipientAccountSuffix = expectedSuffix;
    const regionAmount = recognized.amountCandidates.find((candidate) => (
      allowedAmounts.some((amount) => Math.abs(candidate - amount) < 0.001)
    ));
    if (regionAmount !== undefined) extracted.amount = regionAmount;
    const validation = validateReceipt(extracted, {
      expectedSuffix,
      expectedRecipients: envList(
        'RECEIPT_EXPECTED_RECIPIENTS',
        'venus alarbeed|venus wajih alarbeed|فينوس العربيد|فينوس وجيه العربيد',
      ),
      allowedAmounts,
    });

    if (!validation.approved) {
      const code = primaryFailure(validation.failures);
      return reply(code, 422, {
        receipt: {
          transactionNumber: extracted.transactionNumber,
          amount: extracted.amount,
          currency: extracted.currency,
          recipientName: extracted.recipientName,
          transactionDate: extracted.transactionDateIso,
        },
      });
    }

    const transactionKey = /^\d{6,12}$/.test(extracted.transactionNumber)
      ? extracted.transactionNumber
      : receiptHash.slice(0, 24);
    const existing = usedTransactions.get(transactionKey);
    if (existing && existing.edition !== edition) return reply('duplicate_receipt', 409);
    const entitlement = { edition, tx: transactionKey, receipt: receiptHash.slice(0, 16) };
    const accessPass = createAccessPass(entitlement);
    usedTransactions.set(transactionKey, { edition, receiptHash, expiresAt: accessPass.expiresAt });

    return response.json({
      approved: true,
      message: messages[locale].approved,
      accessPass: accessPass.token,
      accessExpiresAt: new Date(accessPass.expiresAt).toISOString(),
      ...createBookLinks(request, entitlement),
      receipt: {
        transactionNumber: extracted.transactionNumber,
        amount: extracted.amount,
        currency: extracted.currency,
        recipientName: extracted.recipientName,
        transactionDate: extracted.transactionDateIso,
      },
    });
  } catch (error) {
    console.error('Receipt verification failed:', error instanceof Error ? error.message : error);
    return reply('service_unavailable', 503);
  }
});

app.get('/book/:edition', (request, response) => {
  try {
    const payload = verifyToken(request.query.token, 'book-link');
    if (!payload || payload.edition !== request.params.edition) return response.status(403).send('This book link is invalid or expired.');
    const bookPath = bookPaths[payload.edition];
    if (!fs.existsSync(bookPath)) return response.status(503).send('The book file is not installed on the server yet.');
    const disposition = request.query.mode === 'download' ? 'attachment' : 'inline';
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${disposition}; filename="${bookNames[payload.edition]}"`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    });
    fs.createReadStream(bookPath).pipe(response);
  } catch {
    response.status(403).send('This book link is invalid or expired.');
  }
});

app.use((error, _request, response, _next) => {
  void _next;
  if (error instanceof multer.MulterError) {
    return response.status(400).json({ approved: false, reasonCode: 'invalid_file', message: messages.en.invalid_file });
  }
  console.error(error);
  return response.status(500).json({ approved: false, reasonCode: 'service_unavailable', message: messages.en.service_unavailable });
});

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    getTokenSecret();
    console.log(`Receipt server listening on port ${port}.`);
  });
}

export { createAccessPass, createBookLinks, signPayload, verifyToken };
