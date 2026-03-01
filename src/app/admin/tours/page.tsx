import type { Metadata } from "next";
import { AdminToursPageClient } from "@/components/pages/AdminToursPageClient";

export const metadata: Metadata = {
  title: "Admin Tours",
  description: "Kelola paket tours dengan fitur create, edit, delete.",
};

export default function AdminToursPage() {
  return <AdminToursPageClient />;
}
