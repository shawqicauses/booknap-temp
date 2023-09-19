/** @type {import('next').NextConfig} */
const CompressionWebpackPlugin = require("compression-webpack-plugin")

const nextConfig = {
  swcMinify: true,
  compress: true,
  trailingSlash: true,
  images: {unoptimized: true, domains: ["ui-avatars.com"]},
  typescript: {ignoreBuildErrors: true},
  eslint: {ignoreDuringBuilds: true},
  webpack: (config) => {
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$|\.html$/
      })
    )

    return config
  }
}

module.exports = nextConfig
