'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import FanariPopup from './FanariPopup';
import styles from './Footer.module.css';

interface Props {
  lang: Locale;
}

export default function DevTag({ lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isAr = lang === 'ar';

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={styles.devTag}
        aria-haspopup="dialog"
        aria-label={isAr ? 'تواصل مع مطوّر الموقع، فناري لابس' : 'Contact the website developer, Fanari Labs'}
      >
        <span className={styles.devTagPulse} aria-hidden="true" />
        <span className={styles.devTagLabel}>
          {isAr ? 'طُوّر بواسطة' : 'Developed by'}{' '}
          <span className={styles.devTagBrand}>{isAr ? 'فناري لابس' : 'Fanari Labs'}</span>
          <span className={styles.devTagDivider} aria-hidden="true" />
          <span>{isAr ? 'اضغط للتواصل' : 'Click to contact'}</span>
        </span>
        <span className={styles.devTagArrow} aria-hidden="true">↗</span>
      </button>
      <FanariPopup lang={lang} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
