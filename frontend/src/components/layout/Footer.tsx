import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Logo } from "../common/Logo";
import { GithubIcon } from "../common/UI";
import { AppConfig } from "../../config/AppConfig";

const TECH = [
  "Java 17",
  "Spring Boot",
  "Spring Data JPA",
  "gRPC",
  "Protocol Buffers",
  "Apache ZooKeeper",
  "PostgreSQL",
  "Docker",
  "Maven",
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05060f]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size={38} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              A fault-tolerant, horizontally scalable distributed task scheduler built with a Java/Spring Boot
              microservice architecture — consistent hashing, ZooKeeper leader election, and gRPC worker
              communication under the hood.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={AppConfig.GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5"
              >
                <GithubIcon className="h-4 w-4" /> Source Code
              </a>
              <a
                href={AppConfig.LIVE_BACKEND_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5"
              >
                <ExternalLink className="h-4 w-4" /> Live API
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link to="/architecture" className="hover:text-white">Architecture</Link></li>
              <li><Link to="/docs" className="hover:text-white">API Reference</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Live Dashboard</Link></li>
              <li><Link to="/signup" className="hover:text-white">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Tech Stack</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} DistribuSync. Built by Swayam Katole.</p>
          <p>Java · Spring Boot · gRPC · ZooKeeper · React · TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
