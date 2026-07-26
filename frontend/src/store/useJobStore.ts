import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppConfig } from "../config/AppConfig";
import { JobService } from "../services/JobService";
import { Job, JobStatus } from "../types";

/**
 * useJobStore
 * ------------------------------------------------------------------
 * Client-side job repository. The backend's `JobRepository.java`
 * (Spring Data JPA) persists jobs server-side, but exposes no `GET`
 * listing endpoint yet — so the dashboard keeps a local, persisted
 * mirror of everything *this* client has submitted, updated live from
 * each `SubmitJobResponse`. Structured like a tiny in-memory repository
 * with the same CRUD vocabulary (`findAll`, `save`, `deleteAll`).
 * ------------------------------------------------------------------
 */
interface JobStoreState {
  jobs: Job[];
  isSubmitting: boolean;
  error: string | null;
  lastSubmitted: Job | null;
  submitJob: (jobName: string) => Promise<Job>;
  clearHistory: () => void;
  clearError: () => void;
}

export const useJobStore = create<JobStoreState>()(
  persist(
    (set, get) => ({
      jobs: [],
      isSubmitting: false,
      error: null,
      lastSubmitted: null,

      submitJob: async (jobName: string) => {
        set({ isSubmitting: true, error: null });
        try {
          const job = await JobService.submitJob(jobName);
          set({ jobs: [job, ...get().jobs], isSubmitting: false, lastSubmitted: job });
          return job;
        } catch (err: any) {
          const failedJob: Job = {
            jobId: `local-${crypto.randomUUID()}`,
            jobName,
            status: JobStatus.FAILED,
            assignedWorker: null,
            submittedAt: new Date().toISOString(),
          };
          set({
            jobs: [failedJob, ...get().jobs],
            isSubmitting: false,
            error: err.message || "Failed to submit job",
            lastSubmitted: failedJob,
          });
          throw err;
        }
      },

      clearHistory: () => set({ jobs: [], lastSubmitted: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: AppConfig.STORAGE_KEYS.JOBS,
      partialize: (state) => ({ jobs: state.jobs }),
    }
  )
);
