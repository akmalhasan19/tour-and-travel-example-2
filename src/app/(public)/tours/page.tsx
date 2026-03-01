import type { Metadata } from "next";
import { ToursPageClient } from "@/components/pages/ToursPageClient";

export const metadata: Metadata = {
  title: "Tours",
  description: "Browse paket tour berdasarkan lokasi, harga, durasi, kategori, dan rating.",
};

export default function ToursPage() {
  return <ToursPageClient />;
}
