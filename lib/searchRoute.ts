import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';

function getSearchAction(lang: Locale) {
  const configuredAction = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${lang}/search${process.env.NEXT_PUBLIC_STATIC_PAGE_EXTENSION ?? ''}`;

  if (typeof window === 'undefined' || !window.location.hostname.endsWith('github.io')) {
    return configuredAction;
  }

  const languageSegment = `/${lang}`;
  const languageIndex = window.location.pathname.indexOf(languageSegment);
  const repositoryPrefix = languageIndex > 0
    ? window.location.pathname.slice(0, languageIndex)
    : '';

  return `${repositoryPrefix}/${lang}/search.html`;
}

export function submitSearch(event: FormEvent<HTMLFormElement>, lang: Locale) {
  event.preventDefault();

  const value = new FormData(event.currentTarget).get('q');
  const query = typeof value === 'string' ? value.trim().slice(0, 80) : '';
  const params = new URLSearchParams();

  if (query) params.set('q', query);

  const queryString = params.toString();
  // GitHub Pages serves the exported route as a physical .html file.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = `${getSearchAction(lang)}${queryString ? `?${queryString}` : ''}`;
}
