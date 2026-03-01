"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/booking", label: "Booking" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-sky-900">
          NusaTrip
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {PUBLIC_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition",
                  active ? "text-sky-700" : "text-slate-600 hover:text-sky-700"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/admin"
          className="rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
