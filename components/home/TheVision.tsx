'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './TheVision.module.css';

interface Props {
  d: Dict;
}

export default function TheVision({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="vision-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className="section-label reveal">
            <div className="dot" />
            <span>{d.vision.label}</span>
          </div>
          <h2
            id="vision-heading"
            className={`${styles.heading} reveal reveal-delay-1`}
          >
            {d.vision.heading}
          </h2>
        </div>

        <div className={styles.body}>
          <div className={`${styles.pillars} reveal reveal-delay-2`} aria-label="Core pillars">
            {d.vision.pillars.map((pillar, i) => (
              <div key={pillar} className={styles.pillar} style={{ '--pi': i } as React.CSSProperties}>
                <span className={styles.pillarNumber}>0{i + 1}</span>
                <span className={styles.pillarName}>{pillar}</span>
              </div>
            ))}
          </div>

          <div className={`${styles.statements} reveal reveal-delay-3`}>
            <p className={styles.statement}>{d.vision.body1}</p>
            <p className={styles.statement}>{d.vision.body2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
