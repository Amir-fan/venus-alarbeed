'use client';

import { useEffect, useRef } from 'react';
import type { Dict } from '@/lib/i18n';
import GodRaysBackground from './GodRaysBackground';
import styles from './NewRayWidening.module.css';

interface Props {
  d: Dict;
}

export default function NewRayWidening({ d }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  // Split text into word spans for the highlight effect
  const text = d.newray.distinction;
  const words = text.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    const wordEls = wordsRef.current;
    if (!section || wordEls.length === 0) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start highlighting when section enters 85% down the viewport.
      // Finish when section top is 80% *above* the viewport (fully scrolled past).
      // This stretches the highlight across the entire scroll journey —
      // total range ≈ 1.65 × windowH, matching the 100vh section height well.
      const triggerStart = windowH * 0.85;
      const triggerEnd = windowH * -0.8;
      const progress = Math.min(1, Math.max(0,
        (triggerStart - rect.top) / (triggerStart - triggerEnd)
      ));

      // Each word lights up progressively
      const n = wordEls.length;
      wordEls.forEach((el, i) => {
        const threshold = i / n;
        const wordProgress = Math.min(1, Math.max(0, (progress - threshold) / (1.2 / n)));
        // dim = 0.18, bright = 1.0
        const opacity = 0.18 + wordProgress * 0.82;
        el.style.opacity = `${opacity}`;
        // Subtle warmth: gold tint at peak brightness
        if (wordProgress > 0.85) {
          el.style.color = 'var(--navy)';
        } else {
          el.style.color = 'var(--navy)';
        }
      });
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="The Lens Widens">
      {/* Very subtle god-rays */}
      <div className={styles.shaderWrap} aria-hidden="true">
        <GodRaysBackground className={styles.shader} />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.statement} aria-label={text}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={el => { if (el) wordsRef.current[i] = el; }}
              className={styles.word}
              style={{ opacity: 0.18 }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
