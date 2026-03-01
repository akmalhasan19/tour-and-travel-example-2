import type { Metadata } from "next";
import { AdminDashboardClient } from "@/components/pages/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Pseudo-admin dashboard untuk monitoring data tours dan bookings.",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
