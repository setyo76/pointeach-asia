"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = '6281213265482';

const plans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Cocok untuk percobaan dan guru individu',
    features: ['50 generasi AI/bulan', 'Ekspor dasar', 'Template standar'],
    waMessage: 'Halo, saya tertarik dengan paket Starter PoinTeacher.',
  },
  {
    name: 'Guru Pro',
    price: '299.000',
    description: 'Untuk guru profesional',
    features: ['Unlimited AI', 'Analisis lengkap', 'Full Google Export', 'Branding personal'],
    popular: true,
    waMessage: 'Halo, saya tertarik dengan paket Guru Pro PoinTeacher.',
  },
  {
    name: 'Sekolah',
    price: '1.499.000',
    description: 'Untuk 1 sekolah (max 50 guru)',
    features: ['Admin dashboard', 'Custom branding sekolah', 'Support prioritas'],
    waMessage: 'Halo, saya tertarik dengan paket Sekolah PoinTeacher.',
  },
  {
    name: 'Yayasan',
    price: 'Custom',
    description: 'Multi sekolah & integrasi khusus',
    features: ['Full branding institusi', 'Dedicated support', 'Integrasi custom'],
    waMessage: 'Halo, saya ingin mengetahui lebih lanjut tentang paket Yayasan PoinTeacher.',
  },
];

function getWaLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Wave ripple button
function WaveButton({
  href,
  popular,
  children,
}: {
  href: string;
  popular?: boolean;
  children: React.ReactNode;
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
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.96 }}
      className={`relative mt-10 flex w-full items-center justify-center gap-2 py-3 rounded-full font-medium text-sm overflow-hidden transition-colors ${
        popular
          ? 'bg-primary text-white shadow-md'
          : 'border border-slate-300 text-slate-700 bg-white'
      }`}
    >
      {/* Wave ripples */}
      <AnimatePresence>
        {waves.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className={`absolute rounded-full pointer-events-none ${
              popular ? 'bg-white/25' : 'bg-primary/15'
            }`}
            style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 320, height: 320, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Shimmer sweep on hover — for popular button */}
      {popular && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          initial={{ backgroundPosition: '200% 0' }}
          whileHover={{ backgroundPosition: '-200% 0' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

const cardVariants = {
  initial: { opacity: 0, y: 60 },
  inView: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">HARGA</p>
        <h2 className="mt-4 text-4xl font-semibold text-slate-900">
          Pilih paket sesuai skala Anda
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 items-start">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            custom={index}
            variants={cardVariants}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true }}
            whileHover={{
              scale: plan.popular ? 1.06 : 1.04,
              boxShadow: plan.popular
                ? '0 24px 60px -10px rgba(99, 102, 241, 0.35), 0 8px 24px -6px rgba(99, 102, 241, 0.2)'
                : '0 20px 50px -10px rgba(15, 23, 42, 0.18), 0 6px 20px -6px rgba(15, 23, 42, 0.1)',
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
            className={`rounded-3xl border bg-white p-8 shadow-sm cursor-default transition-colors ${
              plan.popular
                ? 'border-primary relative md:-mt-3 md:mb-3'
                : 'border-slate-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 right-6 rounded-full bg-primary px-4 py-1 text-xs text-white font-medium shadow-sm">
                Paling Populer
              </div>
            )}

            <h3 className="text-2xl font-semibold text-slate-900">{plan.name}</h3>

            <p className="mt-4">
              <span className="text-4xl font-bold text-primary">
                {plan.price === 'Custom' ? 'Custom' : `Rp${plan.price}`}
              </span>
              {plan.price !== 'Custom' && (
                <span className="text-slate-500 text-sm"> / bulan</span>
              )}
            </p>

            <p className="mt-2 text-sm text-slate-600">{plan.description}</p>

            <ul className="mt-8 space-y-3">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.07 + 0.3, type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                  {f}
                </li>
              ))}
            </ul>

            <WaveButton href={getWaLink(plan.waMessage)} popular={plan.popular}>
              {/* WhatsApp icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {plan.name === 'Yayasan' ? 'Hubungi Kami' : 'Pilih Paket'}
            </WaveButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}