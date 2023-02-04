/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      process.env.HOSTNAME || 'localhost',
    ],
    deviceSizes: [
      480,
      1024,
      1280,
      1920,
      2560,
    ],
  },
};

export default nextConfig;
