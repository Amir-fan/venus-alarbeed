'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import Link from 'next/link';
import styles from './CDElaraTransition.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function CDElaraTransition({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-label="Next Depth">
      <div className={styles.transitionGradient} aria-hidden="true" />
      
      <div className={`container ${styles.inner}`}>
        
        {/* The visual structure loosening */}
        <div className={styles.lineWrap}>
          <div className={`drawing-rule ${styles.verticalRule}`} />
          <div className={`quiet-reveal reveal-delay-3 ${styles.warmPoint}`} />
        </div>

        <div className={styles.content}>
          <div className={`mask-reveal-wrap ${styles.labelWrap}`}>
            <span className={`mask-reveal ${styles.label}`}>
              {isAr ? 'العمق التالي' : 'THE NEXT DEPTH'}
            </span>
          </div>

          <h2 className={`${styles.heading} quiet-reveal reveal-delay-1`}>
            {isAr ? 'الإطار ينتهي هنا.' : 'THE FRAMEWORK ENDS HERE.'}<br />
            {isAr ? 'الرحلة تستمر.' : 'THE JOURNEY CONTINUES.'}
          </h2>

          <p className={`${styles.body} quiet-reveal reveal-delay-2`}>
            {d.elara.heading}
          </p>

          <div className={`quiet-reveal reveal-delay-3 ${styles.ctaWrap}`}>
            <Link href={`/${lang}/elara-vega`} className={`btn btn-ghost-light ${styles.cta}`}>
              {d.elara.cta} →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
