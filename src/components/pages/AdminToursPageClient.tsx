"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/Badge";
import { deleteTour, listTours } from "@/lib/mock/tours.store";
import { Tour } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function AdminToursPageClient() {
  const [search, setSearch] = useState("");
  const [tours, setTours] = useState<Tour[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Tour | null>(null);

  function refreshTours() {
    const result = listTours({
      includeUnpublished: true,
      search,
      page: 1,
      pageSize: 999,
      sortBy: "price_asc",
    });
    setTours(result.data);
  }

  useEffect(() => {
    refreshTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasData = useMemo(() => tours.length > 0, [tours.length]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Tours</h1>
          <p className="text-sm text-slate-600">Kelola paket tour (create, edit, delete).</p>
        </div>
        <Link href="/admin/tours/new" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          + Add New Tour
        </Link>
      </div>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search title/location..."
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />

      {!hasData ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          Tidak ada data tour.
        </div>
      ) : (
        <AdminTable
          headers={["Title", "Location", "Category", "Duration", "Price From", "Status", "Actions"]}
        >
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td className="px-4 py-3 font-medium text-slate-900">{tour.title}</td>
              <td className="px-4 py-3 text-slate-600">{tour.location}</td>
              <td className="px-4 py-3 text-slate-600">{tour.category}</td>
              <td className="px-4 py-3 text-slate-600">{tour.duration_days} hari</td>
              <td className="px-4 py-3 text-slate-600">{formatCurrency(tour.price_from)}</td>
              <td className="px-4 py-3">
                <Badge tone={tour.is_published ? "success" : "danger"}>
                  {tour.is_published ? "Published" : "Draft"}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/tours/${tour.id}/edit`}
                    className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(tour)}
                    className="rounded-md border border-rose-300 px-2.5 py-1.5 text-xs font-medium text-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">Konfirmasi Hapus</h2>
            <p className="mt-2 text-sm text-slate-600">
              Yakin ingin menghapus paket <span className="font-medium">{deleteTarget.title}</span>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTour(deleteTarget.id);
                  setDeleteTarget(null);
                  refreshTours();
                }}
                className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
