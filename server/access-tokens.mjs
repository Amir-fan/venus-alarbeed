import crypto from 'node:crypto';
import process from 'node:process';

function getTokenSecret() {
  const secret = process.env.BOOK_TOKEN_SECRET;
  if (!secret || secret.length < 32) throw new Error('BOOK_TOKEN_SECRET must contain at least 32 characters.');
  return secret;
}

function signPayload(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', getTokenSecret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function verifyToken(token, expectedType) {
  try {
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
  } catch {
    return null;
  }
}

function createBookLinks(baseUrl, entitlement, bookRoute = process.env.VERCEL === '1' ? '/api/book' : '/book') {
  const ttlSeconds = Math.min(3600, Math.max(300, Number(process.env.BOOK_LINK_TTL_SECONDS ?? 1800)));
  const token = signPayload({
    type: 'book-link',
    edition: entitlement.edition,
    exp: Date.now() + ttlSeconds * 1000,
    tx: entitlement.tx,
    receipt: entitlement.receipt,
  });
  const normalizedBaseUrl = String(baseUrl).replace(/\/$/, '');
  const bookUrl = `${normalizedBaseUrl}${bookRoute}/${entitlement.edition}?token=${encodeURIComponent(token)}`;
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

export { createAccessPass, createBookLinks, getTokenSecret, signPayload, verifyToken };
