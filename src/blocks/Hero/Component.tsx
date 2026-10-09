import type { HeroBlock } from '@/payload-types'

export function HeroBlockComponent({ heading, subheading }: HeroBlock) {
  return (
    <section className="hero">
      {heading && <h1>{heading}</h1>}
      {subheading && <p>{subheading}</p>}
    </section>
  )
}
