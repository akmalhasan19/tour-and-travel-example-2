import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTourBySlug } from "@/lib/mock/tours.store";
import { formatCurrency } from "@/lib/utils";

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "Paket tour tidak ditemukan.",
    };
  }
  return {
    title: tour.title,
    description: `${tour.location} - ${tour.duration_days} hari mulai dari ${formatCurrency(tour.price_from)}.`,
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section
        className="relative overflow-hidden rounded-3xl bg-cover bg-center p-6 text-white sm:p-10"
        style={{ backgroundImage: `linear-gradient(rgba(2,6,23,0.45), rgba(2,6,23,0.65)), url(${tour.images[0]})` }}
      >
        <p className="text-sm font-semibold text-sky-200">{tour.location}</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{tour.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-100">
          {tour.duration_days} hari • {tour.category} • Rating {tour.rating.toFixed(1)}
        </p>
        <p className="mt-1 text-lg font-semibold text-emerald-200">Mulai {formatCurrency(tour.price_from)}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            {tour.images.slice(0, 3).map((image, index) => (
              <div
                key={`${image}_${index}`}
                className="h-28 rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-900">Highlights</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {tour.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-900">Itinerary</h2>
            <div className="mt-4 space-y-3">
              {tour.itinerary.map((item) => (
                <div key={item.day} className="rounded-lg border border-slate-200 p-3">
                  <p className="text-sm font-semibold text-slate-900">
                    Day {item.day}: {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">Termasuk</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {tour.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">Tidak Termasuk</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {tour.excludes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">Meeting Point</h3>
            <p className="mt-1 text-sm text-slate-700">{tour.meeting_point}</p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Jadwal Keberangkatan</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {tour.departure_schedule.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Link
              href={`/booking?tour=${tour.slug}`}
              className="mt-4 inline-flex w-full justify-center rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"
            >
              Book Now
            </Link>
          </div>
        </aside>
      </section>
    </article>
  );
}
