import type { ReactNode } from 'react';

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
      {children}
    </div>
  );
}
