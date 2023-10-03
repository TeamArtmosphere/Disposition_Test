/** @type {import('next').NextConfig} */
const nextConfig = {
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
