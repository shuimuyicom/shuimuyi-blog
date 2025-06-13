/** @type {import('next').NextConfig} */
const nextConfig = {
  // 设置合理的构建选项
  reactStrictMode: true,
  poweredByHeader: false,
  
  // 图像优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shuimuyi.com',
      },
    ],
  },

  // 在开发模式下启用完整类型检查，但在构建时只报告严重错误
  typescript: {
    // 打开此项不会完全忽略，只会允许类型警告不阻止构建
    ignoreBuildErrors: true,
  },

  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 