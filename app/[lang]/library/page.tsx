import { dict, type Locale } from '@/lib/i18n';
import styles from './page.module.css';

import LibraryHero from '@/components/library/LibraryHero';
import LibraryCategories from '@/components/library/LibraryCategories';
import LibraryFeatured from '@/components/library/LibraryFeatured';
import LibraryBook from '@/components/library/LibraryBook';
import LibraryNotes from '@/components/library/LibraryNotes';
import { localizedPageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return localizedPageMetadata({
    lang,
    path: '/library',
    title: d.nav.library,
    description: d.library.heading,
  });
}

export default async function LibraryPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      <LibraryHero d={d} />
      <LibraryCategories lang={lang} d={d} />
      <LibraryFeatured lang={lang} d={d} />
      <LibraryBook lang={lang} d={d} />
      <LibraryNotes d={d} />
    </div>
  );
}
