'use client';

import { useState } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import CustomSelect from '@/components/ui/CustomSelect';
import Spinner from '@/components/ui/Spinner';
import styles from './page.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ContactView({ lang, d }: Props) {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const reasonOptions = d.contact.reasons.map(r => ({ value: r, label: r }));

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
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.infoCol}>
          <p className={styles.label}>{d.contact.label}</p>
          <h1 className={styles.heading}>{d.contact.heading}</h1>
          
          <div className={styles.reasonsBox}>
            {d.contact.reasons.map((r, i) => (
              <span key={i} className={styles.reasonTag}>{r}</span>
            ))}
          </div>

          <div className={styles.directContact}>
            <p className={styles.orText}>{d.contact.or}</p>
            <a href="https://wa.me/" className={styles.waLink} target="_blank" rel="noopener noreferrer">
              {d.contact.whatsapp} ↗
            </a>
          </div>
        </div>

        <div className={styles.formCol}>
          {status === 'sent' ? (
            <div className={styles.success}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.successIcon}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p className={styles.successText}>{d.contact.success}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={d.contact.namePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  className={styles.input}
                  placeholder={d.contact.emailPlaceholder}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <CustomSelect
                  options={reasonOptions}
                  value={form.reason}
                  onChange={(val) => setForm({ ...form, reason: val })}
                  placeholder={d.contact.reasonPlaceholder}
                  theme="dark"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  className={styles.textarea}
                  placeholder={d.contact.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
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
    </div>
  );
}
