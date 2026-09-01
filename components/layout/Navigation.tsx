'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Form from 'next/form';
import Image from 'next/image';
import logoImg from '@/public/venuslogo.jpeg';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/i18n';
import styles from './Navigation.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function Navigation({ lang, d }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const otherLang = lang === 'en' ? 'ar' : 'en';
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Remove the current language from the pathname to get the clean route
  // e.g. "/en/conscious-diplomacy" -> "/conscious-diplomacy"
  // e.g. "/ar" -> ""
  const currentPath = pathname.replace(`/${lang}`, '') || '/';

  const enHref = `/en${currentPath === '/' ? '' : currentPath}`;
  const arHref = `/ar${currentPath === '/' ? '' : currentPath}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: `/${lang}/venus`, label: d.nav.venus },
    { href: `/${lang}/conscious-diplomacy`, label: d.nav.consciousDiplomacy },
    { href: `/${lang}/the-new-ray`, label: d.nav.newRay },
    { href: `/${lang}/elara-vega`, label: d.nav.elaraVega },
    { href: `/${lang}/programs`, label: d.nav.programs },
    { href: `/${lang}/library`, label: d.nav.library },
    { href: `/${lang}/contact`, label: d.nav.contact },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href={`/${lang}`} className={styles.logo} onClick={() => setMenuOpen(false)}>
            <span className={styles.logoMark}>
              <Image
                src={logoImg}
                alt=""
                width={42}
                height={42}
                className={styles.logoImage}
                priority
              />
            </span>
            <span className={styles.logoName}>{d.hero.nameFirst} {d.hero.nameLast}</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className={styles.controls}>
            {/* Search Bar */}
            <div className={styles.searchContainer}>
              <Form action={`/${lang}/search/`} className={styles.searchForm} role="search">
                <input
                  type="search"
                  name="q"
                  placeholder={lang === 'ar' ? 'بحث...' : 'Search...'}
                  className={styles.searchInput}
                  aria-label={lang === 'ar' ? 'البحث في الموقع' : 'Search the website'}
                  maxLength={80}
                />
                <button
                  type="submit"
                  className={styles.searchBtn}
                  aria-label={lang === 'ar' ? 'إرسال البحث' : 'Submit search'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </Form>
            </div>

            {/* Language Selector Dropdown */}
            {langOpen && (
              <div 
                className={styles.langOverlay} 
                onClick={() => setLangOpen(false)}
                aria-hidden="true"
              />
            )}
            <div className={styles.langContainer}>
              <button
                className={styles.langSwitch}
                onClick={() => setLangOpen(!langOpen)}
                aria-haspopup="true"
                aria-expanded={langOpen}
              >
                <span className={styles.flag}>
                  {lang === 'ar' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 427" width="16" height="11"><path fill="#006c35" d="M0 0h640v427H0z"/><path fill="#fff" d="M225 180c-9 22-31 29-47 30l4 8c25 1 45-21 53-38h245v-9H225zm223-11v-40h-49v18c-30-22-68-23-100-24v9c25 2 61 7 88 26h-23v11h84zm-37-31v22h-18v-22h18zm-229 55c0 14-8 27-21 34l3 7c17-10 27-26 27-41h-9zm-59 29c-12 11-28 17-45 19l4 7c16-2 37-10 50-21l-9-5zm84-48c0 13-10 25-23 29l2 7c17-6 30-22 30-36h-9zM203 268h-11c-22-29-37-64-44-100h11c7 35 22 69 44 98z"/><path fill="#fff" d="M495 244H135l17 19h326l17-19z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#bd3d44" d="M0 0h640v480H0"/><path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364v258H0"/><path fill="#fff" d="M12.912 21.059l50.04-36.353 50.04 36.353-19.112-58.825L13.769-37.766h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825L130.66-37.766h61.815l-19.112 58.825zM246.7 21.059l50.04-36.353 50.04 36.353-19.112-58.825L247.551-37.766h61.815L290.254 21.059zm-175.342 54.34l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm-233.784 54.34l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815L290.254 129.74zM71.358 184.08l50.04-36.353 50.04 36.353-19.112-58.825L82.215 125.215h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm-233.784 54.34l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825z"/></svg>
                  )}
                </span>
                <span>{lang === 'ar' ? 'ع' : 'EN'}</span>
                <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`${styles.langDropdown} ${langOpen ? styles.langOpen : ''}`}>
                <Link
                  href={enHref}
                  className={`${styles.langOption} ${lang === 'en' ? styles.langActive : ''}`}
                  onClick={() => setLangOpen(false)}
                >
                  <span className={styles.flag}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12"><path fill="#bd3d44" d="M0 0h640v480H0"/><path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364v258H0"/><path fill="#fff" d="M12.912 21.059l50.04-36.353 50.04 36.353-19.112-58.825L13.769-37.766h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825L130.66-37.766h61.815l-19.112 58.825zM246.7 21.059l50.04-36.353 50.04 36.353-19.112-58.825L247.551-37.766h61.815L290.254 21.059zm-175.342 54.34l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm-233.784 54.34l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815L290.254 129.74zM71.358 184.08l50.04-36.353 50.04 36.353-19.112-58.825L82.215 125.215h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm-233.784 54.34l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825zm116.892 0l50.04-36.353 50.04 36.353-19.112-58.825-39.816 28.96h61.815l-19.112 58.825z"/></svg>
                  </span> EN
                </Link>
                <Link
                  href={arHref}
                  className={`${styles.langOption} ${lang === 'ar' ? styles.langActive : ''}`}
                  onClick={() => setLangOpen(false)}
                >
                  <span className={styles.flag}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 427" width="16" height="11"><path fill="#006c35" d="M0 0h640v427H0z"/><path fill="#fff" d="M225 180c-9 22-31 29-47 30l4 8c25 1 45-21 53-38h245v-9H225zm223-11v-40h-49v18c-30-22-68-23-100-24v9c25 2 61 7 88 26h-23v11h84zm-37-31v22h-18v-22h18zm-229 55c0 14-8 27-21 34l3 7c17-10 27-26 27-41h-9zm-59 29c-12 11-28 17-45 19l4 7c16-2 37-10 50-21l-9-5zm84-48c0 13-10 25-23 29l2 7c17-6 30-22 30-36h-9zM203 268h-11c-22-29-37-64-44-100h11c7 35 22 69 44 98z"/><path fill="#fff" d="M495 244H135l17 19h326l17-19z"/></svg>
                  </span> العربية
                </Link>
              </div>
            </div>

            <button
              className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileInner}>
          <Form action={`/${lang}/search/`} className={styles.mobileSearch} role="search">
            <input
              type="search"
              name="q"
              placeholder={lang === 'ar' ? 'ابحث في الموقع...' : 'Search the website...'}
              aria-label={lang === 'ar' ? 'البحث في الموقع' : 'Search the website'}
              maxLength={80}
            />
            <button type="submit" aria-label={lang === 'ar' ? 'إرسال البحث' : 'Submit search'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </Form>
          <ul className={styles.mobileLinks} role="list">
            {links.map((link, i) => (
              <li key={link.href} style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileLang}>
            <Link
              href={lang === 'en' ? arHref : enHref}
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {otherLang === 'ar' ? 'العربية' : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
