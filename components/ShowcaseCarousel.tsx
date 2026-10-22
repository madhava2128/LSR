"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { useTranslations } from 'next-intl';

const CAROUSEL_IMAGES = [
  { id: '1', src: '/images/carousels/11.webp' },
  { id: '2', src: '/images/carousels/22.webp' },
  { id: '3', src: '/images/carousels/33.webp' },
  { id: '4', src: '/images/carousels/44.webp' },
];

export function ShowcaseCarousel() {
  const t = useTranslations('Showcase');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const count = CAROUSEL_IMAGES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (diffX > 45) {
      nextSlide();
    } else if (diffX < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  // Keyboard Navigation: Arrow Left / Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto-play timer (paused when hovered or manually paused)
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, nextSlide]);

  // Calculate position & transform for smooth 3D coverflow effect
  const getCardStyle = (index: number) => {
    let diff = (index - activeIndex) % count;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    if (diff === 0) {
      // Center Active Card
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: 'none',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1 || diff === -(count - 1)) {
      // Immediate Right Card
      return {
        x: '62%',
        scale: 0.88,
        opacity: 0.82,
        zIndex: 20,
        filter: 'brightness(0.92)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -1 || diff === count - 1) {
      // Immediate Left Card
      return {
        x: '-62%',
        scale: 0.88,
        opacity: 0.82,
        zIndex: 20,
        filter: 'brightness(0.92)',
        pointerEvents: 'auto' as const,
      };
    } else {
      // Hidden behind center card (transitions smoothly in/out)
      return {
        x: '0%',
        scale: 0.72,
        opacity: 0,
        zIndex: 0,
        filter: 'brightness(0.5)',
        pointerEvents: 'none' as const,
      };
    }
  };

  const rawItems = t.raw('items');
  const items = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section className="w-full py-14 sm:py-20 md:py-28 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          className="mb-8 sm:mb-12 md:mb-16"
        />

        {/* Center Showcase Carousel Frame */}
        <div 
          className="relative w-full max-w-5xl mx-auto h-80 sm:h-115 md:h-130 flex items-center justify-center overflow-hidden touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
                className={`absolute w-55 sm:w-85 md:w-105 h-70 sm:h-105 md:h-120 rounded-3xl overflow-hidden cursor-pointer shadow-md transition-shadow duration-300 ${
                  isCenter ? 'ring-4 ring-secondary/50 shadow-xl' : 'hover:opacity-90'
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white transition-opacity duration-300">
                    <span className="inline-block self-start text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 bg-primary/95 text-white rounded-full mb-1.5 shadow-sm">
                      {items[idx]?.tag || 'LNC Wellness'}
                    </span>
                    <h3 className="text-sm sm:text-xl font-heading font-bold tracking-tight leading-snug drop-shadow-md">
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
              className="w-11 h-11 rounded-full bg-white border border-border-subtle text-text-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              className="min-h-[44px] px-4 py-2 rounded-full bg-white border border-border-subtle text-xs font-semibold text-text-dark hover:bg-sage-light transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full bg-white border border-border-subtle text-text-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Indicators (Dots) with expanded touch target */}
          <div className="flex items-center gap-1.5">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="p-2 flex items-center justify-center cursor-pointer min-h-[44px]"
              >
                <span
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 block ${
                    i === activeIndex
                      ? 'w-6 sm:w-8 bg-primary shadow-xs'
                      : 'w-2 sm:w-2.5 bg-border-subtle hover:bg-secondary/60'
                  }`}
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
