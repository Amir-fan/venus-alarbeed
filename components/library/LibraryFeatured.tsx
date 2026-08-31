'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryFeatured.module.css';

interface Props {
  d: Dict;
}

export default function LibraryFeatured({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  // We are using real data from the notes section as the featured item,
  // to avoid fabricating content. When more content is available, this 
  // array can simply be expanded.
  const featuredItems = [
    {
      category: isAr ? 'ملاحظة فينوس' : 'VENUS NOTE',
      title: isAr ? 'تأمل في الحضور' : 'A reflection on presence',
      date: isAr ? '٢٠٢٤' : '2024', // Safe minimal date placeholder
      preview: d.notes.sampleNotes[0].text
    }
  ];

  return (
    <section ref={ref} className={styles.section} aria-label="Featured Content">
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.header}>
          <span className={styles.headerLabel}>
            {isAr ? 'المحتوى المميز / الأرشيف' : 'FEATURED / ARCHIVE'}
          </span>
          <div className={styles.headerRule} />
        </div>

        <div className={styles.list}>
          {featuredItems.map((item, i) => (
            <div 
              key={i} 
              className={`${styles.row} quiet-reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className={styles.colMeta}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.category}>{item.category}</span>
              </div>
              
              <div className={styles.colTitle}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.preview}>{item.preview}</p>
              </div>

              <div className={styles.colDate}>
                <span className={styles.date}>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
