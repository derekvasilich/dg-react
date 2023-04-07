/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
