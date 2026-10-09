import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
