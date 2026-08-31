'use client';

import { useState } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import CustomSelect from '@/components/ui/CustomSelect';
import Spinner from '@/components/ui/Spinner';
import styles from './ContactSection.module.css';

interface Props {
  d: Dict;
}

export default function ContactSection({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );

  const personalSocial = [
    { label: 'Instagram', href: 'https://www.instagram.com/venus.alarbeed', icon: InstagramIcon },
    { label: 'Facebook', href: 'https://www.facebook.com/venus.alarbeed', icon: FacebookIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/venus-alarbeed', icon: LinkedInIcon },
  ];

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={`container ${styles.inner}`}>

        <div className={styles.left}>
          <div className="section-label quiet-reveal">
            <div className={styles.dot} />
            <span className={styles.sLabel}>{d.contact.label}</span>
          </div>

          <h2
            id="contact-heading"
            className={`${styles.heading} quiet-reveal reveal-delay-1`}
          >
            {d.contact.heading}
          </h2>

          <ul className={`${styles.reasons} quiet-reveal reveal-delay-2`}>
            {d.contact.reasons.map((r) => (
              <li key={r} className={styles.reason}>{r}</li>
            ))}
          </ul>

          <div className={`${styles.directLinks} quiet-reveal reveal-delay-3`}>
            <p className={styles.orText}>{d.contact.or}</p>
            <a
              href="https://wa.me/963936404719"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-ghost-light ${styles.waBtn}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.79L2.05 22l5.5-1.29c1.36.73 2.9 1.15 4.54 1.15h.01c5.45 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm.01 18.11c-1.49 0-2.87-.4-4.07-1.09l-.29-.17-2.99.7.76-2.93-.19-.3a7.85 7.85 0 01-1.22-4.29c0-4.35 3.55-7.89 7.91-7.89 4.35 0 7.89 3.54 7.89 7.89 0 4.35-3.54 7.89-7.89 7.89z"/>
              </svg>
              {d.contact.whatsapp}
            </a>

            <div className={styles.socialRow}>
              {personalSocial.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {status === 'sent' ? (
            <div className={styles.successMsg}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.successIcon}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p className={styles.successText}>{d.contact.success}</p>
            </div>
          ) : (
            <form
              className={`${styles.form} quiet-reveal reveal-delay-2`}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.field}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={d.contact.namePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  aria-label={d.contact.namePlaceholder}
                />
              </div>
              <div className={styles.field}>
                <input
                  type="email"
                  className={styles.input}
                  placeholder={d.contact.emailPlaceholder}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  aria-label={d.contact.emailPlaceholder}
                />
              </div>
              <div className={styles.field}>
                <CustomSelect
                  options={d.contact.reasons.map(r => ({ value: r, label: r }))}
                  value={form.reason}
                  onChange={(val) => setForm({ ...form, reason: val })}
                  placeholder={d.contact.reasonPlaceholder}
                  theme="dark"
                  required
                />
              </div>
              <div className={styles.field}>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder={d.contact.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  aria-label={d.contact.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className={`btn btn-ghost-light ${styles.submitBtn}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? <Spinner /> : d.contact.submit}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
