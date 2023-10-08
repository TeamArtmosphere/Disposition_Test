/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
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
