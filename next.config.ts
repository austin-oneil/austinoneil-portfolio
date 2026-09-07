import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography only. Remove this entry once real assets land in
    // /public and every <Image> points at a local file.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/seed/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Phosphor ships one module per icon; without this the whole set is pulled
  // into the client bundle for the handful of glyphs actually used.
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
