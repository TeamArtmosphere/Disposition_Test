/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
