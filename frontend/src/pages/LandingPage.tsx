import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GitBranch,
  Shield,
  Cpu,
  Database,
  Boxes,
  Terminal,
  Workflow,
  Server,
  CheckCircle2,
} from "lucide-react";
import { GlowButton, Card, SectionTag, CodeBlock } from "../components/common/UI";
import { GithubIcon } from "../components/common/UI";
import { BackendStatusPill } from "../components/layout/BackendStatusPill";
import { ArchitectureFlow } from "../components/architecture/ArchitectureFlow";
import { AppConfig } from "../config/AppConfig";

const FEATURES = [
  {
    icon: GitBranch,
    title: "Consistent Hash Routing",
    desc: "ConsistentHashRouter.java places workers on a virtual ring so job-to-worker assignment stays stable even as nodes scale up or down — minimal re-shuffling, maximal throughput.",
  },
  {
    icon: Shield,
    title: "ZooKeeper Leader Election",
    desc: "ZooKeeperLeaderElection.java uses ephemeral sequential znodes so exactly one scheduler replica dispatches jobs at any time, with automatic failover if the leader dies.",
  },
  {
    icon: Cpu,
    title: "gRPC Worker Communication",
    desc: "WorkerGrpcServer / WorkerGrpcService exchange Protocol Buffer messages between the Scheduler and Worker services for low-latency, strongly-typed RPC.",
  },
  {
    icon: Workflow,
    title: "Managed Thread Pool Execution",
    desc: "WorkerThreadPool.java executes incoming jobs concurrently on a bounded ExecutorService, isolating failures per task without blocking the gRPC server thread.",
  },
  {
    icon: Server,
    title: "Spring Boot Microservices",
    desc: "A clean multi-module Maven build (common / scheduler / worker / proto) — each service independently deployable, containerized with Docker & Docker Compose.",
  },
  {
    icon: Database,
    title: "JPA-Backed Persistence",
    desc: "Job.java + JobRepository.java persist job lifecycle state (PENDING → RUNNING → COMPLETED/FAILED) to PostgreSQL via Spring Data JPA.",
  },
];

const STEPS = [
  { title: "Submit", desc: "Client issues POST /api/jobs/submit with a job name via the REST API." },
  { title: "Elect", desc: "The active scheduler leader (elected via ZooKeeper) accepts the request." },
  { title: "Route", desc: "ConsistentHashRouter deterministically maps the job to a worker node." },
  { title: "Execute", desc: "The job is dispatched over gRPC and run on the worker's thread pool." },
  { title: "Persist", desc: "Final status & assigned worker are saved back through Spring Data JPA." },
];

const TECH = [
  "Java 17",
  "Spring Boot 3",
  "Spring Data JPA",
  "gRPC",
  "Protocol Buffers",
  "Apache ZooKeeper",
  "PostgreSQL",
  "Docker",
  "Maven (multi-module)",
  "React 19",
  "TypeScript",
];

export function LandingPage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/hero-network.png')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05060f]/40 via-[#05060f] to-[#05060f]" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <BackendStatusPill />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl"
            >
              Distributed Task Scheduling,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Engineered in Java
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-6 max-w-2xl text-lg text-white/60"
            >
              DistribuSync is a fault-tolerant job scheduler built on Spring Boot microservices —
              consistent hashing, ZooKeeper-elected leaders, and gRPC-powered workers keep jobs
              flowing even when nodes fail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/dashboard">
                <GlowButton size="lg">
                  Launch Live Dashboard <ArrowRight className="h-4 w-4" />
                </GlowButton>
              </Link>
              <a href={AppConfig.GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                <GlowButton variant="outline" size="lg">
                  <GithubIcon className="h-4 w-4" /> View Source
                </GlowButton>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {TECH.slice(0, 6).map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* live architecture preview */}
          <Card className="mt-16 px-4 py-8 sm:px-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white/70">Request Lifecycle Preview</p>
              <Link to="/architecture" className="text-xs font-medium text-indigo-300 hover:text-indigo-200">
                Full architecture deep-dive →
              </Link>
            </div>
            <ArchitectureFlow active />
          </Card>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTag>Under The Hood</SectionTag>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Real backend engineering, not a toy demo
          </h2>
          <p className="mt-4 text-white/50">
            Every card below maps to an actual Java class in the DistribuSync repository.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="h-full p-6 transition-transform hover:-translate-y-1 hover:border-indigo-400/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 ring-1 ring-white/10">
                  <f.icon className="h-5 w-5 text-indigo-300" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTag>Request Lifecycle</SectionTag>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From REST call to executed job
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-5">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <Card className="h-full p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-sm font-bold text-indigo-300">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/50">{step.desc}</p>
                </Card>
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-white/20 md:block">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API SNIPPET */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTag>Live REST API</SectionTag>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One call. Full distributed dispatch.
            </h2>
            <p className="mt-4 text-white/50">
              Behind a single <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-indigo-300">POST /api/jobs/submit</code> call,
              DistribuSync elects a leader, hashes your job to a worker, and executes it over gRPC —
              all deployed live on Render.
            </p>
            <ul className="mt-6 space-y-3">
              {["Statically typed DTOs shared across client & server", "Idempotent job IDs generated server-side (UUID)", "CORS-enabled for cross-origin dashboards"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link to="/docs">
                <GlowButton variant="outline">
                  <Terminal className="h-4 w-4" /> Read Full API Docs
                </GlowButton>
              </Link>
            </div>
          </div>

          <CodeBlock title="POST /api/jobs/submit">
{`curl -X POST ${AppConfig.LIVE_BACKEND_URL}/api/jobs/submit \\
  -H "Content-Type: application/json" \\
  -d '{ "jobName": "generate-monthly-report" }'

# 200 OK
{
  "jobId": "6c8f0b2e-19b6-4f...",
  "status": "COMPLETED",
  "assignedWorker": "worker-1"
}`}
            </CodeBlock>
          </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="border-y border-white/5 bg-white/[0.015] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TECH.map((t) => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60">
                <Boxes className="h-3.5 w-3.5 text-indigo-300" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to see it schedule a real job?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/50">
          Create a free account and submit a job straight to the live Render-deployed scheduler in seconds.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup">
            <GlowButton size="lg">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </GlowButton>
          </Link>
          <Link to="/architecture">
            <GlowButton variant="outline" size="lg">
              Explore Architecture
            </GlowButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
