import { cn } from "@/lib/utils";

interface InlineAlertProps {
  message: string;
  type?: "info" | "success" | "error";
}

export function InlineAlert({ message, type = "info" }: InlineAlertProps) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-lg border px-3 py-2 text-sm",
        type === "info" && "border-sky-200 bg-sky-50 text-sky-700",
        type === "success" && "border-emerald-200 bg-emerald-50 text-emerald-700",
        type === "error" && "border-rose-200 bg-rose-50 text-rose-700"
      )}
    >
      {message}
    </div>
  );
}
