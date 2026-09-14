'use client';

import { useState, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './page.module.css';

interface Props {
  lang: Locale;
}

const formCopy = {
  en: {
    eyebrow: 'Course registration',
    title: 'Begin your journey.',
    body: 'Send your details and the team will contact you with enrollment and scheduling information.',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone / WhatsApp',
    role: 'Profession or current role',
    language: 'Preferred course language',
    select: 'Choose a language',
    english: 'English',
    arabic: 'Arabic',
    both: 'Either / bilingual',
    note: 'Anything you would like us to know? (optional)',
    submit: 'Register for the course',
    submitting: 'Sending registration…',
    success: 'Your registration has been received. The team will contact you soon.',
    error: 'We could not send your registration. Please try again.',
  },
  ar: {
    eyebrow: 'التسجيل في الكورس',
    title: 'ابدأ رحلتك.',
    body: 'أرسل بياناتك وسيتواصل معك الفريق بمعلومات التسجيل والمواعيد.',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف / واتساب',
    role: 'المهنة أو الدور الحالي',
    language: 'لغة الكورس المفضلة',
    select: 'اختر اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    both: 'أي منهما / ثنائي اللغة',
    note: 'هل هناك ما تود إضافته؟ (اختياري)',
    submit: 'سجّل في الكورس',
    submitting: 'جارٍ إرسال التسجيل…',
    success: 'تم استلام تسجيلك. سيتواصل معك الفريق قريباً.',
    error: 'تعذر إرسال التسجيل. يرجى المحاولة مرة أخرى.',
  },
} as const;

export default function CourseRegistrationForm({ lang }: Props) {
  const t = formCopy[lang];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus('submitting');

    const form = new FormData(formElement);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const role = String(form.get('role') ?? '').trim();
    const courseLanguage = String(form.get('courseLanguage') ?? '').trim();
    const note = String(form.get('note') ?? '').trim();
    const website = String(form.get('website') ?? '').trim();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          website,
          reason: 'Course registration — The Conscious Diplomacy Code',
          message: [
            `Phone / WhatsApp: ${phone}`,
            `Profession / role: ${role || 'Not provided'}`,
            `Preferred language: ${courseLanguage}`,
            `Website language: ${lang}`,
            note ? `Note: ${note}` : '',
          ].filter(Boolean).join('\n'),
        }),
      });

      if (!response.ok) throw new Error('Registration failed');

      formElement.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="registration" className={styles.registration} aria-labelledby="registration-heading">
      <div className={`container ${styles.registrationGrid}`}>
        <div className={styles.registrationIntro}>
          <span>{t.eyebrow}</span>
          <h2 id="registration-heading">{t.title}</h2>
          <p>{t.body}</p>
        </div>

        <form className={styles.form} onSubmit={submitRegistration}>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="course-website">Website</label>
            <input id="course-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label className={styles.field}>
            <span>{t.name}</span>
            <input name="name" type="text" autoComplete="name" required maxLength={120} />
          </label>

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span>{t.email}</span>
              <input name="email" type="email" autoComplete="email" required maxLength={180} />
            </label>
            <label className={styles.field}>
              <span>{t.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" required maxLength={40} />
            </label>
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span>{t.role}</span>
              <input name="role" type="text" autoComplete="organization-title" maxLength={120} />
            </label>
            <label className={styles.field}>
              <span>{t.language}</span>
              <select name="courseLanguage" required defaultValue="">
                <option value="" disabled>{t.select}</option>
                <option value="English">{t.english}</option>
                <option value="Arabic">{t.arabic}</option>
                <option value="Either / bilingual">{t.both}</option>
              </select>
            </label>
          </div>

          <label className={styles.field}>
            <span>{t.note}</span>
            <textarea name="note" rows={4} maxLength={1200} />
          </label>

          <div className={styles.formFooter}>
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? t.submitting : t.submit}
              <span aria-hidden="true">↗</span>
            </button>
            <p className={status === 'error' ? styles.formError : styles.formStatus} aria-live="polite">
              {status === 'success' ? t.success : status === 'error' ? t.error : ''}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
