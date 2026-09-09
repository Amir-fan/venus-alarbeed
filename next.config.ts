import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/venus-alarbeed" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/venus-alarbeed" : "",
    NEXT_PUBLIC_STATIC_PAGE_EXTENSION: isGithubPages ? ".html" : "",
  },
  images: {
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"],
  },
  ...(isGithubPages ? {} : {
    outputFileTracingIncludes: {
      '/api/verify-receipt': [
        './node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs',
        './node_modules/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz',
        './node_modules/@tesseract.js-data/ara/4.0.0_best_int/ara.traineddata.gz',
        './node_modules/tesseract.js-core/**/*',
      ],
    },
  }),
};

export default nextConfig;
