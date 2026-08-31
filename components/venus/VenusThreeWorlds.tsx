'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './VenusThreeWorlds.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

const worlds = [
  {
    num: '01',
    titleEn: 'Conscious Diplomacy',
    titleAr: 'الدبلوماسية الواعية',
    descEn: 'A framework for influence, power and awareness — inside the diplomatic room.',
    descAr: 'إطار للتأثير والقوة والوعي — داخل الغرفة الدبلوماسية.',
    path: '/conscious-diplomacy',
  },
  {
    num: '02',
    titleEn: 'The New Ray',
    titleAr: 'الشعاع الجديد',
    descEn: 'A wider exploration of human awareness, relationships and possibility.',
    descAr: 'استكشاف أوسع للوعي الإنساني والعلاقات والإمكان.',
    path: '/the-new-ray',
  },
  {
    num: '03',
    titleEn: 'Elara Vega',
    titleAr: 'إيلارا فيغا',
    descEn: 'A deeper journey through perception, transformation and the human interior.',
    descAr: 'رحلة أعمق في الإدراك والتحول والعالم الداخلي للإنسان.',
    path: '/elara-vega',
  },
];

export default function VenusThreeWorlds({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-labelledby="worlds-heading">
      <div className={`container ${styles.inner}`}>

        <div className={styles.header}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'من الشخص تنبثق ثلاثة اتجاهات' : 'FROM THE PERSON, THREE DIRECTIONS'}</span>
          </div>
          <h2 id="worlds-heading" className={`${styles.heading} quiet-reveal reveal-delay-1`}>
            {isAr
              ? 'ما الذي بنته فينوس من هذا التفكير.'
              : 'What Venus built from this thinking.'}
          </h2>
        </div>

        <div className={styles.list}>
          {worlds.map((w, i) => (
            <Link
              key={w.num}
              href={`/${lang}${w.path}`}
              className={`${styles.world} quiet-reveal`}
              style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
            >
              <div className={`drawing-rule ${styles.rule}`} />
              <div className={styles.worldInner}>
                <span className={styles.worldNum}>{w.num}</span>
                <div className={styles.worldContent}>
                  <h3 className={styles.worldTitle}>{isAr ? w.titleAr : w.titleEn}</h3>
                  <p className={styles.worldDesc}>{isAr ? w.descAr : w.descEn}</p>
                </div>
                <span className={styles.worldArrow} aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
          <div className={`drawing-rule ${styles.ruleEnd}`} />
        </div>

      </div>
    </section>
  );
}
