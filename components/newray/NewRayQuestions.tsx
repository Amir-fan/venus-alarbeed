'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './NewRayQuestions.module.css';

interface Props {
  d: Dict;
}

export default function NewRayQuestions({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  
  // We will format the themes from i18n into an exploratory question format
  const questions = d.newray.questions;

  return (
    <section ref={ref} className={styles.section} aria-label="Exploration">
      <div className={`container ${styles.inner}`}>

        <div className={styles.field}>
          
          <div className={`${styles.qBlock} ${styles.pos1} quiet-reveal reveal-delay-1`}>
            <span className={styles.qText}>{questions[0]}</span>
          </div>

          <div className={`${styles.qBlock} ${styles.pos2} quiet-reveal reveal-delay-2`}>
            <span className={styles.qText}>{questions[1]}</span>
          </div>

          <div className={`${styles.qBlock} ${styles.pos3} quiet-reveal reveal-delay-3`}>
            <span className={styles.qText}>{questions[2]}</span>
          </div>

          {questions[3] && (
            <div className={`${styles.qBlock} ${styles.pos4} quiet-reveal reveal-delay-4`}>
              <span className={styles.qText}>{questions[3]}</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
