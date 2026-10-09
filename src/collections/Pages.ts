import type { CollectionConfig } from 'payload'

import { CallToActionBlock } from '../blocks/CallToAction/config'
import { ContentBlock } from '../blocks/Content/config'
import { HeroBlock } from '../blocks/Hero/config'
import { ImageBlock } from '../blocks/Image/config'
import { pathForSlug, revalidate } from '../utilities/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    // Pages are statically generated, so rebuild them when editors save or delete
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidate(pathForSlug(doc.slug))
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidate(pathForSlug(previousDoc.slug))
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidate(pathForSlug(doc.slug))
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL path. Use "home" for the homepage.',
      },
      validate: (value: string | null | undefined) =>
        /^[a-z0-9-]+$/.test(value ?? '') || 'Use lowercase letters, numbers and hyphens',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, ContentBlock, CallToActionBlock, ImageBlock],
    },
  ],
}
