import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingSuccessClient } from "@/components/pages/BookingSuccessClient";

export const metadata: Metadata = {
  title: "Booking Success",
  description: "Ringkasan booking setelah submit form berhasil.",
};

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-8">Loading booking summary...</div>}>
      <BookingSuccessClient />
    </Suspense>
  );
}
