import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';

import 'nextra-theme-docs/style.css'

const navbar = (
  <Navbar
    logo={<span><img src="/wordmark.png" alt="Connectifi Wordmark" width="200"/></span>}
    projectLink="https://github.com/connectifi-co/docs/"
    chatLink="https://discord.com/channels/1296580749130203208/1296580749599969362"
  />
)
const footer = <Footer>{new Date().getFullYear()}© Connectifi</Footer>
 
export default async function RootLayout({ children }) {

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        
        <meta httpEquiv="Content-Language" content="en" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image" content="https://docs.connectifi.co/docs.png" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site:domain" content="connectifi" />
        <meta property="twitter:url" content="https://twitter.com/connectifi" />
        <meta property="twitter:image" content="https://docs.connectifi.co/docs.png" />

        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="apple-mobile-web-app-title" content="Connectifi" />

        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}