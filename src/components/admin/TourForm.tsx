"use client";

import { FormEvent, useMemo, useState } from "react";
import { InputField } from "@/components/forms/InputField";
import { SelectField } from "@/components/forms/SelectField";
import { TextareaField } from "@/components/forms/TextareaField";
import { CreateTourInput, ItineraryItem, Tour } from "@/lib/types";
import { parseLines } from "@/lib/utils";

interface TourFormProps {
  initialData?: Tour;
  onSubmit: (data: CreateTourInput) => void;
  submitLabel: string;
}

interface TourFormState {
  slug: string;
  title: string;
  location: string;
  category: "Open Trip" | "Private Trip";
  duration_days: string;
  price_from: string;
  rating: string;
  badge: "" | "Best Seller" | "Promo" | "New";
  tags: string;
  highlights: string;
  images: string;
  includes: string;
  excludes: string;
  departure_schedule: string;
  meeting_point: string;
  is_published: boolean;
}

function toFormState(data?: Tour): TourFormState {
  if (!data) {
    return {
      slug: "",
      title: "",
      location: "",
      category: "Open Trip",
      duration_days: "3",
      price_from: "1000000",
      rating: "4.5",
      badge: "",
      tags: "",
      highlights: "",
      images: "",
      includes: "",
      excludes: "",
      departure_schedule: "",
      meeting_point: "",
      is_published: true,
    };
  }

  return {
    slug: data.slug,
    title: data.title,
    location: data.location,
    category: data.category,
    duration_days: String(data.duration_days),
    price_from: String(data.price_from),
    rating: String(data.rating),
    badge: data.badge ?? "",
    tags: data.tags.join("\n"),
    highlights: data.highlights.join("\n"),
    images: data.images.join("\n"),
    includes: data.includes.join("\n"),
    excludes: data.excludes.join("\n"),
    departure_schedule: data.departure_schedule.join("\n"),
    meeting_point: data.meeting_point,
    is_published: data.is_published,
  };
}

