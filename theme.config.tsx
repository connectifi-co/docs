import React from 'react'
import { useRouter } from 'next/router'
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs'


const config: DocsThemeConfig = {
  logo: <span><img src="/wordmark.png" alt="Connectifi Wordmark" width="200"/></span>,
  project: {
    link: 'https://docs.connectifi.co/',
  },
  chat: {
    link: 'https://discord.com/channels/1296580749130203208/1296580749599969362',
  },
  docsRepositoryBase: 'https://github.com/connectifi-co/docs/tree/main',
  faviconGlyph: '/favicon.png',
  footer: {
    text: '',
  },
  head: function useHead() {
    const config = useConfig()
    const { route } = useRouter()
    const isDefault = route === '/' || !config.title

    const description =
      config.frontMatter.description ||
      'Connectifi - Your Next Integration Platform'
    const title = config.title + (route === '/' ? '' : ' - Connectifi')

    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image" content="https://docs.connectifi.co/docs.png" />

        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="connectifi" />
        <meta name="twitter:url" content="https://twitter.com/connectifi" />
        <meta property="twitter:image" content="https://docs.connectifi.co/docs.png" />
        <meta name="apple-mobile-web-app-title" content="Connectifi" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon/favicon.png" type="image/png" />
      </>
    )
  }

  
}

export default config
