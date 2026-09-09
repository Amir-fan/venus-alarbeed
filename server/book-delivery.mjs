import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { get } from '@vercel/blob';
import { verifyToken } from './access-tokens.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localBookPaths = {
  en: process.env.BOOK_EN_PATH || path.join(projectRoot, 'private-books', 'conscious-diplomacy-en.pdf'),
  ar: process.env.BOOK_AR_PATH || path.join(projectRoot, 'private-books', 'conscious-diplomacy-ar.pdf'),
};
const blobBookPaths = {
  en: process.env.BOOK_EN_BLOB_PATH,
  ar: process.env.BOOK_AR_BLOB_PATH,
};
const bookNames = {
  en: 'Conscious-Diplomacy-English-Venus-Alarbeed.pdf',
  ar: 'Conscious-Diplomacy-Arabic-Venus-Alarbeed.pdf',
};

async function deliverBook({ edition, token, mode, ifNoneMatch }, response) {
  const payload = verifyToken(token, 'book-link');
  if (!payload || payload.edition !== edition) return response.status(403).send('This book link is invalid or expired.');

  try {
    const disposition = mode === 'download' ? 'attachment' : 'inline';
    const blobPath = blobBookPaths[payload.edition];

    if (blobPath) {
      const result = await get(blobPath, { access: 'private', ifNoneMatch });
      if (!result) return response.status(503).send('The private book file is not installed.');
      if (result.statusCode === 304) {
        response.setHeader('ETag', result.blob.etag);
        response.setHeader('Cache-Control', 'private, no-cache');
        return response.status(304).end();
      }
      if (result.statusCode !== 200 || !result.stream) return response.status(503).send('The private book file is unavailable.');
      response.setHeader('Content-Type', result.blob.contentType ?? 'application/pdf');
      response.setHeader('Content-Disposition', `${disposition}; filename="${bookNames[payload.edition]}"`);
      response.setHeader('Cache-Control', 'private, no-cache');
      response.setHeader('ETag', result.blob.etag);
      response.setHeader('X-Content-Type-Options', 'nosniff');
      Readable.fromWeb(result.stream).pipe(response);
      return;
    }

    const bookPath = localBookPaths[payload.edition];
    if (!fs.existsSync(/* turbopackIgnore: true */ bookPath)) return response.status(503).send('The book file is not installed on the server yet.');
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `${disposition}; filename="${bookNames[payload.edition]}"`);
    response.setHeader('Cache-Control', 'private, no-store, max-age=0');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    fs.createReadStream(/* turbopackIgnore: true */ bookPath).pipe(response);
  } catch (error) {
    console.error('Private book delivery failed:', error instanceof Error ? error.message : error);
    response.status(503).send('The private book file is temporarily unavailable.');
  }
}

export { deliverBook };
