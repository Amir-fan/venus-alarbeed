import { dict, type Locale } from '@/lib/i18n';
import styles from './page.module.css';
import Link from 'next/link';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.nav.consciousDiplomacy,
    description: d.cd.body,
  };
}

export default async function ConsciousDiplomacyPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.geoLine} />
        
        <div className={styles.content}>
          <p className={styles.label}>{d.cd.label}</p>
          <h1 className={styles.heading}>{d.cd.heading}</h1>
          <p className={styles.body}>{d.cd.body}</p>
        </div>
      </div>

      <div className={styles.questionsSection}>
        <div className={styles.questionsContent}>
          <p className={styles.questionIntro}>{d.cd.question}</p>
          <h2 className={styles.q1}>{d.cd.q1}</h2>
          <h2 className={styles.q2}>{d.cd.q2}</h2>
        </div>
      </div>

      <div className={styles.capabilitiesSection}>
        <p className={styles.capSectionLabel}>Seven capabilities</p>
        <div className={styles.capGrid}>
          {d.cd.capabilities.map((cap, i) => (
            <div key={cap} className={styles.capRow}>
              <div className={styles.capNumber}>0{i + 1}</div>
              <h3 className={styles.capTitle}>{cap}</h3>
              <p className={styles.capDesc}>{d.cd.capDesc[i]}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaWrapper}>
          <Link href={`/${lang}/elara-vega`} className={styles.exploreBtn}>
            {d.elara.label} →
          </Link>
        </div>
      </div>
    </div>
  );
}
