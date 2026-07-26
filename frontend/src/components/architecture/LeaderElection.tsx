import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Server } from "lucide-react";

/**
 * LeaderElection
 * ------------------------------------------------------------------
 * Simulates the ephemeral-znode leader election performed by
 * `ZooKeeperLeaderElection.java`: every scheduler replica registers
 * a sequential ephemeral node under `/scheduler-election`, and the
 * replica holding the lowest sequence number becomes leader. If the
 * leader's ZK session dies, the next-lowest node is promoted.
 * ------------------------------------------------------------------
 */
const NODES = ["scheduler-1", "scheduler-2", "scheduler-3"];

export function LeaderElection() {
  const [leaderIndex, setLeaderIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tick === 0) return;
    setLeaderIndex((prev) => (prev + 1) % NODES.length);
  }, [tick]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {NODES.map((node, i) => {
          const isLeader = i === leaderIndex;
          return (
            <motion.div
              key={node}
              animate={{ scale: isLeader ? 1.06 : 1 }}
              className={`relative flex w-40 flex-col items-center gap-2 rounded-2xl border p-5 transition-colors ${
                isLeader ? "border-amber-400/50 bg-amber-500/10" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <AnimatePresence>
                {isLeader && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.6 }}
                    className="absolute -top-3 rounded-full bg-amber-400 p-1.5 shadow-lg shadow-amber-500/40"
                  >
                    <Crown className="h-3.5 w-3.5 text-amber-950" />
                  </motion.div>
                )}
              </AnimatePresence>
              <Server className={`h-7 w-7 ${isLeader ? "text-amber-300" : "text-white/40"}`} />
              <p className="font-mono text-xs text-white/80">{node}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  isLeader ? "bg-amber-400/20 text-amber-300" : "bg-white/5 text-white/40"
                }`}
              >
                {isLeader ? "Leader" : "Follower"}
              </span>
            </motion.div>
          );
        })}
      </div>
      <p className="max-w-md text-center text-xs text-white/40">
        Every 3.2s this demo simulates a ZooKeeper session change: the ephemeral znode with the lowest
        sequence number is promoted to leader and takes over job dispatch — mirroring automatic
        failover in <code className="rounded bg-white/10 px-1 py-0.5 font-mono">ZooKeeperLeaderElection.java</code>.
      </p>
    </div>
  );
}
