import Link from "next/link";
import { Tour } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { TourBadgePill } from "@/components/ui/Badge";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${tour.images[0] ?? "https://picsum.photos/seed/fallback/1200/700"})` }}
      />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{tour.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{tour.location}</p>
          </div>
          <TourBadgePill badge={tour.badge} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-slate-600">
            Durasi: <span className="font-medium text-slate-800">{tour.duration_days} hari</span>
          </p>
          <p className="text-slate-600">
            Rating: <span className="font-medium text-slate-800">{tour.rating.toFixed(1)}</span>
          </p>
        </div>
        <p className="text-sm text-slate-700">
          Mulai dari <span className="font-semibold text-sky-700">{formatCurrency(tour.price_from)}</span>
        </p>
        <Link
          href={`/tours/${tour.slug}`}
          className="inline-flex rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-800"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
