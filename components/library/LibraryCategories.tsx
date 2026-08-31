'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryCategories.module.css';

interface Props {
  d: Dict;
}

export default function LibraryCategories({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  const sections = [
    {
      label: d.library.read,
      items: [d.library.articles, d.library.books, d.library.notes],
    },
    {
      label: d.library.watch,
      items: [d.library.films, d.library.reels],
    },
    {
      label: d.library.learn,
      items: [d.library.lectures],
    },
  ];

  return (
    <section ref={ref} className={styles.section} aria-label="Library Categories">
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {sections.map((section, i) => (
            <div
              key={section.label}
              className={`${styles.category} quiet-reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <h2 className={styles.catLabel}>{section.label}</h2>
              <div className={styles.catRule} />
              
              <ul className={styles.itemList}>
                {section.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <button className={styles.itemBtn}>
                      <span className={styles.itemText}>{item}</span>
                      <span className={styles.itemArrow} aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
