# PoinTeacher Asia

Struktur proyek dan panduan singkat untuk pengembangan PoinTeacher Asia.

**Teknologi utama:** Next.js (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, Shadcn UI, Supabase, Google OAuth & Workspace APIs, Gemini AI

**Catatan struktur penting**

- `app/`
  - `(marketing)/` — Halaman landing (route group, tetap berada di root path seperti `/`, `/features`, `/pricing`, `/faq`)
  - `dashboard/` — Area aplikasi (non-route-group) yang akan tersedia di path `/dashboard`
  - `api/` — Route API untuk AI (`/api/generate`), upload (`/api/upload`), export Google (`/api/export/*`), dan OAuth callback
- `components/` — semua komponen UI terpisah: `landing/`, `dashboard/`, `wizard/`, `ui/`
- `lib/` — klien dan helper untuk Supabase, Gemini, Google, serta utilitas umum
- `hooks/`, `store/`, `types/`, `constants/` — organisasi codebase untuk state, tipe, dan data statis

## Cara jalan cepat (development)

1. Pasang dependensi:

```bash
npm install
```

2. Jalankan mode development:

```bash
npm run dev
```

3. Build produksi:

```bash
npm run build
```

## Environment

Tambahkan variabel berikut ke `.env.local` (contoh minimal):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_URL=
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Marketing folder

Dokumentasi struktur marketing tersedia di [app/(marketing)/README.md](<app/(marketing)/README.md>).

## Lanjutan

- Untuk integrasi Supabase, isi kredensial dan buat migrasi di folder `supabase/`.
- Untuk Google OAuth dan export (Docs/Sheets/Slides), konfigurasi `lib/google.ts` dan route di `app/api/export/*`.
- Route placeholder untuk Gemini ada di `app/api/generate/route.ts`.

Jika mau, saya bisa lanjutkan dengan menambahkan script deployment, contoh Dockerfile, atau template GitHub Actions.
