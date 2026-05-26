"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import { content } from '../../lib/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// PERBAIKAN DI SINI: Ditambahkan 'as const' pada properti ease
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Testimonials() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <section id="testimonials" className='mx-auto max-w-7xl px-6 py-24 bg-slate-50'>
      <div className='mb-12 text-center'>
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-accent'>
          {t.testimonialsHeading}
        </p>
        <h2 className='mt-4 text-4xl font-semibold text-slate-900'>
          {t.testimonialsTitle}
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className='grid md:grid-cols-3 gap-8'
      >
        {t.testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className='rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 group'
          >
            {/* Rating Stars */}
            <div className='flex gap-1 mb-6'>
              {Array.from({ length: item.rating }).map((_, i) => (
                <span key={i} className='text-2xl text-yellow-400'>
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className='italic text-slate-700 leading-relaxed text-[17px]'>
              “{item.quote}”
            </p>

            {/* Profile */}
            <div className='mt-8 flex items-center gap-4'>
              <div className='relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-slate-100'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-cover'
                  sizes="56px"
                />
              </div>
              <div>
                <p className='font-semibold text-slate-900'>{item.name}</p>
                <p className='text-sm text-slate-500'>{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}