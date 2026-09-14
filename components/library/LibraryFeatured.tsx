'use client';

import Link from 'next/link';
import type { Dict, Locale } from '@/lib/i18n';
import { useRevealGroup } from '@/hooks/useReveal';
import styles from './LibraryFeatured.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function LibraryFeatured({ lang, d }: Props) {
  const ref = useRevealGroup<HTMLElement>();
  const isAr = d.hero.nameFirst === 'فينوس';

  const featuredItems = [
    {
      category: isAr ? 'مقال · الدبلوماسية الواعية' : 'ESSAY · CONSCIOUS DIPLOMACY',
      title: isAr ? 'فنّ التماهي' : 'The Art of Identification',
      preview: isAr
        ? 'هناك كذبة نعرفها جميعاً، وأخرى نعيش داخلها دون أن نسميها كذباً.'
        : 'There is one lie we all recognize, and another we live inside without ever naming it as a lie.',
      cta: isAr ? 'اقرأ المقال' : 'Read the essay',
      href: `/${lang}/library/art-of-identification`,
    }
  ];

  return (
    <section ref={ref} className={styles.section} aria-label="Featured Content">
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.header}>
          <span className={styles.headerLabel}>
            {isAr ? 'المحتوى المميز / الأرشيف' : 'FEATURED / ARCHIVE'}
          </span>
          <div className={styles.headerRule} />
        </div>

        <div className={styles.list}>
          {featuredItems.map((item, i) => (
            <Link
              key={i} 
              href={item.href}
              className={`${styles.row} quiet-reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className={styles.colMeta}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.category}>{item.category}</span>
              </div>
              
              <div className={styles.colTitle}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.preview}>{item.preview}</p>
              </div>

              <div className={styles.colDate}>
                <span className={styles.readCta}>{item.cta} <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
