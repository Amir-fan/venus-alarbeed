'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './VenusThoughtProgression.module.css';

interface Props {
  d: Dict;
}

const steps = [
  {
    label: 'DIPLOMACY',
    labelAr: 'الدبلوماسية',
    descriptor: 'What happens in the room?',
    descriptorAr: 'ماذا يحدث في الغرفة؟',
  },
  {
    label: 'POWER',
    labelAr: 'القوة',
    descriptor: 'What shapes the room?',
    descriptorAr: 'ما الذي يشكّل الغرفة؟',
  },
  {
    label: 'THE HUMAN',
    labelAr: 'الإنسان',
    descriptor: 'Who enters the room?',
    descriptorAr: 'من يدخل الغرفة؟',
  },
  {
    label: 'AWARENESS',
    labelAr: 'الوعي',
    descriptor: 'What remains unseen?',
    descriptorAr: 'ما الذي يبقى مخفياً؟',
  },
  {
    label: 'CONSCIOUS DIPLOMACY',
    labelAr: 'الدبلوماسية الواعية',
    descriptor: 'What changes when we see differently?',
    descriptorAr: 'ماذا يتغير حين نرى بشكل مختلف؟',
  },
];

export default function VenusThoughtProgression({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-labelledby="thought-heading">
      <div className={`container ${styles.inner}`}>

        <div className={styles.header}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'تطور الفكر' : 'THE EVOLUTION OF THE THINKING'}</span>
          </div>
          <h2 id="thought-heading" className={`${styles.heading} quiet-reveal reveal-delay-1`}>
            {isAr
              ? 'هذه المشاريع لم تظهر بشكل عشوائي.'
              : 'These directions did not appear by accident.'}
          </h2>
          <p className={`${styles.subhead} quiet-reveal reveal-delay-2`}>
            {isAr
              ? 'نمت من أسئلة واجهتها فينوس عبر عملها وتفكيرها.'
              : 'They grew from questions Venus encountered through her work and thinking.'}
          </p>
        </div>

        <div className={styles.progressionWrap}>
          {steps.map((step, i) => (
            <div key={step.label} className={styles.step}>
              <div className={`drawing-rule reveal-delay-${Math.min(i + 1, 5)} ${styles.rule}`} />
              <div className={`${styles.stepContent} quiet-reveal reveal-delay-${Math.min(i + 2, 5)}`}>
                <div className={styles.stepLeft}>
                  <span className={styles.stepNum}>0{i + 1}</span>
                  <h3 className={styles.stepLabel}>
                    {isAr ? step.labelAr : step.label}
                  </h3>
                </div>
                <p className={styles.stepDescriptor}>
                  {isAr ? step.descriptorAr : step.descriptor}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true">↓</div>
              )}
            </div>
          ))}
          <div className={`drawing-rule ${styles.rule}`} />
        </div>

      </div>
    </section>
  );
}
