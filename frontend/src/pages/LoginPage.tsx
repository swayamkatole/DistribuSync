import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { Logo } from "../components/common/Logo";
import { GlowButton, Card } from "../components/common/UI";
import { useAuthStore } from "../store/useAuthStore";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);
  const loginAsGuest = useAuthStore((s) => s.loginAsGuest);
  const isLoading = useAuthStore((s) => s.isLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  const handleGuest = async () => {
    setLocalError(null);
    try {
      await loginAsGuest();
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.12),transparent_40%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size={48} />
        </div>
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-white/50">Log in to submit jobs to the live scheduler.</p>

          {localError && (
            <div className="mt-5 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Email</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 focus-within:border-indigo-400/50">
                <Mail className="h-4 w-4 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Password</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 focus-within:border-indigo-400/50">
                <Lock className="h-4 w-4 text-white/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </div>

            <GlowButton type="submit" className="w-full" loading={isLoading}>
              Log In <ArrowRight className="h-4 w-4" />
            </GlowButton>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/30">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <GlowButton variant="outline" className="w-full" onClick={handleGuest} loading={isLoading}>
            <Sparkles className="h-4 w-4" /> Continue as Demo Recruiter
          </GlowButton>

          <p className="mt-6 text-center text-sm text-white/50">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-300 hover:text-indigo-200">
              Sign up free
            </Link>
          </p>
        </Card>
        <p className="mt-6 text-center text-xs text-white/30">
          Auth runs entirely client-side (SHA-256 hashed, JWT-shaped session) — no credentials ever leave your browser.
        </p>
      </motion.div>
    </div>
  );
}
