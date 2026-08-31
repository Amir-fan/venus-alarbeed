'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import portraitImg from '@/public/venus_portrait.png';
import type { Dict } from '@/lib/i18n';
import styles from './VenusHero.module.css';

interface Props {
  d: Dict;
}

export default function VenusHero({ d }: Props) {
  const [phase, setPhase] = useState(0);
  // phase 0: hidden, 1: name revealed, 2: portrait revealed, 3: disciplines visible

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);   // name clips in
    const t2 = setTimeout(() => setPhase(2), 700);   // portrait masks in
    const t3 = setTimeout(() => setPhase(3), 1200);  // disciplines appear
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section className={styles.hero} aria-label="Venus Alarbeed">
      <div className={styles.inner}>

        {/* Left: Portrait */}
        <div className={`${styles.portraitCol} ${phase >= 2 ? styles.portraitVisible : ''}`} aria-hidden="true">
          <div className={styles.portraitMask}>
            <div className={`${styles.portraitFrame} ${phase >= 2 ? styles.portraitFrameVisible : ''}`}>
              <Image
                src={portraitImg}
                alt="Venus Alarbeed"
                fill
                className={styles.portraitImg}
                priority
              />
            </div>
          </div>
          {/* Disciplines — appear below portrait on mobile */}
          <p className={`${styles.disciplines} ${phase >= 3 ? styles.disciplinesVisible : ''}`} aria-label="Disciplines">
            DIPLOMAT · LAWYER · WRITER · SPEAKER · TRAINER
          </p>
        </div>

        {/* Right: Name + statement */}
        <div className={styles.contentCol}>
          <h1 className={styles.nameWrap} aria-label={`${d.hero.nameFirst} ${d.hero.nameLast}`}>
            <span className={styles.nameLine}>
              <span className={`${styles.nameClip} ${phase >= 1 ? styles.nameClipVisible : ''}`}>
                {d.hero.nameFirst}
              </span>
            </span>
            <span className={styles.nameLine}>
              <span className={`${styles.nameClip} ${styles.nameClipDelay} ${phase >= 1 ? styles.nameClipVisible : ''}`}>
                {d.hero.nameLast}
              </span>
            </span>
          </h1>

          {/* Disciplines — desktop only inline position */}
          <p className={`${styles.disciplinesDesktop} ${phase >= 3 ? styles.disciplinesVisible : ''}`}>
            DIPLOMAT · LAWYER · WRITER · SPEAKER · TRAINER
          </p>

          <p className={`${styles.intro} ${phase >= 3 ? styles.introVisible : ''}`}>
            {d.venus.body}
          </p>
        </div>

      </div>
    </section>
  );
}
