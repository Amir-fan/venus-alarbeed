import { dict, type Locale } from '@/lib/i18n';
import ProgramsView from './ProgramsView';
import { localizedPageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return localizedPageMetadata({
    lang,
    path: '/programs',
    title: d.nav.programs,
    description: d.programs.heading,
  });
}

export default async function ProgramsPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return <ProgramsView lang={lang} d={d} />;
}
