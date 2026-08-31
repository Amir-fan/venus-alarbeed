import { dict, type Locale } from '@/lib/i18n';
import styles from './page.module.css';

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

  return (
    <div className={styles.page}>
      <div className={styles.starsOverlay} aria-hidden="true" />
      
      <div className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.subtitle}>{d.elara.subtitle}</p>
          <h1 className={styles.heading}>{d.elara.label}</h1>
          <p className={styles.heroBody}>{d.elara.heading}</p>
          <p className={styles.body}>{d.elara.body}</p>
        </div>
      </div>

      <div className={styles.transitionsSection}>
        <div className={styles.transGrid}>
          {d.elara.transitions.map((t, i) => (
            <div key={i} className={styles.transCard}>
              <span className={styles.transFrom}>{t.from}</span>
              <svg className={styles.transArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.transTo}>{t.to}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.stagesSection}>
        <div className={styles.stagesWrapper}>
          {d.elara.stages.map((stage, i) => (
            <div key={stage} className={styles.stageRow}>
              <div className={styles.stageNumber}>0{i + 1}</div>
              <div className={styles.stageInfo}>
                <h3 className={styles.stageTitle}>{stage}</h3>
                <p className={styles.stageDesc}>{d.elara.stageDesc[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
