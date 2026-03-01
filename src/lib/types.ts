export type TourCategory = "Open Trip" | "Private Trip";

export type TourBadge = "Best Seller" | "Promo" | "New";

export type DurationRange = "1-3" | "4-7" | "8+";

export type TourSortBy = "price_asc" | "price_desc" | "rating_desc";

export type BookingStatus = "New" | "Contacted" | "Done";

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: TourCategory;
  duration_days: number;
  price_from: number;
  rating: number;
  tags: string[];
  badge?: TourBadge;
  highlights: string[];
  images: string[];
  itinerary: ItineraryItem[];
  includes: string[];
  excludes: string[];
  departure_schedule: string[];
  meeting_point: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ListToursParams {
  search?: string;
  category?: TourCategory | "All";
  durationRange?: DurationRange | "All";
  minPrice?: number;
  maxPrice?: number;
  sortBy?: TourSortBy;
  page?: number;
  pageSize?: number;
  includeUnpublished?: boolean;
}

export interface ListToursResult {
  data: Tour[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Booking {
  id: string;
  tour_slug: string;
  tour_title: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  participants: number;
  note: string;
  status: BookingStatus;
  created_at: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
}

export type CreateTourInput = Omit<Tour, "id" | "created_at" | "updated_at">;

export type CreateBookingInput = Omit<
  Booking,
  "id" | "status" | "created_at"
>;
