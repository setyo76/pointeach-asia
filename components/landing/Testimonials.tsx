"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Dulu butuh berjam-jam untuk membuat soal dan dokumen administrasi. Sekarang semuanya jauh lebih cepat dan profesional dengan branding sekolah.",
    name: "Bu. Rina Sari",
    role: "Guru Matematika SMA Negeri 5 Jakarta",
    image: "/images/Bu. Rina Sari.png",
    rating: 5,
  },
  {
    quote: "Sebagai kepala sekolah, saya sangat terbantu dengan fitur analisis dan administrasi. Semua dokumen jadi rapi dan mudah dimonitor.",
    name: "Drs. Ahmad Fauzi, M.Pd",
    role: "Kepala SMP Islam Al-Azhar 1",
    image: "/images/Drs. Ahmad Fauzi, M.Pd.png",
    rating: 5,
  },
  {
    quote: "Integrasi Google Workspace dan AI sangat mulus. Seluruh guru di yayasan kami sekarang bekerja dalam satu ekosistem yang sama.",
    name: "Dra. Siti Nurhaliza",
    role: "Bendahara Yayasan Pendidikan XYZ",
    image: "/images/Dra. Siti Nurhaliza.png",
    rating: 5,
  },
];

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
  return (
    <section id="testimonials" className='mx-auto max-w-7xl px-6 py-24 bg-slate-50'>
      <div className='mb-12 text-center'>
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-accent'>
          TESTIMONI
        </p>
        <h2 className='mt-4 text-4xl font-semibold text-slate-900'>
          Apa Kata Mereka yang Sudah Menggunakan PoinTeacher?
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className='grid md:grid-cols-3 gap-8'
      >
        {testimonials.map((item, index) => (
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