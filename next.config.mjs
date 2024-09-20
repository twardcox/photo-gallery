/** @type {import('next').NextConfig} */


const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  },
  images: {
    domains: ['s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};


export default nextConfig;
