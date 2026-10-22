"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

interface StatItemProps {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  isVisible: boolean;
}

function StatItem({ target, suffix = '', label, icon, isVisible }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2500;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutProgress * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <div className="flex flex-col items-start text-left p-4 sm:p-6 md:p-8 group transition-all duration-300">
      <div className="mb-4 sm:mb-5 p-3.5 sm:p-4 rounded-2xl bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-text-dark tracking-tight mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs sm:text-sm md:text-base font-medium text-text-muted">
        {label}
      </div>
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
      { threshold: 0.2 }
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
    <section ref={sectionRef} className="w-full py-14 sm:py-20 bg-sage-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading 
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          align="left"
          className="mb-10 sm:mb-14"
        />

        <div className="bg-white border border-border-subtle rounded-3xl p-4 sm:p-6 md:p-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle">
            
            {/* 1. Happy Clients */}
            <StatItem 
              target={250} 
              suffix="+" 
              label={t('happy_clients')} 
              isVisible={isVisible}
              icon={
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              } 
            />

            {/* 2. People Enrolled */}
            <StatItem 
              target={400} 
              suffix="+" 
              label={t('people_enrolled')} 
              isVisible={isVisible}
              icon={
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              } 
            />

            {/* 3. Client Satisfaction */}
            <StatItem 
              target={100} 
              suffix="%" 
              label={t('satisfaction')} 
              isVisible={isVisible}
              icon={
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              } 
            />

          </div>
        </div>
      </div>
    </section>
  );
}
