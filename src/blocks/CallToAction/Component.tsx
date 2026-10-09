import type { CallToActionBlock } from '@/payload-types'

export function CallToActionBlockComponent({
  heading,
  text,
  buttonLabel,
  buttonLink,
}: CallToActionBlock) {
  return (
    <section className="block cta">
      <div>
        <h2>{heading}</h2>
        {text && <p>{text}</p>}
      </div>
      <a className="button" href={buttonLink}>
        {buttonLabel}
      </a>
    </section>
  )
}
