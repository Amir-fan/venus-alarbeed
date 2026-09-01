import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/public/venuslogo.jpeg';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/i18n';
import DevTag from './DevTag';
import styles from './Footer.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const personalSocial = [
  { label: 'Instagram', href: 'https://www.instagram.com/venus.alarbeed', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/venus.alarbeed', icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/venus-alarbeed', icon: LinkedInIcon },
  { label: 'The New Ray', href: 'https://www.facebook.com/The.new.ray11', icon: FacebookIcon },
];

const footerLinks = [
  { key: 'venus' as const, path: '/venus' },
  { key: 'consciousDiplomacy' as const, path: '/conscious-diplomacy' },
  { key: 'newRay' as const, path: '/the-new-ray' },
  { key: 'elaraVega' as const, path: '/elara-vega' },
  { key: 'programs' as const, path: '/programs' },
  { key: 'library' as const, path: '/library' },
  { key: 'contact' as const, path: '/contact' },
];

export default function Footer({ lang, d }: Props) {
  return (
    <footer className={styles.footer}>
      {/* Creative background watermark */}
      <div className={styles.watermark} aria-hidden="true">
        VENUS
      </div>
      <div className={styles.glow} aria-hidden="true" />
      
      <div className={styles.inner}>
        {/* Top row */}
        <div className={styles.top}>
          <div className={styles.identity}>
            <div className={styles.brandRow}>
              <Link href={`/${lang}`} className={styles.logo} aria-label={`${d.hero.nameFirst} ${d.hero.nameLast}`}>
                <Image
                  src={logoImg}
                  alt=""
                  width={76}
                  height={76}
                  className={styles.logoImage}
                />
              </Link>
              <span className={styles.name}>{d.hero.nameFirst} {d.hero.nameLast}</span>
            </div>
            <span className={styles.tagline}>{d.footer.tagline}</span>
            <p className={styles.statement}>{d.footer.statement}</p>
          </div>

          {/* Nav columns */}
          <nav className={styles.nav} aria-label="Footer navigation">
            <ul className={styles.navList} role="list">
              {footerLinks.map(({ key, path }) => (
                <li key={key}>
                  <Link href={`/${lang}${path}`} className={styles.navLink}>
                    {d.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {d.hero.nameFirst} {d.hero.nameLast}.{' '}
              {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
            <DevTag />
          </div>
          <div className={styles.social}>
            {personalSocial.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
