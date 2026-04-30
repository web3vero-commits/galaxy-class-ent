/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: { allowedOrigins: ["radio.galaxyclassent.com", "localhost:3000"] },
  },
};

module.exports = nextConfig;
