'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ProgramWaitlist.module.css';

interface Props {
  d: Dict;
  onWaitlist: () => void;
}

export default function ProgramWaitlist({ d, onWaitlist }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-labelledby="waitlist-heading">
      <div className={`container ${styles.inner}`}>

        <div className={`drawing-rule quiet-reveal ${styles.ruleTop}`} />

        <div className={styles.content}>
          <h2
            id="waitlist-heading"
            className={`quiet-reveal reveal-delay-1 ${styles.heading}`}
          >
            {d.waitlist.heading}
          </h2>

          <p className={`quiet-reveal reveal-delay-2 ${styles.body}`}>
            {d.waitlist.body}
          </p>

          <button
            onClick={onWaitlist}
            className={`quiet-reveal reveal-delay-3 ${styles.cta}`}
            aria-label={d.waitlist.submit}
          >
            <span>{d.waitlist.submit}</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
