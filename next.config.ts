import type { NextConfig } from "next";

/** Extra dev hostnames (comma-separated), e.g. `my-tunnel.ngrok-free.dev` */
const extraAllowedDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  // Allow tunnel URLs (ngrok, etc.) to hit the dev server without cross-origin blocks.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    ...extraAllowedDevOrigins,
  ],
};

export default nextConfig;
