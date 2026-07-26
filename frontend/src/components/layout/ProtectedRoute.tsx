import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * ProtectedRoute
 * ------------------------------------------------------------------
 * Frontend analogue of a Spring Security `@PreAuthorize` guard — 
 * redirects unauthenticated visitors to /login and preserves the
 * originally requested location for a post-login redirect.
 * ------------------------------------------------------------------
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
