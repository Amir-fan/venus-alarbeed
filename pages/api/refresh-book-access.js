import { createBookLinks, verifyToken } from '../../server/access-tokens.mjs';

function applyCors(request, response) {
  const origin = request.headers.origin;
  const allowed = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  if (origin && allowed.includes(origin)) response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Vary', 'Origin');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default function refreshBookAccess(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ approved: false, reasonCode: 'method_not_allowed' });

  const locale = request.body?.uiLanguage === 'ar' ? 'ar' : 'en';
  const entitlement = verifyToken(request.body?.accessPass, 'book-access');
  if (!entitlement) {
    return response.status(401).json({
      approved: false,
      reasonCode: 'access_expired',
      message: locale === 'ar'
        ? 'انتهت صلاحية الوصول المحفوظ. ارفع إيصال الدفع مرة أخرى لاستعادته.'
        : 'Your saved access has expired. Upload the payment receipt again to restore it.',
    });
  }

  const protocol = String(request.headers['x-forwarded-proto'] ?? 'https').split(',')[0];
  const host = request.headers['x-forwarded-host'] ?? request.headers.host;
  const baseUrl = (process.env.PUBLIC_SERVER_URL || `${protocol}://${host}`).replace(/\/$/, '');
  return response.status(200).json({
    approved: true,
    restored: true,
    message: locale === 'ar' ? 'تمت استعادة نسختك المحفوظة.' : 'Your saved book access has been restored.',
    ...createBookLinks(baseUrl, entitlement, '/api/book'),
  });
}
