import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['media.lamaisonduteeshirt.com', 'www.jkwears.store', 'youtu.be'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
