const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

const isProduction = process.env.NODE_ENV === "production";
const assetPrefix = isProduction ? "/out" : "";

module.exports = {
  ...withNextra(),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix,
  basePath: assetPrefix,
  output: "out",
};
