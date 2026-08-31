import { dict, type Locale } from '@/lib/i18n';
import styles from './page.module.css';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  return {
    title: d.nav.library,
    description: d.library.heading,
  };
}

export default async function LibraryPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.label}>{d.library.label}</p>
          <h1 className={styles.heading}>{d.library.heading}</h1>
          <p className={styles.body}>{d.library.body}</p>
        </div>
      </div>

      <div className={styles.hubSection}>
        <div className={styles.hubGrid}>
          {/* READ */}
          <div className={styles.hubCategory}>
            <h2 className={styles.catTitle}>{d.library.read}</h2>
            <ul className={styles.catList}>
              <li className={styles.catItem}>
                <h3>{d.library.articles}</h3>
              </li>
              <li className={styles.catItem}>
                <h3>{d.library.books}</h3>
                <p className={styles.bookTitle}>— {d.book.title}</p>
              </li>
              <li className={styles.catItem}>
                <h3>{d.library.notes}</h3>
              </li>
            </ul>
          </div>

          {/* WATCH */}
          <div className={styles.hubCategory}>
            <h2 className={styles.catTitle}>{d.library.watch}</h2>
            <ul className={styles.catList}>
              <li className={styles.catItem}>
                <h3>{d.library.films}</h3>
              </li>
              <li className={styles.catItem}>
                <h3>{d.library.reels}</h3>
              </li>
            </ul>
          </div>

          {/* LISTEN & LEARN */}
          <div className={styles.hubCategory}>
            <h2 className={styles.catTitle}>{d.library.learn}</h2>
            <ul className={styles.catList}>
              <li className={styles.catItem}>
                <h3>{d.library.lectures}</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Venus Notes Teaser */}
      <div className={styles.notesSection}>
        <div className={styles.notesHeader}>
          <h2 className={styles.notesTitle}>{d.notes.label}</h2>
          <p className={styles.notesDesc}>{d.notes.heading}</p>
        </div>
        <div className={styles.notesGrid}>
          {d.notes.sampleNotes.map((note, i) => (
            <div key={i} className={styles.noteCard} dir={note.lang === 'ar' ? 'rtl' : 'ltr'}>
              <p className={`${styles.noteText} ${note.lang === 'ar' ? styles.arText : ''}`}>
                &ldquo;{note.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
