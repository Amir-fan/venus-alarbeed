'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryTeaser.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

const libraryCategories = [
  { key: 'read' as const, items: ['articles', 'books', 'notes'] as const },
  { key: 'watch' as const, items: ['reels', 'films'] as const },
  { key: 'learn' as const, items: ['lectures'] as const },
];

export default function LibraryTeaser({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="library-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{d.library.label.toUpperCase()}</span>
          </div>
          <h2
            id="library-heading"
            className={`${styles.heading} quiet-reveal reveal-delay-1`}
          >
            Ideas worth entering.
          </h2>
        </div>

        {/* Purely typographic editorial layout */}
        <div className={`${styles.archive} quiet-reveal reveal-delay-2`}>
          <div className={`${styles.archiveItem} quiet-reveal reveal-delay-2`}>
            <span className={styles.archiveCategory}>{d.library.read.toUpperCase()}</span>
            <span className={styles.archiveItems}>{d.library.articles}, {d.library.books}, {d.library.notes}</span>
          </div>
          <div className={`drawing-rule reveal-delay-3 ${styles.rule}`} />
          
          <div className={`${styles.archiveItem} quiet-reveal reveal-delay-3`}>
            <span className={styles.archiveCategory}>{d.library.watch.toUpperCase()}</span>
            <span className={styles.archiveItems}>{d.library.reels}, {d.library.films}</span>
          </div>
          <div className={`drawing-rule reveal-delay-3 ${styles.rule}`} />
          
          <div className={`${styles.archiveItem} quiet-reveal reveal-delay-4`}>
            <span className={styles.archiveCategory}>{d.library.learn.toUpperCase()}</span>
            <span className={styles.archiveItems}>{d.library.lectures}</span>
          </div>
        </div>

        <div className={`quiet-reveal reveal-delay-4`}>
          <Link href={`/${lang}/library`} className={`btn-text ${styles.cta}`}>
            ENTER THE LIBRARY →
          </Link>
        </div>
      </div>
    </section>
  );
}
