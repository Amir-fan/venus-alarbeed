'use client';

import type { Dict, Locale } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './CDHero.module.css';

interface Props {
  d: Dict;
  lang: Locale;
}

export default function CDHero({ d, lang }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  
  // The heading in i18n has a newline. Split it to mask reveal each line.
  const headingLines = d.cd.heading.split('\n');

  return (
    <section ref={ref} className={styles.hero} aria-label={d.cd.label}>
      <div className={`container ${styles.inner}`}>
        
        <div className={`section-label quiet-reveal ${styles.labelTop}`}>
          <div className="dot" />
          <span>{d.cd.label}</span>
        </div>

        <h1 className={styles.headingWrap}>
          {headingLines.map((line, i) => (
            <span key={i} className={`mask-reveal-wrap ${styles.lineWrap}`}>
              <span className={`mask-reveal ${i === 0 ? 'reveal-delay-1' : 'reveal-delay-2'} ${styles.line}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className={`drawing-rule reveal-delay-3 ${styles.rule}`} />

        <p className={`quiet-reveal reveal-delay-4 ${styles.body}`}>
          {d.cd.body}
        </p>

        <div className={`quiet-reveal reveal-delay-5 ${styles.igLinkWrap}`}>
          <a href="https://www.instagram.com/consciousdiplomacy" target="_blank" rel="noopener noreferrer" className={`btn-text ${styles.igLink}`}>
            <svg className={styles.igIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            {lang === 'ar' ? 'انستغرام الدبلوماسية الواعية' : 'Conscious Diplomacy on Instagram'}
          </a>
        </div>

      </div>
    </section>
  );
}
