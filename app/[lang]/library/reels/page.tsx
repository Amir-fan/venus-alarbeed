import Image, { type StaticImageData } from 'next/image';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { localizedPageMetadata } from '@/lib/seo';
import dialogueImage from '@/public/reels/diplomatic-dialogue.jpeg';
import negotiationImage from '@/public/reels/negotiation-table.jpeg';
import presenceImage from '@/public/reels/quiet-presence.jpeg';
import receptionImage from '@/public/reels/diplomatic-reception.jpeg';
import newDiplomacyImage from '@/public/reels/new-diplomacy.jpeg';
import styles from './page.module.css';

const YOUTUBE_URL = 'https://youtube.com/@venusalarbeed936?si=BEvWT4GpbH8Vovan';

interface Props {
  params: Promise<{ lang: string }>;
}

interface ReelFrame {
  image: StaticImageData;
  number: string;
  title: string;
  description: string;
  alt: string;
  layout: 'standard' | 'wide';
}

const copy = {
  en: {
    eyebrow: 'THE VENUS LIBRARY · WATCH',
    title: 'Diplomacy,\nin motion.',
    lead: 'Short visual reflections on presence, power, negotiation and the human being inside the diplomatic room.',
    body: 'A living collection of ideas from Conscious Diplomacy—made to be entered in a few minutes and carried into the next room.',
    youtube: 'Watch on YouTube',
    channel: 'VENUS ALARBEED ON YOUTUBE',
    featureLabel: 'THE ROOM / 01',
    featureTitle: 'Before the first word, the room is already speaking.',
    featureBody: 'Read the people, the silence, the timing and the power moving beneath the conversation.',
    collectionLabel: 'SELECTED FRAMES',
    collectionTitle: 'Ideas to watch. Questions to carry.',
    collectionBody: 'Each frame opens a different part of the practice: dialogue, presence, representation and a diplomacy shaped for what comes next.',
    closingLabel: 'CONTINUE WATCHING',
    closingTitle: 'The full collection lives on YouTube.',
    closingBody: 'Visit Venus Alarbeed’s channel for reels, conversations and new visual work.',
    frames: [
      {
        image: dialogueImage,
        number: '02',
        title: 'The Conversation',
        description: 'Listening for what is said—and what is moving behind the words.',
        alt: 'Two diplomats in focused conversation across a conference table',
        layout: 'standard',
      },
      {
        image: receptionImage,
        number: '03',
        title: 'Representation',
        description: 'Presence continues beyond the negotiating table. Every room carries another language.',
        alt: 'Diplomats in conversation at a formal international reception',
        layout: 'standard',
      },
      {
        image: newDiplomacyImage,
        number: '04',
        title: 'The New Diplomacy',
        description: 'Carrying the wisdom of established rooms into a wider and more connected future.',
        alt: 'A diplomat walking from a traditional chamber toward a modern international city',
        layout: 'wide',
      },
    ] satisfies ReelFrame[],
  },
  ar: {
    eyebrow: 'مكتبة فينوس · شاهد',
    title: 'الدبلوماسية،\nفي حركة.',
    lead: 'تأملات بصرية قصيرة حول الحضور والقوة والتفاوض والإنسان داخل الغرفة الدبلوماسية.',
    body: 'مجموعة حيّة من أفكار الدبلوماسية الواعية؛ تدخلها في دقائق، وتحملها معك إلى الغرفة التالية.',
    youtube: 'شاهد على يوتيوب',
    channel: 'فينوس العربيد على يوتيوب',
    featureLabel: 'الغرفة / 01',
    featureTitle: 'قبل الكلمة الأولى، تكون الغرفة قد بدأت بالكلام.',
    featureBody: 'اقرأ الأشخاص والصمت والتوقيت والقوة التي تتحرك خلف المحادثة.',
    collectionLabel: 'مشاهد مختارة',
    collectionTitle: 'أفكار تشاهدها. وأسئلة تحملها معك.',
    collectionBody: 'يفتح كل مشهد جانباً مختلفاً من الممارسة: الحوار والحضور والتمثيل ودبلوماسية تتشكل لما هو قادم.',
    closingLabel: 'تابع المشاهدة',
    closingTitle: 'المجموعة الكاملة على يوتيوب.',
    closingBody: 'قم بزيارة قناة فينوس العربيد لمشاهدة الريلز والحوارات والأعمال المرئية الجديدة.',
    frames: [
      {
        image: dialogueImage,
        number: '02',
        title: 'المحادثة',
        description: 'أن تصغي إلى ما يقال، وإلى ما يتحرك خلف الكلمات.',
        alt: 'دبلوماسيان في حوار مركز عبر طاولة اجتماعات',
        layout: 'standard',
      },
      {
        image: receptionImage,
        number: '03',
        title: 'التمثيل',
        description: 'الحضور يستمر خارج طاولة التفاوض؛ فلكل غرفة لغتها.',
        alt: 'دبلوماسيون يتحاورون في حفل استقبال دولي رسمي',
        layout: 'standard',
      },
      {
        image: newDiplomacyImage,
        number: '04',
        title: 'الدبلوماسية الجديدة',
        description: 'أن نحمل حكمة الغرف الراسخة إلى مستقبل أوسع وأكثر اتصالاً.',
        alt: 'دبلوماسية تعبر من قاعة تقليدية إلى مدينة دولية حديثة',
        layout: 'wide',
      },
    ] satisfies ReelFrame[],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const content = copy[lang];

  return localizedPageMetadata({
    lang,
    path: '/library/reels',
    title: lang === 'ar' ? 'ريلز فينوس العربيد' : 'Reels',
    description: content.lead,
  });
}

function YouTubeArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function ReelsPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const content = copy[lang];
  const isAr = lang === 'ar';

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="reels-heading">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{content.eyebrow}</span>
            <h1 id="reels-heading">
              {content.title.split('\n').map((line) => <span key={line}>{line}</span>)}
            </h1>
            <p className={styles.heroLead}>{content.lead}</p>
            <p className={styles.heroBody}>{content.body}</p>
            <a className={styles.primaryCta} href={YOUTUBE_URL} target="_blank" rel="noreferrer">
              <span>{content.youtube}</span>
              <YouTubeArrow />
            </a>
          </div>

          <a
            className={styles.heroVisual}
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={content.youtube}
          >
            <Image
              src={presenceImage}
              alt={isAr ? 'دبلوماسية تجلس بهدوء وتأمل داخل قاعة رسمية' : 'A diplomat sitting in quiet reflection inside a formal room'}
              priority
              sizes="(max-width: 899px) 92vw, 48vw"
            />
            <span className={styles.playMark} aria-hidden="true"><i /></span>
            <span className={styles.visualIndex}>00 / REELS</span>
          </a>
        </div>
      </section>

      <section className={styles.feature} aria-label={content.featureTitle}>
        <div className="container">
          <a className={styles.featureVisual} href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            <Image
              src={negotiationImage}
              alt={isAr ? 'اجتماع دبلوماسي متعدد الأطراف حول طاولة التفاوض' : 'A multilateral diplomatic meeting around the negotiating table'}
              sizes="(max-width: 767px) 94vw, 1200px"
            />
            <div className={styles.featureShade} aria-hidden="true" />
            <span className={styles.featurePlay} aria-hidden="true"><i /></span>
            <div className={styles.featureCaption}>
              <span>{content.featureLabel}</span>
              <h2>{content.featureTitle}</h2>
              <p>{content.featureBody}</p>
            </div>
          </a>
        </div>
      </section>

      <section className={styles.collection} aria-labelledby="reels-collection-heading">
        <div className="container">
          <header className={styles.collectionHeader}>
            <span>{content.collectionLabel}</span>
            <h2 id="reels-collection-heading">{content.collectionTitle}</h2>
            <p>{content.collectionBody}</p>
          </header>

          <div className={styles.frameGrid}>
            {content.frames.map((frame) => (
              <a
                key={frame.number}
                className={`${styles.frame} ${frame.layout === 'wide' ? styles.frameWide : ''}`}
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`${content.youtube}: ${frame.title}`}
              >
                <div className={styles.frameImage}>
                  <Image
                    src={frame.image}
                    alt={frame.alt}
                    sizes={frame.layout === 'wide' ? '(max-width: 767px) 94vw, 1200px' : '(max-width: 767px) 94vw, 48vw'}
                  />
                  <span className={styles.framePlay} aria-hidden="true"><i /></span>
                </div>
                <div className={styles.frameCaption}>
                  <span>{frame.number}</span>
                  <div>
                    <h3>{frame.title}</h3>
                    <p>{frame.description}</p>
                  </div>
                  <YouTubeArrow />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <span className={styles.closingLabel}>{content.closingLabel}</span>
          <div className={styles.closingCopy}>
            <h2>{content.closingTitle}</h2>
            <p>{content.closingBody}</p>
          </div>
          <a className={styles.channelCta} href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            <span className={styles.youtubeIcon} aria-hidden="true"><i /></span>
            <span><small>{content.channel}</small>{content.youtube}</span>
            <YouTubeArrow />
          </a>
        </div>
      </section>
    </div>
  );
}
