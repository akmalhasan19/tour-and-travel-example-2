"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getBookingById } from "@/lib/mock/bookings.store";
import { formatDate } from "@/lib/utils";

export function BookingSuccessClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const booking = bookingId ? getBookingById(bookingId) : null;

  if (!booking) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Booking tidak ditemukan</h1>
          <p className="mt-2 text-sm text-slate-600">
            ID booking tidak valid atau data belum tersimpan di browser ini.
          </p>
          <Link href="/booking" className="mt-4 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-white">
            Kembali ke Form Booking
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5 px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h1 className="text-2xl font-bold text-emerald-800">Booking berhasil dikirim</h1>
        <p className="mt-2 text-sm text-emerald-700">
          Tim kami akan menghubungi kamu secepatnya untuk konfirmasi jadwal dan pembayaran.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Ringkasan Booking</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">ID Booking</dt>
            <dd className="font-medium text-slate-900">{booking.id}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Paket</dt>
            <dd className="font-medium text-slate-900">{booking.tour_title}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Nama</dt>
            <dd className="font-medium text-slate-900">{booking.name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="font-medium text-slate-900">{booking.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">No HP/WA</dt>
            <dd className="font-medium text-slate-900">{booking.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Tanggal Berangkat</dt>
            <dd className="font-medium text-slate-900">{formatDate(booking.date)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Peserta</dt>
            <dd className="font-medium text-slate-900">{booking.participants} orang</dd>
          </div>
          <div>
            <dt className="text-slate-500">Status</dt>
            <dd className="font-medium text-slate-900">{booking.status}</dd>
          </div>
        </dl>
        {booking.note ? (
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
            Catatan: {booking.note}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/tours" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">
          Lihat Paket Lain
        </Link>
        <Link href="/admin/bookings" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          Cek di Admin Bookings
        </Link>
      </div>
    </section>
  );
}
