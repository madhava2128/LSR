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
                href="https://www.instagram.com/lsrnutrition?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all transform hover:scale-105 shadow-xs"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/share/19Nsxp9aza/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all transform hover:scale-105 shadow-xs"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@lsrnutrition" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all transform hover:scale-105 shadow-xs"
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
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-sage-light/80 font-medium">
              <li><Link href="/about" className="hover:text-accent-gold transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-accent-gold transition-colors">Programs</Link></li>
              <li><Link href="/testimonials" className="hover:text-accent-gold transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-accent-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t('contact')}</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-sage-light/80 font-medium">
              <li>
                <a href="mailto:lsrnutrition@gmail.com" className="hover:text-accent-gold transition-colors truncate block">
                  lsrnutrition@gmail.com
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
          <div className="flex items-center gap-5">
            <a 
              href="https://www.instagram.com/lsrnutrition?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sage-light/75 hover:text-accent-gold transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a 
              href="https://facebook.com/share/19Nsxp9aza/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sage-light/75 hover:text-accent-gold transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a 
              href="https://youtube.com/@lsrnutrition" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sage-light/75 hover:text-accent-gold transition-colors flex items-center gap-1.5"
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
