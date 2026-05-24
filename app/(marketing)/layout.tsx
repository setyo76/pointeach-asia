import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from './../../components/landing/Navbar';
import { Footer } from './../../components/landing/Footer';

export const metadata: Metadata = {
  title: 'PoinTeacher - Landing Page',
  description: 'Sistem PoinTeacher untuk guru dan sekolah.',
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-background text-slate-900'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
