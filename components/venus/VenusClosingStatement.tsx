'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './VenusClosingStatement.module.css';

interface Props {
  d: Dict;
}

export default function VenusClosingStatement({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-label="Closing statement">
      <div className={`container ${styles.inner}`}>

        <div className={`mask-reveal-wrap ${styles.labelWrap}`}>
          <span className={`mask-reveal ${styles.label}`}>
            {isAr ? 'جوهر الرؤية' : 'THE CORE'}
          </span>
        </div>

        <blockquote className={styles.statement}>
          <span className={`mask-reveal-wrap ${styles.lineWrap}`}>
            <span className={`mask-reveal reveal-delay-1 ${styles.line}`}>
              {isAr ? 'هي لا ترفض السلطة.' : 'She does not reject power.'}
            </span>
          </span>
          <span className={`mask-reveal-wrap ${styles.lineWrap}`}>
            <span className={`mask-reveal reveal-delay-2 ${styles.line}`}>
              {isAr ? 'هي لا تبتعد عن الدبلوماسية.' : 'She does not retreat from diplomacy.'}
            </span>
          </span>
          <span className={`mask-reveal-wrap ${styles.lineWrap}`}>
            <span className={`mask-reveal reveal-delay-3 ${styles.lineAccent}`}>
              {isAr
                ? 'هي تسأل: أي نوع من الإنسان يمارسهما؟'
                : 'She asks: what kind of human being is exercising them?'}
            </span>
          </span>
        </blockquote>

        <div className={`drawing-rule reveal-delay-4 ${styles.rule}`} />

        <p className={`quiet-reveal reveal-delay-5 ${styles.pillars}`} aria-hidden="true">
          {isAr
            ? 'القوة · الوعي · الإنسانية'
            : 'POWER · AWARENESS · HUMANITY'}
        </p>

      </div>
    </section>
  );
}
