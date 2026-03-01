import { TOURS_SEED } from "@/lib/mock/tours.seed";
import { CreateTourInput, DurationRange, ListToursParams, ListToursResult, Tour } from "@/lib/types";
import { randomId, slugify } from "@/lib/utils";

const TOURS_STORAGE_KEY = "tt_tours_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readToursFromStorage(): Tour[] | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(TOURS_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Tour[];
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeToursToStorage(tours: Tour[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
}

function ensureClientTours(): Tour[] {
  const fromStorage = readToursFromStorage();
  if (fromStorage && fromStorage.length > 0) {
    return fromStorage;
  }
  writeToursToStorage(TOURS_SEED);
  return TOURS_SEED;
}

function getAllTours(): Tour[] {
  if (!isBrowser()) {
    return TOURS_SEED;
  }
  return ensureClientTours();
}

function inDurationRange(days: number, range: DurationRange): boolean {
  if (range === "1-3") return days >= 1 && days <= 3;
  if (range === "4-7") return days >= 4 && days <= 7;
  return days >= 8;
}

export function listTours(params: ListToursParams = {}): ListToursResult {
  const {
    search = "",
    category = "All",
    durationRange = "All",
    minPrice,
    maxPrice,
    sortBy = "price_asc",
    page = 1,
    pageSize = 9,
    includeUnpublished = false,
  } = params;

  let filtered = [...getAllTours()];

  if (!includeUnpublished) {
    filtered = filtered.filter((tour) => tour.is_published);
  }

  const query = search.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter((tour) => {
      return (
        tour.title.toLowerCase().includes(query) ||
        tour.location.toLowerCase().includes(query) ||
        tour.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }

  if (category !== "All") {
    filtered = filtered.filter((tour) => tour.category === category);
  }

  if (durationRange !== "All") {
    filtered = filtered.filter((tour) => inDurationRange(tour.duration_days, durationRange));
  }

  if (typeof minPrice === "number" && !Number.isNaN(minPrice)) {
    filtered = filtered.filter((tour) => tour.price_from >= minPrice);
  }

  if (typeof maxPrice === "number" && !Number.isNaN(maxPrice)) {
    filtered = filtered.filter((tour) => tour.price_from <= maxPrice);
  }

  filtered.sort((a, b) => {
    if (sortBy === "price_desc") return b.price_from - a.price_from;
    if (sortBy === "rating_desc") return b.rating - a.rating;
    return a.price_from - b.price_from;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    data,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function getTourBySlug(slug: string): Tour | null {
  const tour = getAllTours().find((item) => item.slug === slug && item.is_published);
  return tour ?? null;
}

export function getTourById(id: string): Tour | null {
  const tour = getAllTours().find((item) => item.id === id);
  return tour ?? null;
}

function buildUniqueSlug(base: string, tours: Tour[], currentId?: string): string {
  let candidate = slugify(base);
  if (!candidate) {
    candidate = `tour-${Date.now()}`;
  }
  let counter = 1;
  while (tours.some((tour) => tour.slug === candidate && tour.id !== currentId)) {
    candidate = `${slugify(base)}-${counter}`;
    counter += 1;
  }
  return candidate;
}

export function createTour(data: CreateTourInput): Tour {
  const tours = getAllTours();
  const now = new Date().toISOString();
  const newTour: Tour = {
    ...data,
    id: randomId("tour"),
    slug: buildUniqueSlug(data.slug || data.title, tours),
    created_at: now,
    updated_at: now,
  };
  const nextTours = [newTour, ...tours];
  writeToursToStorage(nextTours);
  return newTour;
}

export function updateTour(id: string, data: Partial<Tour>): Tour | null {
  const tours = getAllTours();
  const existing = tours.find((tour) => tour.id === id);
  if (!existing) return null;

  const nextSlug = data.slug || data.title ? buildUniqueSlug(data.slug || data.title || existing.slug, tours, id) : existing.slug;
  const updated: Tour = {
    ...existing,
    ...data,
    slug: nextSlug,
    updated_at: new Date().toISOString(),
  };

  const nextTours = tours.map((tour) => (tour.id === id ? updated : tour));
  writeToursToStorage(nextTours);
  return updated;
}

export function deleteTour(id: string): boolean {
  const tours = getAllTours();
  const nextTours = tours.filter((tour) => tour.id !== id);
  const changed = nextTours.length !== tours.length;
  if (changed) writeToursToStorage(nextTours);
  return changed;
}

export function resetToursStore(): void {
  writeToursToStorage(TOURS_SEED);
}
