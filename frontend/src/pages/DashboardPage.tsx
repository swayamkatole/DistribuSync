import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Trash2,
  Copy,
  Check,
  ListChecks,
  Clock3,
  XCircle,
  Loader2,
  Gauge,
  Sparkles,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, GlowButton, StatusBadge } from "../components/common/UI";
import { BackendStatusPill } from "../components/layout/BackendStatusPill";
import { ArchitectureFlow } from "../components/architecture/ArchitectureFlow";
import { useJobStore } from "../store/useJobStore";
import { useAuthStore } from "../store/useAuthStore";
import { Job, JobStatus } from "../types";

const STATUS_COLORS: Record<JobStatus, string> = {
  [JobStatus.PENDING]: "#fbbf24",
  [JobStatus.RUNNING]: "#38bdf8",
  [JobStatus.COMPLETED]: "#34d399",
  [JobStatus.FAILED]: "#f87171",
};

function StatCard({ icon: Icon, label, value, tint }: { icon: any; label: string; value: string | number; tint: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-white/40">{label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tint}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    </Card>
  );
}

function JobIdCell({ jobId }: { jobId: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(jobId);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group flex items-center gap-1.5 font-mono text-xs text-white/60 hover:text-white"
      title="Copy full job ID"
    >
      {jobId.slice(0, 8)}…
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
    </button>
  );
}

export function DashboardPage() {
  const [jobName, setJobName] = useState("");
  const [flowKey, setFlowKey] = useState(0);
  const { jobs, isSubmitting, error, submitJob, clearHistory, clearError } = useJobStore();
  const user = useAuthStore((s) => s.session?.user);

  const stats = useMemo(() => {
    const total = jobs.length;
    const completed = jobs.filter((j) => j.status === JobStatus.COMPLETED).length;
    const failed = jobs.filter((j) => j.status === JobStatus.FAILED).length;
    const pending = jobs.filter((j) => j.status === JobStatus.PENDING || j.status === JobStatus.RUNNING).length;
    const successRate = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, failed, pending, successRate };
  }, [jobs]);

  const chartData = useMemo(() => {
    return (Object.values(JobStatus) as JobStatus[])
      .map((status) => ({
        name: status,
        value: jobs.filter((j) => j.status === status).length,
        color: STATUS_COLORS[status],
      }))
      .filter((d) => d.value > 0);
  }, [jobs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobName.trim()) return;
    clearError();
    setFlowKey((k) => k + 1);
    try {
      await submitJob(jobName.trim());
      setJobName("");
    } catch {
      // error already captured in store
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Welcome, {user?.name?.split(" ")[0] || "Engineer"} 👋
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Submit jobs directly to the live Render-deployed scheduler and watch them route in real time.
          </p>
        </div>
        <BackendStatusPill />
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ListChecks} label="Total Jobs" value={stats.total} tint="bg-indigo-500/15 text-indigo-300" />
        <StatCard icon={Clock3} label="In Flight" value={stats.pending} tint="bg-amber-500/15 text-amber-300" />
        <StatCard icon={Gauge} label="Success Rate" value={`${stats.successRate}%`} tint="bg-emerald-500/15 text-emerald-300" />
        <StatCard icon={XCircle} label="Failed" value={stats.failed} tint="bg-red-500/15 text-red-300" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Submit panel */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <Send className="h-4 w-4 text-indigo-300" /> Submit a New Job
          </h2>
          <p className="mt-1 text-xs text-white/40">
            Sends <code className="rounded bg-white/10 px-1 py-0.5 font-mono">POST /api/jobs/submit</code> to the live backend.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g. generate-invoice-batch-2024"
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-indigo-400/50 focus:outline-none"
            />
            <GlowButton type="submit" loading={isSubmitting} disabled={!jobName.trim()}>
              <Send className="h-4 w-4" /> Dispatch Job
            </GlowButton>
          </form>

          {isSubmitting && (
            <div className="mt-3 flex items-center gap-2 text-xs text-indigo-300">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Electing leader → hashing job → routing over gRPC… (cold start may take up to 50s)
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">{error}</div>
          )}

          <div className="mt-6 border-t border-white/5 pt-6">
            <p className="mb-2 text-xs font-medium text-white/40">Live routing preview</p>
            <AnimatePresence mode="wait">
              <motion.div key={flowKey} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                <ArchitectureFlow active={isSubmitting} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>

        {/* Chart */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-cyan-300" /> Status Distribution
          </h2>
          {chartData.length === 0 ? (
            <div className="flex h-52 flex-col items-center justify-center gap-2 text-center text-xs text-white/30">
              <ListChecks className="h-6 w-6" />
              Submit a job to see live analytics
            </div>
          ) : (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0a0b16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {chartData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[11px] text-white/50">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Job history */}
      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 p-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Job History</h2>
            <p className="mt-0.5 text-xs text-white/40">Persisted locally per session · {jobs.length} record(s)</p>
          </div>
          {jobs.length > 0 && (
            <GlowButton variant="ghost" size="sm" onClick={clearHistory}>
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </GlowButton>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-14 text-center text-sm text-white/30">
            <ListChecks className="h-8 w-8" />
            No jobs submitted yet — dispatch your first job above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-white/30">
                  <th className="px-5 py-3 font-medium">Job ID</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Worker</th>
                  <th className="px-5 py-3 font-medium">Latency</th>
                  <th className="px-5 py-3 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {jobs.map((job: Job) => (
                    <motion.tr
                      key={job.jobId}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3">
                        <JobIdCell jobId={job.jobId} />
                      </td>
                      <td className="px-5 py-3 text-white/80">{job.jobName}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-white/50">{job.assignedWorker || "—"}</td>
                      <td className="px-5 py-3 text-xs text-white/40">{job.latencyMs ? `${job.latencyMs}ms` : "—"}</td>
                      <td className="px-5 py-3 text-xs text-white/40">
                        {new Date(job.submittedAt).toLocaleTimeString()}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
