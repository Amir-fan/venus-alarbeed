'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Locale, Dict } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import englishCover from '@/public/conscious-diplomacy-en-cover.jpg';
import arabicCover from '@/public/conscious-diplomacy-ar-cover.jpg';
import styles from './CDBook.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function CDBook({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  return (
    <section ref={ref} className={styles.section} aria-labelledby="cd-book-heading">
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.content}>
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'الإطار في شكل مكتوب' : 'THE FRAMEWORK IN WRITTEN FORM'}</span>
          </div>

          <h2 id="cd-book-heading" className={`${styles.title} quiet-reveal reveal-delay-1`}>
            {d.book.title}
          </h2>

          <div className={`drawing-rule reveal-delay-2 ${styles.rule}`} />

          <p className={`${styles.body} quiet-reveal reveal-delay-3`}>
            {d.book.body}
          </p>

          <div className={`quiet-reveal reveal-delay-4 ${styles.actions}`}>
            <Link href={`/${lang}/book`} className="btn btn-outline">
              {d.book.ctaBuy}
            </Link>
          </div>
        </div>

        <div className={`${styles.visual} quiet-reveal reveal-delay-2`}>
          <div className={styles.bookMockup}>
            <Image
              src={isAr ? arabicCover : englishCover}
              alt={d.book.title}
              className={styles.bookCoverImage}
              sizes="(max-width: 899px) 75vw, 360px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
