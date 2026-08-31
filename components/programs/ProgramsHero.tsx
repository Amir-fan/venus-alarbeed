'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ProgramsHero.module.css';

interface Props {
  d: Dict;
}

export default function ProgramsHero({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.hero} aria-label={d.programs.label}>
      <div className={`container ${styles.inner}`}>

        {/* Top bar: label left, program count right */}
        <div className={styles.topBar}>
          <div className={`section-label quiet-reveal`}>
            <div className="dot" />
            <span>{d.programs.label}</span>
          </div>
          <span className={`quiet-reveal ${styles.count}`}>
            {isAr ? '٠٤ برامج' : '04 PROGRAMS'}
          </span>
        </div>

        {/* Full-width divider */}
        <div className={`drawing-rule quiet-reveal reveal-delay-1 ${styles.topRule}`} />

        {/* Main headline — two-line layout */}
        <h1 className={styles.headingWrap}>
          <span className={`mask-reveal-wrap ${styles.lineWrap}`}>
            <span className={`mask-reveal reveal-delay-1 ${styles.line}`}>
              {d.programs.heading}
            </span>
          </span>
        </h1>

        {/* Bottom row: body left, from/to label right */}
        <div className={styles.bottomRow}>
          <p className={`quiet-reveal reveal-delay-2 ${styles.body}`}>
            {d.programs.body}
          </p>
          <div className={`quiet-reveal reveal-delay-3 ${styles.fromTo}`}>
            <span className={styles.fromToLabel}>
              {isAr ? 'من الفهم' : 'FROM UNDERSTANDING'}
            </span>
            <span className={styles.fromToArrow} aria-hidden="true">↓</span>
            <span className={styles.fromToLabel}>
              {isAr ? 'إلى الممارسة' : 'TO PRACTICE'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
