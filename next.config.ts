import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Allow images served from Sanity's CDN
        // These are the uploaded project images managed through the Studio
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Next.js bundles its own internal React that's missing useEffectEvent.
      // Sanity Studio v5.12+ requires useEffectEvent (from React 19.2+).
      // This alias makes client-side bundles use the actual installed React
      // (19.2.x in node_modules) instead of Next.js's internal copy.
      config.resolve.alias = {
        ...config.resolve.alias,
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      }
    }
    return config
  },
}

export default nextConfig
