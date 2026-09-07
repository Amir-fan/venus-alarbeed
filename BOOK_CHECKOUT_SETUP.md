# Sham Cash OCR book checkout

The checkout pages are `/en/book` and `/ar/book`. The public website can stay on GitHub Pages, while the small Node server in `server/` privately checks receipts and serves the paid PDFs.

This version uses:

- No OpenAI or other AI API.
- No database.
- Local Tesseract OCR on the checkout server.
- Deterministic receipt rules written in code.
- Private PDF files that never enter `public/`, the Git repository, or the GitHub Pages artifact.

## What is checked

The server accepts a JPG, PNG, WEBP, or one-page PDF up to 10 MB. It renders image-only PDFs, reads English and Arabic text with Tesseract, and then requires:

- Sham Cash branding and a Send transaction.
- Venus Alarbeed as the recipient in English or Arabic.
- Recipient account ending `4742`.
- Either `$2.99 USD`, `$3.00 USD`, or `$3.10 USD`.
- Enough readable receipt fields and an acceptable OCR confidence score.

The transaction date is extracted for display when readable, but it is not used to approve or reject a receipt.

The two supplied `$150` examples are useful rejection tests. They should not unlock a book because their recipient, account, and amount do not match the sale.

## 1. Put the books on the private server

Create `private-books/` beside `server/` and copy the two complete books using these exact names:

| Edition | Private filename |
| --- | --- |
| English | `conscious-diplomacy-en.pdf` |
| Arabic | `conscious-diplomacy-ar.pdf` |

That folder is ignored by Git. Upload it directly to the private server or mount it as a private persistent disk. Never put the books under `public/`.

## 2. Configure the receipt server

Create `server/.env` from `server/.env.example`, then set a long random `BOOK_TOKEN_SECRET`. Load those environment variables through the hosting provider or the shell before starting the server.

The server needs Node.js 22.13 or newer and runs with:

```bash
npm ci
npm run checkout-server
```

The first OCR run downloads and caches the official Tesseract English and Arabic language data under `server-data/tessdata`. This is local OCR data, not a remote receipt-analysis service.

The default health endpoint is:

```text
http://localhost:8787/health
```

## 3. Connect GitHub Pages

Deploy the checkout server at a public HTTPS address such as `https://checkout.example.com`.

In the GitHub repository, create an Actions variable named `NEXT_PUBLIC_RECEIPT_VERIFY_URL` with:

```text
https://checkout.example.com/verify-receipt
```

Also include the exact GitHub Pages origin in `ALLOWED_ORIGINS` on the receipt server. Re-run the Pages workflow after saving the variable.

## 4. Test before launch

Run the parser unit tests:

```bash
npm run test:receipt
```

Then test through the website with:

- A real English receipt paying Venus `$2.99`.
- A real Arabic receipt paying Venus `$3.00` or `$3.10`.
- The supplied `$150` image and PDF, which must both be rejected.
- A receipt for a different recipient or account, which must be rejected.
- An older receipt with all three required payment fields, which should still be accepted.
- Both Read in browser and Download PDF after approval.
- Direct access to `/book/en` or `/book/ar` without a signed token, which must return 403.

## Honest security boundary

OCR can check what a receipt displays, but it cannot prove that Sham Cash actually completed the transfer. A convincingly edited receipt can pass unless Sham Cash provides a transaction-verification API.

Because there is no database, used transaction numbers are remembered only in server memory and are lost when the process restarts. Multiple server instances do not share this memory. The signed reading/download link expires after 30 minutes by default, but a buyer can still share the downloaded PDF. These are unavoidable limitations of the requested no-database, no-payment-API design.
