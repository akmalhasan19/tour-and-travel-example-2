"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InputField } from "@/components/forms/InputField";
import { SelectField } from "@/components/forms/SelectField";
import { TextareaField } from "@/components/forms/TextareaField";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { createBooking } from "@/lib/mock/bookings.store";
import { listTours } from "@/lib/mock/tours.store";

interface FormState {
  tour_slug: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  participants: string;
  note: string;
}

const initialState: FormState = {
  tour_slug: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  participants: "1",
  note: "",
};

export function BookingPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourFromQuery = searchParams.get("tour") ?? "";
  const tours = listTours({ page: 1, pageSize: 200 }).data;

  const [form, setForm] = useState<FormState>({
    ...initialState,
    tour_slug: tourFromQuery,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTour = useMemo(
    () => tours.find((tour) => tour.slug === form.tour_slug),
    [form.tour_slug, tours]
  );

  const tourOptions = [
    { value: "", label: "Pilih paket tour" },
    ...tours.map((tour) => ({ value: tour.slug, label: `${tour.title} - ${tour.location}` })),
  ];

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.tour_slug) nextErrors.tour_slug = "Paket tour wajib dipilih.";
    if (!form.name.trim()) nextErrors.name = "Nama lengkap wajib diisi.";
    if (!form.email.trim()) nextErrors.email = "Email wajib diisi.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Format email tidak valid.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Nomor HP/WA wajib diisi.";
    if (!form.date) nextErrors.date = "Tanggal keberangkatan wajib diisi.";
    if (!form.participants || Number(form.participants) < 1) {
      nextErrors.participants = "Jumlah peserta minimal 1.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    if (!selectedTour) {
      setErrors((prev) => ({ ...prev, tour_slug: "Paket tour tidak ditemukan." }));
      return;
    }
    setIsSubmitting(true);
    const booking = createBooking({
      tour_slug: selectedTour.slug,
      tour_title: selectedTour.title,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      date: form.date,
      participants: Number(form.participants),
      note: form.note.trim(),
    });
    router.push(`/booking/success?id=${booking.id}`);
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Form Booking</h1>
        <p className="text-sm text-slate-600">
          Isi data di bawah untuk reservasi paket. Tim kami akan menghubungi kamu untuk konfirmasi.
        </p>
      </div>

      <InlineAlert
        type="info"
        message="Pembayaran dikonfirmasi secara manual oleh tim kami setelah data booking diverifikasi."
      />

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <SelectField
          id="tour_slug"
          label="Pilih Paket Tour"
          value={form.tour_slug}
          onChange={(event) => updateField("tour_slug", event.target.value)}
          options={tourOptions}
          error={errors.tour_slug}
          required
        />

        <InputField
          id="name"
          label="Nama Lengkap"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          error={errors.name}
          required
        />
        <InputField
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          error={errors.email}
          required
        />
        <InputField
          id="phone"
          label="No HP/WA"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          error={errors.phone}
          required
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="date"
            type="date"
            label="Tanggal Keberangkatan"
            value={form.date}
            onChange={(event) => updateField("date", event.target.value)}
            error={errors.date}
            required
          />
          <InputField
            id="participants"
            type="number"
            min={1}
            label="Jumlah Peserta"
            value={form.participants}
            onChange={(event) => updateField("participants", event.target.value)}
            error={errors.participants}
            required
          />
        </div>

        <TextareaField
          id="note"
          rows={4}
          label="Catatan Tambahan"
          value={form.note}
          onChange={(event) => updateField("note", event.target.value)}
          placeholder="Contoh: kebutuhan makanan, request kamar, dsb."
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Memproses..." : "Kirim Booking"}
        </button>
      </form>
    </section>
  );
}
