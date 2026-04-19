import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
import type { NextConfig } from "next"

if (process.env.NODE_ENV === "development") {
  void initOpenNextCloudflareForDev()
}

const nextConfig = {
  transpilePackages: ["@packages/ui"],
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
} as unknown as NextConfig

export default nextConfig
