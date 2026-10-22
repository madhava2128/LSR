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

  const HeadingTag = isHero ? 'h1' : 'h2';

  return (
    <div className={`flex flex-col max-w-2xl ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 ${
          inverted ? 'text-white/95 bg-white/20 px-3.5 py-1 rounded-full inline-block' : 'text-primary'
        }`}>
          {eyebrow}
        </span>
      )}
      <HeadingTag id={id} className={`${isHero ? 'hero-heading' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} font-heading font-bold mb-3 sm:mb-4 leading-tight break-words ${
        inverted ? 'text-white' : 'text-text-dark'
      }`}>
        {heading}
      </HeadingTag>
      {subtext && (
        <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
          inverted ? 'text-sage-light' : 'text-text-muted'
        }`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
