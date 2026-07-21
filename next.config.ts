import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/catagory", destination: "/products", permanent: true },
      {
        source: "/ProductDetails/:path*",
        destination: "/products/:path*",
        permanent: true,
      },
      {
        source: "/productDetails/:path*",
        destination: "/products/:path*",
        permanent: true,
      },
      { source: "/home", destination: "/", permanent: true },
      { source: "/signup", destination: "/register", permanent: true },
    ];
  },
};

export default nextConfig;
