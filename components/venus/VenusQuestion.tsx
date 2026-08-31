'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './VenusQuestion.module.css';

interface Props {
  d: Dict;
}

export default function VenusQuestion({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section ref={ref} className={styles.section} aria-label="The central question">
      <div className={`container ${styles.inner}`}>
        <div className={`mask-reveal-wrap ${styles.labelWrap}`}>
          <span className={`mask-reveal ${styles.label}`}>{d.venus.questionLabel || 'THE QUESTION'}</span>
        </div>
        <h2 className={styles.questionWrap}>
          <span className={`mask-reveal-wrap ${styles.textWrap}`}>
            <span className={`mask-reveal reveal-delay-2 ${styles.questionText}`}>
              {d.venus.question}
            </span>
          </span>
        </h2>
        <div className={`drawing-rule reveal-delay-3 ${styles.rule}`} />
        <p className={`quiet-reveal reveal-delay-4 ${styles.attribution}`}>
          — The question that became the work
        </p>
      </div>
    </section>
  );
}
