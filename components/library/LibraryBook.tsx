'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Dict, Locale } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import englishCover from '@/public/conscious-diplomacy-en-cover.jpg';
import arabicCover from '@/public/conscious-diplomacy-ar-cover.jpg';
import styles from './LibraryBook.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function LibraryBook({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-label="Book Feature">
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.content}>
          <div className={`section-label quiet-reveal ${styles.label}`}>
            <div className="dot" />
            <span>{d.book.label}</span>
          </div>

          <h2 className={`quiet-reveal reveal-delay-1 ${styles.title}`}>
            {d.book.title}
          </h2>

          <div className={`drawing-rule quiet-reveal reveal-delay-2 ${styles.rule}`} />

          <p className={`quiet-reveal reveal-delay-3 ${styles.body}`}>
            {d.book.body}
          </p>

          <div className={`quiet-reveal reveal-delay-4 ${styles.actions}`}>
            <Link href={`/${lang}/conscious-diplomacy`} className={styles.cta}>
              {d.book.ctaExplore}
            </Link>
            <span className={styles.divider}>/</span>
            <Link href={`/${lang}/book`} className={styles.cta}>
              {d.book.ctaBuy} <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={`quiet-reveal reveal-delay-2 ${styles.visual}`}>
          <Image
            src={isAr ? arabicCover : englishCover}
            alt={d.book.title}
            className={styles.cover}
            sizes="(max-width: 767px) 75vw, 400px"
          />
        </div>

      </div>
    </section>
  );
}
