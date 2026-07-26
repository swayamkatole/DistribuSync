import { useEffect, useRef, useState } from "react";
import { JobService } from "../services/JobService";
import { BackendState } from "../types";

/**
 * useBackendHealth
 * ------------------------------------------------------------------
 * Polls the live Render deployment so the UI can honestly reflect
 * cold-start / offline states instead of silently failing job
 * submissions.
 * ------------------------------------------------------------------
 */
export function useBackendHealth(pollMs = 45_000) {
  const [state, setState] = useState<BackendState>("checking");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const check = async () => {
      setState((prev) => (prev === "online" ? prev : "checking"));
      const result = await JobService.pingBackend();
      if (mounted.current) setState(result);
    };
    check();
    const interval = setInterval(check, pollMs);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [pollMs]);

  return state;
}
