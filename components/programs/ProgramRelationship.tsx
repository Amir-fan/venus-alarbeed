'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ProgramRelationship.module.css';

interface Props {
  d: Dict;
}

export default function ProgramRelationship({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';
  const programs = d.programs.list;

  // Classifier phrases derived from the existing tags — no invented content
  const classifiers = isAr
    ? ['الأساس', 'الحدود', 'الإنسان', 'التطبيق']
    : ['THE CORE', 'THE FRONTIER', 'THE HUMAN', 'THE PRACTICE'];

  return (
    <section ref={ref} className={styles.section} aria-label="How programs relate">
      <div className={`container ${styles.inner}`}>

        <div className={`section-label quiet-reveal ${styles.label}`}>
          <div className="dot" />
          <span>{isAr ? 'برنامج واحد من أربعة' : 'ONE BODY OF THOUGHT'}</span>
        </div>

        <div className={styles.grid}>
          {programs.map((prog, i) => (
            <div
              key={prog.title}
              className={`${styles.item} quiet-reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <span className={styles.itemClassifier}>{classifiers[i]}</span>
              <div className={styles.itemRule} />
              <h3 className={styles.itemTitle}>{prog.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
