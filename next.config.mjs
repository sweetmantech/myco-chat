/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "magic.decentralized-content.com",
      }
    ],
  },
};

export default nextConfig;
