import type { Block } from 'payload'

export const CallToActionBlock: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
          admin: {
            description: 'A page path like /about, or a full URL',
          },
        },
      ],
    },
  ],
}
