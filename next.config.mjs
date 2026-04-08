/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
    connect-src 'self' https://*.googlesyndication.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
    img-src 'self' data: blob: https://*.googlesyndication.com https://*.google.com res.cloudinary.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/crazypapa/**',
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

export default nextConfig;
