"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { TourForm } from "@/components/admin/TourForm";
import { createTour, getTourById, updateTour } from "@/lib/mock/tours.store";
import { CreateTourInput } from "@/lib/types";

interface AdminTourEditorClientProps {
  mode: "create" | "edit";
  id?: string;
}

export function AdminTourEditorClient({ mode, id }: AdminTourEditorClientProps) {
  const router = useRouter();
  const existing = useMemo(() => (id ? getTourById(id) : null), [id]);

  function handleSubmit(data: CreateTourInput) {
    if (mode === "create") {
      createTour(data);
      router.push("/admin/tours");
      return;
    }
    if (!id) return;
    updateTour(id, data);
    router.push("/admin/tours");
  }

  if (mode === "edit" && !existing) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h1 className="text-xl font-bold text-slate-900">Tour tidak ditemukan</h1>
          <p className="mt-2 text-sm text-slate-600">Data kemungkinan sudah dihapus atau ID tidak valid.</p>
          <Link href="/admin/tours" className="mt-4 inline-flex rounded-lg bg-sky-700 px-3 py-2 text-white">
            Kembali ke List
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "create" ? "Create New Tour" : "Edit Tour"}
        </h1>
        <p className="text-sm text-slate-600">
          Lengkapi semua data penting paket tour sesuai struktur mock schema.
        </p>
      </div>
      <TourForm
        initialData={existing ?? undefined}
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Create Tour" : "Save Changes"}
      />
    </section>
  );
}
