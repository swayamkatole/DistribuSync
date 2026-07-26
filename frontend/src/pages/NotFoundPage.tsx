import { Link } from "react-router-dom";
import { GlowButton } from "../components/common/UI";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-indigo-300">404</p>
      <h1 className="mt-3 text-4xl font-bold text-white">JobNotFoundException</h1>
      <p className="mt-3 max-w-md text-white/50">
        The route you requested couldn't be resolved by the router — much like a job with no matching worker on the hash ring.
      </p>
      <Link to="/" className="mt-8">
        <GlowButton>Return Home</GlowButton>
      </Link>
    </div>
  );
}
