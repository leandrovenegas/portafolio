/** @type {import('next').NextConfig} */
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
        source: '/documents/Brief-Isla-FriendShip-Dise%C3%B1o-Abi-Crazypapa-Studios.pdf',
        headers: [
          {
            key: 'Link',
            value: '<https://www.leandrovenegas.cl/documents/Brief-Isla-FriendShip-Dise%C3%B1o-Abi-Crazypapa-Studios.pdf>; rel="canonical"',
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
