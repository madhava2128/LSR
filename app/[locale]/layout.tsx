import type { Metadata, Viewport } from "next";
import { Lora, Noto_Sans_Telugu } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const SITE_URL = "https://lsrnutritionclub.in";
const SITE_NAME = "LSR Nutrition Club";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  const pageTitle = t("title");
  const pageDescription = t("description");

  const canonicalPath = `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: pageTitle,
      template: `%s | ${SITE_NAME}`,
    },

    description: pageDescription,

    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,

    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/en",
        te: "/te",
        "x-default": "/en",
      },
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: locale === "te" ? "te_IN" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },

    icons: {
      icon: "/icon.svg",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (
    !routing.locales.includes(
      locale as (typeof routing.locales)[number]
    )
  ) {
    notFound();
  }

  const messages = await getMessages();

  const fontClass = locale === "te" ? "font-te" : "font-en";

  return (
    <html
      lang={locale}
      className={`${lora.variable} ${telugu.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-full flex flex-col bg-background text-text-dark ${fontClass} overflow-x-hidden`}
      >
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