import { motion } from "framer-motion";
import { Server, Shield, GitBranch, Cpu, Database, MonitorSmartphone } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * ArchitectureFlow
 * ------------------------------------------------------------------
 * Interactive, animated diagram of the real DistribuSync request path:
 *
 *   Client -> SchedulerController (REST) -> JobSchedulerService
 *          -> ConsistentHashRouter -> gRPC -> WorkerThreadPool -> Job persisted (Postgres)
 *
 * Built with plain divs + CSS/Framer Motion (no canvas) so it renders
 * crisply at any size and stays dependency-light.
 * ------------------------------------------------------------------
 */
const NODES = [
  { icon: MonitorSmartphone, label: "Client", sub: "React Dashboard", color: "from-cyan-400 to-cyan-600" },
  { icon: Server, label: "Scheduler", sub: "SchedulerController.java", color: "from-indigo-400 to-indigo-600" },
  { icon: Shield, label: "Leader Election", sub: "Apache ZooKeeper", color: "from-violet-400 to-violet-600" },
  { icon: GitBranch, label: "Hash Router", sub: "ConsistentHashRouter.java", color: "from-fuchsia-400 to-fuchsia-600" },
  { icon: Cpu, label: "Worker Pool", sub: "gRPC · ThreadPoolExecutor", color: "from-amber-400 to-amber-600" },
  { icon: Database, label: "Persistence", sub: "PostgreSQL · Spring JPA", color: "from-emerald-400 to-emerald-600" },
];

export function ArchitectureFlow({ active = false }: { active?: boolean }) {
  return (
    <div className="relative w-full overflow-x-auto py-6">
      <div className="relative flex min-w-[820px] items-center justify-between gap-2 px-2 md:min-w-0">
        {/* connecting line */}
        <div className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-emerald-500/30" />

        {active && (
          <motion.div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.6)]"
            initial={{ left: "3%" }}
            animate={{ left: "97%" }}
            transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}

        {NODES.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative z-10 flex w-32 flex-col items-center gap-2 text-center md:w-36"
          >
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ring-1 ring-white/20",
                node.color
              )}
            >
              <node.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{node.label}</p>
              <p className="mt-0.5 font-mono text-[10px] leading-tight text-white/40">{node.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
