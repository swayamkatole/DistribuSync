import React from "react";
import { cn } from "../../utils/cn";
import { JobStatus } from "../../types";
import { Loader2 } from "lucide-react";

/** Small shared UI primitives used across the app. */

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function GlowButton({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]";
  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-indigo-900/40 hover:shadow-indigo-500/40 hover:brightness-110 focus-visible:ring-indigo-400",
    outline:
      "border border-white/15 text-white/90 hover:bg-white/5 hover:border-white/30 focus-visible:ring-white/30",
    ghost: "text-white/70 hover:text-white hover:bg-white/5 focus-visible:ring-white/20",
    danger: "bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20 focus-visible:ring-red-400",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} disabled={loading || rest.disabled} {...rest}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-black/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
      {children}
    </span>
  );
}

const STATUS_STYLES: Record<JobStatus, string> = {
  [JobStatus.PENDING]: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  [JobStatus.RUNNING]: "bg-sky-500/15 text-sky-300 border-sky-500/30 animate-pulse",
  [JobStatus.COMPLETED]: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  [JobStatus.FAILED]: "bg-red-500/15 text-red-300 border-red-500/30",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        STATUS_STYLES[status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function CodeBlock({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0b16]">
      {title && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-xs text-white/50">{title}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-emerald-200/90">
        {children}
      </pre>
    </div>
  );
}
