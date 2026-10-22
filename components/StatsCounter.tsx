"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Smile, Users, Award, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface StatItemProps {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  isVisible: boolean;
  className?: string;
}

function StatItem({ target, suffix = '', label, icon, isVisible, className = '' }: StatItemProps) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let animationFrameId: number;

    // Respect reduced motion accessibility preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(() => {
        setCount(target);
      });
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds smooth count-up duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Fluid cubic ease-out for natural deceleration
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, target]);

  return (
    <div
      role="group"
      aria-label={`${target}${suffix} ${label}`}
      className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-border-subtle shadow-xs hover:border-primary/25 hover:shadow-md transition-all duration-300 flex flex-col justify-between group ${className}`}
    >
      {/* Screen reader complete label without intermediate counting numbers */}
      <span className="sr-only">
        {target}{suffix} {label}
      </span>

      <div>
        {/* Minimal line icon container */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sage-light text-primary flex items-center justify-center border border-border-subtle/80 mb-4 sm:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        {/* Primary numerical focus using Lora serif with tabular-nums to prevent layout shifts */}
        <div
          aria-hidden="true"
          className="flex items-baseline gap-0.5 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary tracking-tight tabular-nums mb-1.5 sm:mb-2"
        >
          <span>{count.toLocaleString()}</span>
          {suffix && (
            <span className="text-xl sm:text-2xl lg:text-3xl text-accent-gold font-heading font-semibold ml-0.5">
              {suffix}
            </span>
          )}
        </div>

        {/* Clear supporting label */}
        <p className="text-xs sm:text-sm font-medium text-text-muted leading-snug sm:leading-relaxed">
          {label}
        </p>
      </div>

      {/* Subtle muted gold accent line */}
      <div 
        className="w-6 sm:w-8 h-0.5 bg-accent-gold/40 rounded-full mt-4 sm:mt-6 group-hover:w-10 group-hover:bg-accent-gold transition-all duration-300"
        aria-hidden="true"
      />
    </div>
  );
}

export function StatsCounter() {
  const t = useTranslations('Stats');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-14 sm:py-20 md:py-24 bg-sage-light relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading 
          id="stats-heading"
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          align="center"
          className="mb-10 sm:mb-16"
        />

        {/* Balanced responsive layout: 1 col on small phones (<360px), 2 cols on standard mobile (360px-1023px), 4 cols on desktop */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* 1. Happy Clients */}
          <StatItem 
            target={250} 
            suffix="+" 
            label={t('happy_clients')} 
            isVisible={isVisible}
            icon={<Smile className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />}
          />

          {/* 2. People Enrolled */}
          <StatItem 
            target={400} 
            suffix="+" 
            label={t('people_enrolled')} 
            isVisible={isVisible}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />}
          />

          {/* 3. Client Satisfaction */}
          <StatItem 
            target={100} 
            suffix="%" 
            label={t('satisfaction')} 
            isVisible={isVisible}
            icon={<Award className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />}
          />

          {/* 4. Wellness Programs */}
          <StatItem 
            target={4} 
            suffix="" 
            label={t('wellness_programs')} 
            isVisible={isVisible}
            icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />}
          />

        </div>
      </div>
    </section>
  );
}
