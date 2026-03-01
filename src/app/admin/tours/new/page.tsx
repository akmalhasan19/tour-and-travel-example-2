import type { Metadata } from "next";
import { AdminTourEditorClient } from "@/components/pages/AdminTourEditorClient";

export const metadata: Metadata = {
  title: "Create Tour",
  description: "Tambah paket tour baru untuk katalog.",
};

export default function AdminToursNewPage() {
  return <AdminTourEditorClient mode="create" />;
}
