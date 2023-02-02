/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  },
  images: {
    domains: [
      'localhost',
      // Your domain(s) here
    ],
    deviceSizes: [
      480,
      1024,
      1280,
      1920,
      2560,
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/start',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
