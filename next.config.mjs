/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
