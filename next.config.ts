import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
      'https://*.cluster-gjstlrnqpna56vr4xhdezmmq4e.cloudworkstations.dev',
      'https://6000-firebase-studio-1760610803247.cluster-gjstlrnqpna56vr4xhdezmmq4e.cloudworkstations.dev',
      'https://9000-firebase-studio-1760610803247.cluster-gjstlrnqpna56vr4xhdezmmq4e.cloudworkstations.dev'
    ],
  },
};

export default nextConfig;
