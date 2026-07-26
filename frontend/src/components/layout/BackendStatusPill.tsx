import { useBackendHealth } from "../../hooks/useBackendHealth";
import { cn } from "../../utils/cn";

const CONFIG: Record<string, { label: string; dot: string; text: string }> = {
  checking: { label: "Checking backend…", dot: "bg-amber-400 animate-pulse", text: "text-amber-300" },
  online: { label: "Live · Render", dot: "bg-emerald-400", text: "text-emerald-300" },
  "cold-start": { label: "Waking up (cold start)", dot: "bg-amber-400 animate-pulse", text: "text-amber-300" },
  offline: { label: "Backend unreachable", dot: "bg-red-400", text: "text-red-300" },
};

export function BackendStatusPill({ className }: { className?: string }) {
  const state = useBackendHealth();
  const cfg = CONFIG[state];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium backdrop-blur",
        cfg.text,
        className
      )}
      title="Live status of https://distribusync-1.onrender.com"
    >
      <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
      {cfg.label}
    </div>
  );
}
