"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full pt-28 pb-14 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden bg-linear-to-br from-background via-background to-sage-light">
      {/* Subtle organic sage blurred ambient background shape */}
      <div 
        className="absolute -top-32 -right-32 w-87.5 sm:w-150 h-87.5 sm:h-150 bg-secondary/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-75 sm:w-112.5 h-75 sm:h-112.5 bg-sage-light/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <SectionHeading 
              align="left"
              eyebrow={t('eyebrow')}
              heading={t('heading')}
              subtext={t('subtext')}
              isHero={true}
              className="mb-5 sm:mb-8"
            />
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link href="/coach" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto py-3.5 px-6 sm:px-8 text-sm sm:text-base font-semibold">
                  {t('cta_primary')}
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto py-3.5 px-6 sm:px-8 text-sm sm:text-base font-semibold">
                  {t('cta_outline')}
                </Button>
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 border-t border-border-subtle text-xs sm:text-sm font-medium text-text-muted w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>1-on-1 Tailored Coaching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Sustainable Results</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Stage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg lg:max-w-none mx-auto mt-2 lg:mt-0"
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute -inset-4 bg-secondary/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" 
              aria-hidden="true"
            />
            
            {/* Offset Background Accent Panel */}
            <div 
              className="absolute inset-0 bg-sage-light rounded-3xl transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 border border-border-subtle/60" 
              aria-hidden="true"
            />

            {/* Fitted Image Card */}
            <div className="relative z-10 w-full aspect-576/314 rounded-3xl overflow-hidden bg-white border border-border-subtle shadow-md">
              <Image
                src="/images/hero.webp"
                alt="LSR Nutrition Club Hero"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Badge with Premium Icon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md border border-border-subtle shadow-md rounded-2xl p-3 px-4 sm:p-3.5 sm:px-4.5 flex items-center gap-3 max-w-[calc(100vw-3rem)] sm:max-w-xs"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-text-muted font-medium">Holistic Wellness</p>
                <p className="text-xs sm:text-sm text-text-dark font-bold font-heading">Personalized Coaching</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
