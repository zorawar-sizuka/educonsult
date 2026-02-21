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
      {
        protocol: 'https',
        hostname: 'avcylblic93rwzti.public.blob.vercel-storage.com', // Your exact Vercel Blob domain
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com', // Catch-all for future projects
        pathname: '/**',
      },
    ],
  }, 

  
};

export default nextConfig;