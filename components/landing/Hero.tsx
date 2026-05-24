'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Reusable wave ripple button/link
function WaveLink({
  href,
  primary,
  children,
  className = '',
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

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
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors ${
        primary
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
      } ${className}`}
    >
      <AnimatePresence>
        {waves.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className={`absolute rounded-full pointer-events-none ${
              primary ? 'bg-white/25' : 'bg-primary/12'
            }`}
            style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
      <span className='relative z-10'>{children}</span>
    </motion.a>
  );
}

// Mockup card: entrance animation + continuous float + wave ripple on hover
function MockupCard() {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setWaves((prev) => [...prev.slice(-2), { id, x, y }]);
    setTimeout(() => setWaves((prev) => prev.filter((w) => w.id !== id)), 800);
  }

  return (
    // Outer wrapper: handles entrance + continuous floating
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
    >
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        onMouseMove={handleMouseMove}
        whileHover={{
          scale: 1.02,
          boxShadow:
            '0 32px 80px -12px rgba(99,102,241,0.25), 0 8px 32px -8px rgba(15,23,42,0.12)',
        }}
        className='relative rounded-[32px] border border-slate-200 bg-white p-4 shadow-2xl overflow-hidden cursor-pointer'
      >
        {/* Wave ripples on mockup */}
        <AnimatePresence>
          {waves.map(({ id, x, y }) => (
            <motion.span
              key={id}
              className='absolute rounded-full pointer-events-none bg-primary/8 z-10'
              style={{
                left: x,
                top: y,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 500, height: 500, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Hero image */}
        <div className='relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-slate-100'>
          <Image
            src='/images/hero.png'
            alt='PoinTeacher Dashboard'
            fill
            className='object-cover object-top'
            priority
          />
          {/* Shine overlay on hover */}
          <motion.div
            className='absolute inset-0 pointer-events-none'
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Bottom label */}
        <div className='mt-3 px-2 pb-1 flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
          <p className='text-xs text-slate-400 font-medium'>
            PoinTeacher · Live Preview
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-white via-slate-100 to-slate-50 py-24'>
      <div className='mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='space-y-8'
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='inline-flex rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent'
          >
            Platform AI All-in-One untuk Pendidikan
          </motion.p>

          <h1 className='text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl leading-tight'>
            Platform AI untuk Transformasi Pendidikan Indonesia
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='max-w-2xl text-xl leading-relaxed text-slate-600'
          >
            Satu platform untuk guru, kepala sekolah, dan yayasan. Buat Modul
            Ajar, LKPD, Soal, Analisis, Administrasi, hingga Reward Siswa dengan
            bantuan AI.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='text-lg font-medium text-slate-700'
          >
            Perkuat <span className='text-primary'>branding</span> sekolah dan
            guru Anda sambil menghemat hingga 70% waktu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='flex flex-wrap gap-4'
          >
            <WaveLink
              href='#features'
              primary
              className='px-8 py-3.5 active:scale-95'
            >
              Jelajahi Fitur
            </WaveLink>
            <WaveLink href='/dashboard' className='px-8 py-3.5 active:scale-95'>
              Coba Gratis
            </WaveLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className='flex flex-wrap gap-3'
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm'>
              ✨ Powered by Gemini AI
            </div>
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm'>
              🔗 Terintegrasi dengan Google Workspace
            </div>
          </motion.div>
        </motion.div>

        {/* Right Mockup */}
        <MockupCard />
      </div>
    </section>
  );
}
