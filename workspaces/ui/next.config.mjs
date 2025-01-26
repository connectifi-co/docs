import nextra from 'nextra'
 
const withNextra = nextra({})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export'
})
