'use client';

import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './VenusWriterSpeaker.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function VenusWriterSpeaker({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-labelledby="writer-heading">
      <div className={`container ${styles.inner}`}>

        {/* Writer */}
        <div className={styles.half}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'الكتابة' : 'WRITER'}</span>
          </div>
          <h2 id="writer-heading" className={`${styles.heading} quiet-reveal reveal-delay-1`}>
            {isAr ? 'الكتابة كامتداد للعمل' : 'Writing as an extension of the work.'}
          </h2>
          <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />
          <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
            {isAr
              ? 'الكتابة في عالم فينوس ليست منتجاً. هي استمرار للتفكير. الدبلوماسية الواعية كتاباً، وملاحظات فينوس أفكاراً قصيرة، والمقالات محطات في رحلة فكرية مستمرة.'
              : 'Writing in Venus\'s world is not a product. It is a continuation of thinking. Conscious Diplomacy as a book. Venus Notes as short ideas. Articles as stations in an ongoing intellectual journey.'}
          </p>
          <div className={`quiet-reveal reveal-delay-4`}>
            <Link href={`/${lang}/library`} className={`btn-text ${styles.cta}`}>
              {isAr ? 'استكشف المكتبة →' : 'EXPLORE THE LIBRARY →'}
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Speaker */}
        <div className={styles.half}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'المتحدثة والمدرّبة' : 'SPEAKER & TRAINER'}</span>
          </div>
          <h2 className={`${styles.heading} quiet-reveal reveal-delay-1`}>
            {isAr ? 'الكلام كممارسة.' : 'Speaking as practice.'}
          </h2>
          <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />
          <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
            {isAr
              ? 'الحضور أمام الجمهور ليس أداءً. هو فرصة لمشاركة ما صمد أمام التفكير الدقيق. الدبلوماسية الواعية في المنتديات الدولية، وبرامج التدريب والقيادة، وفي كل مساحة تحتاج إلى وضوح.'
              : 'Presence in front of an audience is not performance. It is an opportunity to share what has survived rigorous thinking. Conscious Diplomacy in international forums, training programs, leadership spaces — wherever clarity is needed.'}
          </p>
          <div className={`quiet-reveal reveal-delay-4`}>
            <Link href={`/${lang}/contact`} className={`btn-text ${styles.cta}`}>
              {isAr ? 'دعوة فينوس للتحدث →' : 'INVITE VENUS TO SPEAK →'}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
