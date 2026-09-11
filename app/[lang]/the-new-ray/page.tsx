import { dict, type Locale } from '@/lib/i18n';
import NewRayHero from '@/components/newray/NewRayHero';
import NewRayWidening from '@/components/newray/NewRayWidening';
import NewRayRelationship from '@/components/newray/NewRayRelationship';
import NewRayTransition from '@/components/newray/NewRayTransition';
import styles from './page.module.css';
import { localizedPageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return localizedPageMetadata({
    lang,
    path: '/the-new-ray',
    title: d.newray.label,
    description: d.newray.body,
  });
}

export default async function TheNewRayPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      {/* 1. Hero */}
      <NewRayHero d={d} />

      {/* 2. Word-highlight distinction text */}
      <NewRayWidening d={d} />

      {/* 3. CD vs NR panels + question index (merged) */}
      <NewRayRelationship d={d} />

      {/* 4. Transition to Elara Vega */}
      <NewRayTransition lang={lang} d={d} />
    </div>
  );
}
