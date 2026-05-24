'use client';

import Link from 'next/link';
import { Logo } from '../common/Logo';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Partikel pecah saat mengenai logo
function Shards({ x, y, active }: { x: number; y: number; active: boolean }) {
  const shards = [
    { angle: -60, dist: 18, size: 5, delay: 0 },
    { angle: -30, dist: 24, size: 7, delay: 0.03 },
    { angle: 0, dist: 20, size: 4, delay: 0.01 },
    { angle: 30, dist: 26, size: 6, delay: 0.04 },
    { angle: 60, dist: 16, size: 5, delay: 0.02 },
    { angle: -80, dist: 14, size: 3, delay: 0.05 },
    { angle: 80, dist: 14, size: 3, delay: 0.05 },
  ];

  return (
    <AnimatePresence>
      {active &&
        shards.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * s.dist;
          const ty = Math.sin(rad) * s.dist;
          return (
            <motion.span
              key={i}
              className='pointer-events-none absolute z-50 rounded-full bg-primary'
              style={{
                left: x,
                top: y,
                width: s.size,
                height: s.size,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
              exit={{}}
              // PERBAIKAN 1: Kunci tipe 'easeOut'
              transition={{ duration: 0.45, delay: s.delay, ease: 'easeOut' as const }}
            />
          );
        })}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // phase: idle | flying | exploding
  const [phase, setPhase] = useState<'idle' | 'flying' | 'exploding'>('idle');
  const [shotOrigin, setShotOrigin] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [logoHit, setLogoHit] = useState({ x: 0, y: 0 });

  const btnRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const FLY_DURATION = 1100; // ms

  function handleDashboardHover() {
    if (
      phase !== 'idle' ||
      !btnRef.current ||
      !headerRef.current ||
      !logoRef.current
    )
      return;

    const btnRect = btnRef.current.getBoundingClientRect();
    const headerRect = headerRef.current.getBoundingClientRect();
    const logoRect = logoRef.current.getBoundingClientRect();

    // Titik awal: sisi kiri tengah button
    const ox = btnRect.left - headerRect.left;
    const oy = btnRect.top - headerRect.top + btnRect.height / 2;

    // Titik ledakan: sisi kanan logo
    const lx = logoRect.right - headerRect.left;
    const ly = logoRect.top - headerRect.top + logoRect.height / 2;

    setShotOrigin({
      x: ox,
      y: oy,
      width: btnRect.width,
      height: btnRect.height,
    });
    setLogoHit({ x: lx, y: ly });
    setPhase('flying');

    setTimeout(() => {
      setPhase('exploding');
      setTimeout(() => setPhase('idle'), 500);
    }, FLY_DURATION);
  }

  // Jarak terbang (dari origin ke logo)
  const travelX = logoHit.x - shotOrigin.x;

  // PERBAIKAN 2: Gunakan 'as const' pada object variants agar string easing dikunci ketat
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: 'easeInOut' as const },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.4, ease: 'easeInOut' as const },
    },
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-white/90 shadow-sm' : 'bg-white/95'
      }`}
    >
      <div className='relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        {/* ── PELURU: bentuk pill mirip ujung button, makin menipis ── */}
        <AnimatePresence>
          {phase === 'flying' && (
            <motion.span
              key='bullet'
              className='pointer-events-none absolute z-50'
              style={{
                top: shotOrigin.y,
                left: shotOrigin.x,
                translateY: '-50%',
                borderRadius: '9999px',
                background:
                  'linear-gradient(to left, rgba(99,102,241,0) 0%, rgba(99,102,241,0.5) 40%, rgba(99,102,241,1) 100%)',
              }}
              initial={{
                width: shotOrigin.width,
                height: shotOrigin.height,
                x: 0,
                opacity: 1,
                scaleY: 1,
              }}
              animate={{
                x: travelX - shotOrigin.width,
                width: [
                  shotOrigin.width,
                  shotOrigin.width * 0.6,
                  shotOrigin.width * 0.35,
                  shotOrigin.width * 0.18,
                ],
                height: [
                  shotOrigin.height,
                  shotOrigin.height * 0.7,
                  shotOrigin.height * 0.45,
                  shotOrigin.height * 0.25,
                ],
                opacity: [1, 0.95, 0.85, 0.7],
              }}
              exit={{ opacity: 0 }}
              // PERBAIKAN 3: Array cubic-bezier dikunci menggunakan 'as const' agar dibaca sebagai Tuple berukuran 4, bukan number[] biasa
              transition={{
                duration: FLY_DURATION / 1000,
                ease: [0.15, 0.5, 0.35, 1] as const,
              }}
            />
          )}
        </AnimatePresence>

        {/* ── LEDAKAN: partikel pecah di posisi logo ── */}
        <Shards x={logoHit.x} y={logoHit.y} active={phase === 'exploding'} />

        {/* Logo wrapper untuk ref posisi */}
        <div ref={logoRef} className='inline-flex'>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8 text-sm'>
          {[
            { href: '/#features', label: 'Fitur' },
            { href: '/#pricing', label: 'Harga' },
            { href: '/#testimonials', label: 'Testimoni' },
            { href: '/#faq', label: 'FAQ' },
            { href: '/#contact', label: 'Kontak' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='group relative py-2 text-slate-700 hover:text-slate-900 transition-colors'
            >
              {item.label}
              <motion.span
                className='absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-hover:w-full'
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                // PERBAIKAN 4: Kunci tipe 'easeOut'
                transition={{ duration: 0.3, ease: 'easeOut' as const }}
              />
            </Link>
          ))}

          <Link
            ref={btnRef}
            href='/dashboard'
            onMouseEnter={handleDashboardHover}
            className='relative overflow-hidden rounded-full bg-primary px-5 py-2.5 text-white font-medium hover:bg-primary/90 transition-all active:scale-95'
          >
            Masuk Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className='inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 transition-colors'
          >
            {open ? (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M6 18L18 6M6 6l12 12'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M4 6h16M4 12h16M4 18h16'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}
            className='md:hidden border-t border-slate-100 bg-white/95 overflow-hidden'
          >
            <div className='px-6 py-6 flex flex-col gap-2'>
              {[
                { href: '/features', label: 'Fitur' },
                { href: '/pricing', label: 'Harga' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Kontak' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className='group relative px-4 py-3 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-all'
                >
                  {item.label}
                  <motion.span
                    className='absolute bottom-2 left-4 h-[2px] bg-primary w-0 group-hover:w-6'
                    initial={{ width: 0 }}
                    whileHover={{ width: 24 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}

              <Link
                href='/dashboard'
                onClick={() => setOpen(false)}
                className='mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-white font-medium hover:bg-primary/90 active:scale-[0.98] transition-all'
              >
                Masuk Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
