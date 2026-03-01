import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingPageClient } from "@/components/pages/BookingPageClient";

export const metadata: Metadata = {
  title: "Booking",
  description: "Form booking paket tour dengan validasi basic dan konfirmasi manual.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-8">Loading booking form...</div>}>
      <BookingPageClient />
    </Suspense>
  );
}
