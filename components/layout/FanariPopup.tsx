'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '@/lib/i18n';
import styles from './FanariPopup.module.css';

interface Props {
  lang: Locale;
  isOpen: boolean;
  onClose: () => void;
}

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function FanariPopup({ lang, isOpen, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const contacts = [
    {
      label: 'fanarilabs.com',
      href: 'https://fanarilabs.com',
      icon: GlobeIcon,
      external: true,
      aria: isAr ? 'زيارة موقع فناري لابس' : 'Visit the Fanari Labs website',
    },
    {
      label: '+90 537 929 51 63',
      href: 'https://wa.me/905379295163',
      icon: PhoneIcon,
      external: true,
      aria: isAr ? 'تواصل مع فناري لابس عبر واتساب' : 'Contact Fanari Labs on WhatsApp',
    },
    {
      label: 'fanarilabs@gmail.com',
      href: 'mailto:fanarilabs@gmail.com',
      icon: MailIcon,
      external: false,
      aria: isAr ? 'راسل فناري لابس عبر البريد الإلكتروني' : 'Email Fanari Labs',
    },
  ];

  return createPortal(
    <div className={styles.overlay} onMouseDown={onClose}>
      <section
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fanari-title"
        dir={isAr ? 'rtl' : 'ltr'}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />

        <button
          ref={closeRef}
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.logo} aria-label="Fanari Labs">
            fanari<span>labs</span>
          </div>
          <h2 id="fanari-title" className={styles.title}>
            {isAr ? 'نصنع حضوراً رقمياً يُذكر.' : 'Digital work made to be remembered.'}
          </h2>
          <p className={styles.body}>
            {isAr
              ? 'نبني مواقع إلكترونية مخصصة ومتقنة، وحلول ذكاء اصطناعي وأتمتة مصممة حول احتياجات عملك.'
              : 'We build custom websites, AI systems, and automation designed around real business needs.'}
          </p>

          <div className={styles.contacts}>
            {contacts.map(({ label, href, icon: Icon, external, aria }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={styles.contactCard}
                aria-label={aria}
              >
                <span className={styles.contactText} dir="ltr">{label}</span>
                <span className={styles.contactIcon}><Icon /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
