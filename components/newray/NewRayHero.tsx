'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './NewRayHero.module.css';

interface Props {
  d: Dict;
}

export default function NewRayHero({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  
  return (
    <section ref={ref} className={styles.hero} aria-label={d.newray.label}>
      <div className={`container ${styles.inner}`}>
        
        <div className={`section-label quiet-reveal ${styles.labelTop}`}>
          <div className="dot" />
          <span>{d.newray.label}</span>
        </div>

        <h1 className={styles.headingWrap}>
          <span className={`mask-reveal-wrap ${styles.lineWrap}`}>
            <span className={`mask-reveal reveal-delay-1 ${styles.line}`}>
              {d.newray.heading}
            </span>
          </span>
        </h1>

        <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />

        <div className={styles.bodyWrap}>
          <p className={`quiet-reveal reveal-delay-3 ${styles.body}`}>
            {d.newray.body}
          </p>
        </div>

      </div>
    </section>
  );
}
