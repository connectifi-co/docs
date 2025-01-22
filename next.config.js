const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  ...withNextra(),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            `script-src 'self'${!isProd ? " 'unsafe-eval'" : ""} 'unsafe-inline' https://glitch.com`,
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-src 'self' https://glitch.com",
            ...(!isProd ? [
              "worker-src 'self' blob:",
              "child-src 'self' blob:"
            ] : [])
          ].join('; ')
        }
      ]
    }];
  }
};
