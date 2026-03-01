import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Syarat dan ketentuan penggunaan layanan NusaTrip.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Syarat & Ketentuan</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <p>
          Dengan menggunakan layanan NusaTrip, pengguna setuju untuk memberikan data yang benar saat melakukan
          booking.
        </p>
        <p className="mt-3">
          Harga paket dapat berubah sesuai ketersediaan dan kebijakan partner. Konfirmasi final dilakukan oleh tim
          admin secara manual.
        </p>
        <p className="mt-3">
          Pembatalan dan perubahan jadwal mengikuti ketentuan masing-masing paket yang diinformasikan saat proses
          konfirmasi.
        </p>
      </div>
    </section>
  );
}
