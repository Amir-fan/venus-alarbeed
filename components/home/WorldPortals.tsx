'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import Orb from '@/components/ui/Orb';
import GodRaysBackground from '@/components/newray/GodRaysBackground';
import { NeuralNoise } from '@/components/ui/NeuralNoise';
import styles from './WorldPortals.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function WorldPortals({ lang, d }: Props) {
  const cdRef = useRevealGroup<HTMLElement>();
  const nrRef = useRevealGroup<HTMLElement>();
  const evRef = useRevealGroup<HTMLElement>();

  return (
    <div className={styles.portalsWrapper}>
      {/* The continuous trajectory line that spans all three portals */}
      <div className={styles.trajectoryWrap} aria-hidden="true">
        <div className={styles.trajectoryLine}>
          <div className={styles.trajectoryLight} />
        </div>
      </div>

      {/* 01 - Conscious Diplomacy */}
      <section ref={cdRef} className={`${styles.portal} ${styles.cdPortal}`}>
        {/* Neural Noise — subtle, structural, cerebral */}
        <div className={styles.cdNoiseWrap} aria-hidden="true">
          <NeuralNoise
            color={[0.066, 0.109, 0.176]} // Deep navy — almost dark on ivory
            opacity={0.65}
            speed={0.0005}
          />
        </div>
        <div className={`container ${styles.inner}`}>
          <div className={styles.portalContent}>
            <div className={`mask-reveal-wrap ${styles.numWrap}`}>
              <span className="mask-reveal">01</span>
            </div>
            <h2 className={`${styles.heading} mask-reveal-wrap`}>
              <span className="mask-reveal reveal-delay-1">{d.nav.consciousDiplomacy}</span>
            </h2>
            <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />
            <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
              Awareness inside the realities of influence, power and diplomacy.
            </p>
            <div className={`quiet-reveal reveal-delay-4`}>
              <Link href={`/${lang}/conscious-diplomacy`} className={`btn-text ${styles.cta}`}>
                ENTER THE FRAMEWORK →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 - The New Ray */}
      <section ref={nrRef} className={`${styles.portal} ${styles.nrPortal}`}>
        {/* God Rays — same effect as the dedicated New Ray page */}
        <GodRaysBackground className={styles.nrGodRays} />
        <div className={`container ${styles.inner} ${styles.nrInner}`}>
          <div className={styles.portalContent}>
            <div className={`mask-reveal-wrap ${styles.numWrap}`}>
              <span className="mask-reveal">02</span>
            </div>
            <h2 className={`${styles.heading} mask-reveal-wrap`}>
              <span className="mask-reveal reveal-delay-1">{d.nav.newRay}</span>
            </h2>
            <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />
            <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
              The lens widens toward awareness, relationships and human possibility.
            </p>
            <div className={`quiet-reveal reveal-delay-4`}>
              <Link href={`/${lang}/the-new-ray`} className={`btn-text ${styles.cta}`}>
                ENTER THE NEW RAY →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03 - Elara Vega */}
      <section ref={evRef} className={`${styles.portal} ${styles.evPortal}`}>
        {/* Orb — luminous planetary light source on the right */}
        <div className={styles.evOrbWrap} aria-hidden="true">
          <Orb
            hoverIntensity={0.9}
            rotateOnHover={true}
            hue={0}
            backgroundColor="#111c2d"
          />
        </div>
        <div className={`container ${styles.inner}`}>
          <div className={styles.portalContent}>
            <div className={`mask-reveal-wrap ${styles.numWrap}`}>
              <span className="mask-reveal">03</span>
            </div>
            <h2 className={`${styles.heading} mask-reveal-wrap`}>
              <span className="mask-reveal reveal-delay-1">{d.nav.elaraVega}</span>
            </h2>
            <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />
            <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
              A journey that begins in the diplomatic room — but does not end there.
            </p>
            <div className={`quiet-reveal reveal-delay-4`}>
              <Link href={`/${lang}/elara-vega`} className={`btn-text ${styles.cta}`}>
                ENTER THE JOURNEY →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
