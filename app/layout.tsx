import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'PoinTeacher Asia',
  description: 'PoinTeacher - platform edukasi modern untuk guru dan sekolah.',
  metadataBase: new URL('https://pointeacher.asia'),
  icons: {
    icon: '/images/pointeach_logotransp.png',
    shortcut: '/images/pointeach_logotransp.png',
    apple: '/images/pointeach_logotransp.png'
  },
  openGraph: {
    title: 'PoinTeacher Asia',
    description: 'Platform edukasi modern untuk guru dan sekolah.',
    url: 'https://pointeacher.asia',
    siteName: 'PoinTeacher',
    locale: 'id_ID',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
