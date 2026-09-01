import type { Metadata } from "next";
import { dict, locales, type Locale } from "@/lib/i18n";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
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
  const d = dict[lang];
  return {
    title: {
      default: "Venus Alarbeed",
      template: "%s — Venus Alarbeed",
    },
    description: d.hero.statement,
    icons: {
      icon: [{ url: '/venuslogo.jpeg', type: 'image/jpeg' }],
      shortcut: '/venuslogo.jpeg',
      apple: '/venuslogo.jpeg',
    },
    openGraph: {
      title: "Venus Alarbeed",
      description: d.hero.statement,
      locale: lang === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
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

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body>
        <Navigation lang={lang} d={d} />
        <main>{children}</main>
        <Footer lang={lang} d={d} />
      </body>
    </html>
  );
}
