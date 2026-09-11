import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';

export const SITE_URL = 'https://www.venusalarbeed.com';
export const SITE_NAME = 'Venus Alarbeed';

export const homeSeo = {
  en: {
    title: 'Venus Alarbeed | Diplomat, Author & Conscious Diplomacy',
    description:
      'Official website of Venus Alarbeed—diplomat, lawyer, author, speaker and creator of Conscious Diplomacy, The New Ray and Elara Vega.',
  },
  ar: {
    title: 'فينوس العربيد | دبلوماسية وكاتبة ومؤسسة الدبلوماسية الواعية',
    description:
      'الموقع الرسمي لفينوس العربيد؛ دبلوماسية ومحامية وكاتبة ومتحدثة، ومؤسسة الدبلوماسية الواعية والشعاع الجديد وإيلارا فيغا.',
  },
} as const;

function localizedUrl(lang: Locale, path = '') {
  return `${SITE_URL}/${lang}${path}`;
}

export function localizedAlternates(lang: Locale, path = ''): Metadata['alternates'] {
  return {
    canonical: localizedUrl(lang, path),
    languages: {
      en: localizedUrl('en', path),
      ar: localizedUrl('ar', path),
      'x-default': localizedUrl('en', path),
    },
  };
}

export function localizedPageMetadata({
  lang,
  path = '',
  title,
  description,
  noIndex = false,
}: {
  lang: Locale;
  path?: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(lang, path),
    openGraph: {
      title,
      description,
      url: localizedUrl(lang, path),
      siteName: SITE_NAME,
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_AR'],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}
