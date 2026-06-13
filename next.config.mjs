/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "10.*.*.*",
    "172.*.*.*",
    "192.168.*.*",
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Repo-level fallback redirects so all traffic consolidates on the canonical
  // host (https://www.avanzastem.org). This is a safety net for canonical URL
  // signals split across http(s)://avanzastem.org and https://www.avanzastem.org
  // seen in Search Console. NOTE: Vercel's project domain settings should still
  // be checked/configured to redirect avanzastem.org -> www.avanzastem.org and
  // enforce HTTPS at the edge; these rules are a backstop if that is missing.
  async redirects() {
    return [
      // http(s)://avanzastem.org/* -> https://www.avanzastem.org/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'avanzastem.org' }],
        destination: 'https://www.avanzastem.org/:path*',
        permanent: true,
      },
      // http://www.avanzastem.org/* -> https://www.avanzastem.org/*
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.avanzastem.org' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
        ],
        destination: 'https://www.avanzastem.org/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
