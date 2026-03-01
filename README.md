# NusaTrip MVP - Tour & Travel Website

MVP website jasa Tour & Travel berbasis Next.js App Router + Tailwind CSS. Data masih mock/localStorage. Supabase disiapkan untuk readiness (schema + docs + env template), tetapi **belum** dipakai di app code.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint default Next.js

## Run Locally
1. Install dependencies:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Build production:

```bash
npm run build
```

4. Lint:

```bash
npm run lint
```

## Routes
### Public
- `/`
- `/tours`
- `/tours/[slug]`
- `/booking`
- `/booking/success`
- `/faq`
- `/about`
- `/contact`
- `/terms`
- `/privacy`

### Admin (tanpa auth, pseudo-admin)
- `/admin`
- `/admin/tours`
- `/admin/tours/new`
- `/admin/tours/[id]/edit`
- `/admin/bookings`

### SEO/System
- `/sitemap.xml`
- `/robots.txt`
- custom `404` page

## Fitur MVP yang Sudah Dibuat
- Home landing dengan hero, paket populer, alasan pilih kami, testimoni, FAQ snippet.
- Listing paket tour:
  - Search keyword
  - Filter category, durasi, min/max harga
  - Sort harga/rating
  - Pagination client-side
- Detail paket tour:
  - Hero + mini gallery
  - Highlight, itinerary, include/exclude
  - Meeting point + jadwal
  - CTA `Book Now` ke booking prefilled
- Booking form:
  - Validasi client-side basic
  - Simpan ke localStorage mock booking store
  - Halaman sukses + ringkasan booking
  - Disclaimer pembayaran manual
- Contact page:
  - Form submit mock (inline alert)
  - Info kantor + jam operasional
- Admin tanpa auth:
  - Dashboard ringkas
  - CRUD tours (create/edit/delete + modal konfirmasi)
  - List booking + filter status + update status
- SEO basic:
  - Metadata per page
  - OpenGraph dasar
  - Sitemap + robots

## Struktur Data Mock
- `src/lib/mock/tours.seed.ts` (seed 20 destinasi Indonesia)
- `src/lib/mock/tours.store.ts`:
  - `listTours(params)`
  - `getTourBySlug(slug)`
  - `getTourById(id)`
  - `createTour(data)`
  - `updateTour(id, data)`
  - `deleteTour(id)`
- `src/lib/mock/bookings.store.ts`:
  - `listBookings()`
  - `createBooking(data)`
  - `updateBookingStatus(id, status)`

## Supabase Readiness (Belum Terintegrasi)
- `supabase/schema.sql`: tabel `tours`, `tour_itineraries`, `bookings`, `contact_messages`.
- `supabase/README.md`: langkah setup project, env, execute schema, dan rencana integrasi lanjutan.
- `.env.example`:
  - `NEXT_PUBLIC_SUPABASE_URL=`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=`

## Catatan Batasan MVP
- Belum ada auth/akun user.
- Belum ada payment gateway.
- Belum ada realtime seat management.
- Belum ada upload storage/image management backend.
- Belum ada integrasi Supabase client di app code.

## Next Steps
1. Integrasi Supabase data layer (server actions/route handlers).
2. Aktifkan auth admin.
3. Aktifkan RLS policy untuk produksi.
4. Pindahkan booking/contact submit ke database.
