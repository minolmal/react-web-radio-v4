/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.somafm.com",
      },
    ],
  },
};

module.exports = nextConfig;

// https://api.somafm.com/img/7soul120.png