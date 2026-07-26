import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * ConsistentHashRing
 * ------------------------------------------------------------------
 * Visualizes how `ConsistentHashRouter.java` maps job IDs onto a hash
 * ring of worker nodes, and routes each job clockwise to the nearest
 * worker — the same technique used by Dynamo-style distributed systems
 * to minimize re-shuffling when workers join/leave the cluster.
 * ------------------------------------------------------------------
 */
const WORKERS = [
  { id: "worker-1", angle: 40, color: "#22d3ee" },
  { id: "worker-2", angle: 140, color: "#a78bfa" },
  { id: "worker-3", angle: 230, color: "#f472b6" },
  { id: "worker-4", angle: 320, color: "#34d399" },
];

const JOB_ANGLES = [10, 75, 120, 190, 260, 300, 350];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function nearestWorker(angle: number) {
  let best = WORKERS[0];
  let bestDelta = 361;
  for (const w of WORKERS) {
    const delta = (w.angle - angle + 360) % 360;
    if (delta < bestDelta) {
      bestDelta = delta;
      best = w;
    }
  }
  return best;
}

export function ConsistentHashRing() {
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 120;

  const jobs = useMemo(
    () =>
      JOB_ANGLES.map((angle, i) => ({
        id: `job-${i}`,
        angle,
        pos: polarToXY(cx, cy, r - 34, angle),
        worker: nearestWorker(angle),
      })),
    []
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={2} strokeDasharray="4 6" />

        {jobs.map((job, i) => {
          const wp = polarToXY(cx, cy, r, job.worker.angle);
          const isActive = activeJob === i;
          return (
            <g key={job.id} onMouseEnter={() => setActiveJob(i)} onMouseLeave={() => setActiveJob(null)} className="cursor-pointer">
              {isActive && (
                <motion.line
                  x1={job.pos.x}
                  y1={job.pos.y}
                  x2={wp.x}
                  y2={wp.y}
                  stroke={job.worker.color}
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
              <circle
                cx={job.pos.x}
                cy={job.pos.y}
                r={isActive ? 6 : 4.5}
                fill={isActive ? job.worker.color : "rgba(255,255,255,0.5)"}
                className="transition-all"
              />
            </g>
          );
        })}

        {WORKERS.map((w) => {
          const p = polarToXY(cx, cy, r, w.angle);
          return (
            <g key={w.id}>
              <circle cx={p.x} cy={p.y} r={14} fill="#05060f" stroke={w.color} strokeWidth={2} />
              <circle cx={p.x} cy={p.y} r={5} fill={w.color} />
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={28} fill="rgba(99,102,241,0.15)" stroke="rgba(129,140,248,0.5)" strokeWidth={1.5} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="#c7d2fe" fontFamily="monospace">
          HASH
        </text>
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {WORKERS.map((w) => (
          <div key={w.id} className="flex items-center gap-1.5 text-xs text-white/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: w.color }} />
            {w.id}
          </div>
        ))}
      </div>
      <p className="max-w-sm text-center text-xs text-white/40">
        Hover a job dot to see it route clockwise to its nearest worker node on the ring — exactly how
        <code className="mx-1 rounded bg-white/10 px-1 py-0.5 font-mono">getWorkerForJob()</code>
        resolves ownership in production.
      </p>
    </div>
  );
}
