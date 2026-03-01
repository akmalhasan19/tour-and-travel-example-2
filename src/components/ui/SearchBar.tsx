interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <input
      aria-label="Cari paket tour"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder ?? "Cari nama paket atau lokasi..."}
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
    />
  );
}
