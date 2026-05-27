'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import { content } from '../../lib/content';

function WaveButton({
  href,
  variant,
  children,
  className = '',
}: {
  href: string;
  variant: 'white' | 'outline';
  children: React.ReactNode;
  className?: string;
}) {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>([]);

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setWaves((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setWaves((prev) => prev.filter((w) => w.id !== id)), 700);
  }

  return (
    <motion.a
      href={href}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold text-lg transition ${
        variant === 'white'
          ? 'bg-white text-primary hover:bg-slate-100'
          : 'border border-white/50 text-white hover:bg-white/10'
      } ${className}`}
    >
      <AnimatePresence>
        {waves.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className={`absolute rounded-full pointer-events-none ${
              variant === 'white' ? 'bg-primary/10' : 'bg-white/20'
            }`}
            style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 500, height: 500, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: [0, 0, 0.2, 1] }}
          />
        ))}
      </AnimatePresence>
      <span className='relative z-10'>{children}</span>
    </motion.a>
  );
}

export function CTA() {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>([]);
  const { lang } = useLang();
  const t = content[lang];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setWaves((prev) => [...prev.slice(-3), { id, x, y }]);
    setTimeout(() => setWaves((prev) => prev.filter((w) => w.id !== id)), 900);
  }

  return (
    <section id='contact' className='mx-auto max-w-7xl px-6 py-20'>
      <div
        onMouseMove={handleMouseMove}
        className='relative rounded-[32px] bg-gradient-to-br from-primary via-blue-700 to-primary px-8 py-16 text-white shadow-2xl overflow-hidden cursor-default'
      >
        {/* Section-level wave ripples */}
        <AnimatePresence>
          {waves.map(({ id, x, y }) => (
            <motion.span
              key={id}
              className='absolute rounded-full pointer-events-none bg-white/10'
              style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: 700, height: 700, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.9, ease: [0, 0, 0.2, 1] }}
            />
          ))}
        </AnimatePresence>

        {/* Content */}
        <div className='relative z-10 max-w-3xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-semibold leading-tight'>
            {t.ctaTitle}
          </h2>

          <p className='mt-6 text-xl text-slate-100 leading-relaxed'>
            {t.ctaDesc}
          </p>

          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
            <WaveButton href='/dashboard' variant='white' className='px-10 py-4 active:scale-95'>
              {t.ctaPrimaryAlt}
            </WaveButton>
            <WaveButton href='/contact' variant='outline' className='px-10 py-4'>
              {t.ctaSecondaryAlt}
            </WaveButton>
          </div>

          <p className='mt-6 text-sm text-slate-200'>
            {t.ctaNote}
          </p>
        </div>
      </div>
    </section>
  );
}