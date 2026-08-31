'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './TheQuestion.module.css';

interface Props {
  d: Dict;
}

export default function TheQuestion({ d }: Props) {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="question" className={styles.section} aria-label="The Question">
      <div className={`container ${styles.inner}`} ref={ref}>
        <div className={`${styles.labelWrap} mask-reveal-wrap`}>
          <span className={`mask-reveal reveal-delay-1 ${styles.label}`}>
            THE QUESTION
          </span>
        </div>
        
        <h2 className={styles.questionWrap}>
          <span className={`${styles.questionMark} quiet-reveal`} aria-hidden="true">&ldquo;</span>
          <span className={`mask-reveal-wrap ${styles.textWrap}`}>
            <span className={`mask-reveal reveal-delay-2 ${styles.questionText}`}>
              {d.venus.question}
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
