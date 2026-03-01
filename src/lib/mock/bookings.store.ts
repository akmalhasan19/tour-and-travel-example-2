import { Booking, BookingStatus, CreateBookingInput } from "@/lib/types";
import { randomId } from "@/lib/utils";

const BOOKINGS_STORAGE_KEY = "tt_bookings_v1";

const BOOKINGS_SEED: Booking[] = [
  {
    id: "booking_seed_001",
    tour_slug: "bali-ubud-nusa-penida-4h3m",
    tour_title: "Bali Ubud & Nusa Penida Escape",
    name: "Andi Pratama",
    email: "andi@example.com",
    phone: "081234567890",
    date: "2026-04-12",
    participants: 2,
    note: "Minta kamar twin bed.",
    status: "New",
    created_at: new Date("2026-02-10T09:30:00.000Z").toISOString(),
  },
  {
    id: "booking_seed_002",
    tour_slug: "bromo-tumpak-sewu-3h2m",
    tour_title: "Bromo Sunrise & Tumpak Sewu",
    name: "Rina Safitri",
    email: "rina@example.com",
    phone: "089876543210",
    date: "2026-03-20",
    participants: 4,
    note: "Berangkat dari Surabaya.",
    status: "Contacted",
    created_at: new Date("2026-02-05T02:10:00.000Z").toISOString(),
  },
  {
    id: "booking_seed_003",
    tour_slug: "labuan-bajo-komodo-4h3m",
    tour_title: "Sailing Labuan Bajo Komodo",
    name: "Dewi Lestari",
    email: "dewi@example.com",
    phone: "082223334444",
    date: "2026-05-08",
    participants: 3,
    note: "Butuh bantuan sewa drone.",
    status: "Done",
    created_at: new Date("2026-01-28T12:15:00.000Z").toISOString(),
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readBookingsFromStorage(): Booking[] | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(BOOKINGS_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Booking[];
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeBookingsToStorage(bookings: Booking[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

function ensureClientBookings(): Booking[] {
  const fromStorage = readBookingsFromStorage();
  if (fromStorage && fromStorage.length > 0) {
    return fromStorage;
  }
  writeBookingsToStorage(BOOKINGS_SEED);
  return BOOKINGS_SEED;
}

function getAllBookings(): Booking[] {
  if (!isBrowser()) {
    return BOOKINGS_SEED;
  }
  return ensureClientBookings();
}

export function listBookings(status?: BookingStatus): Booking[] {
  const bookings = [...getAllBookings()].sort((a, b) => b.created_at.localeCompare(a.created_at));
  if (!status) return bookings;
  return bookings.filter((booking) => booking.status === status);
}

export function createBooking(input: CreateBookingInput): Booking {
  const booking: Booking = {
    ...input,
    id: randomId("booking"),
    status: "New",
    created_at: new Date().toISOString(),
  };
  const next = [booking, ...getAllBookings()];
  writeBookingsToStorage(next);
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const bookings = getAllBookings();
  const existing = bookings.find((booking) => booking.id === id);
  if (!existing) return null;
  const updated: Booking = { ...existing, status };
  const next = bookings.map((booking) => (booking.id === id ? updated : booking));
  writeBookingsToStorage(next);
  return updated;
}

export function getBookingById(id: string): Booking | null {
  return getAllBookings().find((booking) => booking.id === id) ?? null;
}
