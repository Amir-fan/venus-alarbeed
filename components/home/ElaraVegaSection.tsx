'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ElaraVegaSection.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ElaraVegaSection({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="elara-heading"
    >
      {/* Atmospheric geometry */}
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.atmCircle1} />
        <div className={styles.atmCircle2} />
        <div className={styles.atmLine} />
      </div>

      <div className={`container ${styles.inner}`}>

        <div className={styles.top}>
          <div className="section-label reveal">
            <div className={styles.goldDot} />
            <span className={styles.sectionLabel}>{d.elara.label}</span>
          </div>
          <p className={`${styles.subtitle} reveal reveal-delay-1`}>{d.elara.subtitle}</p>
        </div>

        <h2
          id="elara-heading"
          className={`${styles.heading} reveal reveal-delay-1`}
        >
          {d.elara.heading}
        </h2>

        <div className={styles.layout}>
          {/* Left: body + transitions */}
          <div className={styles.left}>
            <p className={`${styles.body} reveal reveal-delay-2`}>{d.elara.body}</p>

            <div className={`${styles.transitions} reveal reveal-delay-3`}>
              {d.elara.transitions.map(({ from, to }, i) => (
                <div key={i} className={styles.transition}>
                  <span className={styles.transFrom}>{from}</span>
                  <span className={styles.transArrow} aria-hidden="true">→</span>
                  <span className={styles.transTo}>{to}</span>
                </div>
              ))}
            </div>

            <div className={`reveal reveal-delay-4`}>
              <Link href={`/${lang}/elara-vega`} className={`btn btn-ghost-light ${styles.cta}`}>
                {d.elara.cta}
              </Link>
            </div>
          </div>

          {/* Right: journey stages */}
          <div className={styles.stages}>
            {d.elara.stages.map((stage, i) => (
              <div
                key={stage}
                className={`${styles.stage} reveal`}
                style={{ transitionDelay: `${200 + i * 70}ms` } as React.CSSProperties}
              >
                <span className={styles.stageNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={styles.stageContent}>
                  <span className={styles.stageName}>{stage}</span>
                  <p className={styles.stageDesc}>{d.elara.stageDesc[i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
