import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6">
      <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">404</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-slate-600">
        URL yang kamu akses tidak tersedia atau sudah dipindahkan.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          Kembali ke Home
        </Link>
        <Link href="/tours" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">
          Lihat Tours
        </Link>
      </div>
    </section>
  );
}
