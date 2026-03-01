import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan yang sering diajukan seputar booking dan paket tour.",
};

const faqItems = [
  {
    q: "Apakah saya bisa booking untuk rombongan?",
    a: "Bisa. Untuk rombongan, pilih paket private trip atau tulis kebutuhan khusus di catatan booking.",
  },
  {
    q: "Apakah jadwal bisa custom?",
    a: "Untuk private trip jadwal lebih fleksibel. Tim akan konfirmasi detail setelah booking masuk.",
  },
  {
    q: "Bagaimana jika ingin reschedule?",
    a: "Reschedule mengikuti kebijakan masing-masing paket dan ketersediaan slot keberangkatan.",
  },
  {
    q: "Apakah ada asuransi perjalanan?",
    a: "Belum termasuk secara default. Kamu bisa menambahkannya secara mandiri.",
  },
];

export default function FaqPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-5 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">FAQ</h1>
        <p className="mt-2 text-sm text-slate-600">Informasi umum sebelum kamu melakukan booking.</p>
      </div>
      <div className="space-y-3">
        {faqItems.map((item) => (
          <article key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-semibold text-slate-900">{item.q}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
