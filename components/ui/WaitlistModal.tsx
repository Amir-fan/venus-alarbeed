'use client';

import { useState, useEffect } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import Spinner from './Spinner';
import styles from './WaitlistModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  d: Dict;
}

export default function WaitlistModal({ isOpen, onClose, d }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Trap body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, reason: 'Waitlist Registration', message: `Phone: ${form.phone || 'Not provided'}` }),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={d.waitlist.heading}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {status === 'sent' ? (
          <div className={styles.success}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.successIcon}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p className={styles.successText}>{d.waitlist.success}</p>
          </div>
        ) : (
          <>
            <p className={styles.label}>{d.library.books}</p>
            <h2 className={styles.heading}>{d.waitlist.heading}</h2>
            <p className={styles.body}>{d.waitlist.body}</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                className={styles.input}
                placeholder={d.waitlist.namePlaceholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                aria-label={d.waitlist.namePlaceholder}
              />
              <input
                type="email"
                className={styles.input}
                placeholder={d.waitlist.emailPlaceholder}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                aria-label={d.waitlist.emailPlaceholder}
              />
              <input
                type="tel"
                className={styles.input}
                placeholder={d.waitlist.phonePlaceholder}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                aria-label={d.waitlist.phonePlaceholder}
              />
              <button
                type="submit"
                className={`btn btn-ghost ${styles.submit}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? <Spinner /> : d.waitlist.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
