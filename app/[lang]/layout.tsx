import type { Metadata } from "next";
import { dict, locales, type Locale } from "@/lib/i18n";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { homeSeo, localizedPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const seo = homeSeo[lang];
  const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/venus-alarbeed' : '';
  return {
    ...localizedPageMetadata({
      lang,
      title: seo.title,
      description: seo.description,
    }),
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: lang === 'ar' ? "%s | فينوس العربيد" : "%s | Venus Alarbeed",
    },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    keywords: lang === 'ar'
      ? ['فينوس العربيد', 'الدبلوماسية الواعية', 'دبلوماسية', 'قانون دولي', 'كاتبة', 'متحدثة']
      : ['Venus Alarbeed', 'Conscious Diplomacy', 'diplomacy', 'international law', 'author', 'speaker'],
    icons: {
      icon: [{ url: `${basePath}/venuslogo.jpeg`, type: 'image/jpeg' }],
      shortcut: `${basePath}/venuslogo.jpeg`,
      apple: `${basePath}/venuslogo.jpeg`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const d = dict[lang];
  const isRTL = lang === "ar";
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: 'فينوس العربيد',
        inLanguage: ['en', 'ar'],
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#venus-alarbeed`,
        name: SITE_NAME,
        alternateName: 'فينوس العربيد',
        url: `${SITE_URL}/${lang}`,
        image: `${SITE_URL}/venus_portrait.png`,
        description: homeSeo[lang].description,
        jobTitle: lang === 'ar'
          ? ['دبلوماسية', 'محامية', 'كاتبة', 'متحدثة', 'مدرّبة']
          : ['Diplomat', 'Lawyer', 'Author', 'Speaker', 'Trainer'],
        sameAs: [
          'https://www.instagram.com/venus.alarbeed',
          'https://www.facebook.com/venus.alarbeed',
          'https://www.linkedin.com/in/venus-alarbeed',
          'https://youtube.com/@venusalarbeed936',
        ],
      },
    ],
  };

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <Navigation lang={lang} d={d} />
        <main>{children}</main>
        <Footer lang={lang} d={d} />
      </body>
    </html>
  );
}
