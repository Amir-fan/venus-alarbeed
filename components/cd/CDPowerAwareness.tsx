'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './CDPowerAwareness.module.css';

interface Props {
  d: Dict;
}

export default function CDPowerAwareness({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-label="Conceptual contrast">
      <div className={`container ${styles.inner}`}>

        <div className={`drawing-rule ${styles.ruleTop}`} />

        <div className={styles.grid}>
          
          {/* Power */}
          <div className={styles.block}>
            <span className={`quiet-reveal reveal-delay-1 ${styles.label}`}>
              {isAr ? 'القوة' : 'POWER'}
            </span>
            <span className={`quiet-reveal reveal-delay-2 ${styles.sub}`}>
              {isAr ? 'لا تُرفض.' : 'not rejected.'}
            </span>
            <h3 className={`quiet-reveal reveal-delay-3 ${styles.statement}`}>
              {isAr ? 'تُفهم.' : 'UNDERSTOOD.'}
            </h3>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          {/* Influence */}
          <div className={styles.block}>
            <span className={`quiet-reveal reveal-delay-1 ${styles.label}`}>
              {isAr ? 'التأثير' : 'INFLUENCE'}
            </span>
            <span className={`quiet-reveal reveal-delay-2 ${styles.sub}`}>
              {isAr ? 'لا يُنزع.' : 'not removed.'}
            </span>
            <h3 className={`quiet-reveal reveal-delay-3 ${styles.statement}`}>
              {isAr ? 'يُمارس بوعي.' : 'EXERCISED CONSCIOUSLY.'}
            </h3>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          {/* Diplomacy */}
          <div className={styles.block}>
            <span className={`quiet-reveal reveal-delay-1 ${styles.label}`}>
              {isAr ? 'الدبلوماسية' : 'DIPLOMACY'}
            </span>
            <span className={`quiet-reveal reveal-delay-2 ${styles.sub}`}>
              {isAr ? 'لا تُخفف.' : 'not softened.'}
            </span>
            <h3 className={`quiet-reveal reveal-delay-3 ${styles.statement}`}>
              {isAr ? 'تُرى بشكل أكمل.' : 'SEEN MORE COMPLETELY.'}
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}
