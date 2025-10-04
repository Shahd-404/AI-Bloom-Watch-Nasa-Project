import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static HTML export
  images: {
    unoptimized: true, // Important for GitHub Pages (no Image Optimization)
  },
  basePath: process.env.NODE_ENV === "production" ? "Elite-Team" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "Elite-Team" : "",
};

export default nextConfig;
