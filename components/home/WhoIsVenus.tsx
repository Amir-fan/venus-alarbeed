'use client';

import Link from 'next/link';
import Image from 'next/image';
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
          <div className={`${styles.roleList}`}>
            {['Diplomat', 'Lawyer', 'Writer', 'Speaker', 'Trainer'].map((role, i) => (
              <span key={role} className={`${styles.roleWrap} mask-reveal-wrap`}>
                <span className={`mask-reveal reveal-delay-${i + 1}`}>{role}</span>
              </span>
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

          <div className={`${styles.imageWrap} reveal reveal-delay-2`}>
            <Image 
              src="https://images.unsplash.com/photo-1577985051167-0d49eec21977?auto=format&fit=crop&w=800&q=80" 
              alt="Venus Alarbeed environment"
              fill
              className={styles.image}
              unoptimized // Allow external URL without next.config.js setup for now
            />
          </div>

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
