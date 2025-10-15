/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    domains: [],
    unoptimized: true,
  },

  // Webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "./"),
      "@components": require("path").resolve(__dirname, "./src/components"),
      "@features": require("path").resolve(__dirname, "./src/features"),
      "@services": require("path").resolve(__dirname, "./src/services"),
      "@hooks": require("path").resolve(__dirname, "./src/hooks"),
      "@types": require("path").resolve(__dirname, "./src/types"),
    }
    return config
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
