import { Suspense } from 'react';
import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import SearchView from './SearchView';
import styles from './page.module.css';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };

  return {
    title: lang === 'ar' ? 'البحث' : 'Search',
    description: lang === 'ar' ? 'ابحث في موقع فينوس العربيد.' : 'Search the Venus Alarbeed website.',
  };
}

export default async function SearchPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };

  return (
    <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
      <SearchView lang={lang} />
    </Suspense>
  );
}

