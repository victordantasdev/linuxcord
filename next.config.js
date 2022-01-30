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
        has: [
          {
            type: 'query',
            key: 'username',
            value: 'home',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ];
  },
};
