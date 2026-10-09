import React from 'react'

import { SiteHeader } from '@/components/SiteHeader'
import './styles.css'

export const metadata = {
  description: 'A block-based website built with Next.js and Payload CMS.',
  title: {
    default: 'Payload Page Builder',
    template: '%s | Payload Page Builder',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">Built with Next.js and Payload CMS</footer>
      </body>
    </html>
  )
}
