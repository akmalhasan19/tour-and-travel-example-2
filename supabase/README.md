# Supabase Setup Readiness

Folder ini berisi persiapan integrasi Supabase untuk tahap berikutnya. Pada MVP saat ini, aplikasi **belum** menggunakan Supabase client dan masih memakai mock data/localStorage.

## 1) Create Project
1. Login ke Supabase Dashboard.
2. Create new project.
3. Simpan nilai:
- `Project URL`
- `anon public key`

## 2) Set Environment Variable
Di root project, copy `.env.example` menjadi `.env.local`, lalu isi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 3) Run Schema SQL
1. Buka Supabase SQL Editor.
2. Copy isi file `supabase/schema.sql`.
3. Jalankan query.
4. Verifikasi tabel:
- `tours`
- `tour_itineraries`
- `bookings`
- `contact_messages`

## 4) Next Integration Plan (Belum Diimplementasikan)
1. Tambah data access layer berbasis Supabase (server actions / route handlers).
2. Migrasi fungsi store mock ke repository Supabase.
3. Aktifkan auth admin.
4. Aktifkan RLS policy sesuai role (public read published tours, admin write).
5. Migrasi booking/contact submit ke insert database.
