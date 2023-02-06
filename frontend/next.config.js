const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n,
  images: {
    loader: 'default',
    domains: [
      // may not include protocol!
      'localhost',
      process.env.NEXT_PUBLIC_HOSTNAME ?? '',
    ],
  },
};

module.exports = nextConfig;
