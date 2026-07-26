import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * ThreadPoolGrid
 * ------------------------------------------------------------------
 * Visualizes `WorkerThreadPool.java` — a fixed-size executor that
 * picks up jobs dispatched over gRPC and runs them concurrently.
 * Each cell represents a pooled thread cycling between idle and busy.
 * ------------------------------------------------------------------
 */
const THREAD_COUNT = 16;

export function ThreadPoolGrid() {
  const [busy, setBusy] = useState<boolean[]>(() => Array(THREAD_COUNT).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setBusy((prev) =>
        prev.map(() => Math.random() > 0.6)
      );
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-4 gap-3">
        {busy.map((isBusy, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: isBusy ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.04)",
              borderColor: isBusy ? "rgba(52,211,153,0.6)" : "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 0.4 }}
            className={cn("flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-[10px]")}
          >
            <span className={isBusy ? "text-emerald-300" : "text-white/30"}>T{i + 1}</span>
          </motion.div>
        ))}
      </div>
      <p className="max-w-sm text-center text-xs text-white/40">
        Live simulation of a {THREAD_COUNT}-thread <code className="rounded bg-white/10 px-1 py-0.5 font-mono">ExecutorService</code> pool.
        Green cells are actively executing a job payload received via the gRPC{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 font-mono">WorkerGrpcService</code>.
      </p>
    </div>
  );
}
