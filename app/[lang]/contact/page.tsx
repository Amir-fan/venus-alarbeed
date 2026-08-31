import { dict, type Locale } from '@/lib/i18n';
import ContactView from './ContactView';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.nav.contact,
    description: d.contact.heading,
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return <ContactView lang={lang} d={d} />;
}
