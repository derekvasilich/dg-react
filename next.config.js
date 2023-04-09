/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'media.chromedata.com'
      },
      {
        protocol: 'http',
        hostname: 'media.carbook.com'
      }
    ]
  }
}

module.exports = nextConfig
