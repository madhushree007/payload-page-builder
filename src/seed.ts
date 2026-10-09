// Creates demo pages and navigation. Safe to re-run: it updates the seeded
// pages ("home", "about") in place and never touches other pages.
// Run with: npm run seed
import { getPayload } from 'payload'

import config from './payload.config'
import type { ContentBlock, Page } from './payload-types'

// Minimal Lexical rich-text JSON builders
const text = (t: string, format = 0) => ({ type: 'text', text: t, format, version: 1, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: ReturnType<typeof text>[]) => ({
  type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, textFormat: 0, children,
})
const heading = (tag: 'h2' | 'h3', t: string) => ({
  type: 'heading', tag, version: 1, direction: 'ltr', format: '', indent: 0, children: [text(t)],
})
const list = (items: string[]) => ({
  type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, direction: 'ltr', format: '', indent: 0,
  children: items.map((t, i) => ({
    type: 'listitem', value: i + 1, version: 1, direction: 'ltr', format: '', indent: 0, children: [text(t)],
  })),
})
const richText = (...children: object[]) =>
  ({
    root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children },
  }) as ContentBlock['content']

const BOLD = 1

const pages: Pick<Page, 'title' | 'slug' | 'layout'>[] = [
  {
    title: 'Home',
    slug: 'home',
    layout: [
      {
        blockType: 'hero',
        heading: 'Pages built by editors, not developers',
        subheading:
          'Every section on this site is a reusable block managed in Payload CMS and rendered as a static page by Next.js.',
      },
      {
        blockType: 'content',
        content: richText(
          heading('h2', 'How it works'),
          paragraph(
            text('Editors build pages in the Payload admin panel from '),
            text('reusable blocks', BOLD),
            text(' and arrange them in any order. Next.js renders each block with its own React component.'),
          ),
          list([
            'Hero, Rich Text, Call to Action and Image blocks',
            'Static generation for fast page loads',
            'Pages rebuild automatically when content is published',
          ]),
        ),
      },
      {
        blockType: 'cta',
        heading: 'Want to know more?',
        text: 'See how the project is put together.',
        buttonLabel: 'About this site',
        buttonLink: '/about',
      },
    ],
  },
  {
    title: 'About',
    slug: 'about',
    layout: [
      {
        blockType: 'hero',
        heading: 'About this project',
        subheading: 'A small CMS-driven website built with Next.js (App Router), Payload CMS 3 and TypeScript.',
      },
      {
        blockType: 'content',
        content: richText(
          heading('h2', 'Tech stack'),
          list([
            'Next.js App Router with React Server Components',
            'Payload CMS 3 with a block-based Pages collection and a Header global',
            'Neon Postgres with database migrations',
            'Vercel hosting, with media stored in Vercel Blob',
          ]),
          heading('h2', 'Publishing flow'),
          paragraph(
            text('Pages are pre-rendered at build time with '),
            text('generateStaticParams', BOLD),
            text('. When an editor saves a page, a Payload '),
            text('afterChange', BOLD),
            text(' hook calls '),
            text('revalidatePath', BOLD),
            text(' so the live page updates without a full redeploy.'),
          ),
        ),
      },
    ],
  },
]

async function seed() {
  const payload = await getPayload({ config })

  for (const page of pages) {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    if (docs[0]) {
      await payload.update({ collection: 'pages', id: docs[0].id, data: page })
      payload.logger.info(`Updated page: ${page.slug}`)
    } else {
      await payload.create({ collection: 'pages', data: page })
      payload.logger.info(`Created page: ${page.slug}`)
    }
  }

  await payload.updateGlobal({
    slug: 'header',
    data: {
      siteName: 'Page Builder',
      navItems: [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
      ],
    },
  })
  payload.logger.info('Updated header navigation')

  process.exit(0)
}

// Top-level await: `payload run` exits as soon as this module finishes loading
try {
  await seed()
} catch (err) {
  console.error(err)
  process.exit(1)
}
