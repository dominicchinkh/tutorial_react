import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Next.js requires you to explicitly whitelist any external domains 
  // to protect your app from optimizing potentially malicious images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'react.dev',
        pathname: '/**', // Allows any path on this domain
      },
    ],
  },
};

export default nextConfig;
