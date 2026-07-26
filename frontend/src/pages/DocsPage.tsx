import { useState } from "react";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Card, SectionTag, CodeBlock, GlowButton, StatusBadge } from "../components/common/UI";
import { AppConfig } from "../config/AppConfig";
import { JobService } from "../services/JobService";
import { Job } from "../types";

export function DocsPage() {
  const [tryJobName, setTryJobName] = useState("demo-job");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTry = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const job = await JobService.submitJob(tryJobName || "demo-job");
      setResult(job);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTag>API Reference</SectionTag>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Scheduler REST API</h1>
      <p className="mt-4 max-w-2xl text-white/50">
        The scheduler service exposes a small, focused REST surface backed by{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-indigo-300">SchedulerController.java</code>.
        Base URL:{" "}
        <a href={AppConfig.LIVE_BACKEND_URL} target="_blank" rel="noreferrer" className="text-indigo-300 hover:underline">
          {AppConfig.LIVE_BACKEND_URL}
        </a>
      </p>

      <Card className="mt-10 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/5 p-5">
          <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-mono text-xs font-bold text-emerald-300">POST</span>
          <code className="font-mono text-sm text-white">/api/jobs/submit</code>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Description</h3>
            <p className="mt-1 text-sm text-white/50">
              Submits a new job for scheduling. The active scheduler leader hashes the job to a worker
              via consistent hashing, dispatches it over gRPC, and returns the terminal status.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Request Body</h3>
            <div className="mt-2">
              <CodeBlock>{`{
  "jobName": "string"   // required — a human-readable job identifier
}`}</CodeBlock>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Response 200 OK</h3>
            <div className="mt-2">
              <CodeBlock>{`{
  "jobId": "uuid",
  "status": "COMPLETED | FAILED",
  "assignedWorker": "worker-1"
}`}</CodeBlock>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Response 400 Bad Request</h3>
            <div className="mt-2">
              <CodeBlock>{`{ "error": "No workers available!" }`}</CodeBlock>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">cURL</h3>
            <div className="mt-2">
              <CodeBlock title="terminal">{`curl -X POST ${AppConfig.LIVE_BACKEND_URL}/api/jobs/submit \\
  -H "Content-Type: application/json" \\
  -d '{ "jobName": "nightly-etl-sync" }'`}</CodeBlock>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">JavaScript (fetch)</h3>
            <div className="mt-2">
              <CodeBlock title="fetch">{`const res = await fetch("${AppConfig.LIVE_BACKEND_URL}/api/jobs/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ jobName: "nightly-etl-sync" }),
});
const data = await res.json();`}</CodeBlock>
            </div>
          </div>
        </div>
      </Card>

      {/* Try it live */}
      <Card className="mt-8 p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <Send className="h-4 w-4 text-indigo-300" /> Try it live
        </h3>
        <p className="mt-1 text-xs text-white/40">This calls the real, deployed Render endpoint from your browser.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={tryJobName}
            onChange={(e) => setTryJobName(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
            placeholder="job name"
          />
          <GlowButton onClick={handleTry} loading={loading}>
            <Send className="h-4 w-4" /> Send Request
          </GlowButton>
        </div>

        {loading && (
          <div className="mt-4 flex items-center gap-2 text-xs text-indigo-300">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Waiting on scheduler (cold start can take up to 50s)…
          </div>
        )}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            <XCircle className="h-4 w-4" /> {error}
          </div>
        )}
        {result && (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Response received
            </div>
            <div className="space-y-1 font-mono">
              <p>jobId: {result.jobId}</p>
              <p className="flex items-center gap-2">
                status: <StatusBadge status={result.status} />
              </p>
              <p>assignedWorker: {result.assignedWorker ?? "null"}</p>
              <p>latency: {result.latencyMs}ms</p>
            </div>
          </div>
        )}
      </Card>

      <div className="mt-10 text-xs text-white/30">
        <p>
          Note: the repository layer (<code className="rounded bg-white/10 px-1 py-0.5 font-mono">JobRepository.findByStatus</code>,{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 font-mono">findByAssignedWorker</code>) already exists server-side and is
          ready to back future <code className="rounded bg-white/10 px-1 py-0.5 font-mono">GET /api/jobs</code> listing/analytics
          endpoints.
        </p>
      </div>
    </div>
  );
}
