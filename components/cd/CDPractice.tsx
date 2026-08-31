'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './CDPractice.module.css';

interface Props {
  d: Dict;
}

export default function CDPractice({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  const practices = isAr ? [
    { name: 'التفاوض', desc: 'حيث تلتقي المصالح والضغوط والإدراك.' },
    { name: 'التمثيل', desc: 'كيف يحمل المرء ليس فقط رسالة بل دوراً.' },
    { name: 'القيادة', desc: 'كيف يؤثر الحضور على الغرفة قبل أن تبدأ الكلمات.' }
  ] : [
    { name: 'NEGOTIATION', desc: 'Where interests, pressure and perception meet.' },
    { name: 'REPRESENTATION', desc: 'How one carries not only a message but a role.' },
    { name: 'LEADERSHIP', desc: 'How presence affects the room before language begins.' }
  ];

  return (
    <section ref={ref} className={styles.section} aria-label="The Practice">
      <div className={`container ${styles.inner}`}>

        <div className={styles.header}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'الممارسة' : 'THE PRACTICE'}</span>
          </div>
          <h2 className={`${styles.heading} quiet-reveal reveal-delay-1`}>
            {isAr ? 'أين يهم هذا؟' : 'Where does this matter?'}
          </h2>
        </div>

        <div className={styles.list}>
          {practices.map((p, i) => (
            <div key={p.name} className={`${styles.item} quiet-reveal reveal-delay-${Math.min(i + 2, 5)}`}>
              <div className={styles.itemName}>
                <span className={styles.itemNum}>0{i + 1}</span>
                <h3>{p.name}</h3>
              </div>
              <p className={styles.itemDesc}>{p.desc}</p>
              <div className={styles.itemRule} aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
