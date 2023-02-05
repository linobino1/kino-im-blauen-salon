require('./utilities/imageSizes')

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
    deviceSizes: ImageSizes.map((x) => x.width),
  },
};

export default nextConfig;
