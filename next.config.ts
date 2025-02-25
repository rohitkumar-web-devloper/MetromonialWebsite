import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // output:"export",
  // trailingSlash: false,
  // images: { unoptimized: true } ,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  env:{
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    BASE_URL:process.env.BASE_URL
  },
};

export default nextConfig;
