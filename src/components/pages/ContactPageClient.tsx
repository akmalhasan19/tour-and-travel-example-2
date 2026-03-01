"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/forms/InputField";
import { TextareaField } from "@/components/forms/TextareaField";
import { InlineAlert } from "@/components/ui/InlineAlert";

export function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback("Mohon lengkapi semua field sebelum kirim pesan.");
      return;
    }
    setFeedback("Pesan berhasil dikirim (mock). Tim kami akan membalas secepatnya.");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hubungi Kami</h1>
        <p className="mt-2 text-sm text-slate-600">
          Punya pertanyaan tentang paket atau butuh itinerary custom? Tinggalkan pesanmu.
        </p>
        <div className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Alamat:</span> Jl. Wisata Nusantara No. 8, Jakarta
          </p>
          <p>
            <span className="font-semibold">Email:</span> hello@nusatrip.id
          </p>
          <p>
            <span className="font-semibold">Phone/WA:</span> +62 812-0000-1234
          </p>
          <p>
            <span className="font-semibold">Jam Operasional:</span> Senin - Sabtu, 08:00 - 20:00 WIB
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        {feedback ? <InlineAlert type="info" message={feedback} /> : null}
        <InputField
          id="contact_name"
          label="Nama"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <InputField
          id="contact_email"
          type="email"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextareaField
          id="contact_message"
          rows={5}
          label="Pesan"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button
          type="submit"
          className="inline-flex rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"
        >
          Kirim Pesan
        </button>
      </form>
    </section>
  );
}
