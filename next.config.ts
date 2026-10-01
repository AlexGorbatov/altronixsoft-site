import type { NextConfig } from "next";

/**
 * Baseline security headers for every route. HSTS belongs on the hosting layer (it is only meaningful over
 * HTTPS). A Content-Security-Policy needs a nonce for the inline JSON-LD and Next scripts, so it is a
 * separate step; `frame-ancestors` is set here because it needs no script allowances.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
