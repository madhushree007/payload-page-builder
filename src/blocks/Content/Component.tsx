import { RichText } from '@payloadcms/richtext-lexical/react'

import type { ContentBlock } from '@/payload-types'

export function ContentBlockComponent({ content }: ContentBlock) {
  return (
    <section className="block content">
      <RichText data={content} />
    </section>
  )
}
