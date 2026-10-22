import React from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { FAQAccordion, FAQItem } from '@/components/FAQAccordion';
import { Button } from '@/components/Button';
import { Quote, Star, CheckCircle2, TrendingUp } from 'lucide-react';

// Valid program slugs
const VALID_SLUGS = [
  'weight-loss',
  'nutrition-supplements',
  'mindful-eating',
  'personalized-nutrition',
  'skin-health',
  'bone-joint-health'
] as const;

type SlugType = (typeof VALID_SLUGS)[number];

// Icon mapping per program
const PROGRAM_ICONS: Record<SlugType, React.ReactNode> = {
  'weight-loss': (
    <svg className="w-12 h-12 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'nutrition-supplements': (
    <svg className="w-12 h-12 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.428 2.378l.4 2A2 2 0 006.55 21h10.9a2 2 0 001.978-1.502l.4-2a2 2 0 00-.4-1.07zM12 3v8m0 0l-3-3m3 3l3-3" />
    </svg>
  ),
  'mindful-eating': (
    <svg className="w-12 h-12 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  'personalized-nutrition': (
    <svg className="w-12 h-12 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  'skin-health': (
    <svg className="w-12 h-12 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C8 3 5 6 5 10c0 2.5 1.5 4.5 3 6l1 2h6l1-2c1.5-1.5 3-3.5 3-6 0-4-3-7-7-7zm0 0v18M9 21h6" />
    </svg>
  ),
  'bone-joint-health': (
    <svg className="w-12 h-12 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H7a2 2 0 00-2 2v2m0 10v2a2 2 0 002 2h2m10-16h-2a2 2 0 00-2 2v2m0 10v2a2 2 0 002 2h2M7 9h10M7 15h10" />
    </svg>
  )
};

export default async function ProgramDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug as SlugType)) {
    notFound();
  }

  const typedSlug = slug as SlugType;
  const t = await getTranslations({ locale, namespace: `ProgramDetails.${typedSlug}` });

  // Get raw arrays safely
  const rawHighlights = t.raw('highlights');
  const rawBenefits = t.raw('benefits');
  const rawFaqs = t.raw('faqs');

  const highlights = Array.isArray(rawHighlights) ? (rawHighlights as string[]) : [];
  const benefits = Array.isArray(rawBenefits) ? (rawBenefits as string[]) : [];
  const faqs = Array.isArray(rawFaqs) ? (rawFaqs as FAQItem[]) : [];

  return (
    <main className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary-green transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-primary-green transition-colors">Programs</Link>
          <span>/</span>
          <span className="text-text-dark font-medium">{t('title')}</span>
        </div>

        {/* Hero Header Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-primary-green/10 shadow-xs mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="p-4 bg-primary-green/10 rounded-2xl border border-primary-green/20">
              {PROGRAM_ICONS[typedSlug]}
            </div>
            <div>
              <span className="text-xs font-extrabold tracking-widest text-primary-green uppercase">
                {t('eyebrow')}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mt-1">
                {t('title')}
              </h1>
            </div>
          </div>

          <p className="text-xl font-medium text-primary-green mb-6 max-w-3xl leading-relaxed">
            {t('tagline')}
          </p>

          <p className="text-text-muted text-lg max-w-4xl leading-relaxed">
            {t('overview')}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact">
              <Button variant="primary" className="py-3 px-8 text-base">
                Enquire About This Program
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="py-3 px-8 text-base">
                Back to All Programs
              </Button>
            </Link>
          </div>
        </div>

        {/* Client Testimonial Highlight Banner */}
        <div className="bg-linear-to-r from-accent-green/10 via-primary-green/10 to-transparent border border-primary-green/20 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-accent-green text-white flex items-center justify-center shrink-0 shadow-md">
            <Quote className="w-7 h-7 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-accent-green ml-2 uppercase tracking-wider">Client Success Story</span>
            </div>
            <p className="text-text-dark font-medium italic text-lg sm:text-xl leading-relaxed mb-2">
              &ldquo;{t('testimonial_quote')}&rdquo;
            </p>
            <p className="text-sm font-bold text-accent-green">
              — {t('testimonial_author')}
            </p>
          </div>
        </div>

        {/* Program Highlights & Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Key Features & Highlights */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-primary-green/10 shadow-xs flex flex-col">
            <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary-green" />
              Key Features & Highlights
            </h2>

            <ul className="space-y-4 grow">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted text-base leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-primary-green mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Benefits */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-primary-green/10 shadow-xs flex flex-col">
            <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary-green" />
              Expected Benefits
            </h2>

            <ul className="space-y-4 grow mb-8">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted text-base leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-primary-green uppercase tracking-wider mb-2">Who It&apos;s For</h4>
              <p className="text-text-muted text-sm leading-relaxed">{t('who_its_for')}</p>
            </div>
          </div>

        </div>

        {/* Program-Specific FAQs */}
        <FAQAccordion
          title={`FAQs for ${t('title')}`}
          faqs={faqs}
          className="mt-8"
        />

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-primary-green/10 border border-primary-green/20 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-text-dark mb-4">Ready to Transform Your Health?</h3>
          <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
            Book your consultation today and take the first step toward personalized nutrition and sustainable wellness.
          </p>
          <Link href="/contact">
            <Button variant="primary" className="py-3 px-8 text-lg">
              Get Started with This Program
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
