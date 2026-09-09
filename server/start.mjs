import process from 'node:process';
import checkoutApp, { getTokenSecret } from './index.mjs';
import { deliverBook } from './book-delivery.mjs';

const port = Number(process.env.PORT ?? 8787);
getTokenSecret();

checkoutApp.get(['/book/:edition', '/api/book/:edition'], async (request, response) => {
  return deliverBook({
    edition: request.params.edition,
    token: request.query.token,
    mode: request.query.mode,
    ifNoneMatch: request.headers['if-none-match'],
  }, response);
});

checkoutApp.listen(port, () => {
  console.log(`Receipt server listening on port ${port}.`);
});
