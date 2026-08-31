'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './CDCapabilities.module.css';

interface Props {
  d: Dict;
}

export default function CDCapabilities({ d }: Props) {
  const isAr = d.hero.nameFirst === 'فينوس';
  const caps = d.cd.capabilities;
  const descs = d.cd.capDesc;

  const [activeIndex, setActiveIndex] = useState(0);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRevealGroup<HTMLElement>();

  useEffect(() => {
    const observers = capRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.5, rootMargin: '-20% 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="capabilities-heading">
      <div className={`container ${styles.inner}`}>

        <div className={`section-label quiet-reveal ${styles.sectionLabel}`}>
          <div className="dot" />
          <span id="capabilities-heading">{isAr ? 'القدرات السبع' : 'SEVEN CAPABILITIES'}</span>
        </div>

        <div className={styles.layout}>
          
          {/* Left: Sticky Index */}
          <div className={`${styles.indexCol} quiet-reveal reveal-delay-1`}>
            <div className={styles.stickyIndex}>
              <ul className={styles.indexList}>
                {caps.map((cap, i) => (
                  <li
                    key={cap}
                    className={`${styles.indexItem} ${activeIndex === i ? styles.indexItemActive : ''}`}
                  >
                    <span className={styles.indexNum}>0{i + 1}</span>
                    <span className={styles.indexName}>{cap}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.indexProgressWrap}>
                <div 
                  className={styles.indexProgressBar}
                  style={{ height: `${((activeIndex + 1) / caps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Scrolling Readers */}
          <div className={`${styles.readerCol} quiet-reveal reveal-delay-2`}>
            {caps.map((cap, i) => (
              <div
                key={cap}
                ref={el => { capRefs.current[i] = el; }}
                className={`${styles.capBlock} ${activeIndex === i ? styles.capBlockActive : ''}`}
              >
                <div className={styles.capHeader}>
                  <span className={styles.capCount}>0{i + 1} / 07</span>
                </div>
                <h3 className={styles.capTitle}>{cap}</h3>
                <div className={styles.capRule} />
                <p className={styles.capDesc}>{descs[i]}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
