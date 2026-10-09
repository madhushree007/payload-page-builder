import { getPayload } from 'payload'

import config from '@/payload.config'

export async function SiteHeader() {
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })

  return (
    <header className="site-header">
      <a href="/" className="site-name">
        {header.siteName || 'My Site'}
      </a>
      {!!header.navItems?.length && (
        <nav aria-label="Main">
          {header.navItems.map((item) => (
            <a key={item.id} href={item.link}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
