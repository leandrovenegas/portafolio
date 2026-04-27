/** @type {import('next').NextConfig} */
import mdx from '@next/mdx'

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.bunny.net;
    connect-src 'self' https://*.googlesyndication.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.bunny.net;
    img-src 'self' data: blob: https://*.googlesyndication.com https://*.google.com res.cloudinary.com https://*.bunny.net https://*.b-cdn.net;
    media-src 'self' https://*.bunny.net https://cdn.bunny.net https://player.mediadelivery.net https://*.mediadelivery.net;
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://*.bunny.net https://player.mediadelivery.net https://iframe.mediadelivery.net;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Tell SWC to only target modern browsers — eliminates legacy polyfills
    // for Array.at, Object.fromEntries, flatMap, trimStart/trimEnd, etc.
    // These are all natively supported since Chrome 90 / Firefox 88 / Safari 14 (2020+)
    browsersListQueries: [
      'chrome >= 90',
      'firefox >= 88',
      'safari >= 14',
      'edge >= 90',
      'not dead',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/crazypapa/**',
      },
      {
        protocol: 'https',
        hostname: '*.b-cdn.net',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
      // Aggressive caching for hashed static assets (CSS, JS chunks)
      // Next.js includes a content hash in the filename, so it's safe to cache forever
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/documents/Brief-Isla-FriendShip-Diseno-Abi-Crazypapa-Studios.pdf',
        headers: [
          {
            key: 'Link',
            value: '<https://www.leandrovenegas.cl/documents/Brief-Isla-FriendShip-Diseno-Abi-Crazypapa-Studios.pdf>; rel="canonical"',
          },
        ],
      },
      {
        source: '/documents/CrazyPapa-Brief-Contact-colab_crazytofucandell.pdf',
        headers: [
          {
            key: 'Link',
            value: '<https://www.leandrovenegas.cl/documents/CrazyPapa-Brief-Contact-colab_crazytofucandell.pdf>; rel="canonical"',
          },
        ],
      },
    ];
  },
};

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
