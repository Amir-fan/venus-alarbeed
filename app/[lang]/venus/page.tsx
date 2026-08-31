import { dict, type Locale } from '@/lib/i18n';
import VenusHero from '@/components/venus/VenusHero';
import VenusQuestion from '@/components/venus/VenusQuestion';
import VenusBiography from '@/components/venus/VenusBiography';
import VenusThoughtProgression from '@/components/venus/VenusThoughtProgression';
import VenusWriterSpeaker from '@/components/venus/VenusWriterSpeaker';
import VenusThreeWorlds from '@/components/venus/VenusThreeWorlds';
import VenusClosingStatement from '@/components/venus/VenusClosingStatement';
import ContactSection from '@/components/home/ContactSection';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: `${d.hero.nameFirst} ${d.hero.nameLast}`,
    description: d.venus.body,
  };
}

export default async function VenusPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <>
      {/* 1. Cinematic opening: portrait + name reveal */}
      <VenusHero d={d} />

      {/* 2. The central question — full-viewport navy */}
      <VenusQuestion d={d} />

      {/* 3. Sticky portrait + scrolling biography chapters */}
      <VenusBiography d={d} />

      {/* 4. Editorial thought progression */}
      <VenusThoughtProgression d={d} />

      {/* 5. Writer + Speaker dimensions */}
      <VenusWriterSpeaker lang={lang} d={d} />

      {/* 6. The three worlds Venus created */}
      <VenusThreeWorlds lang={lang} d={d} />

      {/* 7. Closing dark statement */}
      <VenusClosingStatement d={d} />

      {/* 8. Contact — natural conversation transition */}
      <ContactSection d={d} />
    </>
  );
}
