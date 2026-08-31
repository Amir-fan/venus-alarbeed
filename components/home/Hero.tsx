'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale, Dict } from '@/lib/i18n';
import styles from './Hero.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function Hero({ lang, d }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Subtle background geometry */}
      <div className={styles.geometry} aria-hidden="true">
        <div className={styles.geoLine1} />
        <div className={styles.geoLine2} />
        <div className={styles.geoCircle} />
      </div>

      <div className={styles.inner}>
        {/* Portrait */}
        <div className={`${styles.portrait} ${mounted ? styles.visible : ''}`} aria-hidden="true">
          <div className={styles.portraitPlaceholder}>
            <Image
              src="/venus_portrait.png"
              alt="Venus Alarbeed Portrait"
              fill
              className={styles.portraitImg}
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className={`${styles.content} ${mounted ? styles.visible : ''}`}>
          <div className={styles.taglineWrap}>
            <span className={`t-label ${styles.tagline}`}>{d.hero.tagline}</span>
          </div>

          <h1 className={`${styles.name} ${mounted ? styles.nameVisible : ''}`}>
            {d.hero.nameFirst}
            <br />
            {d.hero.nameLast}
          </h1>

          <p className={styles.statement}>{d.hero.statement}</p>

          <div className={styles.cta}>
            <Link href={`/${lang}/conscious-diplomacy`} className={`btn btn-ghost ${styles.ctaBtn}`}>
              {d.hero.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollIndicator} ${mounted ? styles.scrollVisible : ''}`} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
