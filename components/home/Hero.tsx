'use client';

import Image from 'next/image';
import portraitImg from '@/public/venus_portrait.png';
import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './Hero.module.css';

interface Props {
  d: Dict;
}

export default function Hero({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section ref={ref} className={styles.hero} aria-label="Hero">
      {/* Subtle background geometry */}
      <div className={styles.geometry} aria-hidden="true">
        <div className={styles.geoLine1}>
          <div className={`${styles.geoLightPoint} ${styles.geoLightActive}`} />
        </div>
        <div className={styles.geoLine2} />
        <div className={styles.geoCircle} />
      </div>

      <div className={styles.inner}>
        {/* Portrait */}
        <div className={styles.portrait} aria-hidden="true">
          <div className="mask-reveal-wrap">
            <div className={`mask-reveal ${styles.portraitReveal}`}>
              <div className={styles.portraitPlaceholder}>
            <Image
              src={portraitImg}
              alt="Venus Alarbeed Portrait"
              fill
              className={styles.portraitImg}
              priority
            />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={`${styles.taglineWrap} mask-reveal-wrap`}>
            <span className={`t-label ${styles.tagline} mask-reveal reveal-delay-1`}>
              {d.hero.tagline}
            </span>
          </div>

          <h1 className={`${styles.nameWrap} mask-reveal-wrap`}>
            <span className={`mask-reveal reveal-delay-2 ${styles.name}`}>
              <span className={styles.nameInner}>
                {d.hero.nameFirst}
                <br />
                {d.hero.nameLast}
              </span>
            </span>
          </h1>

          <p className={`${styles.statement} quiet-reveal reveal-delay-3`}>
            {d.hero.statement}
          </p>

          <div className={`quiet-reveal reveal-delay-4 ${styles.cta}`}>
            <a href="#question" className={`btn btn-ghost ${styles.ctaBtn}`}>
              {d.hero.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollIndicator} quiet-reveal reveal-delay-5`} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
