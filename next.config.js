/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artmosphere-dev-storage.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
