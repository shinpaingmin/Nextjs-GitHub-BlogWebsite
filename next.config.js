/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // for remote source
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/shinpaingmin/testing-blogposts/master/images/**'
      }
    ]
  }
}

module.exports = nextConfig
