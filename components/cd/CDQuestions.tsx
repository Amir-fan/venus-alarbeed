'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import styles from './CDQuestions.module.css';

interface Props {
  d: Dict;
}

export default function CDQuestions({ d }: Props) {
  const isAr = d.hero.nameFirst === 'فينوس';

  const deeperQuestions = isAr ? [
    'كيف أظهر؟',
    'ماذا أرى؟',
    'ماذا لا أرى؟',
    'كيف أؤثر؟',
    'وماذا يبقى بعد أن أحصل على النتيجة؟'
  ] : [
    'How do I show up?',
    'What do I see?',
    'What do I not see?',
    'How do I influence?',
    'And what remains after I get the result?'
  ];

  const qRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const observers = qRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px -30% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section className={styles.section} aria-label="Reflective Questions">
      <div className={`container ${styles.inner}`}>
        
        {/* The Surface Question */}
        <div className={styles.surfaceBlock}>
          <p className={styles.intro}>{d.cd.question}</p>
          <h2
            ref={el => { qRefs.current[0] = el; }}
            className={`${styles.surfaceQ} ${activeIndex === 0 ? styles.active : activeIndex > 0 ? styles.passed : ''}`}
          >
            {d.cd.q1}
          </h2>
        </div>

        {/* The Deeper Questions */}
        <div className={styles.deepBlock}>
          <p className={styles.deepIntro}>{isAr ? 'بل تسأل أيضاً:' : 'BUT ALSO:'}</p>
          <div className={styles.deepList}>
            {deeperQuestions.map((q, i) => {
              const actualIndex = i + 1;
              return (
                <h2
                  key={i}
                  ref={el => { qRefs.current[actualIndex] = el; }}
                  className={`${styles.deepQ} ${activeIndex === actualIndex ? styles.active : activeIndex > actualIndex ? styles.passed : ''}`}
                >
                  {q}
                </h2>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
