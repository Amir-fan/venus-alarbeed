'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ProgramsSection.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ProgramsSection({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="programs-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{d.programs.label}</span>
          </div>
          <div className={styles.headerContent}>
            <h2
              id="programs-heading"
              className={`${styles.heading} quiet-reveal reveal-delay-1`}
            >
              {d.programs.heading}
            </h2>
            <p className={`t-body ${styles.body} quiet-reveal reveal-delay-2`}>
              {d.programs.body}
            </p>
          </div>
        </div>

        <div className={styles.list}>
          {d.programs.list.map((prog, i) => (
            <Link
              href={`/${lang}/programs`}
              key={prog.title}
              className={`${styles.program} quiet-reveal`}
              style={{ transitionDelay: `${i * 100}ms` } as React.CSSProperties}
            >
              <span className={styles.programNum}>0{i + 1}</span>
              <span className={styles.programTitle}>{prog.title}</span>
              <span className={styles.programTag}>{prog.tag}</span>
              <span className={styles.programArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div className={`quiet-reveal reveal-delay-4`}>
          <Link href={`/${lang}/programs`} className={`btn-text ${styles.cta}`}>
            {d.programs.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
