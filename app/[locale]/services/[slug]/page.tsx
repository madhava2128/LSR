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
    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'nutrition-supplements': (
    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.428 2.378l.4 2A2 2 0 006.55 21h10.9a2 2 0 001.978-1.502l.4-2a2 2 0 00-.4-1.07zM12 3v8m0 0l-3-3m3 3l3-3" />
    </svg>
  ),
  'mindful-eating': (
    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  'personalized-nutrition': (
    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  'skin-health': (
    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C8 3 5 6 5 10c0 2.5 1.5 4.5 3 6l1 2h6l1-2c1.5-1.5 3-3.5 3-6 0-4-3-7-7-7zm0 0v18M9 21h6" />
    </svg>
  ),
  'bone-joint-health': (
    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-muted mb-6 sm:mb-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-primary transition-colors">Programs</Link>
          <span>/</span>
          <span className="text-text-dark font-semibold truncate max-w-[200px] sm:max-w-none">{t('title')}</span>
        </div>

        {/* Hero Header Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-border-subtle shadow-xs mb-8 sm:mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage-light/60 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="p-3.5 sm:p-4 bg-sage-light rounded-2xl border border-secondary/25 shrink-0">
              {PROGRAM_ICONS[typedSlug]}
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                {t('eyebrow')}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-dark mt-1">
                {t('title')}
              </h1>
            </div>
          </div>

          <p className="text-lg sm:text-xl font-medium text-primary mb-4 sm:mb-6 max-w-3xl leading-relaxed">
            {t('tagline')}
          </p>

          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
            {t('overview')}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto py-3 px-6 sm:px-8 text-sm sm:text-base font-semibold">
                Enquire About This Program
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto py-3 px-6 sm:px-8 text-sm sm:text-base font-semibold">
                Back to All Programs
              </Button>
            </Link>
          </div>
        </div>

        {/* Client Testimonial Highlight Banner */}
        <div className="bg-linear-to-r from-sage-light via-sage-light/60 to-transparent border border-border-subtle rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
            <Quote className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
              ))}
              <span className="text-xs font-bold text-primary ml-2 uppercase tracking-wider">Client Success Story</span>
            </div>
            <p className="text-text-dark font-medium italic text-lg sm:text-xl leading-relaxed mb-2">
              &ldquo;{t('testimonial_quote')}&rdquo;
            </p>
            <p className="text-sm font-bold text-primary">
              — {t('testimonial_author')}
            </p>
          </div>
        </div>

        {/* Program Highlights & Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Key Features & Highlights */}
          <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border-subtle shadow-xs flex flex-col">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-dark mb-4 sm:mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
              <span>Key Features & Highlights</span>
            </h2>

            <ul className="space-y-3 sm:space-y-4 grow">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted text-sm sm:text-base leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Benefits */}
          <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border-subtle shadow-xs flex flex-col">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-dark mb-4 sm:mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
              <span>Expected Benefits</span>
            </h2>

            <ul className="space-y-3 sm:space-y-4 grow mb-6 sm:mb-8">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted text-sm sm:text-base leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-5 sm:pt-6 border-t border-border-subtle">
              <h4 className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-2">Who It&apos;s For</h4>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">{t('who_its_for')}</p>
            </div>
          </div>

        </div>

        {/* Program-Specific FAQs */}
        <FAQAccordion
          title={`FAQs for ${t('title')}`}
          faqs={faqs}
          className="mt-8"
        />

        {/* Bottom Featured Call-to-Action Section */}
        <div className="mt-12 sm:mt-16 bg-primary text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-center max-w-4xl mx-auto shadow-md">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">
            Ready to Transform Your Health?
          </h3>
          <p className="text-sage-light text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Book your consultation today and take the first step toward personalized nutrition and sustainable wellness.
          </p>
          <Link href="/contact" className="inline-block w-full sm:w-auto">
            <button className="w-full sm:w-auto min-h-[44px] py-3.5 px-8 text-sm sm:text-base font-semibold rounded-full bg-white text-primary hover:bg-sage-light hover:text-primary-hover shadow-xs transition-all active:scale-[0.99] cursor-pointer">
              Get Started with This Program
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}
