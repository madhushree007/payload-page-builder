import type { GlobalConfig } from 'payload'

import { revalidate } from '../utilities/revalidate'

// A global is a single document (no list) — ideal for site-wide settings like navigation
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  hooks: {
    // The header is in the root layout, so every page needs rebuilding
    afterChange: [
      ({ doc }) => {
        revalidate('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'My Site',
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
