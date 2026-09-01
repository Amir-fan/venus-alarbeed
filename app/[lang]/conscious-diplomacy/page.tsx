import { dict, type Locale } from '@/lib/i18n';
import CDHero from '@/components/cd/CDHero';
import CDQuestions from '@/components/cd/CDQuestions';
import CDCapabilities from '@/components/cd/CDCapabilities';
import CDSystem from '@/components/cd/CDSystem';
import CDPowerAwareness from '@/components/cd/CDPowerAwareness';
import CDPractice from '@/components/cd/CDPractice';
import CDBook from '@/components/cd/CDBook';
import CDElaraTransition from '@/components/cd/CDElaraTransition';
import styles from './page.module.css';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.cd.label,
    description: d.cd.body,
  };
}

export default async function ConsciousDiplomacyPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      {/* 1. The Proposition */}
      <CDHero lang={lang} d={d} />

      {/* 2. Transition from surface to depth */}
      <CDQuestions d={d} />

      {/* 3. The 7 capabilities framework (Sticky Reader) */}
      <CDCapabilities d={d} />

      {/* 4. Typographic connection chain */}
      <CDSystem d={d} />

      {/* 5. Conceptual contrast (Power, Influence, Diplomacy) */}
      <CDPowerAwareness d={d} />

      {/* 6. Where it matters in practice */}
      <CDPractice d={d} />

      {/* 7. The framework in written form */}
      <CDBook lang={lang} d={d} />

      {/* 8. Transition to Elara Vega */}
      <CDElaraTransition lang={lang} d={d} />
    </div>
  );
}
