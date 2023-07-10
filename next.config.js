/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY_TIME: process.env.NEXT_PUBLIC_API_KEY_TIME,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_KEY2: process.env.NEXT_PUBLIC_API_KEY2,
  },
};

module.exports = nextConfig;
