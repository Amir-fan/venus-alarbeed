'use client';

import { Fragment } from 'react';
import Image, { type StaticImageData } from 'next/image';
import type { Dict, Locale } from '@/lib/i18n';
import Orb from '@/components/ui/Orb';
import worldMap from '@/public/elara-vega/vega-world-map.jpeg';
import citizens from '@/public/elara-vega/vega-citizens.jpeg';
import aurisChronicles from '@/public/elara-vega/auris-chronicles.jpeg';
import rulers from '@/public/elara-vega/rulers-of-vega.jpeg';
import whiteCurtains from '@/public/elara-vega/white-curtains-headquarters.jpeg';
import eighara from '@/public/elara-vega/eighara-city.jpeg';
import talmir from '@/public/elara-vega/talmir-city.jpeg';
import crystalMine from '@/public/elara-vega/vega-crystal-mine.jpeg';
import exil from '@/public/elara-vega/exil-forbidden-city.jpeg';
import naurat from '@/public/elara-vega/naurat-city.jpeg';
import styles from './page.module.css';

interface Props {
  d: Dict;
  lang: Locale;
}

interface VisualCard {
  src: StaticImageData;
  name: string;
  description: string;
  alt: string;
}

const visualCopy = {
  en: {
    mapLabel: 'THE WORLD OF VEGA',
    mapCaption: 'A celestial atlas of cities, knowledge, memory and hidden power.',
    sceneLabel: 'A LIVING WORLD',
    sceneCaption: 'Every city carries its own culture. Every encounter reveals another layer of the journey.',
    atlasLabel: 'THE CITIES',
    atlasTitle: 'Places shaped by what they protect.',
    atlasBody: 'Vega is not one city but a constellation of worlds—each governed by a different relationship to knowledge, life, power and truth.',
    chapterOne: 'The figures who shape the balance between the luminous cities and the White Curtains.',
    chapterTwo: 'Auris—the capital of Vega and a city where knowledge, memory and influence meet.',
    frontierLabel: 'BEYOND THE CENTRE',
    frontierTitle: 'The outer worlds remember what the centre forgets.',
    frontierBody: 'Mines, forbidden cities and crystalline archives reveal the forces moving beneath Vega’s visible order.',
    atlasCards: [
      {
        src: whiteCurtains,
        name: 'The White Curtains Headquarters',
        description: 'A presence without a fixed city—its councils move through many places and layers of light.',
        alt: 'The circular council chamber of the White Curtains in Vega',
      },
      {
        src: eighara,
        name: 'Eighara',
        description: 'The city of rivers and life, built around flowing waters and interwoven waterfalls.',
        alt: 'Eighara, a luminous city of rivers, waterfalls and gardens',
      },
      {
        src: talmir,
        name: 'Talmir',
        description: 'The city of scholars and wisdom, where gardens of light observe the stars.',
        alt: 'Talmir, a celestial city of learning, observatories and gardens',
      },
    ],
    frontierCards: [
      {
        src: crystalMine,
        name: 'The Rare Vega Mine',
        description: 'Crystalline energy hidden beneath the northern mountains.',
        alt: 'Golden crystals glowing inside the rare Vega mine',
      },
      {
        src: exil,
        name: 'Exil',
        description: 'The forbidden city, sealed behind shifting barriers of light.',
        alt: 'Exil, a dark forbidden city enclosed by golden light',
      },
      {
        src: naurat,
        name: 'Naurat',
        description: 'The city of memory and mirrors, built around a living crystalline record.',
        alt: 'Naurat, the crystalline city of memory and mirrors',
      },
    ],
  },
  ar: {
    mapLabel: 'عالم فيغا',
    mapCaption: 'أطلس سماوي لمدن المعرفة والذاكرة والنور والقوة الخفية.',
    sceneLabel: 'عالم حي',
    sceneCaption: 'لكل مدينة ثقافتها، وكل لقاء يكشف طبقة جديدة من الرحلة.',
    atlasLabel: 'المدن',
    atlasTitle: 'أماكن تشكّلت حول ما تحميه.',
    atlasBody: 'فيغا ليست مدينة واحدة، بل كوكبة من العوالم؛ تحكم كلّاً منها علاقة مختلفة بالمعرفة والحياة والقوة والحقيقة.',
    chapterOne: 'الشخصيات التي تصنع التوازن بين المدن المضيئة والستائر البيضاء.',
    chapterTwo: 'أوريس، عاصمة فيغا؛ مدينة تلتقي فيها المعرفة والذاكرة والتأثير.',
    frontierLabel: 'خارج المركز',
    frontierTitle: 'العوالم البعيدة تتذكر ما ينساه المركز.',
    frontierBody: 'المناجم والمدن المحرمة وأرشيفات الكريستال تكشف القوى التي تتحرك تحت نظام فيغا الظاهر.',
    atlasCards: [
      {
        src: whiteCurtains,
        name: 'مقر الستائر البيضاء',
        description: 'حضور لا يملك مدينة ثابتة؛ تنتقل مجالسه بين أماكن وطبقات مختلفة من النور.',
        alt: 'قاعة المجلس الدائرية لمقر الستائر البيضاء في فيغا',
      },
      {
        src: eighara,
        name: 'إيغارا',
        description: 'مدينة الأنهار والحياة، بُنيت حول المياه المتدفقة والشلالات المتداخلة.',
        alt: 'إيغارا، مدينة مضيئة من الأنهار والشلالات والحدائق',
      },
      {
        src: talmir,
        name: 'تالمير',
        description: 'مدينة العلماء والحكمة، حيث تراقب حدائق النور النجوم.',
        alt: 'تالمير، مدينة سماوية للعلم والمراصد والحدائق',
      },
    ],
    frontierCards: [
      {
        src: crystalMine,
        name: 'معدن فيغا النادر',
        description: 'طاقة كريستالية مخفية في أعماق الجبال الشمالية.',
        alt: 'بلورات ذهبية مضيئة داخل منجم فيغا النادر',
      },
      {
        src: exil,
        name: 'إكسيل',
        description: 'المدينة المحرمة، المغلقة خلف حواجز ضوئية متغيّرة.',
        alt: 'إكسيل، مدينة محرمة داكنة تحيط بها خطوط من الضوء الذهبي',
      },
      {
        src: naurat,
        name: 'نورات',
        description: 'مدينة الذاكرة والمرآة، بُنيت حول سجل كريستالي حي.',
        alt: 'نورات، مدينة كريستالية للذاكرة والمرايا',
      },
    ],
  },
} satisfies Record<Locale, {
  mapLabel: string;
  mapCaption: string;
  sceneLabel: string;
  sceneCaption: string;
  atlasLabel: string;
  atlasTitle: string;
  atlasBody: string;
  chapterOne: string;
  chapterTwo: string;
  frontierLabel: string;
  frontierTitle: string;
  frontierBody: string;
  atlasCards: VisualCard[];
  frontierCards: VisualCard[];
}>;

