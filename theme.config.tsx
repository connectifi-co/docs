import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span><img src="wordmark.png" alt="Connectifi Wordmark" width="200"/></span>,
  project: {
    link: 'https://github.com/connectifi-co/docs',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/connectifi-co/docs',
  footer: {
    text: '',
  }
}

export default config
