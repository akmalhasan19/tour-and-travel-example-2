import { DurationRange, TourCategory, TourSortBy } from "@/lib/types";

interface TourFiltersProps {
  category: TourCategory | "All";
  durationRange: DurationRange | "All";
  sortBy: TourSortBy;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (value: TourCategory | "All") => void;
  onDurationChange: (value: DurationRange | "All") => void;
  onSortChange: (value: TourSortBy) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export function TourFilters({
  category,
  durationRange,
  sortBy,
  minPrice,
  maxPrice,
  onCategoryChange,
  onDurationChange,
  onSortChange,
  onMinPriceChange,
  onMaxPriceChange,
}: TourFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <label className="space-y-1">
        <span className="text-xs font-semibold uppercase text-slate-500">Kategori</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as TourCategory | "All")}
          className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm"
        >
          <option value="All">Semua</option>
          <option value="Open Trip">Open Trip</option>
          <option value="Private Trip">Private Trip</option>
        </select>
      </label>
      <label className="space-y-1">
        <span className="text-xs font-semibold uppercase text-slate-500">Durasi</span>
        <select
          value={durationRange}
          onChange={(event) => onDurationChange(event.target.value as DurationRange | "All")}
          className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm"
        >
          <option value="All">Semua</option>
          <option value="1-3">1-3 hari</option>
          <option value="4-7">4-7 hari</option>
          <option value="8+">8+ hari</option>
        </select>
      </label>
      <label className="space-y-1">
        <span className="text-xs font-semibold uppercase text-slate-500">Harga Min</span>
        <input
          type="number"
          min={0}
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm"
          placeholder="0"
        />
      </label>
      <label className="space-y-1">
        <span className="text-xs font-semibold uppercase text-slate-500">Harga Max</span>
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm"
          placeholder="10000000"
        />
      </label>
      <label className="space-y-1">
        <span className="text-xs font-semibold uppercase text-slate-500">Urutkan</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as TourSortBy)}
          className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm"
        >
          <option value="price_asc">Harga Termurah</option>
          <option value="price_desc">Harga Termahal</option>
          <option value="rating_desc">Rating Tertinggi</option>
        </select>
      </label>
    </div>
  );
}
