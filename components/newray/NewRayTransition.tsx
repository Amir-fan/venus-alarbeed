'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import Link from 'next/link';
import styles from './NewRayTransition.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function NewRayTransition({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-label="Transition to Elara Vega">
      <div className={`container ${styles.inner}`}>

        <div className={styles.eyebrowWrap}>
          <div className={styles.eyebrowRule} />
          <span className={`quiet-reveal ${styles.eyebrow}`}>
            {d.elara.label}
          </span>
        </div>

        <h2 className={`${styles.heading} quiet-reveal reveal-delay-1`}>
          {isAr
            ? 'عندما تتسع العدسة، تبدأ الرحلة أعمق.'
            : 'When the lens widens,\nthe journey goes deeper.'}
        </h2>

        <p className={`${styles.body} quiet-reveal reveal-delay-2`}>
          {d.elara.heading}
        </p>

        <div className={`quiet-reveal reveal-delay-3 ${styles.ctaWrap}`}>
          <Link href={`/${lang}/elara-vega`} className={styles.cta}>
            {d.elara.cta}
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Single warm point — no vertical line */}
        <div className={`quiet-reveal reveal-delay-4 ${styles.warmPoint}`} aria-hidden="true" />

      </div>
    </section>
  );
}
