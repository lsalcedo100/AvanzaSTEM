/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "10.*.*.*",
    "172.*.*.*",
    "192.168.*.*",
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimized copies of /public images stay valid for 30 days in browsers and
    // on Vercel's image cache (default is 4 hours), so returning visitors do not
    // re-request them. Replace a photo by giving it a new file name.
    minimumCacheTTL: 2592000,
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
  // Files under /public are served by Vercel with max-age=0, which makes every
  // page view re-validate each photo, icon and sound effect (one CDN request
  // apiece). They change rarely and get a new name when they do, so let
  // browsers keep them for 30 days.
  async headers() {
    return [
      {
        source: '/:path(.*\\.(?:png|jpg|jpeg|webp|avif|gif|svg|ico|mp3))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }],
      },
    ]
  },
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