export default function ElaraVegaView({ d, lang }: Props) {
  const isAr = lang === 'ar';
  const visual = visualCopy[lang];

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* The Orb: large, luminous, top-right — like a planet's rising light source */}
        <div className={styles.orbWrap} aria-hidden="true">
          <Orb
            hoverIntensity={1.2}
            rotateOnHover={true}
            hue={0}
            backgroundColor="#050c18"
          />
        </div>

        {/* Fine gold star dust layer */}
        <div className={styles.starDust} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{d.elara.subtitle}</p>
          <h1 className={styles.heroTitle}>{d.elara.label}</h1>
          <div className={styles.heroRule} />
          <p className={styles.heroLead}>{d.elara.heading}</p>
          <p className={styles.heroBody}>{d.elara.body}</p>
        </div>

        <figure className={styles.heroMap}>
          <Image
            src={worldMap}
            alt={isAr ? 'خريطة كوكب فيغا ومدنه' : 'Map of planet Vega and its cities'}
            priority
            sizes="(max-width: 767px) 94vw, 62vw"
          />
          <figcaption>
            <span>{visual.mapLabel}</span>
            <p>{visual.mapCaption}</p>
          </figcaption>
        </figure>
      </section>

      {/* ── TRANSITIONS ── the journey from → to */}
      <section className={styles.transSection} aria-label={isAr ? 'التحول' : 'The Transformation'}>
        <div className={`container ${styles.transInner}`}>
          <p className={styles.sectionEyebrow}>{isAr ? 'التحول' : 'THE TRANSFORMATION'}</p>
          <div className={styles.transList}>
            {d.elara.transitions.map((t: { from: string; to: string }, i: number) => (
              <div key={i} className={styles.transRow}>
                <span className={styles.transNum}>0{i + 1}</span>
                <div className={styles.transContent}>
                  <span className={styles.transFrom}>{t.from}</span>
                  <span className={styles.transArrow} aria-hidden="true">→</span>
                  <span className={styles.transTo}>{t.to}</span>
                </div>
              </div>
            ))}
          </div>

          <figure className={styles.cinematicFrame}>
            <Image
              src={citizens}
              alt={isAr ? 'ثلاث شخصيات من عالم فيغا في إحدى المدن المضيئة' : 'Three citizens of Vega in a luminous city'}
              sizes="(max-width: 767px) 100vw, 1100px"
            />
            <figcaption>
              <span>{visual.sceneLabel}</span>
              <p>{visual.sceneCaption}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── CITY ATLAS ── world-building cards */}
      <section className={styles.atlasSection} aria-labelledby="vega-cities-heading">
        <div className="container">
          <div className={styles.atlasHeading}>
            <span>{visual.atlasLabel}</span>
            <h2 id="vega-cities-heading">{visual.atlasTitle}</h2>
            <p>{visual.atlasBody}</p>
          </div>
          <div className={styles.atlasGrid}>
            {visual.atlasCards.map((card, index) => (
              <figure key={card.name} className={styles.atlasCard}>
                <div className={styles.atlasImage}>
                  <Image
                    src={card.src}
                    alt={card.alt}
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 44vw, 30vw"
                  />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{card.name}</h3><p>{card.description}</p></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAGES ── the 7 chapters */}
      <section className={styles.stagesSection} aria-label={isAr ? 'مراحل الرحلة' : 'The Journey'}>
        <div className={`container ${styles.stagesInner}`}>
          <p className={styles.sectionEyebrow}>{isAr ? 'مراحل الرحلة' : 'THE JOURNEY'}</p>

          <div className={styles.stagesList}>
            {d.elara.stages.map((stage: string, i: number) => (
              <Fragment key={stage}>
                <div className={styles.stageRow}>
                  <div className={styles.stageLeft}>
                    <span className={styles.stageNum}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.stageCenter}>
                    <h2 className={styles.stageName}>{stage}</h2>
                    <p className={styles.stageDesc}>{d.elara.stageDesc[i]}</p>
                  </div>
                  <div className={styles.stageRight} aria-hidden="true">
                    <div className={styles.stagePulse} />
                  </div>
                </div>

                {i === 1 && (
                  <figure className={`${styles.chapterVisual} ${styles.chapterPortrait}`}>
                    <div className={styles.chapterImage}>
                      <Image
                        src={rulers}
                        alt={isAr ? 'حاكم فيغا ورسامة خرائط الهالات وأحد أفراد الستائر البيضاء' : 'The ruler of Vega, the aura cartographer and a member of the White Curtains'}
                        sizes="(max-width: 767px) 92vw, 58vw"
                      />
                    </div>
                    <figcaption><span>02 / 07</span><p>{visual.chapterOne}</p></figcaption>
                  </figure>
                )}

                {i === 4 && (
                  <figure className={`${styles.chapterVisual} ${styles.chapterWide}`}>
                    <div className={styles.chapterImage}>
                      <Image
                        src={aurisChronicles}
                        alt={isAr ? 'شخصيات من مكتبة الوعي ومدينة أوريس عاصمة فيغا' : 'Keepers of the Library of Awareness and Auris, capital of Vega'}
                        sizes="(max-width: 767px) 92vw, 1100px"
                      />
                    </div>
                    <figcaption><span>05 / 07</span><p>{visual.chapterTwo}</p></figcaption>
                  </figure>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FRONTIER ── */}
      <section className={styles.frontierSection} aria-labelledby="vega-frontier-heading">
        <div className="container">
          <div className={styles.frontierHeading}>
            <span>{visual.frontierLabel}</span>
            <h2 id="vega-frontier-heading">{visual.frontierTitle}</h2>
            <p>{visual.frontierBody}</p>
          </div>
          <div className={styles.frontierGrid}>
            {visual.frontierCards.map((card, index) => (
              <figure key={card.name} className={styles.frontierCard}>
                <Image
                  src={card.src}
                  alt={card.alt}
                  sizes="(max-width: 720px) 92vw, (max-width: 1100px) 44vw, 30vw"
                />
                <figcaption>
                  <span>0{index + 1}</span>
                  <h3>{card.name}</h3>
                  <p>{card.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
