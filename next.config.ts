import type { NextConfig } from "next";

const isPages = process.env.GITHUB_ACTIONS === "true";
const repo = "kids4future";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : "",
};

export default nextConfig;
