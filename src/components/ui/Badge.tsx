import { TourBadge } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: string;
  tone?: "neutral" | "success" | "danger";
}

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-sky-100 text-sky-700",
        tone === "success" && "bg-emerald-100 text-emerald-700",
        tone === "danger" && "bg-rose-100 text-rose-700"
      )}
    >
      {children}
    </span>
  );
}

export function TourBadgePill({ badge }: { badge?: TourBadge }) {
  if (!badge) return null;
  const tone = badge === "Promo" ? "danger" : badge === "Best Seller" ? "success" : "neutral";
  return <Badge tone={tone}>{badge}</Badge>;
}
