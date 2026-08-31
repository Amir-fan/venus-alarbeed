import { dict, type Locale } from '@/lib/i18n';
import styles from './page.module.css';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.nav.newRay,
    description: d.newray.body,
  };
}

export default async function TheNewRayPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      <div className={styles.lightRay} aria-hidden="true" />
      
      <div className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.label}>{d.newray.label}</p>
          <h1 className={styles.heading}>{d.newray.heading}</h1>
          <p className={styles.body}>{d.newray.body}</p>
        </div>
      </div>

      <div className={styles.distinctionSection}>
        <div className={styles.glassCard}>
          <p className={styles.distinction}>{d.newray.distinction}</p>
        </div>
      </div>
    </div>
  );
}
