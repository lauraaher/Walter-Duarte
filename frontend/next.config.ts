import type { NextConfig } from "next";
const isPages = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  ...(isPages ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true }, basePath: process.env.NEXT_PUBLIC_BASE_PATH || "" } : {}),
  poweredByHeader: false,
  agentRules: false,
  devIndicators: false,
  ...(isPages ? {} : { async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  } }),
};
export default config;