export function TourForm({ initialData, onSubmit, submitLabel }: TourFormProps) {
  const [form, setForm] = useState<TourFormState>(toFormState(initialData));
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    initialData?.itinerary ?? [{ day: 1, title: "", description: "" }]
  );
  const [error, setError] = useState<string>("");

  const parsedPreview = useMemo(() => parseLines(form.tags), [form.tags]);

  function updateField<K extends keyof TourFormState>(key: K, value: TourFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.location.trim() || !form.meeting_point.trim()) {
      setError("Field utama tidak boleh kosong.");
      return;
    }

    if (itinerary.some((item) => !item.title.trim() || !item.description.trim())) {
      setError("Semua itinerary day wajib diisi.");
      return;
    }

    const payload: CreateTourInput = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      location: form.location.trim(),
      category: form.category,
      duration_days: Number(form.duration_days),
      price_from: Number(form.price_from),
      rating: Number(form.rating),
      badge: form.badge || undefined,
      tags: parseLines(form.tags),
      highlights: parseLines(form.highlights),
      images: parseLines(form.images),
      itinerary: itinerary.map((item, index) => ({
        day: index + 1,
        title: item.title.trim(),
        description: item.description.trim(),
      })),
      includes: parseLines(form.includes),
      excludes: parseLines(form.excludes),
      departure_schedule: parseLines(form.departure_schedule),
      meeting_point: form.meeting_point.trim(),
      is_published: form.is_published,
    };

    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
      {error ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          id="title"
          label="Title"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          required
        />
        <InputField
          id="slug"
          label="Slug"
          value={form.slug}
          onChange={(event) => updateField("slug", event.target.value)}
          placeholder="kosongkan untuk auto-generate"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          id="location"
          label="Location"
          value={form.location}
          onChange={(event) => updateField("location", event.target.value)}
          required
        />
        <SelectField
          id="category"
          label="Category"
          value={form.category}
          onChange={(event) => updateField("category", event.target.value as "Open Trip" | "Private Trip")}
          options={[
            { value: "Open Trip", label: "Open Trip" },
            { value: "Private Trip", label: "Private Trip" },
          ]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputField
          id="duration_days"
          type="number"
          min={1}
          label="Duration Days"
          value={form.duration_days}
          onChange={(event) => updateField("duration_days", event.target.value)}
          required
        />
        <InputField
          id="price_from"
          type="number"
          min={0}
          label="Price From"
          value={form.price_from}
          onChange={(event) => updateField("price_from", event.target.value)}
          required
        />
        <InputField
          id="rating"
          type="number"
          min={0}
          max={5}
          step={0.1}
          label="Rating"
          value={form.rating}
          onChange={(event) => updateField("rating", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          id="badge"
          label="Badge"
          value={form.badge}
          onChange={(event) => updateField("badge", event.target.value as TourFormState["badge"])}
          options={[
            { value: "", label: "No badge" },
            { value: "Best Seller", label: "Best Seller" },
            { value: "Promo", label: "Promo" },
            { value: "New", label: "New" },
          ]}
        />
        <InputField
          id="meeting_point"
          label="Meeting Point"
          value={form.meeting_point}
          onChange={(event) => updateField("meeting_point", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextareaField
          id="tags"
          rows={4}
          label="Tags (1 baris = 1 item)"
          value={form.tags}
          onChange={(event) => updateField("tags", event.target.value)}
        />
        <TextareaField
          id="highlights"
          rows={4}
          label="Highlights (1 baris = 1 item)"
          value={form.highlights}
          onChange={(event) => updateField("highlights", event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextareaField
          id="images"
          rows={4}
          label="Images URL (1 baris = 1 URL)"
          value={form.images}
          onChange={(event) => updateField("images", event.target.value)}
        />
        <TextareaField
          id="departure_schedule"
          rows={4}
          label="Departure Schedule (1 baris = 1 item)"
          value={form.departure_schedule}
          onChange={(event) => updateField("departure_schedule", event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextareaField
          id="includes"
          rows={4}
          label="Includes (1 baris = 1 item)"
          value={form.includes}
          onChange={(event) => updateField("includes", event.target.value)}
        />
        <TextareaField
          id="excludes"
          rows={4}
          label="Excludes (1 baris = 1 item)"
          value={form.excludes}
          onChange={(event) => updateField("excludes", event.target.value)}
        />
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Itinerary</h3>
          <button
            type="button"
            onClick={() =>
              setItinerary((prev) => [...prev, { day: prev.length + 1, title: "", description: "" }])
            }
            className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium"
          >
            + Add Day
          </button>
        </div>
        <div className="space-y-3">
          {itinerary.map((item, index) => (
            <div key={index} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-12">
              <InputField
                id={`itinerary_day_${index}`}
                label="Day"
                type="number"
                min={1}
                value={String(index + 1)}
                onChange={() => undefined}
                readOnly
              />
              <div className="md:col-span-4">
                <InputField
                  id={`itinerary_title_${index}`}
                  label="Title"
                  value={item.title}
                  onChange={(event) =>
                    setItinerary((prev) =>
                      prev.map((entry, i) => (i === index ? { ...entry, title: event.target.value } : entry))
                    )
                  }
                />
              </div>
              <div className="md:col-span-6">
                <TextareaField
                  id={`itinerary_desc_${index}`}
                  label="Description"
                  rows={2}
                  value={item.description}
                  onChange={(event) =>
                    setItinerary((prev) =>
                      prev.map((entry, i) =>
                        i === index ? { ...entry, description: event.target.value } : entry
                      )
                    )
                  }
                />
              </div>
              <div className="flex items-end md:col-span-1">
                <button
                  type="button"
                  onClick={() => setItinerary((prev) => prev.filter((_, i) => i !== index))}
                  className="rounded-lg border border-rose-300 px-2.5 py-2 text-xs font-medium text-rose-700 disabled:opacity-50"
                  disabled={itinerary.length === 1}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(event) => updateField("is_published", event.target.checked)}
        />
        Published
      </label>

      {parsedPreview.length ? (
        <p className="text-xs text-slate-500">Preview tags: {parsedPreview.join(", ")}</p>
      ) : null}

      <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white">
        {submitLabel}
      </button>
    </form>
  );
}
