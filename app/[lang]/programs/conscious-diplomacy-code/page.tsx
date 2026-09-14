import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localizedPageMetadata } from '@/lib/seo';
import CourseRegistrationForm from './CourseRegistrationForm';
import styles from './page.module.css';

interface Props {
  params: Promise<{ lang: string }>;
}

const content = {
  en: {
    eyebrow: 'Now enrolling · Online course',
    title: 'The Conscious Diplomacy Code',
    arabicTitle: 'شفرة الدبلوماسية الواعية',
    lead: '12 short sessions. One journey into a different way of seeing the human being, the room, power and influence.',
    cta: 'Register for the course',
    overview: [
      'Diplomacy is not only what happens between nations. We practise it every day—in how we enter a room, shake hands, use silence, choose our words, navigate disagreement, negotiate, set boundaries and use our presence and influence.',
      'But what happens when we practise all of that consciously? This is where Conscious Diplomacy begins.',
      'This course is your first gateway into the world of Conscious Diplomacy: not as a replacement for traditional diplomacy, but as a more conscious way to live and practise diplomacy at work, in life and across relationships.',
    ],
    questionLead: 'Across 12 short sessions, you will begin exploring the questions and ideas at the heart of this method:',
    questions: [
      'How do you show up?',
      'How do you read the room?',
      'How do you understand what lies behind the words?',
      'How do you relate to power?',
      'How do you negotiate without losing yourself?',
      'How do you represent a role, institution or position without disappearing behind it?',
    ],
    curriculumLabel: 'The journey',
    curriculumTitle: 'What will you discover?',
    sessions: [
      ['The Room', 'How do you enter a room, and what happens before you say your first word?'],
      ['The Human Behind the Role', 'Where does the role end, and where do you begin?'],
      ['Presence', 'Presence is not being seen. It is being fully here.'],
      ['The Handshake', 'What can a single moment say before the conversation begins?'],
      ['Reading the Room', 'People, silence, timing, authority and the signals that remain unspoken.'],
      ['The Conversation Behind the Conversation', 'How do you hear beyond words and understand what is not said directly?'],
      ['The Table', 'What happens when we sit at the table, and how do small details become part of negotiation?'],
      ['Conscious Negotiation', 'Negotiation is not only getting what you want; it is understanding what the other person wants and what remains after the agreement.'],
      ['The Difficult Person', 'How do you move from friction to connection, and from connection to the possibility of agreement?'],
      ['Power Has a Temperature', 'Power is not always found in rank or the loudest voice. It has a presence, a temperature and a way of moving through the room.'],
      ['The Diplomatic Self', 'How do you remain yourself while representing a role, institution or cause?'],
      ['The New Diplomat', 'What does it mean to be diplomatic in a new world, where influence moves faster, information multiplies and AI reshapes how we engage with the world?'],
    ],
    whyLabel: 'Why this course?',
    whyTitle: 'The world needs more than people who know what to say.',
    whyIntro: 'It needs people who know:',
    whyPoints: ['When to speak.', 'When to remain silent.', 'What they see.', 'What they represent.', 'How they influence.', 'What they leave behind.'],
    audience: 'You do not have to be a diplomat to begin. If you are a leader, lawyer, entrepreneur, employee, student, content creator, negotiator—or simply someone who wants to understand yourself, others and the world more consciously—this course was designed as your first point of entry.',
    formatLabel: 'The experience',
    format: [
      ['12', 'Short sessions'],
      ['30', 'Minutes per session'],
      ['AR + EN', 'Arabic and English'],
      ['Online', 'Join from anywhere'],
    ],
    formatBody: 'Short, focused sessions designed for the rhythm of modern life—yet each opens questions much larger than its duration. No academic background in diplomacy or international relations is required. You only need to be ready to see familiar things differently.',
    nextLabel: 'What comes next?',
    nextTitle: 'This is the beginning of the journey.',
    nextBody: 'The Conscious Diplomacy Code is the first gateway into a wider learning system, with advanced paths including:',
    paths: [
      ['The Art of Presence', 'فن الحضور'],
      ['Reading the Room', 'قراءة الغرفة'],
      ['Conscious Communication', 'التواصل الواعي'],
      ['Conscious Negotiation', 'التفاوض الواعي'],
      ['Power, Influence & Ethical Leadership', 'القوة والتأثير والقيادة الواعية'],
      ['The Diplomatic Self', 'الذات الدبلوماسية'],
      ['AI, Influence & The New Diplomacy', 'الذكاء الاصطناعي والتأثير والدبلوماسية الجديدة'],
    ],
    close: ['See differently.', 'Enter consciously.', 'Influence wisely.'],
    back: 'All programs',
  },
  ar: {
    eyebrow: 'التسجيل متاح الآن · كورس أونلاين',
    title: 'شفرة الدبلوماسية الواعية',
    arabicTitle: 'THE CONSCIOUS DIPLOMACY CODE',
    lead: '12 جلسة قصيرة. رحلة واحدة إلى طريقة مختلفة في رؤية الإنسان، الغرفة، القوة والتأثير.',
    cta: 'سجّل في الكورس',
    overview: [
      'الدبلوماسية ليست فقط ما يحدث بين الدول. نحن نمارسها كل يوم؛ في الطريقة التي ندخل بها غرفة، وفي المصافحة، وفي الصمت، وفي اختيار الكلمات، وفي الخلاف، وفي التفاوض، وفي الحدود التي نضعها، وفي الطريقة التي نستخدم بها حضورنا وتأثيرنا.',
      'لكن ماذا يحدث عندما نمارس كل ذلك بوعي؟ هنا تبدأ الدبلوماسية الواعية.',
      'هذا الكورس هو بوابتك الأولى إلى عالم الدبلوماسية الواعية؛ ليس باعتبارها بديلاً عن الدبلوماسية التقليدية، وإنما باعتبارها طريقة أكثر وعياً لعيش الدبلوماسية وممارستها داخل العمل والحياة والعلاقات.',
    ],
    questionLead: 'خلال 12 جلسة قصيرة، ستبدأ بالتعرف إلى الأسئلة والمفاهيم التي تشكل هذا المنهج:',
    questions: [
      'كيف تحضر؟',
      'كيف تقرأ الغرفة؟',
      'كيف تفهم ما وراء الكلمات؟',
      'كيف تتعامل مع القوة؟',
      'كيف تتفاوض دون أن تفقد نفسك؟',
      'كيف تمثل دوراً أو مؤسسة أو موقفاً دون أن تختفي خلفه؟',
    ],
    curriculumLabel: 'الرحلة',
    curriculumTitle: 'ماذا ستكتشف؟',
    sessions: [
      ['The Room · الغرفة', 'كيف تدخل الغرفة، وما الذي يحدث قبل أن تقول كلمتك الأولى؟'],
      ['The Human Behind the Role · الإنسان خلف الدور', 'أين ينتهي الدور وتبدأ أنت؟'],
      ['Presence · الحضور', 'الحضور ليس أن يراك الآخرون. إنه أن تكون حاضراً بالكامل.'],
      ['The Handshake · المصافحة', 'ما الذي يمكن أن تقوله لحظة واحدة قبل أن تبدأ المحادثة؟'],
      ['Reading the Room · قراءة الغرفة', 'الأشخاص، الصمت، التوقيت، السلطة والإشارات التي لا تُقال.'],
      ['The Conversation Behind the Conversation · المحادثة خلف المحادثة', 'كيف تسمع ما وراء الكلمات، وتفهم ما لا يُقال مباشرة؟'],
      ['The Table · الطاولة', 'ماذا يحدث عندما نجلس إلى الطاولة؟ وكيف تصبح التفاصيل الصغيرة جزءاً من التفاوض؟'],
      ['Conscious Negotiation · التفاوض الواعي', 'التفاوض ليس فقط الحصول على ما تريد، بل فهم ما يريده الآخر وما الذي يبقى بعد الاتفاق.'],
      ['The Difficult Person · الشخص الصعب', 'كيف تنتقل من الاحتكاك إلى الاتصال، ومن الاتصال إلى إمكانية الاتفاق؟'],
      ['Power Has a Temperature · للقوة درجة حرارة', 'القوة ليست دائماً في المنصب أو الصوت الأعلى. لها حضور، ودرجة حرارة، وطريقة تتحرك بها داخل الغرفة.'],
      ['The Diplomatic Self · الذات الدبلوماسية', 'كيف تحافظ على نفسك وأنت تمثل دوراً، مؤسسة أو قضية؟'],
      ['The New Diplomat · الدبلوماسي الجديد', 'ما الذي يعنيه أن تكون دبلوماسياً في عالم جديد، حيث أصبح التأثير أسرع، والمعلومات أكثر، والذكاء الاصطناعي يعيد تشكيل طريقة تفاعلنا مع العالم؟'],
    ],
    whyLabel: 'لماذا هذا الكورس؟',
    whyTitle: 'العالم لا يحتاج فقط إلى أشخاص يعرفون ماذا يقولون.',
    whyIntro: 'إنه يحتاج إلى أشخاص يعرفون:',
    whyPoints: ['متى يتكلمون.', 'متى يصمتون.', 'ماذا يرون.', 'ماذا يمثلون.', 'كيف يؤثرون.', 'وماذا يتركون وراءهم.'],
    audience: 'ليس عليك أن تكون دبلوماسياً لتبدأ. إذا كنت قائداً، محامياً، رائد أعمال، موظفاً، طالباً، صانع محتوى، مفاوضاً، أو ببساطة شخصاً يريد أن يفهم نفسه والآخرين والعالم بطريقة أكثر وعياً، فهذا الكورس صُمم ليكون نقطة دخولك الأولى.',
    formatLabel: 'شكل التجربة',
    format: [
      ['12', 'جلسة قصيرة'],
      ['30', 'دقيقة لكل جلسة'],
      ['AR + EN', 'بالعربية والإنجليزية'],
      ['Online', 'من أي مكان'],
    ],
    formatBody: 'جلسات قصيرة ومركزة، مصممة لتناسب إيقاع الحياة الحديثة، لكن محتواها يفتح أبواباً أكبر من مدة الجلسة نفسها. لا تحتاج إلى خلفية أكاديمية في الدبلوماسية أو العلاقات الدولية. تحتاج فقط إلى الاستعداد لأن تنظر إلى الأشياء التي اعتدت رؤيتها بطريقة مختلفة.',
    nextLabel: 'ماذا بعد الكورس؟',
    nextTitle: 'هذه بداية الرحلة.',
    nextBody: 'شفرة الدبلوماسية الواعية ليست نهاية التعلم، بل البوابة الأولى إلى منظومة أوسع ومسارات أكثر تخصصاً، منها:',
    paths: [
      ['The Art of Presence', 'فن الحضور'],
      ['Reading the Room', 'قراءة الغرفة'],
      ['Conscious Communication', 'التواصل الواعي'],
      ['Conscious Negotiation', 'التفاوض الواعي'],
      ['Power, Influence & Ethical Leadership', 'القوة والتأثير والقيادة الواعية'],
      ['The Diplomatic Self', 'الذات الدبلوماسية'],
      ['AI, Influence & The New Diplomacy', 'الذكاء الاصطناعي والتأثير والدبلوماسية الجديدة'],
    ],
    close: ['شاهد بطريقة مختلفة.', 'ادخل بوعي.', 'وأثّر بذكاء.'],
    back: 'كل البرامج',
  },
} as const;

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  return localizedPageMetadata({
    lang,
    path: '/programs/conscious-diplomacy-code',
    title: lang === 'ar' ? 'شفرة الدبلوماسية الواعية' : 'The Conscious Diplomacy Code',
    description: content[lang].lead,
  });
}

