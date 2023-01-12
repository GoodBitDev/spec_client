const { webpack } = require("next/dist/compiled/webpack/webpack");

/** @type {import('next').NextConfig} */

let envs = {
  BASE_URL: process.env.BASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  DEBUG: process.env.NODE_ENV !== "production"
};

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(envs));
    return config
  }
}

module.exports = nextConfig
