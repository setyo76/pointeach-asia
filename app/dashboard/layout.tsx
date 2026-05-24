import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PoinTeacher Dashboard',
  description: 'Dashboard PoinTeacher untuk manajemen pengguna dan konten.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <div className='mx-auto min-h-screen max-w-7xl px-6 py-8'>{children}</div>
    </div>
  );
}
