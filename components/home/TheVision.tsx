'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import Iridescence from '@/components/ui/Iridescence';
import styles from './TheVision.module.css';

interface Props {
  d: Dict;
}

export default function TheVision({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="vision-heading"
    >
      {/* Iridescent Shader Background (Brand Gold Color) */}
      <div className={styles.shaderBg}>
        <Iridescence
          color={[0.788, 0.682, 0.447]} // Venus Gold 
          mouseReact={true}
          amplitude={0.05} // Subtle amplitude
          speed={0.5}      // Slow elegant speed
        />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{d.vision.label}</span>
          </div>
          <h2
            id="vision-heading"
            className={`${styles.heading} quiet-reveal reveal-delay-1`}
          >
            {d.vision.heading}
          </h2>
        </div>

        <div className={styles.body}>
          <div className={styles.pillars} aria-label="Core pillars">
            {d.vision.pillars.map((pillar, i) => (
              <div key={pillar} className={styles.pillarWrap}>
                <div className={`drawing-rule reveal-delay-${i + 1} ${styles.rule}`} />
                <div className={`${styles.pillar} quiet-reveal reveal-delay-${i + 2}`}>
                  <span className={styles.pillarNumber}>0{i + 1}</span>
                  <span className={styles.pillarName}>{pillar}</span>
                </div>
              </div>
            ))}
            <div className={`drawing-rule reveal-delay-5 ${styles.rule}`} />
          </div>

          <div className={`${styles.statements} quiet-reveal reveal-delay-3`}>
            <p className={styles.statement}>{d.vision.body1}</p>
            <p className={styles.statement}>{d.vision.body2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
