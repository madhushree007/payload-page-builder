import type { ImageBlock } from '@/payload-types'

export function ImageBlockComponent({ image, caption }: ImageBlock) {
  // `image` is just an ID unless the query populated it (depth >= 1)
  if (typeof image !== 'object' || !image.url) return null

  return (
    <figure className="block image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.alt}
        width={image.width ?? undefined}
        height={image.height ?? undefined}
        loading="lazy"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
