/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }, 
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      }, 
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Allow Wikipedia images
        port: '',
        pathname: '/**',
      }, 
      {
        protocol: 'https',
        hostname: 'www.pexels.com', // Allow Wikipedia images
        port: '',
        pathname: '/**',
      },
    ],
  }, 
  experimental: {
    turbo: false,
    },
  
};

export default nextConfig;