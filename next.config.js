/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.somafm.com",
        port: "",
        pathname: "/logos/256/**",
      },
    ],
  },
};

module.exports = nextConfig;
