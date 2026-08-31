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
    title: d.nav.venus,
    description: d.venus.heading,
  };
}

export default async function VenusPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      
      {/* Cinematic Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.glow} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.label}>{d.venus.label}</p>
          <h1 className={styles.heading}>{d.venus.heading}</h1>
          <p className={styles.body}>{d.venus.body}</p>
        </div>
      </section>

      {/* The Core Question */}
      <section className={styles.questionSection}>
        <div className={styles.questionWrapper}>
          <h2 className={styles.question}>{d.venus.question}</h2>
        </div>
      </section>

      {/* Professional Dimensions (Cinematic layout) */}
      <section className={styles.dimensionsSection}>
        <div className={styles.dimensionGrid}>
          
          <div className={styles.dimensionBlock}>
            <div className={styles.dimNum}>01</div>
            <h3 className={styles.dimTitle}>Diplomatic Background</h3>
            <p className={styles.dimText}>
              Extensive experience operating within high-stakes international environments, focusing on sovereign relations and strategic representation.
            </p>
          </div>

          <div className={styles.dimensionBlock}>
            <div className={styles.dimNum}>02</div>
            <h3 className={styles.dimTitle}>International Law</h3>
            <p className={styles.dimText}>
              Specialized expertise in international legal frameworks, arbitration, and the complexities of cross-border jurisprudence.
            </p>
          </div>

          <div className={styles.dimensionBlock}>
            <div className={styles.dimNum}>03</div>
            <h3 className={styles.dimTitle}>Strategic Thinking</h3>
            <p className={styles.dimText}>
              Fusing legal precision with diplomatic insight to navigate systems, power dynamics, and complex human relationships.
            </p>
          </div>

          <div className={styles.dimensionBlock}>
            <div className={styles.dimNum}>04</div>
            <h3 className={styles.dimTitle}>Awareness & Influence</h3>
            <p className={styles.dimText}>
              Pioneering the Conscious Diplomacy framework—training leaders to exercise influence without losing their humanity.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaText}>The foundation of the vision.</p>
          <Link href={`/${lang}/conscious-diplomacy`} className={styles.exploreBtn}>
            {d.cd.cta} →
          </Link>
        </div>
      </section>

    </div>
  );
}
