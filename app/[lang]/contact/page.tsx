import { dict, type Locale } from '@/lib/i18n';
import ContactView from './ContactView';
import { localizedPageMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return localizedPageMetadata({
    lang,
    path: '/contact',
    title: d.nav.contact,
    description: lang === 'ar'
      ? 'تواصل مع فينوس العربيد بخصوص التحدث والتدريب والدبلوماسية الواعية والتعاون الإعلامي.'
      : 'Contact Venus Alarbeed for speaking, training, Conscious Diplomacy, media and collaboration opportunities.',
  });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return <ContactView lang={lang} d={d} />;
}
