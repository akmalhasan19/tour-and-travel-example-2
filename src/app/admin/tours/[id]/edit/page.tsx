import type { Metadata } from "next";
import { AdminTourEditorClient } from "@/components/pages/AdminTourEditorClient";

interface AdminTourEditPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Tour",
  description: "Edit data paket tour dari admin panel.",
};

export default async function AdminTourEditPage({ params }: AdminTourEditPageProps) {
  const { id } = await params;
  return <AdminTourEditorClient mode="edit" id={id} />;
}
