import type { Metadata } from "next";
import Link from "next/link";
import { TourCard } from "@/components/tours/TourCard";
import { listTours } from "@/lib/mock/tours.store";

export const metadata: Metadata = {
  title: "Home",
  description: "Platform tour & travel untuk paket wisata Indonesia dengan booking cepat.",
};

const whyUs = [
  "Paket fleksibel: open trip maupun private trip.",
  "Harga transparan dengan itinerary jelas.",
  "Tim support responsif untuk konsultasi trip.",
  "Destinasi pilihan favorit traveler Indonesia.",
];

const faqSnippet = [
  {
    q: "Apakah harga paket sudah termasuk tiket pesawat?",
    a: "Belum. Mayoritas paket belum termasuk tiket pesawat kecuali disebutkan di detail.",
  },
  {
    q: "Bagaimana proses pembayaran?",
    a: "Saat MVP ini, pembayaran dikonfirmasi manual oleh tim setelah booking masuk.",
  },
];

const testimonials = [
  {
    name: "Maya, Jakarta",
    text: "Trip ke Labuan Bajo rapi banget. Itinerary jelas dan support cepat.",
  },
  {
    name: "Rizky, Surabaya",
    text: "Booking mudah, tim admin responsif, dan tidak ribet.",
  },
  {
    name: "Salsa, Bandung",
    text: "Rekomendasi paketnya sesuai budget. Pengalaman pertama yang nyaman.",
  },
];

export default function HomePage() {
  const popularTours = listTours({ page: 1, pageSize: 6, sortBy: "rating_desc" }).data;

  return (
    <div className="space-y-14 pb-8">
      <section className="bg-[radial-gradient(circle_at_top,_#dbeafe_0%,_#f8fafc_55%)]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
              Explore Indonesia
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Rencanakan liburan impianmu bersama NusaTrip
            </h1>
            <p className="max-w-lg text-slate-600">
              Temukan paket wisata curated ke destinasi terbaik Indonesia. Dari short getaway sampai ekspedisi
              premium.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tours" className="rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white">
                Lihat Paket Tour
              </Link>
              <Link href="/booking" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium">
                Book Sekarang
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-3 shadow-lg">
            <div
              className="h-72 rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: "url('https://picsum.photos/seed/home-hero/1400/900')" }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-5 px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Paket Populer</h2>
            <p className="text-sm text-slate-600">Pilihan paket paling banyak dipesan traveler.</p>
          </div>
          <Link href="/tours" className="text-sm font-medium text-sky-700">
            Lihat semua
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-900">Kenapa Pilih Kami</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {whyUs.map((point) => (
              <li key={point} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900">Testimoni</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-700">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{item.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-slate-900">FAQ Singkat</h2>
            <Link href="/faq" className="text-sm font-medium text-sky-700">
              Lihat FAQ lengkap
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {faqSnippet.map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
                <p className="text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
