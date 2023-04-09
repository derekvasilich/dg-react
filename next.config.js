/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`
  },
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
