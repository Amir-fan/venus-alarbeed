import assert from 'node:assert/strict';
import test from 'node:test';
import { createAccessPass, createBookLinks, signPayload, verifyToken } from './access-tokens.mjs';

process.env.BOOK_TOKEN_SECRET = 'test-only-secret-longer-than-thirty-two-characters';
process.env.BOOK_ACCESS_TTL_DAYS = '365';
process.env.BOOK_LINK_TTL_SECONDS = '1800';

const entitlement = {
  edition: 'en',
  tx: '439974546',
  receipt: 'receipt-fingerprint',
};

test('creates a long-lived access pass that restores the same edition', () => {
  const access = createAccessPass(entitlement);
  const payload = verifyToken(access.token, 'book-access');

  assert.equal(payload?.edition, 'en');
  assert.equal(payload?.tx, entitlement.tx);
  assert.ok(access.expiresAt > Date.now() + 364 * 24 * 60 * 60 * 1000);
});

test('exchanges an entitlement for short-lived reading and download links', () => {
  const links = createBookLinks('https://checkout.example.com', entitlement);
  const readToken = new URL(links.readUrl).searchParams.get('token');
  const downloadUrl = new URL(links.downloadUrl);

  assert.equal(verifyToken(readToken, 'book-link')?.edition, 'en');
  assert.equal(downloadUrl.searchParams.get('mode'), 'download');
  assert.equal(links.expiresIn, 1800);
});

test('does not allow the long-lived pass to act as a direct book link', () => {
  const access = createAccessPass(entitlement);
  assert.equal(verifyToken(access.token, 'book-link'), null);
});

test('rejects expired and altered access passes', () => {
  const expired = signPayload({ type: 'book-access', ...entitlement, exp: Date.now() - 1 });
  const valid = createAccessPass(entitlement).token;

  assert.equal(verifyToken(expired, 'book-access'), null);
  assert.equal(verifyToken(`${valid}x`, 'book-access'), null);
});
