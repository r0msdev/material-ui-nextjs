import { notFound } from 'next/navigation';
import { TranslationsProvider } from '@/contexts/TranslationsContext';
import Navigation from '@/components/Navigation';

// Supported locales
const locales = ['en', 'es', 'en-US', 'es-ES'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  // Await params as it's now a Promise in Next.js 15+
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <TranslationsProvider locale={locale}>
      <Navigation>{children}</Navigation>
    </TranslationsProvider>
  );
}
