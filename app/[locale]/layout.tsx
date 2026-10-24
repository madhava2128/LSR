import type { Metadata, Viewport } from "next";
import { Lora, Noto_Sans_Telugu } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#155E59",
};

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const telugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://lsrnutritionclub.in'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://lsrnutritionclub.in/${locale}`,
      siteName: 'LSR Nutrition Club',
      locale: locale === 'te' ? 'te_IN' : 'en_US',
      type: 'website',
    },
    icons: {
      icon: '/icon.svg',
    },
    alternates: {
      languages: {
        'en': '/en',
        'te': '/te',
        'x-default': '/en'
      }
    }
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  
  // Assign a font class to the body based on the active locale
  const fontClass = locale === 'te' ? 'font-te' : 'font-en';

  return (
    <html
      lang={locale}
      className={`${lora.variable} ${telugu.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col bg-background text-text-dark ${fontClass} overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="grow overflow-x-hidden">
            {children}
          </div>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
