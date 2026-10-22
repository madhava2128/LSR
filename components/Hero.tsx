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
    <section className="relative w-full pt-32 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Background Soft Lighting Gradients */}
      <div 
        className="absolute -top-32 -right-32 w-87.5 sm:w-150 h-87.5 sm:h-150 bg-linear-to-bl from-primary-green/25 via-accent-green/15 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-75 sm:w-112.5 h-75 sm:h-112.5 bg-linear-to-tr from-primary-green/15 via-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          
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
              className="mb-6 sm:mb-8"
            />
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link href="/coach" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto py-3.5 text-base">{t('cta_primary')}</Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto py-3.5 text-base">{t('cta_outline')}</Button>
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-primary-green/15 text-xs sm:text-sm font-medium text-text-muted w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
                <span>1-on-1 Tailored Coaching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-green shrink-0" />
                <span>Sustainable Results</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Stage with Cleaned & Cropped hero.webp */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg lg:max-w-none mx-auto mt-2 lg:mt-0"
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute -inset-4 bg-linear-to-tr from-primary-green/25 via-accent-green/15 to-emerald-200/30 rounded-3xl blur-2xl opacity-70 pointer-events-none" 
              aria-hidden="true"
            />
            
            {/* Offset Background Accent Panel */}
            <div 
              className="absolute inset-0 bg-primary-green/15 rounded-3xl transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4" 
              aria-hidden="true"
            />

            {/* Perfectly Fitted Image Card without Black Letterboxing */}
            <div className="relative z-10 w-full aspect-576/314 rounded-3xl overflow-hidden bg-white border border-primary-green/15 shadow-xl">
              <Image
                src="/images/hero.webp"
                alt="LSR Nutrition Club Hero"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Glassmorphic Badge with Premium Icon - Mobile Bounds Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 left-2 sm:-left-6 z-20 backdrop-blur-md bg-white/95 border border-white/80 shadow-lg rounded-2xl p-3 px-4 sm:p-3.5 sm:px-4.5 flex items-center gap-3 max-w-[calc(100vw-3rem)] sm:max-w-xs"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-primary-green to-accent-green flex items-center justify-center text-white shadow-xs shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-text-muted font-medium">Holistic Wellness</p>
                <p className="text-xs sm:text-sm text-text-dark font-bold">Personalized Coaching</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
