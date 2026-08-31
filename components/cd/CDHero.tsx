'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './CDHero.module.css';

interface Props {
  d: Dict;
}

export default function CDHero({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  
  // The heading in i18n has a newline. Split it to mask reveal each line.
  const headingLines = d.cd.heading.split('\n');

  return (
    <section ref={ref} className={styles.hero} aria-label={d.cd.label}>
      <div className={`container ${styles.inner}`}>
        
        <div className={`section-label quiet-reveal ${styles.labelTop}`}>
          <div className="dot" />
          <span>{d.cd.label}</span>
        </div>

        <h1 className={styles.headingWrap}>
          {headingLines.map((line, i) => (
            <span key={i} className={`mask-reveal-wrap ${styles.lineWrap}`}>
              <span className={`mask-reveal ${i === 0 ? 'reveal-delay-1' : 'reveal-delay-2'} ${styles.line}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className={`drawing-rule reveal-delay-3 ${styles.rule}`} />

        <p className={`quiet-reveal reveal-delay-4 ${styles.body}`}>
          {d.cd.body}
        </p>

      </div>
    </section>
  );
}
