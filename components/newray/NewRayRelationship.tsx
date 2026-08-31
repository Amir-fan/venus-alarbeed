'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './NewRayRelationship.module.css';

interface Props {
  d: Dict;
}

export default function NewRayRelationship({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  const cdLabel = d.nav.consciousDiplomacy;
  const nrLabel = d.nav.newRay;

  const cdText = isAr
    ? 'ينظر إلى الإنسان داخل هياكل التأثير والقوة.'
    : 'The human being inside influence and power.';

  const nrText = isAr
    ? 'يوسع العدسة نحو الإنسان نفسه خارج تلك الهياكل.'
    : 'The human being beyond those structures.';

  const questions = d.newray.questions;

  return (
    <section ref={ref} className={styles.section} aria-label="Framework">
      <div className={`container ${styles.inner}`}>

        {/* ── Top: two-panel contrast ── */}
        <div className={styles.panels}>

          {/* Panel A — Conscious Diplomacy */}
          <div className={`${styles.panelA} quiet-reveal reveal-delay-1`}>
            <div className={styles.panelTop}>
              <span className={styles.panelNum}>01</span>
              <div className={styles.panelRule} />
            </div>
            <span className={styles.panelLabel}>{cdLabel}</span>
            <p className={styles.panelTextA}>{cdText}</p>
          </div>

          {/* Panel B — The New Ray */}
          <div className={`${styles.panelB} quiet-reveal reveal-delay-2`}>
            <div className={styles.panelTop}>
              <span className={styles.panelNum}>02</span>
              <div className={styles.panelRule} />
            </div>
            <span className={styles.panelLabel}>{nrLabel}</span>
            <p className={styles.panelTextB}>{nrText}</p>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className={`drawing-rule quiet-reveal reveal-delay-3 ${styles.midRule}`} />

        {/* ── Bottom: question index ── */}
        <div className={styles.questionIndex}>
          {questions.map((q, i) => (
            <div
              key={q}
              className={`${styles.qRow} quiet-reveal reveal-delay-${Math.min(i + 3, 5)}`}
            >
              <span className={styles.qNum}>0{i + 1}</span>
              <span className={styles.qText}>{q}</span>
              <div className={styles.qRule} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
