# Venus Alarbeed

Bilingual English/Arabic Next.js website with a private Sham Cash receipt-verification flow for the digital editions of *Conscious Diplomacy*.

## Local development

Install dependencies and run the website:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/ar`.

For the standalone local checkout server, copy `server/.env.example` to `server/.env`, load those values in the shell, keep the two ignored PDFs in `private-books/`, and run:

```bash
npm run checkout-server
```

## Verification

```bash
npm run test:receipt
npm run lint
npm run build
```

## Deployment

Vercel is the primary full-stack target. It hosts the Next.js frontend, server-side OCR functions, signed access-pass refresh route, and authenticated private-book delivery. The paid PDFs are stored in a private Vercel Blob store and are never committed.

GitHub Pages remains supported as a static frontend, but its checkout must point to the deployed Vercel API.

See [BOOK_CHECKOUT_SETUP.md](./BOOK_CHECKOUT_SETUP.md) for the complete environment, private Blob upload, and launch checklist.
