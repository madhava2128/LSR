"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

const CAROUSEL_IMAGES = [
  { id: 'a', src: '/images/carousels/a.webp' },
  { id: 'b', src: '/images/carousels/b.webp' },
  { id: 'c', src: '/images/carousels/c.webp' },
  { id: 'd', src: '/images/carousels/d.webp' },
  { id: 'e', src: '/images/carousels/e.webp' },
  { id: 'f', src: '/images/carousels/f.webp' },
];

export function ShowcaseCarousel() {
  const t = useTranslations('Showcase');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const total = CAROUSEL_IMAGES.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, nextSlide]);

  // Calculate relative offset for infinite wrap-around center showcase positioning
  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const sideOffset = isMobile ? '45%' : '65%';
    const farOffset = isMobile ? '90%' : '120%';

    if (diff === 0) {
      // Center Active Card
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1 || diff === -(total - 1)) {
      // Right Adjacent
      return {
        x: sideOffset,
        scale: 0.85,
        opacity: 0.65,
        zIndex: 20,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -1 || diff === total - 1) {
      // Left Adjacent
      return {
        x: `-${sideOffset}`,
        scale: 0.85,
        opacity: 0.65,
        zIndex: 20,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 2 || diff === -(total - 2)) {
      // Far Right
      return {
        x: farOffset,
        scale: 0.7,
        opacity: 0.2,
        zIndex: 10,
        filter: 'brightness(0.6)',
        pointerEvents: 'none' as const,
      };
    } else if (diff === -2 || diff === total - 2) {
      // Far Left
      return {
        x: `-${farOffset}`,
        scale: 0.7,
        opacity: 0.2,
        zIndex: 10,
        filter: 'brightness(0.6)',
        pointerEvents: 'none' as const,
      };
    } else {
      // Hidden Cards
      return {
        x: diff > 0 ? '140%' : '-140%',
        scale: 0.5,
        opacity: 0,
        zIndex: 0,
        filter: 'brightness(0.4)',
        pointerEvents: 'none' as const,
      };
    }
  };

  const rawItems = t.raw('items');
  const items = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section className="w-full py-14 sm:py-20 md:py-28 bg-linear-to-b from-white via-primary-green/5 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          className="mb-8 sm:mb-12 md:mb-16"
        />

        {/* Center Showcase Carousel Frame */}
        <div 
          className="relative w-full max-w-5xl mx-auto h-80 sm:h-115 md:h-130 flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {CAROUSEL_IMAGES.map((img, idx) => {
            const cardStyle = getCardStyle(idx);
            const isCenter = idx === activeIndex;

            return (
              <motion.div
                key={img.id}
                initial={false}
                animate={{
                  x: cardStyle.x,
                  scale: cardStyle.scale,
                  opacity: cardStyle.opacity,
                  zIndex: cardStyle.zIndex,
                  filter: cardStyle.filter,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
                onClick={() => setActiveIndex(idx)}
                style={{ pointerEvents: cardStyle.pointerEvents }}
                className={`absolute w-55 sm:w-85 md:w-105 h-70 sm:h-105 md:h-120 rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-shadow duration-300 ${
                  isCenter ? 'ring-4 ring-[#8BBB92]/40 shadow-2xl' : 'hover:opacity-90'
                }`}
              >
                <div className="relative w-full h-full group bg-gray-950">
                  <Image
                    src={img.src}
                    alt={`LNC Showcase ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 220px, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx === 0 || idx === 1}
                  />

                  {/* Gradient Overlay for Text & Tag */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white transition-opacity duration-300">
                    <span className="inline-block self-start text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#8BBB92]/90 text-white rounded-full mb-1.5 shadow-sm backdrop-blur-md">
                      {items[idx]?.tag || 'LNC Wellness'}
                    </span>
                    <h3 className="text-sm sm:text-xl font-bold tracking-tight leading-snug drop-shadow-md">
                      {items[idx]?.title || 'Wellness Showcase'}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation & Controls Bar */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
          
          {/* Slide Navigation Buttons & Auto-Play Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-primary-green/20 text-text-dark flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white border border-primary-green/20 text-xs font-semibold text-text-dark hover:bg-primary-green/10 transition-all flex items-center gap-1.5 shadow-sm"
            >
              {isPlaying ? (
                <>
                  <svg className="w-3 h-3 text-primary-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 text-primary-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-primary-green/20 text-text-dark flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Indicators (Dots) */}
          <div className="flex items-center gap-2">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 sm:w-8 bg-[#8BBB92] shadow-xs'
                    : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
