/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // the dev overlay badge would otherwise show up in showcase recordings
  devIndicators: false,
}

export default nextConfig
