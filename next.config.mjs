/** @type {import('next').NextConfig} */
// next.config.mjs
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    HEADER_UXP_CLIENT:process.env.HEADER_UXP_CLIENT,
    HEADER_UXP_SERVICE:process.env.HEADER_UXP_SERVICE
    // Other server-side variables
},
};

export default nextConfig;
