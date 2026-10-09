import type { Page } from '@/payload-types'
import { CallToActionBlockComponent } from './CallToAction/Component'
import { ContentBlockComponent } from './Content/Component'
import { HeroBlockComponent } from './Hero/Component'
import { ImageBlockComponent } from './Image/Component'

export function RenderBlocks({ blocks }: { blocks: Page['layout'] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockComponent key={block.id} {...block} />
          case 'content':
            return <ContentBlockComponent key={block.id} {...block} />
          case 'cta':
            return <CallToActionBlockComponent key={block.id} {...block} />
          case 'image':
            return <ImageBlockComponent key={block.id} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
