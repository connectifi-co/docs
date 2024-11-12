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
  assetPrefix: isProd ? '/docs-test/' : '',
  basePath: isProd ? '/docs-test' : '',
  output: 'standalone'
};
