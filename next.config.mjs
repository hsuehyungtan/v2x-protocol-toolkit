/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/v2x-protocol-toolkit',
  assetPrefix: '/v2x-protocol-toolkit',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
