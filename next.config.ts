import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/venus-alarbeed" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/venus-alarbeed" : "",
    NEXT_PUBLIC_STATIC_PAGE_EXTENSION: isGithubPages ? ".html" : "",
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
