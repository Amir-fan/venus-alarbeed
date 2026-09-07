import type { Metadata } from 'next';
import { dict, type Locale } from '@/lib/i18n';
import BookCheckout from './BookCheckout';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isAr = lang === 'ar';

  return {
    title: isAr ? 'شراء كتاب الدبلوماسية الواعية' : 'Buy Conscious Diplomacy',
    description: isAr
      ? 'اشتر نسختك الرقمية من كتاب الدبلوماسية الواعية عبر شام كاش.'
      : 'Purchase the digital edition of Conscious Diplomacy securely through Sham Cash.',
  };
}

export default async function BookPage({ params }: Props) {
  const { lang } = (await params) as { lang: Locale };

  return <BookCheckout lang={lang} d={dict[lang]} />;
}
