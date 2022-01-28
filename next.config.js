/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  async redirects() {
    return [
      {
        source: '/chat',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
