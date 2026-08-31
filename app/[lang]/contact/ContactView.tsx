'use client';

import { useState } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import CustomSelect from '@/components/ui/CustomSelect';
import styles from './page.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ContactView({ lang, d }: Props) {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const isAr = d.hero.nameFirst === 'فينوس';

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
      
      {/* LEFT COLUMN - IVORY */}
      <div className={styles.leftCol}>
        <div className={styles.leftInner}>
          
          <div className={styles.header}>
            <div className={`section-label ${styles.label}`}>
              <div className="dot" />
              <span>{d.contact.label}</span>
            </div>
            <h1 className={styles.heading}>{d.contact.heading}</h1>
            <p className={styles.bodyText}>
              {isAr 
                ? 'نحن نرحب بالتواصل للحديث أو التدريب أو التعاون.' 
                : 'We welcome contact for speaking, training, or collaborations.'}
            </p>
          </div>

          <div className={styles.directSection}>
            <p className={styles.directEyebrow}>{d.contact.or}</p>
            
            <a href="mailto:venus.alarbeed.support@gmail.com" className={styles.directLink}>
              <span>venus.alarbeed.support@gmail.com</span>
              <span className={styles.waArrow}>↗</span>
            </a>

            <div className={styles.directRow}>
              <a href="https://wa.me/" className={styles.directLink} target="_blank" rel="noopener noreferrer">
                <span>{d.contact.whatsapp}</span>
                <span className={styles.waArrow}>↗</span>
              </a>
              <span className={styles.directDivider}>/</span>
              <span className={styles.directNumber}>+971 50 123 4567</span>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN - NAVY */}
      <div className={styles.rightCol}>
        <div className={styles.rightInner}>
          
          {status === 'sent' ? (
            <div className={styles.success}>
              <h2 className={styles.successHeading}>
                {isAr ? 'تم استلام الرسالة' : 'MESSAGE RECEIVED'}
              </h2>
              <div className={styles.successRule} />
              <p className={styles.successText}>{d.contact.success}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{isAr ? 'اسمك' : 'YOUR NAME'}</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={d.contact.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <div className={styles.inputLine} />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{isAr ? 'بريدك الإلكتروني' : 'YOUR EMAIL'}</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder={d.contact.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <div className={styles.inputLine} />
                </div>
              </div>

              {/* The custom reason dropdown is back inside the form */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{isAr ? 'سبب التواصل' : 'REASON FOR CONTACT'}</label>
                <div className={styles.inputWrapper}>
                  <CustomSelect
                    options={reasonOptions}
                    value={form.reason}
                    onChange={(val) => setForm({ ...form, reason: val })}
                    placeholder={d.contact.reasonPlaceholder}
                    theme="dark"
                    required
                  />
                  <div className={styles.inputLine} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{isAr ? 'رسالتك' : 'YOUR MESSAGE'}</label>
                <div className={styles.inputWrapper}>
                  <textarea
                    className={styles.textarea}
                    placeholder={d.contact.messagePlaceholder}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                  />
                  <div className={styles.inputLine} />
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (isAr ? 'جاري الإرسال...' : 'SENDING...') : d.contact.submit}
                <span className={styles.submitArrow} aria-hidden="true">→</span>
              </button>
            </form>
          )}

        </div>
      </div>

      {/* GRACEFUL ENDING (ABOVE FOOTER) */}
      <div className={styles.ending}>
        <div className={styles.endingRule} />
        <p className={styles.endingText}>
          {isAr ? 'فينوس العربيد / طريقة مختلفة في الرؤية.' : 'VENUS ALARBEED / A DIFFERENT WAY OF SEEING.'}
        </p>
      </div>

    </div>
  );
}
