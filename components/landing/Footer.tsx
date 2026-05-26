"use client";

import Image from 'next/image';
import { useLang } from '../../context/LanguageContext';
import { content } from '../../lib/content';

export function Footer() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <footer id="footer" className='border-t border-slate-200 bg-slate-50 py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex flex-col md:flex-row justify-between gap-10'>
          <div>
            <div className='flex items-center gap-3'>
              {/* Logo image */}
              <Image
                src="/images/pointeach_logotransp.png"
                alt="PoinTeacher Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className='mt-4 max-w-xs text-slate-600'>
              {t.footerDescription}
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-10 text-sm'>
            <div>
              <p className='font-semibold text-slate-900 mb-3'>{t.footerPlatform}</p>
              <ul className='space-y-2 text-slate-600'>
                <li><a href='/features' className='hover:text-slate-900 transition'>{t.navFeatures}</a></li>
                <li><a href='/pricing' className='hover:text-slate-900 transition'>{t.navPricing}</a></li>
                <li><a href='/dashboard' className='hover:text-slate-900 transition'>{t.navDashboard}</a></li>
              </ul>
            </div>

            <div>
              <p className='font-semibold text-slate-900 mb-3'>{t.footerCompany}</p>
              <ul className='space-y-2 text-slate-600'>
                <li><a href='/about' className='hover:text-slate-900 transition'>{t.footerAbout}</a></li>
                <li><a href='/contact' className='hover:text-slate-900 transition'>{t.navContact}</a></li>
                <li><a href='#' className='hover:text-slate-900 transition'>{t.footerBlog}</a></li>
              </ul>
            </div>

            <div>
              <p className='font-semibold text-slate-900 mb-3'>{t.footerLegal}</p>
              <ul className='space-y-2 text-slate-600'>
                <li><a href='#' className='hover:text-slate-900 transition'>{t.footerPrivacy}</a></li>
                <li><a href='#' className='hover:text-slate-900 transition'>{t.footerTerms}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500'>
          <p>{t.footerCopyright}</p>
          <p className='mt-2 md:mt-0'>
            {t.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
