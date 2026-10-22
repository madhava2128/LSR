import React from 'react';
import Image from 'next/image';
import { Leaf, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('About');

  const bulletPoints = [
    t('bullet_1'),
    t('bullet_2'),
    t('bullet_3'),
    t('bullet_4')
  ];

  return (
    <section id="about" className="w-full py-14 sm:py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Text Left Column */}
          <div className="flex flex-col">
            <SectionHeading 
              align="left"
              eyebrow={t('eyebrow')}
              heading={t('heading')}
              subtext={t('subtext')}
              className="mb-6 sm:mb-8"
            />
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-text-dark">{t('why_choose_us')}</h3>
              <ul className="space-y-3 sm:space-y-4">
                {bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-text-muted text-base sm:text-lg leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Premium Fitted Visual Right Column */}
          <div className="relative w-full max-w-lg lg:max-w-none mx-auto mt-2 lg:mt-0">
            {/* Soft Ambient Blur Glow */}
            <div 
              className="absolute -inset-4 bg-secondary/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" 
              aria-hidden="true"
            />
            
            {/* Background Offset Accent Layer */}
            <div 
              className="absolute inset-0 bg-sage-light rounded-3xl transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 border border-border-subtle/60" 
              aria-hidden="true"
            />

            {/* Perfectly Proportioned Image Frame */}
            <div className="relative z-10 w-full aspect-4/3 sm:aspect-14/10 rounded-3xl overflow-hidden bg-white border border-border-subtle shadow-md flex items-center justify-center">
              <Image
                src="/images/logo/logo.svg"
                alt="LSR Nutrition Club"
                fill
                className="object-contain p-8 sm:p-12 transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Floating Glassmorphic Overlay Badge */}
            <div className="absolute -bottom-4 left-2 sm:-left-6 z-20 backdrop-blur-md bg-white/95 border border-border-subtle shadow-md rounded-2xl p-3.5 px-4 sm:p-4 sm:px-5 flex items-center gap-3 max-w-[calc(100vw-3rem)] sm:max-w-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-text-muted font-medium">Science & Care</p>
                <p className="text-xs sm:text-sm text-text-dark font-bold font-heading">Evidence-Based Guidance</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
