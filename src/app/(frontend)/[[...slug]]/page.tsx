import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import config from '@/payload.config'

type Props = { params: Promise<{ slug?: string[] }> }

// Fetch a page by slug. `cache` dedupes the call between
// generateMetadata and the page component in the same render.
const getPageBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
})

// Pre-render every page at build time (static generation).
// Pages created later are rendered on first visit, then cached.
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1000,
    select: { slug: true },
  })

  return docs.map(({ slug }) => ({ slug: slug === 'home' ? [] : [slug] }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug?.[0] ?? 'home')
  return { title: page?.title }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug?.[0] ?? 'home') // "/" → "home"

  if (!page) {
    notFound()
  }

  return <RenderBlocks blocks={page.layout} />
}
