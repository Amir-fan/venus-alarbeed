'use client';

import type { Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './ProgramRegister.module.css';

interface Props {
  d: Dict;
  onWaitlist: () => void;
}

export default function ProgramRegister({ d, onWaitlist }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';
  const programs = d.programs.list;

  const waitlistLabel = isAr ? 'انضم للقائمة' : 'Join waitlist';

  return (
    <section ref={ref} className={styles.section} aria-label="Programme Register">
      <div className={`container ${styles.inner}`}>

        <div className={styles.list}>
          {programs.map((prog, i) => {
            const isCore = i === 0;
            const isEmerging = i === 1;

            return (
              <div
                key={prog.title}
                className={`${styles.row} quiet-reveal reveal-delay-${Math.min(i + 1, 4)}`}
                role="listitem"
              >
                {/* Number & Tag Column */}
                <div className={styles.colLeft}>
                  <span className={styles.num}>0{i + 1}</span>
                  <div className={styles.tagWrap}>
                    <span className={styles.tag}>{prog.tag}</span>
                    {isEmerging && (
                      <span className={styles.emerging}>
                        {isAr ? 'قيد التطوير' : 'In Development'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title Column */}
                <div className={styles.colMain}>
                  <h2 className={`${styles.title} ${isCore ? styles.titleCore : ''}`}>
                    {prog.title}
                  </h2>
                </div>

                {/* CTA Column */}
                <div className={styles.colRight}>
                  <button
                    onClick={onWaitlist}
                    className={styles.ctaText}
                    aria-label={`${waitlistLabel} — ${prog.title}`}
                  >
                    <span>{waitlistLabel}</span>
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
