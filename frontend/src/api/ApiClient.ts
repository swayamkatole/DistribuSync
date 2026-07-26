import axios, { AxiosInstance, AxiosError } from "axios";
import { AppConfig } from "../config/AppConfig";
import { useAuthStore } from "../store/useAuthStore";

/**
 * ApiClient
 * ------------------------------------------------------------------
 * Thin wrapper around Axios, deliberately structured like a Spring
 * `RestTemplate` / `WebClient` bean: a single, shared, pre-configured
 * HTTP client with interceptors for cross-cutting concerns
 * (authorization headers, logging, error normalization).
 *
 * Implemented as a singleton so the whole app shares one instance —
 * the frontend equivalent of a Spring-managed `@Bean`.
 * ------------------------------------------------------------------
 */
export class ApiClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      const client = axios.create({
        baseURL: AppConfig.API_BASE_URL,
        timeout: AppConfig.REQUEST_TIMEOUT_MS,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Request interceptor — attach bearer token, mirrors a JWT filter
      client.interceptors.request.use((config) => {
        const token = useAuthStore.getState().session?.token;
        if (token) {
          config.headers = config.headers ?? {};
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
        return config;
      });

      // Response interceptor — normalize errors (cold start, network, 5xx)
      client.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.code === "ECONNABORTED") {
            return Promise.reject(
              new Error(
                "Request timed out. The Render free-tier instance may be cold-starting — please retry in a few seconds."
              )
            );
          }
          if (!error.response) {
            return Promise.reject(
              new Error("Network error — could not reach the DistribuSync Scheduler service.")
            );
          }
          const data: any = error.response.data;
          const message = data?.error || data?.message || `Request failed (${error.response.status})`;
          return Promise.reject(new Error(message));
        }
      );

      ApiClient.instance = client;
    }
    return ApiClient.instance;
  }
}
