import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'i1.sndcdn.com' },
      { hostname: 'i.scdn.co' },
      { hostname: '*.cloudfront.net' },
      { hostname: 'soundcloud.com' },
      { hostname: 'imagedelivery.net' },
      { hostname: 'i.imgur.com' },
      { hostname: 'ipfs.decentralized-content.com' },
      { hostname: 'i.seadn.io' },
      { hostname: 'arweave.net' },
      { hostname: 'static.highongrowth.xyz' },
    ],
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
