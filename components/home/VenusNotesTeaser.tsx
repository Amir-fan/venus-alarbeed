'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './VenusNotesTeaser.module.css';

interface Props {
  d: Dict;
}

export default function VenusNotesTeaser({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const notes = d.notes.sampleNotes;

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="notes-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className="section-label reveal">
            <div className="dot" />
            <span>{d.notes.label}</span>
          </div>
          <p className={`${styles.subtitle} reveal reveal-delay-1`}>
            {d.notes.heading}
          </p>
        </div>

        {/* Notes as editorial quote objects */}
        <div className={styles.notes}>
          {notes.map((note, i) => (
            <article
              key={i}
              className={`${styles.note} ${i === 1 ? styles.noteDark : i === 2 ? styles.noteMid : styles.noteLight} reveal`}
              style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
              lang={note.lang}
              dir={note.lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className={styles.noteBar} aria-hidden="true" />
              <p className={styles.noteText}>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
