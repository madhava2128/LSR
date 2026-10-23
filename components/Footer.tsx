import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { StrokeText } from './StrokeText';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-primary text-white pt-12 sm:pt-16 pb-8 border-t border-secondary/20 relative overflow-hidden">
      {/* Background Subtle StrokeText */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.06] select-none w-full h-full">
        <StrokeText 
          text="LSR NUTRITION"
          strokeColor="#8BAF9B"
          fillColor="#FAF9F6"
          strokeWidth={1.8}
          drawDuration={2.6}
          fillDelay={0.2}
          stagger={0.06}
          ease="power2.out"
          trigger="scroll"
          fillMode="wipe"
          fontSize={240}
          fontWeight={900}
          letterSpacing={14}
          className="w-full h-full flex items-center justify-center pointer-events-none scale-105 md:scale-115"
          style={{ '--stroke-text-height': '100%' } as React.CSSProperties}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 sm:mb-16">
          
          {/* Brand & Tagline */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 text-white mb-4 sm:mb-6 group">
              <Image 
                src="/images/logo/logo.svg" 
                alt="LSR Nutrition Club" 
                width={150} 
                height={100} 
                className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <span className="font-heading font-bold tracking-wider text-lg sm:text-xl md:text-2xl">{t('brand_name')}</span>
            </Link>
            <p className="text-sage-light/85 text-xs sm:text-sm max-w-sm leading-relaxed mb-5 sm:mb-6">
              {t('tagline')}
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://youtube.com/@lsrnutrition" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all transform hover:scale-105 shadow-xs"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t('quick_links')}</h4>
            <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-sage-light/80 font-medium">
              <li><Link href="/about" className="hover:text-accent-gold transition-colors py-1.5 inline-block">About</Link></li>
              <li><Link href="/services" className="hover:text-accent-gold transition-colors py-1.5 inline-block">Programs</Link></li>
              <li><Link href="/testimonials" className="hover:text-accent-gold transition-colors py-1.5 inline-block">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-accent-gold transition-colors py-1.5 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t('contact')}</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-sage-light/80 font-medium">
              <li>
                <a href="mailto:lsrnutritionclub@gmail.com" className="hover:text-accent-gold transition-colors truncate block">
                  lsrnutritionclub@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:8639510702" className="hover:text-accent-gold transition-colors">
                  +91 86395 10702
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.app.goo.gl/TjfpgBFxkFq3RDKq9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent-gold transition-colors leading-relaxed block mt-1"
                >
                  <span className="text-white font-medium block">LSR NUTRITION CENTER</span>
                  <span className="text-sage-light/80 block text-xs">
                    G.F Justin photo studio, opp. Aqua water purifier,<br />
                    Mahankhali nagar, Shamshiguda — 500072
                  </span>
                  <span className="text-accent-gold text-xs underline mt-1 inline-block">{t('view_on_maps')}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-sage-light/75 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {t('brand_name')}. {t('all_rights_reserved')}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">

            <a 
              href="https://youtube.com/@lsrnutrition" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sage-light/75 hover:text-accent-gold transition-colors flex items-center gap-1.5 min-h-11 py-1 px-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
