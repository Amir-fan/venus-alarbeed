import { dict, type Locale } from '@/lib/i18n';
import Hero from '@/components/home/Hero';
import WhoIsVenus from '@/components/home/WhoIsVenus';
import TheVision from '@/components/home/TheVision';
import ConsciousDiplomacySection from '@/components/home/ConsciousDiplomacySection';
import ElaraVegaSection from '@/components/home/ElaraVegaSection';
import TheNewRaySection from '@/components/home/TheNewRaySection';
import LibraryTeaser from '@/components/home/LibraryTeaser';
import ProgramsSection from '@/components/home/ProgramsSection';
import TheBook from '@/components/home/TheBook';
import VenusNotesTeaser from '@/components/home/VenusNotesTeaser';
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
      <TheVision d={d} />
      <ConsciousDiplomacySection lang={lang} d={d} />
      <ElaraVegaSection lang={lang} d={d} />
      <TheNewRaySection d={d} />
      <LibraryTeaser lang={lang} d={d} />
      <ProgramsSection lang={lang} d={d} />
      <TheBook lang={lang} d={d} />
      <VenusNotesTeaser d={d} />
      <ContactSection d={d} />
    </>
  );
}
