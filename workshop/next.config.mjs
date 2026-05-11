/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/workshop',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
};

export default nextConfig;
