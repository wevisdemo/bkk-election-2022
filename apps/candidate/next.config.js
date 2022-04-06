/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/candidate',
  images: {
    loader: 'akamai',
    path: '',
  },
  env: {
    NOCO_API_URL: process.env.NOCO_API_URL || '',
    NOCO_AUTH_TOKEN: process.env.NOCO_AUTH_TOKEN || '',
    COMING_SOON: process.env.COMING_SOON || false,
  },
};

module.exports = nextConfig;
