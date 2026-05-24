import Image from 'next/image';

const WA_NUMBER = '6281213265482';

export default function ContactPage() {
  return (
    <section className='mx-auto max-w-4xl px-6 py-24'>
      <div className='mb-8 text-center'>
        <h1 className='text-4xl font-semibold text-slate-900'>Hubungi Kami</h1>
        <p className='mt-3 text-slate-600'>
          Untuk demo atau pertanyaan, hubungi tim PoinTeacher melalui WhatsApp
          atau kirim pesan singkat di bawah ini.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-2 items-start'>
        <div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center'>
          <Image
            src='/images/pointeach_logo.png'
            alt='PoinTeacher'
            width={160}
            height={160}
          />
          <h2 className='mt-6 text-2xl font-semibold text-slate-900'>
            Chat WhatsApp
          </h2>
          <p className='mt-2 text-slate-600'>
            Langsung hubungi kami untuk demo, pricing, atau diskusi integrasi.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-6 inline-flex items-center rounded-full bg-accent px-6 py-3 text-white'
          >
            Chat via WhatsApp
          </a>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
          <h3 className='text-xl font-semibold text-slate-900'>Kirim Pesan</h3>
          <form action='#' className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm text-slate-600'>Nama</label>
              <input
                className='mt-1 w-full rounded-md border border-slate-200 px-3 py-2'
                name='name'
              />
            </div>
            <div>
              <label className='block text-sm text-slate-600'>Email</label>
              <input
                className='mt-1 w-full rounded-md border border-slate-200 px-3 py-2'
                name='email'
              />
            </div>
            <div>
              <label className='block text-sm text-slate-600'>Pesan</label>
              <textarea
                className='mt-1 w-full rounded-md border border-slate-200 px-3 py-2'
                name='message'
                rows={4}
              />
            </div>
            <div>
              <button
                type='submit'
                className='inline-flex items-center rounded-full bg-primary px-6 py-3 text-white'
              >
                Kirim Pesan
              </button>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-3 inline-block rounded-full border border-slate-200 px-4 py-2 text-slate-700'
              >
                Chat via WA
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
