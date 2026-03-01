import Link from "next/link";

const footerLinks = [
  { href: "/tours", label: "Paket Tour" },
  { href: "/booking", label: "Booking" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
  { href: "/terms", label: "Syarat & Ketentuan" },
  { href: "/privacy", label: "Kebijakan Privasi" },
];

export function Footer() {
  return (
    <footer className="mt-14 border-t border-sky-100 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">NusaTrip</h3>
          <p className="mt-2 text-sm text-slate-300">
            Partner perjalanan terpercaya untuk eksplorasi destinasi terbaik Indonesia.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-100">Menu</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-300 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-100">Kontak</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Jl. Wisata Nusantara No. 8, Jakarta</li>
            <li>+62 812-0000-1234</li>
            <li>hello@nusatrip.id</li>
            <li>Senin - Sabtu, 08:00 - 20:00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
        © {new Date().getFullYear()} NusaTrip. All rights reserved.
      </div>
    </footer>
  );
}
