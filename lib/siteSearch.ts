import { dict, type Locale } from '@/lib/i18n';

export interface SearchEntry {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  searchableText: string;
}

export function getSearchEntries(lang: Locale): SearchEntry[] {
  const d = dict[lang];
  const homeLabel = lang === 'ar' ? 'الرئيسية' : 'Home';
  const pageLabel = lang === 'ar' ? 'صفحة' : 'Page';

  const entry = (
    path: string,
    title: string,
    description: string,
    keywords: Array<string | string[]>,
    eyebrow = pageLabel,
  ): SearchEntry => ({
    href: `/${lang}${path}`,
    title,
    eyebrow,
    description,
    searchableText: [title, description, ...keywords.flat()].join(' '),
  });

  return [
    entry('', `${d.hero.nameFirst} ${d.hero.nameLast}`, d.hero.statement, [
      d.hero.tagline,
      d.vision.heading,
      d.vision.pillars,
    ], homeLabel),
    entry('/venus', `${d.hero.nameFirst} ${d.hero.nameLast}`, d.venus.body, [
      d.venus.heading,
      d.venus.question,
      d.venus.label,
    ]),
    entry('/conscious-diplomacy', d.cd.label, d.cd.body, [
      d.cd.heading,
      d.cd.question,
      d.cd.q1,
      d.cd.q2,
      d.cd.capabilities,
      d.cd.capDesc,
      'Instagram consciousdiplomacy انستغرام الدبلوماسية الواعية',
    ]),
    entry('/the-new-ray', d.newray.label, d.newray.body, [
      d.newray.heading,
      d.newray.distinction,
      d.newray.questions,
    ]),
    entry('/elara-vega', d.nav.elaraVega, d.elara.body, [
      d.elara.label,
      d.elara.subtitle,
      d.elara.heading,
      d.elara.stages,
      d.elara.stageDesc,
      d.elara.transitions.flatMap(({ from, to }) => [from, to]),
    ]),
    entry('/programs', d.nav.programs, d.programs.body, [
      d.programs.heading,
      d.programs.list.flatMap(({ title, tag }) => [title, tag]),
    ]),
    entry('/library', d.nav.library, d.library.body, [
      d.library.heading,
      d.library.articles,
      d.library.books,
      d.library.notes,
      d.library.reels,
      d.library.films,
      d.library.lectures,
      d.book.title,
      d.book.body,
      d.notes.sampleNotes.map(({ text }) => text),
    ]),
    entry('/contact', d.nav.contact, d.contact.heading, [
      d.contact.label,
      d.contact.reasons,
      d.contact.whatsapp,
    ]),
  ];
}

