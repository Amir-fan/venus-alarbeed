import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/venus-alarbeed",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
