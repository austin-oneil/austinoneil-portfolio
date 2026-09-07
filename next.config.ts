import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every image is a local file under /public, so no remote patterns are
    // configured. Adding one would let any URL matching it be proxied through
    // the optimizer, which is a wider door than this site needs.
    formats: ["image/avif", "image/webp"],
  },
  // Phosphor ships one module per icon; without this the whole set is pulled
  // into the client bundle for the handful of glyphs actually used.
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
