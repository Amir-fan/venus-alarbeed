'use client';

import { useState } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import WaitlistModal from '@/components/ui/WaitlistModal';
import styles from './TheBook.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function TheBook({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section
        ref={ref}
        className={`${styles.section} section`}
        aria-labelledby="book-heading"
      >
        <div className={`container ${styles.inner}`}>

          {/* Book object */}
          <div className={`${styles.bookObject} reveal`} aria-hidden="true">
            <div className={styles.bookCover}>
              <div className={styles.bookSpine} />
              <div className={styles.bookFace}>
                <span className={styles.bookTitleArt}>{d.book.title.split(' ')[0]}</span>
                <span className={styles.bookTitleArt2}>{d.book.title.split(' ')[1] || ''}</span>
                <span className={styles.bookAuthor}>{d.hero.nameFirst} {d.hero.nameLast}</span>
              </div>
            </div>
            <div className={styles.bookShadow} />
          </div>

          {/* Book content */}
          <div className={styles.content}>
            <div className="section-label quiet-reveal">
              <div className="dot" />
              <span>{d.book.label}</span>
            </div>

            <h2
              id="book-heading"
              className={`${styles.heading} quiet-reveal reveal-delay-1`}
            >
              {d.book.title}
            </h2>

            <p className={`t-body ${styles.body} quiet-reveal reveal-delay-2`}>
              {d.book.body}
            </p>

            <div className={`${styles.actions} quiet-reveal reveal-delay-3`}>
              <button
                onClick={() => setWaitlistOpen(true)}
                className={`btn ${styles.buyBtn}`}
              >
                {d.book.ctaBuy} →
              </button>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        d={d}
      />
    </>
  );
}
