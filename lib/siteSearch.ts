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
    entry(
      '/programs/conscious-diplomacy-code',
      lang === 'ar' ? 'شفرة الدبلوماسية الواعية' : 'The Conscious Diplomacy Code',
      lang === 'ar'
        ? '12 جلسة قصيرة إلى طريقة مختلفة في رؤية الإنسان، الغرفة، القوة والتأثير.'
        : '12 short sessions exploring a different way to see the human being, the room, power and influence.',
      [
        'course registration online 12 sessions presence negotiation power reading the room',
        'كورس تسجيل أونلاين 12 جلسة الحضور التفاوض القوة قراءة الغرفة',
      ],
      lang === 'ar' ? 'كورس' : 'Course',
    ),
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
    entry(
      '/library/art-of-identification',
      lang === 'ar' ? 'فنّ التماهي' : 'The Art of Identification',
      lang === 'ar'
        ? 'هناك كذبة نعرفها جميعاً، وأخرى نعيش داخلها دون أن نسميها كذباً.'
        : 'There is one lie we all recognize, and another we live inside without ever naming it as a lie.',
      [
        'essay politics truth discourse institutions peace justice diplomacy',
        'مقال السياسة الحقيقة الخطاب المؤسسات السلام العدالة الدبلوماسية',
      ],
      lang === 'ar' ? 'مقال' : 'Essay',
    ),
    entry(
      '/library/reels',
      lang === 'ar' ? 'ريلز فينوس العربيد' : 'Venus Alarbeed Reels',
      lang === 'ar'
        ? 'تأملات بصرية قصيرة حول الحضور والقوة والتفاوض والإنسان داخل الغرفة الدبلوماسية.'
        : 'Short visual reflections on presence, power, negotiation and the human being inside the diplomatic room.',
      [
        'reels videos watch YouTube Venus Alarbeed conscious diplomacy presence negotiation',
        'ريلز فيديو يوتيوب فينوس العربيد الدبلوماسية الواعية الحضور التفاوض',
      ],
      lang === 'ar' ? 'شاهد' : 'Watch',
    ),
    entry('/book', d.book.title, d.book.body, [
      d.book.label,
      d.book.ctaBuy,
      'digital book PDF Sham Cash $2.99 purchase receipt',
      'كتاب رقمي شراء شام كاش إيصال 2.99 دولار',
    ]),
    entry('/contact', d.nav.contact, d.contact.heading, [
      d.contact.label,
      d.contact.reasons,
      d.contact.whatsapp,
    ]),
  ];
}
