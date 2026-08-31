import { dict, type Locale } from '@/lib/i18n';
import styles from './page.module.css';

import LibraryHero from '@/components/library/LibraryHero';
import LibraryCategories from '@/components/library/LibraryCategories';
import LibraryFeatured from '@/components/library/LibraryFeatured';
import LibraryBook from '@/components/library/LibraryBook';
import LibraryNotes from '@/components/library/LibraryNotes';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.nav.library,
    description: d.library.heading,
  };
}

export default async function LibraryPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      <LibraryHero d={d} />
      <LibraryCategories d={d} />
      <LibraryFeatured d={d} />
      <LibraryBook d={d} />
      <LibraryNotes d={d} />
    </div>
  );
}
