/** @type {import('next').NextConfig} */
// https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/97d2/live/01b5afa0-c25c-11f1-bc2e-018d645d8d21.jpg.webp
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
