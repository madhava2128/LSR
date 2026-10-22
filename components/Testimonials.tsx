"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Zap, Star } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { useTranslations } from 'next-intl';

interface TestimonialsProps {
  limit?: number;
}

export function Testimonials({ limit }: TestimonialsProps = {}) {
  const t = useTranslations('Testimonials');

  const allKeys = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const testimonialKeys = limit ? allKeys.slice(0, limit) : allKeys;
  const photos: Record<string, string> = {
    '1': "/images/testimonials/1.webp",
    '2': "/images/testimonials/3.webp",
    '3': "/images/testimonials/2.webp",
    '4': "/images/testimonials/4.webp",
    '5': "/images/testimonials/5.webp",
    '6': "/images/testimonials/6.webp",
    '7': "/images/testimonials/7.webp",
    '8': "/images/testimonials/8.webp"
  };

  return (
    <section id="testimonials" className="w-full py-14 sm:py-20 md:py-24 bg-primary-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subtext={t('subtext')}
            className="mb-10 sm:mb-16"
          />

          {/* Grid featuring large image-first transformation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {testimonialKeys.map((key) => (
              <Card key={key} className="p-0 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 rounded-3xl border border-primary-green/10 bg-white">

                {/* Featured Transformation Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-white overflow-hidden">
                  {photos[key] ? (
                    <Image
                      src={photos[key]}
                      alt={`Transformation of ${t(`items.${key}.name`)}`}
                      fill
                      className="object-contain object-center p-2 group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-6">
                      <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold">{t('missing_photo')}</span>
                    </div>
                  )}

                  {/* Top Badge: Before & After Tag */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="bg-primary-green/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      Before & After
                    </span>
                  </div>

                  {/* Bottom Overlay: Result Badge with Vector Icon */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between items-end">
                    <span className="bg-white/95 backdrop-blur-md text-primary-green font-bold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-lg border border-primary-green/20 flex items-center gap-1.5 max-w-[calc(100%-1rem)] truncate">
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-green fill-accent-green/20 shrink-0" />
                      <span className="truncate">{t(`items.${key}.result`)}</span>
                    </span>
                  </div>
                </div>

                {/* Content Section Below Image */}
                <div className="p-5 sm:p-6 md:p-8 flex flex-col grow">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark truncate">{t(`items.${key}.name`)}</h4>
                    <div className="flex items-center gap-0.5 shrink-0 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-text-muted italic text-sm sm:text-base leading-relaxed relative pl-3.5 border-l-2 border-primary-green/30">
                    &ldquo;{t(`items.${key}.quote`)}&rdquo;
                  </p>
                </div>

              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
