const ARABIC_DIGITS = new Map([
  ['٠', '0'], ['١', '1'], ['٢', '2'], ['٣', '3'], ['٤', '4'],
  ['٥', '5'], ['٦', '6'], ['٧', '7'], ['٨', '8'], ['٩', '9'],
  ['۰', '0'], ['۱', '1'], ['۲', '2'], ['۳', '3'], ['۴', '4'],
  ['۵', '5'], ['۶', '6'], ['۷', '7'], ['۸', '8'], ['۹', '9'],
]);

export function normalizeDigits(value) {
  return Array.from(value, (character) => ARABIC_DIGITS.get(character) ?? character).join('');
}

export function normalizeName(value) {
  return value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[^\p{L}\p{N}]/gu, '');
}

function levenshtein(left, right) {
  if (!left.length) return right.length;
  if (!right.length) return left.length;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

export function nameSimilarity(left, right) {
  const a = normalizeName(left);
  const b = normalizeName(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  return 1 - levenshtein(a, b) / Math.max(a.length, b.length);
}

function lineValue(lines, labelPattern) {
  const index = lines.findIndex((line) => labelPattern.test(line));
  if (index < 0) return '';

  const line = lines[index];
  const match = line.match(labelPattern);
  if (!match || match.index === undefined) return '';
  const cleanValue = (value) => value.replace(/^[\s:؛\-–—]+|[\s:؛\-–—]+$/gu, '').trim();
  const afterLabel = cleanValue(line.slice(match.index + match[0].length));
  if (afterLabel) return afterLabel;
  const beforeLabel = cleanValue(line.slice(0, match.index));
  if (beforeLabel) return beforeLabel;
  return lines[index + 1] ?? '';
}

function findDate(text) {
  const match = text.match(/(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\s*[-–—]?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?/u);
  if (!match) return null;
  const [, year, month, day, hour, minute, second = '00'] = match;
  const iso = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}:${second}+03:00`;
  const timestamp = Date.parse(iso);
  return Number.isFinite(timestamp) ? { iso, timestamp } : null;
}

function findAmount(lines, text) {
  const amountLine = lines.find((line) => /\bamount\b|المبلغ/ui.test(line)) ?? '';
  const source = amountLine || text;
  const direct = source.match(/(?:\$\s*)?(\d{1,6}(?:[.,]\d{1,2})?)\s*(?:\$|usd|دولار)?/ui);
  if (!direct) return null;
  const parsed = Number(direct[1].replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function findTransactionNumber(text) {
  const direct = text.match(/(?:transaction[^\n]{0,24}(?:number|no\.?|#)|العملية[^\n]{0,24}رقم)\D{0,8}(\d{6,12})/ui);
  if (direct) return direct[1];

  const candidates = [...text.matchAll(/\b\d{6,12}\b/g)].map((match) => match[0]);
  return candidates.find((candidate) => !candidate.startsWith('20')) ?? '';
}

function findRecipientAccount(lines) {
  const directIndex = lines.findIndex((line) => /recipient\s*account|حساب\s*المستلم/ui.test(line));
  if (directIndex >= 0) {
    const area = lines.slice(directIndex, directIndex + 2).join(' ');
    const digits = normalizeDigits(area).match(/\d{4,12}/g) ?? [];
    if (digits.length) return digits.at(-1).slice(-4);
  }

  const splitIndex = lines.findIndex((line, index) => (
    /^recipient\s*$/ui.test(line) && /account/ui.test(lines[index + 1] ?? '')
  ));
  if (splitIndex >= 0) {
    const area = lines.slice(splitIndex, splitIndex + 3).join(' ');
    const digits = normalizeDigits(area).match(/\d{4,12}/g) ?? [];
    if (digits.length) return digits.at(-1).slice(-4);
  }

  return '';
}

export function parseReceiptText(rawText, confidence = 0) {
  const text = normalizeDigits(rawText)
    .normalize('NFKC')
    .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '');
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const recipientName = lineValue(lines, /(?:recipient\s*name|اسم\s*المستلم)/ui);
  const date = findDate(text);

  return {
    rawText: text,
    confidence,
    hasBranding: /sham\s*c?ca(?:sh|sl)|شام\s*كاش/ui.test(text),
    isSend: /(?:transaction\s*)?send|إرسال/ui.test(text),
    transactionNumber: findTransactionNumber(text),
    transactionDateIso: date?.iso ?? '',
    transactionTimestamp: date?.timestamp ?? Number.NaN,
    recipientName,
    recipientAccountSuffix: findRecipientAccount(lines),
    amount: findAmount(lines, text),
    currency: /\$|\busd\b|دولار/ui.test(text) ? 'USD' : 'UNKNOWN',
    fieldCount: [
      /transaction|العملية/ui.test(text),
      /date|تاريخ/ui.test(text),
      /recipient|المستلم/ui.test(text),
      /account|حساب/ui.test(text),
      /amount|المبلغ/ui.test(text),
    ].filter(Boolean).length,
  };
}

export function validateReceipt(extracted, options = {}) {
  const expectedSuffix = String(options.expectedSuffix ?? '4742').replace(/\D/g, '');
  const allowedAmounts = options.allowedAmounts ?? [2.99, 3, 3.1];
  const expectedRecipients = options.expectedRecipients ?? [
    'venus alarbeed',
    'venus wajih alarbeed',
    'فينوس العربيد',
    'فينوس وجيه العربيد',
  ];
  const failures = [];

  if (!extracted.hasBranding || extracted.fieldCount < 3) failures.push('not_sham_cash');

  const bestRecipientScore = Math.max(
    0,
    ...expectedRecipients.map((candidate) => nameSimilarity(extracted.recipientName, candidate)),
  );
  if (bestRecipientScore < 0.76) failures.push('wrong_recipient');
  if (!extracted.recipientAccountSuffix || extracted.recipientAccountSuffix !== expectedSuffix) failures.push('wrong_account');
  if (extracted.amount === null || !allowedAmounts.some((amount) => Math.abs(extracted.amount - amount) < 0.001)) {
    failures.push('wrong_amount');
  }
  if (extracted.currency !== 'USD') failures.push('wrong_currency');
  if (extracted.confidence < 62) failures.push('low_confidence');

  return {
    approved: failures.length === 0,
    failures: [...new Set(failures)],
    bestRecipientScore,
  };
}
