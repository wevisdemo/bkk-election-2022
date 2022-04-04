/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/candidate',
  images: {
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;
