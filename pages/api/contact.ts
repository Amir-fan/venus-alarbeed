import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

function escapeHtml(value: unknown) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, reason = 'Website contact', message = '', website = '' } = req.body ?? {};

  // Quietly accept bot-filled honeypot submissions without sending an email.
  if (website) {
    return res.status(200).json({ success: true });
  }

  const normalizedName = String(name ?? '').trim();
  const normalizedEmail = String(email ?? '').trim();
  const normalizedReason = String(reason ?? '').trim();
  const normalizedMessage = String(message ?? '').trim();

  if (!normalizedName || !normalizedEmail) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (
    normalizedName.length > 120 ||
    normalizedEmail.length > 180 ||
    normalizedReason.length > 160 ||
    normalizedMessage.length > 4000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return res.status(400).json({ error: 'Invalid submission' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: 'Email service is not configured' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(normalizedName);
    const safeEmail = escapeHtml(normalizedEmail);
    const safeReason = escapeHtml(normalizedReason);
    const safeMessage = escapeHtml(normalizedMessage).replaceAll('\n', '<br/>');

    const { data, error } = await resend.emails.send({
      from: 'Venus Alarbeed <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'venus.alarbeed.support@gmail.com',
      replyTo: normalizedEmail,
      subject: `New submission from ${normalizedName} — ${normalizedReason}`,
      html: `
        <h2>New Website Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Reason:</strong> ${safeReason}</p>
        ${safeMessage ? `<p><strong>Message:</strong><br/>${safeMessage}</p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
