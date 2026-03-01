"use client";

import { useReducer, useState } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/Badge";
import { listBookings, updateBookingStatus } from "@/lib/mock/bookings.store";
import { BookingStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const statusTone: Record<BookingStatus, "neutral" | "success" | "danger"> = {
  New: "neutral",
  Contacted: "success",
  Done: "success",
};

export function AdminBookingsPageClient() {
  const [filter, setFilter] = useState<BookingStatus | "All">("All");
  const [, forceRefresh] = useReducer((value: number) => value + 1, 0);

  const allBookings = listBookings();
  const bookings = filter === "All" ? allBookings : allBookings.filter((item) => item.status === filter);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Bookings</h1>
          <p className="text-sm text-slate-600">Daftar booking masuk dengan filter status.</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span>Status</span>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as BookingStatus | "All")}
            className="rounded-lg border border-slate-300 px-2 py-1.5"
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Done">Done</option>
          </select>
        </label>
      </div>

      <AdminTable headers={["Tour", "Customer", "Date", "Participants", "Status", "Created At", "Actions"]}>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td className="px-4 py-3">
              <p className="font-medium text-slate-900">{booking.tour_title}</p>
              <p className="text-xs text-slate-500">{booking.tour_slug}</p>
            </td>
            <td className="px-4 py-3">
              <p className="font-medium text-slate-900">{booking.name}</p>
              <p className="text-xs text-slate-500">{booking.email}</p>
              <p className="text-xs text-slate-500">{booking.phone}</p>
            </td>
            <td className="px-4 py-3 text-slate-600">{formatDate(booking.date)}</td>
            <td className="px-4 py-3 text-slate-600">{booking.participants}</td>
            <td className="px-4 py-3">
              <Badge tone={statusTone[booking.status]}>{booking.status}</Badge>
            </td>
            <td className="px-4 py-3 text-slate-600">{formatDate(booking.created_at)}</td>
            <td className="px-4 py-3">
              <select
                aria-label={`Status booking ${booking.id}`}
                value={booking.status}
                onChange={(event) => {
                  updateBookingStatus(booking.id, event.target.value as BookingStatus);
                  forceRefresh();
                }}
                className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Done">Done</option>
              </select>
            </td>
          </tr>
        ))}
      </AdminTable>
    </section>
  );
}
