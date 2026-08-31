'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './WhoIsVenus.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function WhoIsVenus({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className={`${styles.section} section`} aria-labelledby="venus-heading">
      <div className={`container ${styles.inner}`} ref={ref}>
        <div className={styles.aside}>
          <div className="section-label reveal">
            <div className="dot" />
            <span>{d.venus.label}</span>
          </div>
          <div className={`${styles.roleList} reveal reveal-delay-2`}>
            {['Diplomat', 'Lawyer', 'Writer', 'Speaker', 'Trainer'].map((role) => (
              <span key={role} className={styles.role}>{role}</span>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <h2
            id="venus-heading"
            className={`t-headline ${styles.heading} reveal`}
          >
            {d.venus.heading}
          </h2>

          <p className={`t-body ${styles.body} reveal reveal-delay-1`}>
            {d.venus.body}
          </p>

          <blockquote className={`${styles.question} reveal reveal-delay-2`}>
            <span className={styles.questionMark} aria-hidden="true">&ldquo;</span>
            <p className={styles.questionText}>{d.venus.question}</p>
          </blockquote>

          <div className={`reveal reveal-delay-3`}>
            <Link href={`/${lang}/venus`} className="btn btn-text">
              {d.venus.cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
