'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryHero.module.css';

interface Props {
  d: Dict;
}

export default function LibraryHero({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section ref={ref} className={styles.hero} aria-label={d.library.label}>
      <div className={`container ${styles.inner}`}>
        
        {/* Top bar: label left */}
        <div className={styles.topBar}>
          <div className={`section-label quiet-reveal`}>
            <div className="dot" />
            <span>{d.library.label}</span>
          </div>
        </div>

        {/* Full-width divider */}
        <div className={`drawing-rule quiet-reveal reveal-delay-1 ${styles.topRule}`} />

        {/* Headline */}
        <h1 className={styles.headingWrap}>
          <span className={`mask-reveal-wrap ${styles.lineWrap}`}>
            <span className={`mask-reveal reveal-delay-1 ${styles.line}`}>
              {d.library.heading}
            </span>
          </span>
        </h1>

        {/* Body text aligned below headline */}
        <div className={styles.bottomRow}>
          <p className={`quiet-reveal reveal-delay-2 ${styles.body}`}>
            {d.library.body}
          </p>
        </div>

      </div>
    </section>
  );
}
