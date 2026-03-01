import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Kebijakan privasi penggunaan data pelanggan di NusaTrip.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Kebijakan Privasi</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <p>
          Data yang kamu kirimkan melalui form booking dan contact digunakan untuk proses komunikasi layanan dan
          konfirmasi perjalanan.
        </p>
        <p className="mt-3">
          MVP ini masih menggunakan penyimpanan localStorage pada browser untuk simulasi data. Data tidak dipindahkan
          ke layanan pihak ketiga pada tahap ini.
        </p>
        <p className="mt-3">
          Pada fase berikutnya, data akan diintegrasikan ke Supabase dengan kontrol keamanan dan kebijakan akses yang
          lebih ketat.
        </p>
      </div>
    </section>
  );
}
