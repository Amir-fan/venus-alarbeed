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
          <div className="section-label reveal">
            <div className="dot" />
            <span>{d.library.label}</span>
          </div>
          <h2
            id="library-heading"
            className={`${styles.heading} reveal reveal-delay-1`}
          >
            {d.library.heading}
          </h2>
          <p className={`t-body ${styles.body} reveal reveal-delay-2`}>
            {d.library.body}
          </p>
        </div>

        {/* Archive-like layout — not generic cards */}
        <div className={`${styles.archive} reveal reveal-delay-2`}>
          {libraryCategories.map(({ key, items }) => (
            <div key={key} className={styles.archiveRow}>
              <span className={styles.archiveCategory}>
                {d.library[key]}
              </span>
              <div className={styles.archiveItems}>
                {items.map((item) => (
                  <Link
                    key={item}
                    href={`/${lang}/library/${item}`}
                    className={styles.archiveItem}
                  >
                    {d.library[item]}
                    <span className={styles.archiveArrow} aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`reveal reveal-delay-3`}>
          <Link href={`/${lang}/library`} className={`btn btn-ghost ${styles.cta}`}>
            {d.library.exploreLibrary}
          </Link>
        </div>
      </div>
    </section>
  );
}
