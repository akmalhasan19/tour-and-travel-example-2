"use client";

import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { TourCard } from "@/components/tours/TourCard";
import { TourFilters } from "@/components/tours/TourFilters";
import { listTours } from "@/lib/mock/tours.store";
import { DurationRange, TourCategory, TourSortBy } from "@/lib/types";

const PAGE_SIZE = 9;

export function ToursPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<TourCategory | "All">("All");
  const [durationRange, setDurationRange] = useState<DurationRange | "All">("All");
  const [sortBy, setSortBy] = useState<TourSortBy>("price_asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const result = useMemo(() => {
    return listTours({
      search,
      category,
      durationRange,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sortBy,
      page,
      pageSize: PAGE_SIZE,
    });
  }, [category, durationRange, maxPrice, minPrice, page, search, sortBy]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Paket Tour</h1>
        <p className="text-sm text-slate-600">
          Temukan paket wisata terbaik sesuai durasi, budget, dan style perjalananmu.
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <TourFilters
        category={category}
        durationRange={durationRange}
        sortBy={sortBy}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        onDurationChange={(value) => {
          setDurationRange(value);
          setPage(1);
        }}
        onSortChange={setSortBy}
        onMinPriceChange={(value) => {
          setMinPrice(value);
          setPage(1);
        }}
        onMaxPriceChange={(value) => {
          setMaxPrice(value);
          setPage(1);
        }}
      />

      <p className="text-sm text-slate-600">{result.total} paket ditemukan.</p>

      {result.data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-slate-500">
          Tidak ada paket yang cocok. Coba ubah filter pencarian.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.data.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}

      <Pagination page={result.page} totalPages={result.totalPages} onPageChange={setPage} />
    </section>
  );
}
