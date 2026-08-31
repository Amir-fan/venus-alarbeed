'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryBook.module.css';

interface Props {
  d: Dict;
}

export default function LibraryBook({ d }: Props) {
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
            <button className={styles.cta}>
              {d.book.ctaExplore}
            </button>
            <span className={styles.divider}>/</span>
            <button className={styles.cta}>
              {d.book.ctaBuy} <span className={styles.arrow} aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Empty space ready for book cover art */}
        <div className={`quiet-reveal reveal-delay-2 ${styles.visual}`}>
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              {isAr ? 'الغلاف قريباً' : 'COVER PREVIEW'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
