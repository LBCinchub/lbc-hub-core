/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@lbc/shared'],
  images: {
    domains: ['lbchub.com', 'cdn.lbchub.com'],
  },
};

module.exports = nextConfig;
