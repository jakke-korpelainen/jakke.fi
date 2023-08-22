/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
      appDir: true,
    },
    poweredByHeader: false,
    optimizeFonts: false,
    images: {
      minimumCacheTTL: 60 * 60,
    },
  };
  