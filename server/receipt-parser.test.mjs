import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReceiptText, validateReceipt } from './receipt-parser.mjs';

const now = Date.parse('2026-09-03T20:00:00+03:00');

test('accepts an English Venus receipt for 2.99 USD', () => {
  const parsed = parseReceiptText(`
    ShamCash
    Transaction Send - Number 424598700
    Transaction Date: 2026-09-03 - 19:10:02
    Sender Name: Customer Name
    Sender Account: ************1330
    Recipient Name: venus alarbeed
    Recipient Account: ************4742
    Amount: 2.99 $
    File generated via ShamCash
  `, 84);

  assert.equal(validateReceipt(parsed, { now }).approved, true);
});

test('accepts an Arabic Venus receipt for 3 USD', () => {
  const parsed = parseReceiptText(`
    شام كاش
    العملية إرسال - رقم 427727296
    تاريخ العملية: 2026-09-03 - 18:50:20
    اسم المرسل: العميل
    حساب المرسل: 1330************
    اسم المستلم: فينوس العربيد
    حساب المستلم: 4742************
    المبلغ: $3
    تم إنشاء الملف عبر شام كاش
  `, 82);

  assert.equal(validateReceipt(parsed, { now }).approved, true);
});

test('accepts a mixed RTL line where the English recipient appears before the Arabic label', () => {
  const parsed = parseReceiptText(`
    شام كاش
    العملية إرسال - رقم 439974546
    تاريخ العملية: 2026-09-03 - 18:50:20
    venus alarbeed ‏اسم المستلم:‎
    حساب المستلم: +4742
    المبلغ: $3
  `, 88);

  assert.equal(parsed.recipientName, 'venus alarbeed');
  assert.equal(validateReceipt(parsed, { now }).approved, true);
});

test('accepts 3.10 USD without requiring a transaction date', () => {
  const parsed = parseReceiptText(`
    ShamCash
    Recipient Name: venus alarbeed
    Recipient Account: ************4742
    Amount: 3.10 $
  `, 88);

  assert.equal(validateReceipt(parsed).approved, true);
});

test('rejects the supplied example amount and recipient', () => {
  const parsed = parseReceiptText(`
    ShamCash
    Transaction Send - Number 424598700
    Transaction Date: 2026-09-03 - 19:10:02
    Recipient Name: Firas Abu Kheir
    Recipient Account: ************1330
    Amount: 150 $
  `, 84);
  const result = validateReceipt(parsed, { now });

  assert.equal(result.approved, false);
  assert.ok(result.failures.includes('wrong_recipient'));
  assert.ok(result.failures.includes('wrong_account'));
  assert.ok(result.failures.includes('wrong_amount'));
});

test('does not reject an old receipt when the three payment fields match', () => {
  const parsed = parseReceiptText(`
    ShamCash
    Transaction Send - Number 424598700
    Transaction Date: 2026-08-20 - 19:10:02
    Recipient Name: venus alarbeed
    Recipient Account: ************4742
    Amount: 3 $
  `, 84);

  assert.equal(validateReceipt(parsed, { now }).approved, true);
});
