"use client";

import Link from "next/link";
import { listBookings } from "@/lib/mock/bookings.store";
import { listTours } from "@/lib/mock/tours.store";

export function AdminDashboardClient() {
  const tours = listTours({ includeUnpublished: true, page: 1, pageSize: 500 }).data;
  const bookings = listBookings();

  const stats = [
    { label: "Total Tours", value: tours.length },
    { label: "Published Tours", value: tours.filter((tour) => tour.is_published).length },
    { label: "Total Bookings", value: bookings.length },
    { label: "New Bookings", value: bookings.filter((booking) => booking.status === "New").length },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-600">Pseudo-admin mode, belum memakai auth dan belum secure.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/tours" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          Kelola Tours
        </Link>
        <Link href="/admin/bookings" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">
          Lihat Bookings
        </Link>
      </div>
    </section>
  );
}
