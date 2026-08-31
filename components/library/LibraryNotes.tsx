'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryNotes.module.css';

interface Props {
  d: Dict;
}

export default function LibraryNotes({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-label={d.notes.label}>
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.header}>
          <h2 className={`quiet-reveal ${styles.title}`}>{d.notes.label}</h2>
          <p className={`quiet-reveal reveal-delay-1 ${styles.desc}`}>
            {d.notes.heading}
          </p>
        </div>

        <div className={styles.list}>
          {d.notes.sampleNotes.map((note, i) => {
            const noteIsAr = note.lang === 'ar';
            return (
              <div 
                key={i} 
                className={`${styles.noteRow} quiet-reveal reveal-delay-${Math.min(i + 2, 5)}`}
              >
                <div className={styles.noteMeta}>
                  <span className={styles.noteNum}>
                    {isAr ? 'ملاحظة' : 'NOTE'} {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={styles.noteContent} dir={noteIsAr ? 'rtl' : 'ltr'}>
                  <p className={`${styles.noteText} ${noteIsAr ? styles.arText : ''}`}>
                    &ldquo;{note.text}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
