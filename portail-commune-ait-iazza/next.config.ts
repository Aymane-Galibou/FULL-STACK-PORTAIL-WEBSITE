import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tells Next.js to load images directly in the browser instead of proxying through Node.js
    unoptimized: process.env.NODE_ENV === "development",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;