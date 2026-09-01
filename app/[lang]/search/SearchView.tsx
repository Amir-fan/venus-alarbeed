'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getSearchEntries } from '@/lib/siteSearch';
import styles from './page.module.css';

interface Props {
  lang: Locale;
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function SearchView({ lang }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim().slice(0, 80) ?? '';
  const isAr = lang === 'ar';

  const results = useMemo(() => {
    const terms = normalize(query).split(' ').filter(Boolean);
    if (!terms.length) return [];

    return getSearchEntries(lang)
      .map((item) => {
        const title = normalize(item.title);
        const content = normalize(item.searchableText);
        const matchesEveryTerm = terms.every((term) => content.includes(term));
        const score = terms.reduce((total, term) => {
          if (title === term) return total + 8;
          if (title.startsWith(term)) return total + 5;
          if (title.includes(term)) return total + 3;
          return content.includes(term) ? total + 1 : total;
        }, 0);

        return { ...item, score, matchesEveryTerm };
      })
      .filter((item) => item.matchesEveryTerm)
      .sort((a, b) => b.score - a.score);
  }, [lang, query]);

  return (
    <section className={styles.page} aria-labelledby="search-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>{isAr ? 'استكشف الموقع' : 'Explore the site'}</span>
        </div>

        <h1 id="search-heading" className={styles.heading}>
          {isAr ? 'البحث' : 'Search'}
        </h1>

        <form action={`/${lang}/search`} className={styles.searchForm} role="search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder={isAr ? 'ابحث عن فكرة، برنامج، أو صفحة...' : 'Search for an idea, program, or page...'}
            aria-label={isAr ? 'البحث في الموقع' : 'Search the website'}
            autoFocus
            maxLength={80}
          />
          <button type="submit">{isAr ? 'بحث' : 'Search'}</button>
        </form>

        <div className={styles.rule} />

        {!query ? (
          <p className={styles.status}>
            {isAr ? 'اكتب كلمة أو عبارة للبحث في جميع صفحات الموقع.' : 'Enter a word or phrase to search across every page.'}
          </p>
        ) : results.length ? (
          <div className={styles.results}>
            <p className={styles.status}>
              {isAr
                ? `${results.length} ${results.length === 1 ? 'نتيجة' : 'نتائج'} عن «${query}»`
                : `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query}”`}
            </p>
            <ol className={styles.resultList}>
              {results.map((result, index) => (
                <li key={result.href}>
                  <Link href={result.href} className={styles.resultCard}>
                    <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.resultCopy}>
                      <span className={styles.resultEyebrow}>{result.eyebrow}</span>
                      <span className={styles.resultTitle}>{result.title}</span>
                      <span className={styles.resultDescription}>{result.description}</span>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">{isAr ? '←' : '→'}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>{isAr ? 'لا توجد نتائج' : 'No results found'}</h2>
            <p>
              {isAr
                ? `لم نجد شيئاً مطابقاً لـ «${query}». جرّب كلمة أقصر أو موضوعاً أوسع.`
                : `Nothing matched “${query}”. Try a shorter word or a broader topic.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

