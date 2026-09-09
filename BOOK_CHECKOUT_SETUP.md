# Vercel checkout deployment

The website and private Sham Cash checkout can run together as one Next.js project on Vercel. The same repository still supports a static GitHub Pages build, but GitHub Pages must call the Vercel API because Pages cannot run OCR or protect paid files.

The checkout uses:

- Local Tesseract OCR inside a Node.js Vercel Function; no AI API.
- Bundled English and Arabic language data, so OCR does not download models during a cold start.
- Deterministic checks for Sham Cash, recipient Venus Alarbeed, account ending `4742`, USD, and an amount of `$2.99`, `$3.00`, or `$3.10`.
- Signed 365-day browser access passes and fresh 30-minute book links.
- Private Vercel Blob storage for both paid books; no database.

The transaction date is extracted for display when readable but is not used for approval.

## 1. Import the repository into Vercel

Create a Vercel project from this GitHub repository and keep the **Next.js** framework preset. No custom build or output-directory setting is needed.

The configuration automatically behaves differently by host:

- Vercel receives the normal Next.js build and the `/api/*` functions.
- GitHub Actions receives the static `out/` export with the existing `/venus-alarbeed` base path.

## 2. Add the environment variables

In Vercel, open **Project Settings → Environment Variables** and add:

```text
BOOK_TOKEN_SECRET=<a stable random secret of at least 32 characters>
BOOK_EN_BLOB_PATH=books/conscious-diplomacy-en.pdf
BOOK_AR_BLOB_PATH=books/conscious-diplomacy-ar.pdf
RECEIPT_EXPECTED_ACCOUNT_SUFFIX=4742
RECEIPT_ALLOWED_AMOUNTS=2.99,3.00,3.10
BOOK_LINK_TTL_SECONDS=1800
BOOK_ACCESS_TTL_DAYS=365
MAX_ATTEMPTS_PER_HOUR=6
```

`RECEIPT_EXPECTED_RECIPIENTS` may be left unset to use the built-in English and Arabic Venus Alarbeed names.

Do not add `NEXT_PUBLIC_RECEIPT_VERIFY_URL` on Vercel. The browser will automatically use the same-origin `/api/verify-receipt` endpoint.

Keep `BOOK_TOKEN_SECRET` stable after launch. Replacing it invalidates all saved buyer access passes.

## 3. Create private book storage

In the Vercel project, open **Storage**, create a **Blob** store with **Private** access, and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.

Pull or copy that token into the local environment, then upload the two ignored files from `private-books/`:

```bash
npm run upload:books
```

The script uploads these exact private paths:

| Edition | Blob path |
| --- | --- |
| English | `books/conscious-diplomacy-en.pdf` |
| Arabic | `books/conscious-diplomacy-ar.pdf` |

The paid PDFs remain excluded from Git, `public/`, and the static deployment artifact.

## 4. Deploy and test

Redeploy after adding the variables and Blob store. Then test:

- `/api/verify-receipt` accepts the supplied real `$3` Venus receipt.
- A wrong recipient, account, currency, or amount is rejected.
- Both English and Arabic editions open and download after approval.
- Closing the page and returning in the same browser restores access through **My Book**.
- `/api/book/en` and `/api/book/ar` return 403 without a valid short-lived token.
- A long-lived access pass cannot be used directly as a book URL.

Local automated checks:

```bash
npm run test:receipt
npm run build
```

Receipt uploads are limited to 4 MB to stay below Vercel's 4.5 MB Function payload limit. The supplied receipt is only about 75 KB.

## Optional: keep GitHub Pages as the public frontend

After Vercel is deployed, set the GitHub Actions repository variable below:

```text
NEXT_PUBLIC_RECEIPT_VERIFY_URL=https://YOUR-VERCEL-DOMAIN/api/verify-receipt
```

Also set this Vercel environment variable so the cross-origin browser request is allowed:

```text
ALLOWED_ORIGINS=https://amir-fan.github.io
```

If the entire website moves to Vercel, neither setting is needed.

## Security boundary

OCR checks what the receipt displays; without a Sham Cash verification API, it cannot prove independently that the transfer settled. A convincingly edited receipt can pass.

Because there is no database, duplicate transaction memory is best-effort per warm Function instance and disappears on restarts or scaling. Saved access is tied to the buyer's browser, not an account. Clearing browser data or changing devices requires uploading the same valid receipt again. Buyers can also share a saved pass or downloaded PDF; preventing that requires accounts and persistent storage.
