'use client';

import type { Dict, Locale } from '@/lib/i18n';
import Orb from '@/components/ui/Orb';
import styles from './page.module.css';

interface Props {
  d: Dict;
  lang: Locale;
}

export default function ElaraVegaView({ d, lang }: Props) {
  const isAr = lang === 'ar';

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* The Orb: large, luminous, top-right — like a planet's rising light source */}
        <div className={styles.orbWrap} aria-hidden="true">
          <Orb
            hoverIntensity={1.2}
            rotateOnHover={true}
            hue={0}
            backgroundColor="#050c18"
          />
        </div>

        {/* Fine gold star dust layer */}
        <div className={styles.starDust} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{d.elara.subtitle}</p>
          <h1 className={styles.heroTitle}>{d.elara.label}</h1>
          <div className={styles.heroRule} />
          <p className={styles.heroLead}>{d.elara.heading}</p>
          <p className={styles.heroBody}>{d.elara.body}</p>
        </div>
      </section>

      {/* ── TRANSITIONS ── the journey from → to */}
      <section className={styles.transSection} aria-label={isAr ? 'التحول' : 'The Transformation'}>
        <div className={`container ${styles.transInner}`}>
          <p className={styles.sectionEyebrow}>{isAr ? 'التحول' : 'THE TRANSFORMATION'}</p>
          <div className={styles.transList}>
            {d.elara.transitions.map((t: { from: string; to: string }, i: number) => (
              <div key={i} className={styles.transRow}>
                <span className={styles.transNum}>0{i + 1}</span>
                <div className={styles.transContent}>
                  <span className={styles.transFrom}>{t.from}</span>
                  <span className={styles.transArrow} aria-hidden="true">→</span>
                  <span className={styles.transTo}>{t.to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAGES ── the 7 chapters */}
      <section className={styles.stagesSection} aria-label={isAr ? 'مراحل الرحلة' : 'The Journey'}>
        <div className={`container ${styles.stagesInner}`}>
          <p className={styles.sectionEyebrow}>{isAr ? 'مراحل الرحلة' : 'THE JOURNEY'}</p>

          <div className={styles.stagesList}>
            {d.elara.stages.map((stage: string, i: number) => (
              <div key={stage} className={styles.stageRow}>
                <div className={styles.stageLeft}>
                  <span className={styles.stageNum}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.stageCenter}>
                  <h2 className={styles.stageName}>{stage}</h2>
                  <p className={styles.stageDesc}>{d.elara.stageDesc[i]}</p>
                </div>
                <div className={styles.stageRight} aria-hidden="true">
                  <div className={styles.stagePulse} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
