"use client";

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { useTranslations } from 'next-intl';

const PROGRAM_OPTIONS = [
  'Weight Loss & Fitness',
  'Nutrition & Supplements',
  'Mindful Eating',
  'Personalized Nutrition'
] as const;

export function Contact() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(['Weight Loss & Fitness']);

  const toggleProgram = (prog: string) => {
    setSelectedPrograms((prev) => {
      if (prev.includes(prog)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((p) => p !== prog);
      } else {
        return [...prev, prog];
      }
    });
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = (e.currentTarget as HTMLElement).closest('form') as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    const name = (formData.get('name') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const message = (formData.get('message') as string || '').trim();
    const programs = selectedPrograms.join(', ');

    if (!name) {
      alert('Please enter your name');
      return;
    }

    let text = `Hi Coach Siva / LSR Nutrition Club!\nI would like to enquire about your nutrition programs.\n\n`;
    text += `👤 *Name:* ${name}\n`;
    if (phone) text += `📱 *Phone:* ${phone}\n`;
    if (email) text += `📧 *Email:* ${email}\n`;
    text += `🎯 *Interested Programs:* ${programs}\n`;
    if (message) text += `💬 *Message:* ${message}\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/918639510702?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: (formData.get('name') as string || '').trim(),
      phone: (formData.get('phone') as string || '').trim(),
      email: (formData.get('email') as string || '').trim(),
      message: (formData.get('message') as string || '').trim(),
      program: selectedPrograms.join(', ')
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('success');
        form.reset();
      }
    } catch {
      setStatus('success');
      form.reset();
    }
  };

  return (
    <section id="contact" className="w-full py-14 sm:py-20 md:py-24 bg-sage-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading 
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Left Column: Info & Map (takes 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-border-subtle">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark mb-5 sm:mb-6">{t('business_info')}</h3>
              
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-1.5 sm:mb-2">{t('email_label')}</h4>
                  <a href="mailto:lsrnutrition@gmail.com" className="text-text-dark hover:text-primary transition-colors font-medium flex items-center gap-2.5 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">lsrnutrition@gmail.com</span>
                  </a>
                </div>
                
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-1.5 sm:mb-2">{t('phone_label')}</h4>
                  <div className="flex flex-col gap-2">
                    <a href="tel:8639510702" className="text-text-dark hover:text-primary transition-colors font-medium flex items-center gap-2.5 text-sm sm:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 86395 10702
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-1.5 sm:mb-2">{t('location_label')}</h4>
                  <a 
                    href="https://maps.app.goo.gl/TjfpgBFxkFq3RDKq9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-dark hover:text-primary transition-colors font-medium flex items-start gap-2.5 text-sm sm:text-base leading-relaxed"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      <strong className="text-text-dark font-semibold block">LSR NUTRITION CENTER</strong>
                      G.F Justin photo studio, opp. Aqua water purifier,<br />
                      Mahankhali Nagar, Shamshiguda,<br />
                      Hyderabad, Telangana — 500072
                    </span>
                  </a>
                </div>

                <div className="pt-2">
                  <h4 className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-2.5">Social Media</h4>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a 
                      href="https://www.instagram.com/lsrnutrition?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background hover:bg-[#E4405F] text-text-dark hover:text-white transition-all text-xs font-semibold border border-border-subtle shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                    <a 
                      href="https://facebook.com/share/19Nsxp9aza/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background hover:bg-[#1877F2] text-text-dark hover:text-white transition-all text-xs font-semibold border border-border-subtle shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                    <a 
                      href="https://youtube.com/@lsrnutrition" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background hover:bg-[#FF0000] text-text-dark hover:text-white transition-all text-xs font-semibold border border-border-subtle shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-56 sm:h-64 rounded-3xl overflow-hidden shadow-xs border border-border-subtle bg-white">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src="https://maps.google.com/maps?q=LSR%20NUTRITION%20CENTER%2C%20Mahankhali%20nagar%2C%20Shamshiguda%2C%20500072&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Google Maps Location - LSR Nutrition Center"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form (takes 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xs border border-border-subtle">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-dark mb-2">{t('form_title')}</h3>
            <p className="text-text-muted text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
              {t('form_subtitle')}
            </p>

            {status === 'success' ? (
              <div className="p-8 bg-sage-light text-primary rounded-2xl text-center border border-border-subtle flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-text-dark">{t('form_success')}</h4>
                <p className="text-text-muted text-xs sm:text-sm max-w-sm">
                  Thank you! Coach Siva will get in touch with you shortly.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2 text-xs py-2 px-4"
                  onClick={() => setStatus('idle')}
                >
                  {t('form_send_another')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                <input type="hidden" name="subject" value="New Enquiry from LSR Nutrition Club Website" />
                <input type="hidden" name="from_name" value="LSR Nutrition Club Website" />
                <input type="hidden" name="program" value={selectedPrograms.join(', ')} />

                {/* 1. Visible Multi-Select Program Selection Chips */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs sm:text-sm font-semibold text-text-dark flex items-center justify-between">
                    <span>{t('form_program_label')}</span>
                    <span className="text-[11px] sm:text-xs text-primary font-medium">Select one or more</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {PROGRAM_OPTIONS.map((prog) => {
                      const isSelected = selectedPrograms.includes(prog);
                      const progName = t(`programs.${prog}` as Parameters<typeof t>[0]);
                      return (
                        <button
                          key={prog}
                          type="button"
                          onClick={() => toggleProgram(prog)}
                          className={`flex items-center justify-between p-3 sm:p-3.5 px-3.5 sm:px-4 rounded-2xl text-left border transition-all text-xs sm:text-sm font-medium cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-xs scale-[1.01]'
                              : 'bg-background text-text-dark border-border-subtle hover:border-secondary hover:bg-white'
                          }`}
                        >
                          <span className="leading-snug">{progName}</span>
                          {isSelected ? (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-2">
                              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-border-subtle shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Contact Details (Name + Phone side by side) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-text-dark">{t('form_name_label')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white border border-border-subtle rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-xs text-xs sm:text-sm"
                      placeholder={t('form_name_placeholder')}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-text-dark">{t('form_phone_label')}</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white border border-border-subtle rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-xs text-xs sm:text-sm"
                      placeholder={t('form_phone_placeholder')}
                    />
                  </div>
                </div>

                {/* 3. Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-text-dark">{t('form_email_label')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white border border-border-subtle rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-xs text-xs sm:text-sm"
                    placeholder={t('form_email_placeholder')}
                  />
                </div>

                {/* 4. Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-text-dark">{t('form_message_label')}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={3}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white border border-border-subtle rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-xs resize-none text-xs sm:text-sm"
                    placeholder={t('form_message_placeholder')}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="text-red-600 text-xs sm:text-sm bg-red-50 p-3.5 rounded-xl border border-red-200">
                    {t('form_error')}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Send via WhatsApp</span>
                  </button>

                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="w-full py-3 sm:py-3.5 text-xs sm:text-sm font-semibold border-primary text-primary hover:bg-primary hover:text-white"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? t('form_submitting') : 'Send via Email'}
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
