import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env:{
    MAPS_API_KEY: process.env.MAPS_API_KEY,
  }
};

export default nextConfig;
