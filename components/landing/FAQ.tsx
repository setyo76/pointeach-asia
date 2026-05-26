'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import { content } from '../../lib/content';

// Pencil icon SVG - education themed
function PencilIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? -30 : 0, scale: isOpen ? 1.15 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex-shrink-0"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pencil body */}
        <motion.rect
          x="10"
          y="3"
          width="8"
          height="18"
          rx="1.5"
          fill={isOpen ? '#f59e0b' : '#fcd34d'}
          animate={{ fill: isOpen ? '#f59e0b' : '#fcd34d' }}
          transition={{ duration: 0.3 }}
        />
        {/* Pencil top eraser cap */}
        <rect x="10" y="3" width="8" height="3.5" rx="1.5" fill="#f87171" />
        {/* Eraser band */}
        <rect x="10" y="6" width="8" height="1.5" fill="#fca5a5" />
        {/* Pencil tip */}
        <path d="M10 21 L14 26 L18 21 Z" fill="#d97706" />
        {/* Pencil tip point */}
        <path d="M12.5 23 L14 26 L15.5 23 Z" fill="#292524" />
        {/* Pencil lines detail */}
        <line x1="10" y1="13" x2="18" y2="13" stroke="#fbbf24" strokeWidth="0.75" strokeOpacity="0.6" />
        <line x1="10" y1="16" x2="18" y2="16" stroke="#fbbf24" strokeWidth="0.75" strokeOpacity="0.6" />
      </svg>
    </motion.div>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
          isOpen
            ? 'border-amber-300 bg-amber-50 shadow-md shadow-amber-100'
            : 'border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40'
        }`}
        whileHover={{ scale: 1.005 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-amber-400"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ originY: 0.5 }}
        />

        {/* Notebook lines decoration */}
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-b border-slate-700"
                style={{ top: `${36 + i * 24}px` }}
              />
            ))}
          </div>
        )}

        {/* Question button */}
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-2xl"
          aria-expanded={isOpen}
        >
          <PencilIcon isOpen={isOpen} />

          <span
            className={`flex-1 font-semibold text-[1.05rem] leading-snug transition-colors duration-300 ${
              isOpen ? 'text-amber-800' : 'text-slate-800'
            }`}
          >
            {faq.question}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`flex-shrink-0 rounded-full p-1.5 transition-colors duration-300 ${
              isOpen ? 'bg-amber-200 text-amber-700' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 5.5L8 10.5L13 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="pl-[4.5rem] pr-6 pb-6"
              >
                {/* Ruler line */}
                <div className="mb-3 h-px bg-amber-200" />
                <p className="text-slate-600 leading-relaxed text-[0.97rem]">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();
  const t = content[lang];

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-24">
      {/* Header */}
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Decorative badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
            <rect x="10" y="3" width="8" height="18" rx="1.5" fill="#fcd34d" />
            <rect x="10" y="3" width="8" height="3.5" rx="1.5" fill="#f87171" />
            <path d="M10 21 L14 26 L18 21 Z" fill="#d97706" />
          </svg>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">FAQ</p>
        </div>

        <h2 className="mt-2 text-4xl font-bold text-slate-900">
          {t.faqTitle}
        </h2>

        <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          {t.faqSubtitle}
        </p>
      </motion.div>

      {/* FAQ list */}
      <div className="max-w-3xl mx-auto space-y-3">
        {t.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        className="mt-10 text-center text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {t.faqContactPrompt}{' '}
        <a href="#" className="font-medium text-amber-600 hover:text-amber-700 underline underline-offset-2">
          {t.faqContactLabel}
        </a>
      </motion.p>
    </section>
  );
}