export default async function ConsciousDiplomacyCodePage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const t = content[lang];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <Link className={styles.backLink} href={`/${lang}/programs`}>← {t.back}</Link>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className={styles.secondTitle}>{t.arabicTitle}</p>
            </div>
            <div className={styles.heroAside}>
              <p>{t.lead}</p>
              <a className={styles.primaryCta} href="#registration">{t.cta}<span>↓</span></a>
            </div>
          </div>
          <div className={styles.heroMeta}>
            {t.format.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.overview}>
        <div className={`container ${styles.readingGrid}`}>
          <div className={styles.sideNote}>CONSCIOUS<br />DIPLOMACY<br />CODE</div>
          <div className={styles.prose}>
            {t.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className={styles.questions}>
              <p>{t.questionLead}</p>
              <ul>{t.questions.map((question) => <li key={question}>{question}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.curriculum}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span>{t.curriculumLabel}</span>
            <h2>{t.curriculumTitle}</h2>
          </div>
          <ol className={styles.sessionList}>
            {t.sessions.map(([title, description], index) => (
              <li key={title}>
                <span className={styles.sessionNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.why}>
        <div className={`container ${styles.whyGrid}`}>
          <div>
            <span className={styles.lightLabel}>{t.whyLabel}</span>
            <h2>{t.whyTitle}</h2>
          </div>
          <div>
            <p className={styles.whyIntro}>{t.whyIntro}</p>
            <ul className={styles.whyPoints}>{t.whyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
            <p className={styles.audience}>{t.audience}</p>
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span>{t.formatLabel}</span>
            <h2>{t.formatBody}</h2>
          </div>
          <div className={styles.formatGrid}>
            {t.format.map(([value, label], index) => (
              <article key={label}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.next}>
        <div className={`container ${styles.nextGrid}`}>
          <div className={styles.nextIntro}>
            <span>{t.nextLabel}</span>
            <h2>{t.nextTitle}</h2>
            <p>{t.nextBody}</p>
          </div>
          <ol className={styles.pathList}>
            {t.paths.map(([english, arabic], index) => (
              <li key={english}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{english}</strong><small>{arabic}</small></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className="container">
          <p>THE CONSCIOUS DIPLOMACY CODE</p>
          <h2>{t.close.map((line) => <span key={line}>{line}</span>)}</h2>
          <a href="#registration">{t.cta} <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <CourseRegistrationForm lang={lang} />
    </div>
  );
}
