import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function CoachProfile() {
  const t = useTranslations('CoachProfile');

  return (
    <section id="coach" className="w-full py-14 sm:py-20 md:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Editorial Photo Side */}
          <div className="lg:col-span-5 relative w-full aspect-4/5 sm:aspect-3/4 lg:aspect-auto lg:h-135 rounded-3xl sm:rounded-4xl overflow-hidden shadow-xs border border-border-subtle bg-sage-light flex flex-col items-center justify-center">
            <Image
              src="/images/services/coach-siva.webp"
              alt={t('name')}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Bio Text Side */}
          <div className="lg:col-span-7 lg:pl-6 flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase mb-3 sm:mb-4">
              {t('eyebrow')}
            </span>

            <div className="relative mb-2 sm:mb-3 w-max max-w-full">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-text-dark wrap-break-word">
                {t('name')}
              </h2>
              {/* Teal underline accent */}
              <div className="absolute -bottom-2 left-0 w-20 sm:w-24 h-1.5 bg-primary rounded-full" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-text-muted mt-6 mb-6">
              {t('title')}
            </h3>

            <div className="text-base sm:text-lg text-text-muted leading-relaxed space-y-4 sm:space-y-6">
              <p>{t('bio_1')}</p>
              <p>{t('bio_2')}</p>
              <p className="text-xs sm:text-sm italic opacity-85 mt-4 text-primary">
                {t('credentials_note')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
