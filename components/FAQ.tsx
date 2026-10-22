"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const t = useTranslations('FAQ');
  const faqs = t.raw('faqs') as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-14 sm:py-20 md:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeading 
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
          className="mb-10 sm:mb-16"
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-primary bg-sage-light/40 shadow-xs' 
                    : 'border-border-subtle bg-white hover:border-secondary/60'
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-5 px-6 md:px-8 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-base sm:text-lg md:text-xl text-text-dark leading-snug">
                    {faq.question}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-primary text-white rotate-180' : 'bg-sage-light text-text-muted'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 text-text-muted text-sm sm:text-base md:text-lg leading-relaxed border-t border-border-subtle/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
