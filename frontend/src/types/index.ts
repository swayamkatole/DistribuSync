/**
 * Type Definitions
 * ------------------------------------------------------------------
 * These interfaces / enums intentionally mirror the domain model of
 * the Java backend so the contract between client and server is
 * explicit and statically checked — the same discipline you'd apply
 * to a Spring Boot DTO layer.
 *
 * Backend reference:
 *   common/src/main/java/com/distribusync/common/Job.java
 *   common/src/main/java/com/distribusync/common/JobStatus.java
 * ------------------------------------------------------------------
 */

/** Mirrors `com.distribusync.common.JobStatus` */
export enum JobStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

/** Request DTO consumed by `SchedulerController#submitJob` */
export interface SubmitJobRequest {
  jobName: string;
}

/** Response payload returned by `SchedulerController#submitJob` */
export interface SubmitJobResponse {
  jobId: string;
  status: string;
  assignedWorker: string | null;
  error?: string;
}

/** Client-side representation of a scheduled Job, mirrors `Job.java` */
export interface Job {
  jobId: string;
  jobName: string;
  status: JobStatus;
  assignedWorker: string | null;
  submittedAt: string; // ISO timestamp
  latencyMs?: number;
}

/** Authenticated principal — analogous to a Spring Security `UserDetails` */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/** Persisted record inside the local "user store" (never store raw passwords) */
export interface StoredUserRecord extends AuthUser {
  passwordHash: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export type BackendState = "checking" | "online" | "cold-start" | "offline";
