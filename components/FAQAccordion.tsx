"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  faqs: FAQItem[];
  className?: string;
}

export function FAQAccordion({ title = "Frequently Asked Questions", faqs, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={`w-full max-w-4xl mx-auto mt-16 ${className}`}>
      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-dark text-center mb-8">
        {title}
      </h3>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'border-primary bg-sage-light/40 shadow-xs' 
                  : 'border-border-subtle bg-white hover:border-secondary/60'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left px-4 py-4 sm:px-6 sm:py-5 min-h-[44px] flex justify-between items-center gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-heading font-semibold text-sm sm:text-base md:text-lg text-text-dark leading-snug">
                  {faq.question}
                </span>
                <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary text-white' : 'bg-sage-light text-text-muted'}`}>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-text-muted text-xs sm:text-sm md:text-base leading-relaxed border-t border-border-subtle/60 pt-3 sm:pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
