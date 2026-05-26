"use client";

import { motion } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import { content } from '../../lib/content';

// features will come from translations

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// PERBAIKAN 1: Menambahkan 'as const' untuk mengunci nilai string tipe easing
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export function Features() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <section id='features' className='mx-auto max-w-7xl px-6 py-24'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='mb-12 text-center'
      >
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-accent'>
          {t.featuresHeading}
        </p>
        <h2 className='mt-4 text-4xl font-semibold text-slate-900'>
          {t.featuresTitle}
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
      >
        {t.features.map((item, index) => (
          <motion.article
            key={index}
            variants={cardVariants}
            // PERBAIKAN 2: Memberikan 'as const' pada penulisan inline whileHover agar semakin aman
            whileHover={{ y: -8, transition: { duration: 0.2 } as const }}
            className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl group'
          >
            <h3 className='text-xl font-semibold text-slate-900 group-hover:text-primary transition-colors'>
              {item.title}
            </h3>
            <p className='mt-4 text-slate-600 leading-relaxed'>{item.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}