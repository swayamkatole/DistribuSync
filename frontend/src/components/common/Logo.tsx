import { cn } from "../../utils/cn";

export function Logo({ size = 40, showText = true, className }: { size?: number; showText?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-cyan-400/20 ring-1 ring-white/10"
        style={{ width: size, height: size }}
      >
        <img src="/logo.png" alt="DistribuSync logo" className="h-[75%] w-[75%] object-contain drop-shadow-[0_0_10px_rgba(129,140,248,0.6)]" />
      </div>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-white">
          Distribu<span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">Sync</span>
        </span>
      )}
    </div>
  );
}
