import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo';

const routes = [
  { path: '', priority: 1 },
  { path: '/venus', priority: 0.9 },
  { path: '/conscious-diplomacy', priority: 0.9 },
  { path: '/the-new-ray', priority: 0.8 },
  { path: '/elara-vega', priority: 0.8 },
  { path: '/programs', priority: 0.8 },
  { path: '/programs/conscious-diplomacy-code', priority: 0.9 },
  { path: '/library', priority: 0.8 },
  { path: '/library/art-of-identification', priority: 0.8 },
  { path: '/book', priority: 0.8 },
  { path: '/contact', priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          ar: `${SITE_URL}/ar${path}`,
          'x-default': `${SITE_URL}/en${path}`,
        },
      },
    })),
  );
}
