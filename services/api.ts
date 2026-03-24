import axios, { type AxiosError } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

/**
 * Shared Axios instance for the Express REST API.
 * Base URL is configured via NEXT_PUBLIC_API_URL for Vercel deployments.
 */
export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 20_000,
});

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ message?: string; errors?: unknown }>;
    const msg = ax.response?.data?.message;
    if (typeof msg === "string") return msg;
    if (Array.isArray(ax.response?.data?.errors)) {
      const first = ax.response.data.errors[0] as { msg?: string };
      if (first?.msg) return first.msg;
    }
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}
