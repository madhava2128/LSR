import React from 'react';

export interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  subtext?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  inverted?: boolean;
  isHero?: boolean;
}

export function SectionHeading({ 
  id,
  eyebrow, 
  heading, 
  subtext, 
  className = '',
  align = 'center',
  inverted = false,
  isHero = false
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center mx-auto',
    right: 'items-end text-right ml-auto'
  };

  return (
    <div className={`flex flex-col max-w-2xl ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase mb-2.5 sm:mb-3 ${
          inverted ? 'text-white/95 bg-white/20 px-3.5 py-1 rounded-full inline-block' : 'text-primary'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 id={id} className={`${isHero ? 'hero-heading' : 'text-3xl sm:text-4xl lg:text-5xl'} font-heading font-bold mb-4 sm:mb-5 leading-tight ${
        inverted ? 'text-white' : 'text-text-dark'
      }`}>
        {heading}
      </h2>
      {subtext && (
        <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${
          inverted ? 'text-[#EAF2EC]' : 'text-text-muted'
        }`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
