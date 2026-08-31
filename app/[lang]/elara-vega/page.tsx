import { dict, type Locale } from '@/lib/i18n';
import ElaraVegaView from './ElaraVegaView';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.nav.elaraVega,
    description: d.elara.body,
  };
}

export default async function ElaraVegaPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return <ElaraVegaView d={d} lang={lang} />;
}
