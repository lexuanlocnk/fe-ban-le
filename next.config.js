/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.vitinhnguyenkim.vn",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.245.190",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
