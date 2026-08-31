'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ConsciousDiplomacySection.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ConsciousDiplomacySection({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="cd-heading"
    >
      <div className={`container ${styles.inner}`}>

        {/* Header */}
        <div className={styles.header}>
          <div className="section-label reveal">
            <div className="dot" />
            <span>{d.cd.label}</span>
          </div>

          <h2
            id="cd-heading"
            className={`${styles.heading} reveal reveal-delay-1`}
          >
            {d.cd.heading.split('\n').map((line, i) => (
              <span key={i} className={i === 1 ? styles.headingAccent : ''}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>

          <p className={`t-body ${styles.body} reveal reveal-delay-2`}>
            {d.cd.body}
          </p>
        </div>

        {/* Questions block */}
        <div className={`${styles.questions} reveal reveal-delay-2`}>
          <p className={styles.questionIntro}>{d.cd.question}</p>
          <p className={styles.questionMain}>{d.cd.q1}</p>
          <p className={styles.questionExpand}>{d.cd.q2}</p>
        </div>

        {/* Seven Capabilities — connected vertical system */}
        <div className={`${styles.capabilities}`} aria-label="Seven capabilities">
          <div className={styles.capabilitiesTrack}>
            {d.cd.capabilities.map((cap, i) => (
              <div
                key={cap}
                className={`${styles.capability} reveal`}
                style={{ '--ci': i, transitionDelay: `${i * 80}ms` } as React.CSSProperties}
              >
                <div className={styles.capLeft}>
                  <span className={styles.capNum}>0{i + 1}</span>
                  <div className={styles.capConnector} aria-hidden="true">
                    <div className={styles.capDot} />
                    {i < d.cd.capabilities.length - 1 && <div className={styles.capLine} />}
                  </div>
                </div>
                <div className={styles.capRight}>
                  <span className={styles.capName}>{cap}</span>
                  <p className={styles.capDesc}>{d.cd.capDesc[i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Diplomacy tag + CTA */}
        <div className={`${styles.footer} reveal reveal-delay-4`}>
          <div className={styles.aiTag}>
            <span className={styles.aiLabel}>{d.cd.aiLabel}</span>
          </div>
          <Link href={`/${lang}/conscious-diplomacy`} className={`btn btn-ghost ${styles.cta}`}>
            {d.cd.cta}
          </Link>
        </div>

      </div>
    </section>
  );
}
