import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Quote, ArrowRight, Star } from 'lucide-react';

// Mapping from message key to URL slug
const PROGRAM_SLUGS: Record<string, string> = {
  '1': 'weight-loss',
  '2': 'nutrition-supplements',
  '3': 'mindful-eating',
  '4': 'personalized-nutrition',
};

export function Services() {
  const t = useTranslations('Services');

  const programKeys = ['1', '2', '3', '4'];

  return (
    <section id="services" className="w-full py-14 sm:py-20 md:py-24 bg-sage-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading 
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {programKeys.map((key, index) => (
            <Card key={key} className="flex flex-col h-full group p-5 sm:p-8 md:p-10 justify-between bg-white border border-border-subtle hover:border-secondary transition-all">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-primary font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                    0{index + 1} — {t('program_label')}
                  </span>
                  <div className="flex items-center gap-0.5 text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent-gold" />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-dark mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  {t(`items.${key}.title`)}
                </h3>
                
                <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
                  {t(`items.${key}.description`)}
                </p>
              </div>

              <div>
                {/* Client Testimonial Badge */}
                <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-sage-light/70 border border-border-subtle flex items-start gap-3">
                  <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5 fill-primary/20" />
                  <div>
                    <p className="text-xs italic text-text-dark font-medium leading-relaxed">
                      &ldquo;{t(`items.${key}.testimonial_quote`)}&rdquo;
                    </p>
                    <p className="text-[11px] font-bold text-primary mt-1">
                      — {t(`items.${key}.testimonial_author`)}
                    </p>
                  </div>
                </div>

                <Link 
                  href={`/services/${PROGRAM_SLUGS[key]}`}
                  className="text-primary font-semibold text-sm inline-flex items-center gap-2 py-2 min-h-11 group-hover:text-primary-hover transition-colors"
                >
                  {t('learn_more')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
