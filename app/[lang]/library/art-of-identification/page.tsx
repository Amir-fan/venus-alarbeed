import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { artOfIdentification } from '@/lib/articles/artOfIdentification';
import { localizedPageMetadata } from '@/lib/seo';
import styles from './page.module.css';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const article = artOfIdentification[lang];
  return localizedPageMetadata({
    lang,
    path: '/library/art-of-identification',
    title: article.title,
    description: article.lead,
  });
}

export default async function ArtOfIdentificationPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const article = artOfIdentification[lang];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroShape} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <Link href={`/${lang}/library`} className={styles.backLink}>
            ← {lang === 'ar' ? 'العودة إلى المكتبة' : 'Back to the library'}
          </Link>
          <div className={styles.heroCopy}>
            <p className={styles.label}>{article.label}</p>
            <h1>{article.title}</h1>
            <p className={styles.lead}>{article.lead}</p>
          </div>
          <div className={styles.meta}>
            <span>{article.author}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      <div className={styles.articleWrap}>
        <div className={`container ${styles.articleGrid}`}>
          <aside className={styles.articleIndex} aria-hidden="true">
            <span>01</span><i /><span>05</span>
          </aside>
          <article className={styles.article}>
            {article.sections.map((section, index) => (
              <section key={section.heading} className={styles.section}>
                <div className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')}</div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${index}-${paragraphIndex}`} className={index === 0 && paragraphIndex === 0 ? styles.opening : undefined}>
                    {paragraph}
                  </p>
                ))}
                {'questions' in section && section.questions && (
                  <ul className={styles.questions}>
                    {section.questions.map((question) => <li key={question}>{question}</li>)}
                  </ul>
                )}
                {'pullQuote' in section && section.pullQuote && (
                  <blockquote>{section.pullQuote}</blockquote>
                )}
                {'closing' in section && section.closing && section.closing.map((paragraph, closingIndex) => (
                  <p key={`closing-${index}-${closingIndex}`}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>

      <section className={styles.articleFooter} aria-label={lang === 'ar' ? 'نهاية المقال' : 'End of essay'}>
        <div className="container">
          <span>{lang === 'ar' ? 'نهاية المقال' : 'End of essay'}</span>
          <h2>{lang === 'ar' ? 'أرني الصورة كاملة.' : 'Show me the complete picture.'}</h2>
          <Link href={`/${lang}/library`}>
            {lang === 'ar' ? 'استكشف مكتبة فينوس' : 'Explore the Venus Library'} <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
