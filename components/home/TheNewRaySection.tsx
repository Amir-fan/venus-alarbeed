'use client';

import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './TheNewRaySection.module.css';

interface Props {
  d: Dict;
}

export default function TheNewRaySection({ d }: Props) {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} section`}
      aria-labelledby="newray-heading"
    >
      {/* The Ray — animated thin line */}
      <div className={styles.rayContainer} aria-hidden="true">
        <div className={styles.ray} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.layout}>
          <div className={styles.left}>
            <div className="section-label reveal">
              <div className="dot" />
              <span>{d.newray.label}</span>
            </div>

            <h2
              id="newray-heading"
              className={`${styles.heading} reveal reveal-delay-1`}
            >
              {d.newray.heading}
            </h2>
          </div>

          <div className={styles.right}>
            <p className={`t-body ${styles.body} reveal reveal-delay-2`}>
              {d.newray.body}
            </p>
            <p className={`${styles.distinction} reveal reveal-delay-3`}>
              {d.newray.distinction}
            </p>

            <div className={`${styles.facebookLink} reveal reveal-delay-4`}>
              <a
                href="https://www.facebook.com/The.new.ray11"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-text ${styles.fbLink}`}
              >
                The New Ray on Facebook →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
