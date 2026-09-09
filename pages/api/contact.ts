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

  const { name, email, reason = 'Waitlist', message = '' } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: 'Email service is not configured' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeReason = escapeHtml(reason);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>');

    const { data, error } = await resend.emails.send({
      from: 'Venus Alarbeed <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'venus.alarbeed.support@gmail.com',
      subject: `New submission from ${String(name).slice(0, 120)} — ${String(reason).slice(0, 120)}`,
      html: `
        <h2>New Contact Form Submission</h2>
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
