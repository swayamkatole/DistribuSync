import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, Menu, X, BookOpen, Network, Home } from "lucide-react";
import { Logo } from "../common/Logo";
import { GlowButton, GithubIcon } from "../common/UI";
import { useAuthStore } from "../../store/useAuthStore";
import { AppConfig } from "../../config/AppConfig";
import { cn } from "../../utils/cn";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/architecture", label: "Architecture", icon: Network },
  { to: "/docs", label: "API Docs", icon: BookOpen },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.session?.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#05060f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Logo size={38} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={AppConfig.GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/70 hover:text-white">
                Log in
              </Link>
              <GlowButton size="sm" onClick={() => navigate("/signup")}>
                Get Started
              </GlowButton>
            </>
          )}
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#05060f] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {[...NAV_LINKS, ...(isAuthenticated ? [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] : [])].map(
                (link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                )
              )}
              <a
                href={AppConfig.GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub Repo
              </a>
              <div className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-3">
                {isAuthenticated ? (
                  <GlowButton
                    variant="outline"
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/");
                    }}
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </GlowButton>
                ) : (
                  <>
                    <GlowButton variant="outline" onClick={() => { setOpen(false); navigate("/login"); }}>
                      Log in
                    </GlowButton>
                    <GlowButton onClick={() => { setOpen(false); navigate("/signup"); }}>Get Started</GlowButton>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
