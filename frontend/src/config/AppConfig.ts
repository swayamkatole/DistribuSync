/**
 * AppConfig
 * ------------------------------------------------------------------
 * Central application configuration object.
 * Mirrors the role of `application.properties` in the Spring Boot
 * backend (scheduler/src/main/resources/application.properties).
 *
 * Keeping all environment-driven constants in one place makes this
 * frontend easy to reason about for anyone coming from a Java/Spring
 * background — think of this as your `@ConfigurationProperties` bean.
 * ------------------------------------------------------------------
 */

export interface EndpointMap {
  SUBMIT_JOB: string;
}

export class AppConfig {
  /** Base URL of the deployed DistribuSync Scheduler service (Render). */
  static readonly API_BASE_URL: string =
    (import.meta as any).env?.VITE_API_BASE_URL || "https://distribusync-1.onrender.com";

  static readonly APP_NAME = "DistribuSync";

  static readonly APP_TAGLINE = "A Distributed Task Scheduler Engineered in Java";

  /** REST endpoints exposed by SchedulerController.java */
  static readonly ENDPOINTS: EndpointMap = {
    SUBMIT_JOB: "/api/jobs/submit",
  };

  /** Render free-tier instances spin down when idle — allow a generous timeout. */
  static readonly REQUEST_TIMEOUT_MS = 60_000;

  static readonly GITHUB_REPO_URL = "https://github.com/swayamkatole/DistribuSync";

  static readonly LIVE_BACKEND_URL = "https://distribusync-1.onrender.com";

  /** LocalStorage keys used by the client-side auth/session layer. */
  static readonly STORAGE_KEYS = {
    AUTH: "distribusync.auth.session",
    USERS: "distribusync.auth.users",
    JOBS: "distribusync.jobs.history",
  };
}
