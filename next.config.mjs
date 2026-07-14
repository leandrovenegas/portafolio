/** @type {import('next').NextConfig} */
import mdx from '@next/mdx'

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.bunny.net;
    connect-src 'self' https://*.googlesyndication.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com https://*.bunny.net https://generativelanguage.googleapis.com;

    img-src 'self' data: blob: https://*.googlesyndication.com https://*.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com res.cloudinary.com https://*.bunny.net https://*.b-cdn.net;
    media-src 'self' data: https://*.bunny.net https://cdn.bunny.net https://player.mediadelivery.net https://*.mediadelivery.net https://*.b-cdn.net;
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://*.bunny.net https://player.mediadelivery.net https://iframe.mediadelivery.net;
    frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {},
  outputFileTracingIncludes: {
    '/api/**/*': ['!./.next/cache/**/*'],
    '/portafolio/[slug]': ['./app/content/**/*']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.b-cdn.net',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/servicios/motion-desing',
        destination: '/servicios/motion-design',
        permanent: true,
      },
      {
        source: '/proyectos',
        destination: '/portafolio',
        permanent: true,
      },
      {
        source: '/proyectos/:slug*',
        destination: '/portafolio/:slug*',
        permanent: true,
      },
      {
        source: '/organizaciones/:slug*',
        destination: '/portafolio/:slug*',
        permanent: true,
      },
      {
        source: '/casos-de-exito',
        destination: '/portafolio',
        permanent: true,
      },
      {
        source: '/videos/mastermasterzvpdgipktcoy',
        destination: '/videos/lan-reel-produccion-audiovisual',
        permanent: true,
      },
      {
        source: '/videos/cabezamvilacmexp5rbeamconfiguracinlhvv12ugs9qn',
        destination: '/videos/cabeza-movil-acme-xp-5r-beam-configuracion',
        permanent: true,
      },
      {
        source: '/videos/dgalobienvuwn5j',
        destination: '/videos/digalo-bien',
        permanent: true,
      },
      {
        source: '/videos/lexlexreel-021au6f3dcllg7c',
        destination: '/videos/lex-reel-produccion-audiovisual-02',
        permanent: true,
      },
      {
        source: '/videos/reel-version1wde9xzlvv49t',
        destination: '/videos/reel-produccion-audiovisual-v1',
        permanent: true,
      },
      {
        source: '/videos/interview-master1uowugjpcphgr',
        destination: '/videos/entrevista-master',
        permanent: true,
      },
      {
        source: '/videos/hight-lights-manojo-crazyroom-01fqvxpcixk3to',
        destination: '/videos/highlights-manojo-crazyroom',
        permanent: true,
      },
      {
        source: '/videos/nueva-coleccion-kali-yuga',
        destination: '/videos/nueva-coleccion-kali-yuga-ropa',
        permanent: true,
      },
      {
        source: '/videos/crazypapa-studios-fanzine-glise-gray-alien-collection-chile-visualizacionrlh9h8',
        destination: '/videos/crazypapa-studios-fanzine-glise-gray-alien',
        permanent: true,
      },
      {
        source: '/videos/contact-ce5-guia-de-contacto-extraterrestre-vela-minilibrito',
        destination: '/videos/contact-ce5-guia-contacto-extraterrestre',
        permanent: true,
      },
    ];
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
