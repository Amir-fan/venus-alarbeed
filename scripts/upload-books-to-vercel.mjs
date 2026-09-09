import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { put } from '@vercel/blob';

const projectRoot = path.resolve(import.meta.dirname, '..');

for (const filename of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(path.join(projectRoot, filename));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

const books = [
  {
    edition: 'English',
    source: path.join(projectRoot, 'private-books', 'conscious-diplomacy-en.pdf'),
    destination: 'books/conscious-diplomacy-en.pdf',
  },
  {
    edition: 'Arabic',
    source: path.join(projectRoot, 'private-books', 'conscious-diplomacy-ar.pdf'),
    destination: 'books/conscious-diplomacy-ar.pdf',
  },
];

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error('Set BLOB_READ_WRITE_TOKEN from the connected private Vercel Blob store first.');
}

for (const book of books) {
  const pdf = await fs.readFile(book.source);
  const blob = await put(book.destination, pdf, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/pdf',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  console.log(`${book.edition}: ${blob.pathname} (${pdf.byteLength} bytes)`);
}

console.log('Set BOOK_EN_BLOB_PATH=books/conscious-diplomacy-en.pdf');
console.log('Set BOOK_AR_BLOB_PATH=books/conscious-diplomacy-ar.pdf');
