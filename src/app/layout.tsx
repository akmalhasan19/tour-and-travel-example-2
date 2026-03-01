import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nusatrip-mvp.local"),
  title: {
    default: "NusaTrip | Tour & Travel Indonesia",
    template: "%s | NusaTrip",
  },
  description:
    "MVP website tour & travel untuk cari paket, booking cepat, dan pengelolaan admin sederhana.",
  openGraph: {
    title: "NusaTrip | Tour & Travel Indonesia",
    description:
      "Jelajahi paket wisata Indonesia: Bali, Lombok, Labuan Bajo, Bromo, Raja Ampat, dan lainnya.",
    type: "website",
    locale: "id_ID",
    siteName: "NusaTrip",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakartaSans.variable} bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
