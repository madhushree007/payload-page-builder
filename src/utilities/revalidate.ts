import { revalidatePath } from 'next/cache'

// Rebuild a statically generated path after content changes.
// Outside a Next.js request (e.g. `payload migrate` or the seed script)
// there is nothing to revalidate, so revalidatePath throws — ignore that.
export function revalidate(path: string, type?: 'layout' | 'page') {
  try {
    revalidatePath(path, type)
  } catch {
    // not running inside Next.js
  }
}

export const pathForSlug = (slug: string) => (slug === 'home' ? '/' : `/${slug}`)
