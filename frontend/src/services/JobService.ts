import { ApiClient } from "../api/ApiClient";
import { AppConfig } from "../config/AppConfig";
import { Job, JobStatus, SubmitJobRequest, SubmitJobResponse } from "../types";

/**
 * JobService
 * ------------------------------------------------------------------
 * Client-side counterpart of `JobSchedulerService.java`. Encapsulates
 * all communication with the `/api/jobs/**` endpoints exposed by
 * `SchedulerController.java`, keeping React components free of
 * networking concerns (Service Layer pattern, just like Spring's
 * `@Service` beans sit behind `@RestController`s).
 * ------------------------------------------------------------------
 */
export class JobService {
  /**
   * Submits a new job to the scheduler.
   * Backend flow: SchedulerController -> JobSchedulerService.submitJob()
   * -> ConsistentHashRouter.getWorkerForJob() -> gRPC call to Worker.
   */
  static async submitJob(jobName: string): Promise<Job> {
    const payload: SubmitJobRequest = { jobName };
    const start = performance.now();

    const { data } = await ApiClient.getInstance().post<SubmitJobResponse>(
      AppConfig.ENDPOINTS.SUBMIT_JOB,
      payload
    );

    const latencyMs = Math.round(performance.now() - start);

    if (data.error) {
      throw new Error(data.error);
    }

    const status = Object.values(JobStatus).includes(data.status as JobStatus)
      ? (data.status as JobStatus)
      : JobStatus.FAILED;

    const job: Job = {
      jobId: data.jobId,
      jobName,
      status,
      assignedWorker: data.assignedWorker,
      submittedAt: new Date().toISOString(),
      latencyMs,
    };

    return job;
  }

  /**
   * Lightweight reachability probe used by the connection-status widget.
   * The backend does not expose a dedicated health endpoint, so we ping
   * the base URL and interpret the network-level outcome.
   */
  static async pingBackend(): Promise<"online" | "cold-start" | "offline"> {
    const start = performance.now();
    try {
      await ApiClient.getInstance().get("/", { timeout: 8000, validateStatus: () => true });
      const elapsed = performance.now() - start;
      return elapsed > 3000 ? "cold-start" : "online";
    } catch {
      return "offline";
    }
  }
}
