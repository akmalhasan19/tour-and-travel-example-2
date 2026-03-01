import type { Metadata } from "next";
import { ContactPageClient } from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi tim NusaTrip untuk pertanyaan paket atau custom itinerary.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
