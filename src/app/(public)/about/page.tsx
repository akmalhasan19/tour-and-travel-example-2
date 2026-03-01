import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Tentang NusaTrip dan fokus layanan tour & travel kami.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Tentang NusaTrip</h1>
      <p className="text-sm text-slate-700">
        NusaTrip adalah layanan tour & travel yang fokus membantu traveler menemukan paket terbaik ke destinasi
        Indonesia. MVP ini menghadirkan fitur utama untuk browsing paket, melihat detail, dan booking dengan proses
        sederhana.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">Misi Kami</h2>
        <p className="mt-2">
          Membuat proses pemesanan perjalanan menjadi lebih jelas, transparan, dan mudah diakses dari satu platform.
        </p>
        <h2 className="mt-4 text-base font-semibold text-slate-900">Layanan Utama</h2>
        <ul className="mt-2 space-y-1">
          <li>• Paket Open Trip untuk solo traveler atau small group.</li>
          <li>• Paket Private Trip untuk itinerary fleksibel.</li>
          <li>• Konsultasi kebutuhan trip melalui tim support.</li>
        </ul>
      </div>
    </section>
  );
}
