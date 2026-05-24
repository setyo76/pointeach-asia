import Image from 'next/image';

export function Footer() {
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
              Platform AI All-in-One untuk guru, sekolah, dan yayasan di Indonesia.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-10 text-sm'>
            <div>
              <p className='font-semibold text-slate-900 mb-3'>Platform</p>
              <ul className='space-y-2 text-slate-600'>
                <li><a href='/features' className='hover:text-slate-900 transition'>Fitur</a></li>
                <li><a href='/pricing' className='hover:text-slate-900 transition'>Harga</a></li>
                <li><a href='/dashboard' className='hover:text-slate-900 transition'>Dashboard</a></li>
              </ul>
            </div>

            <div>
              <p className='font-semibold text-slate-900 mb-3'>Perusahaan</p>
              <ul className='space-y-2 text-slate-600'>
                <li><a href='/about' className='hover:text-slate-900 transition'>Tentang Kami</a></li>
                <li><a href='/contact' className='hover:text-slate-900 transition'>Kontak</a></li>
                <li><a href='#' className='hover:text-slate-900 transition'>Blog</a></li>
              </ul>
            </div>

            <div>
              <p className='font-semibold text-slate-900 mb-3'>Legal</p>
              <ul className='space-y-2 text-slate-600'>
                <li><a href='#' className='hover:text-slate-900 transition'>Kebijakan Privasi</a></li>
                <li><a href='#' className='hover:text-slate-900 transition'>Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500'>
          <p>© 2026 PoinTeacher Asia. Semua hak dilindungi.</p>
          <p className='mt-2 md:mt-0'>
            Memberdayakan Guru • Meningkatkan Sekolah • Memperkuat Branding Institusi
          </p>
        </div>
      </div>
    </footer>
  );
}
