import type { Metadata } from "next";
import { AdminBookingsPageClient } from "@/components/pages/AdminBookingsPageClient";

export const metadata: Metadata = {
  title: "Admin Bookings",
  description: "Lihat daftar booking dan ubah status booking.",
};

export default function AdminBookingsPage() {
  return <AdminBookingsPageClient />;
}
