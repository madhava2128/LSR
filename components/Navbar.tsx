"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';

const PROGRAMS = [
  { slug: 'weight-loss',           label: 'Weight Loss & Fitness',      num: '01' },
  { slug: 'nutrition-supplements', label: 'Nutrition & Supplements',     num: '02' },
  { slug: 'mindful-eating',        label: 'Mindful Eating',             num: '03' },
  { slug: 'personalized-nutrition',label: 'Personalized Nutrition',     num: '04' },
];

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key to close mobile menu & programs dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsProgramsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/' || pathname === '') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHomeClickMobile = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (pathname === '/' || pathname === '') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${
        isScrolled 
          ? 'shadow-md' 
          : 'shadow-xs'
      }`}
    >
      {/* Top Contact & Location Bar */}
      <div className="bg-primary-hover text-sage-light text-[11px] sm:text-xs md:text-sm py-1.5 px-4 sm:px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          {/* Address */}
          <a 
            href="https://maps.app.goo.gl/TjfpgBFxkFq3RDKq9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-accent-gold transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium tracking-wide truncate max-w-50 sm:max-w-none">Shamshiguda, Hyderabad</span>
          </a>

          {/* Contact Details */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <a href="tel:8639510702" className="flex items-center gap-1 hover:text-accent-gold transition-colors font-medium">
              <svg className="w-3.5 h-3.5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 86395 10702</span>
            </a>

            <a href="mailto:lsrnutrition@gmail.com" className="hidden md:flex items-center gap-1.5 hover:text-accent-gold transition-colors font-medium">
              <svg className="w-3.5 h-3.5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>lsrnutrition@gmail.com</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 border-l border-white/20 pl-2.5 sm:pl-4">
              <a 
                href="https://www.instagram.com/lsrnutrition?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-accent-gold transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/share/19Nsxp9aza/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="hover:text-accent-gold transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@lsrnutrition" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="hover:text-accent-gold transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <Link href="/" onClick={handleHomeClick} className="flex items-center gap-2 group">
          <Image 
            src="/images/logo/logo.svg" 
            alt="LSR Nutrition Club" 
            width={135} 
            height={90} 
            className="h-10 sm:h-12 md:h-15 w-auto object-contain transition-transform group-hover:scale-105" 
            priority 
          />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          <Link href="/" onClick={handleHomeClick} className="text-white hover:text-accent-gold transition-colors">{t('home')}</Link>
          <Link href="/about" className="text-white hover:text-accent-gold transition-colors">{t('about')}</Link>

          {/* Programs Dropdown */}
          <div 
            className="relative py-2" 
            ref={dropdownRef}
            onMouseEnter={() => setIsProgramsOpen(true)}
            onMouseLeave={() => setIsProgramsOpen(false)}
          >
            <button
              onClick={() => setIsProgramsOpen(prev => !prev)}
              className="flex items-center gap-1 text-white hover:text-accent-gold transition-colors focus:outline-none cursor-pointer"
              aria-haspopup="true"
              aria-expanded={isProgramsOpen}
            >
              {t('services')}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProgramsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                <div className="w-72 bg-white rounded-2xl shadow-xl border border-border-subtle py-3 overflow-hidden text-text-dark">
                  <Link
                    href="/services"
                    onClick={() => setIsProgramsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-primary hover:bg-sage-light transition-colors border-b border-border-subtle mb-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10" />
                    </svg>
                    All Programs
                  </Link>
                  {PROGRAMS.map((prog) => (
                    <Link
                      key={prog.slug}
                      href={`/services/${prog.slug}`}
                      onClick={() => setIsProgramsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-sage-light/60 transition-colors group"
                    >
                      <span className="text-xs font-bold text-secondary w-6 shrink-0">{prog.num}</span>
                      <span className="text-sm text-text-dark group-hover:text-primary transition-colors font-medium">{prog.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/testimonials" className="text-white hover:text-accent-gold transition-colors">{t('testimonials')}</Link>
          <Link href="/coach" className="text-white hover:text-accent-gold transition-colors">{t('coach')}</Link>
          <Link href="/contact" className="text-white hover:text-accent-gold transition-colors">{t('contact')}</Link>
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
            <select 
              value={locale} 
              onChange={changeLanguage}
              className="bg-white/15 text-white font-medium focus:outline-none cursor-pointer border border-white/25 rounded-lg px-2.5 py-1 text-sm focus:ring-2 focus:ring-accent-gold/40"
              aria-label={t('language')}
            >
              <option value="en" className="bg-primary text-white">English</option>
              <option value="te" className="bg-primary text-white">తెలుగు</option>
            </select>
          </div>
        </nav>

        {/* Mobile Toggle & Language Switcher */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <select 
            value={locale} 
            onChange={changeLanguage}
            className="h-10 bg-white/20 text-xs text-white font-bold focus:outline-none cursor-pointer border border-white/30 rounded-xl px-2.5 py-1 shadow-xs"
            aria-label={t('language')}
          >
            <option value="en" className="bg-primary text-white">EN</option>
            <option value="te" className="bg-primary text-white">TE</option>
          </select>

          <button 
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/40 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary/98 backdrop-blur-xl text-white shadow-2xl py-4 px-4 sm:px-6 flex flex-col gap-1 border-t border-white/15 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <Link href="/" onClick={handleHomeClickMobile} className="text-white hover:text-accent-gold px-3 py-2.5 min-h-[44px] flex items-center text-base font-semibold border-b border-white/10 rounded-xl active:bg-white/10 transition-colors">{t('home')}</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent-gold px-3 py-2.5 min-h-[44px] flex items-center text-base font-semibold border-b border-white/10 rounded-xl active:bg-white/10 transition-colors">{t('about')}</Link>

          {/* Mobile Programs Accordion */}
          <div className="border-b border-white/10 py-1">
            <button
              onClick={() => setIsMobileProgramsOpen(prev => !prev)}
              className="w-full flex items-center justify-between text-white hover:text-accent-gold px-3 py-2.5 min-h-[44px] text-base font-semibold focus:outline-none rounded-xl active:bg-white/10 transition-colors"
              aria-expanded={isMobileProgramsOpen}
            >
              <span>{t('services')}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isMobileProgramsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileProgramsOpen && (
              <div className="pl-3 sm:pl-4 flex flex-col gap-1 border-l-2 border-secondary/40 ml-2 my-2 py-1">
                <Link
                  href="/services"
                  onClick={() => { setIsMobileMenuOpen(false); setIsMobileProgramsOpen(false); }}
                  className="text-sm font-bold text-accent-gold px-3 py-2 min-h-[40px] flex items-center gap-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
                >
                  <span>→</span> All Programs
                </Link>
                {PROGRAMS.map((prog) => (
                  <Link
                    key={prog.slug}
                    href={`/services/${prog.slug}`}
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileProgramsOpen(false); }}
                    className="text-sm text-white/90 hover:text-accent-gold px-3 py-2 min-h-[40px] flex items-center gap-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
                  >
                    <span className="text-secondary font-bold">{prog.num}.</span>
                    {prog.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent-gold px-3 py-2.5 min-h-[44px] flex items-center text-base font-semibold border-b border-white/10 rounded-xl active:bg-white/10 transition-colors">{t('testimonials')}</Link>
          <Link href="/coach" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent-gold px-3 py-2.5 min-h-[44px] flex items-center text-base font-semibold border-b border-white/10 rounded-xl active:bg-white/10 transition-colors">{t('coach')}</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent-gold px-3 py-2.5 min-h-[44px] flex items-center text-base font-semibold rounded-xl active:bg-white/10 transition-colors">{t('contact')}</Link>

          {/* Quick Direct Call Button */}
          <div className="pt-3 mt-2 border-t border-white/15 flex flex-col gap-2">
            <a 
              href="tel:8639510702"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-white font-semibold text-sm hover:bg-white/25 active:scale-98 transition-all"
            >
              <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call: +91 86395 10702</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
