import { dict, type Locale } from '@/lib/i18n';
import Hero from '@/components/home/Hero';
import WhoIsVenus from '@/components/home/WhoIsVenus';
import TheQuestion from '@/components/home/TheQuestion';
import TheVision from '@/components/home/TheVision';
import WorldPortals from '@/components/home/WorldPortals';
import ProgramsSection from '@/components/home/ProgramsSection';
import LibraryTeaser from '@/components/home/LibraryTeaser';
import TheBook from '@/components/home/TheBook';
import ContactSection from '@/components/home/ContactSection';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <>
      <Hero lang={lang} d={d} />
      <WhoIsVenus lang={lang} d={d} />
      <TheQuestion d={d} />
      <TheVision d={d} />
      <WorldPortals lang={lang} d={d} />
      <ProgramsSection lang={lang} d={d} />
      <LibraryTeaser lang={lang} d={d} />
      <TheBook lang={lang} d={d} />
      <ContactSection d={d} />
    </>
  );
}
