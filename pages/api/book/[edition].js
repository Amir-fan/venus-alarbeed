import { deliverBook } from '../../../server/book-delivery.mjs';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function serveBook(request, response) {
  if (request.method !== 'GET') return response.status(405).send('Method not allowed.');
  const edition = Array.isArray(request.query.edition) ? request.query.edition[0] : request.query.edition;
  const token = Array.isArray(request.query.token) ? request.query.token[0] : request.query.token;
  const mode = Array.isArray(request.query.mode) ? request.query.mode[0] : request.query.mode;
  return deliverBook({
    edition,
    token,
    mode,
    ifNoneMatch: request.headers['if-none-match'],
  }, response);
}
