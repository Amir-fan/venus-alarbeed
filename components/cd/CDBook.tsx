'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import { useState } from 'react';
import WaitlistModal from '@/components/ui/WaitlistModal';
import styles from './CDBook.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function CDBook({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-labelledby="cd-book-heading">
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.content}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'الإطار في شكل مكتوب' : 'THE FRAMEWORK IN WRITTEN FORM'}</span>
          </div>

          <h2 id="cd-book-heading" className={`${styles.title} quiet-reveal reveal-delay-1`}>
            {d.book.title}
          </h2>

          <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />

          <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
            {d.book.body}
          </p>

          <div className={`quiet-reveal reveal-delay-4 ${styles.actions}`}>
            <button onClick={() => setWaitlistOpen(true)} className="btn btn-outline">
              {d.book.ctaBuy}
            </button>
          </div>
        </div>

        <div className={`${styles.visual} quiet-reveal reveal-delay-2`}>
          {/* We will use a placeholder styling since there is no real image provided yet, but keep the standard book aspect ratio. */}
          <div className={styles.bookMockup}>
            <div className={styles.bookCover}>
              <span className={styles.bookTitle}>{d.book.title}</span>
              <span className={styles.bookAuthor}>{d.hero.nameFirst} {d.hero.nameLast}</span>
            </div>
          </div>
        </div>

      </div>

      <WaitlistModal 
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        d={d}
      />
    </section>
  );
}
