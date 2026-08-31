'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './CDSystem.module.css';

interface Props {
  d: Dict;
}

export default function CDSystem({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';
  const caps = d.cd.capabilities;

  // Synthesis text (using the approved concept)
  const synthesis = isAr ? [
    'الحضور يؤثر على الإدراك.',
    'الإدراك يؤثر على الثبات.',
    'الثبات يشكل التعبير.',
    'التعبير يدخل في التفاوض.',
    'التفاوض يؤثر على التمثيل.',
    'التمثيل يتطلب النزاهة.'
  ] : [
    'Presence influences perception.',
    'Perception affects composure.',
    'Composure shapes expression.',
    'Expression enters negotiation.',
    'Negotiation affects representation.',
    'Representation requires integrity.'
  ];

  return (
    <section ref={ref} className={styles.section} aria-label="System Connection">
      <div className={`container ${styles.inner}`}>

        <div className={`section-label quiet-reveal ${styles.labelTop}`}>
          <div className="dot" />
          <span>{isAr ? 'النظام المتصل' : 'THE SYSTEM IS CONNECTED'}</span>
        </div>

        <div className={styles.chain}>
          {caps.map((cap, i) => (
            <div key={cap} className={styles.chainLink}>
              
              <h3 className={`quiet-reveal reveal-delay-${Math.min(i + 1, 5)} ${styles.capName}`}>
                {cap}
              </h3>

              {i < caps.length - 1 && (
                <div className={styles.connectorBlock}>
                  <div className={styles.connectorLine} aria-hidden="true" />
                  <p className={`quiet-reveal reveal-delay-${Math.min(i + 2, 5)} ${styles.synthesisText}`}>
                    {synthesis[i]}
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
