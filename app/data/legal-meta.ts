import type { LegalPageMeta } from '~/types/legal'

export const LEGAL_PAGES: Record<string, LegalPageMeta> = {
  privacy: {
    type: 'privacy',
    title: 'Privacy Policy',
    slug: 'privacy',
    description: 'How Ohomi handles your data and protects your privacy'
  }
  // Future: terms, cookies, etc.
}

export function getLegalPageMeta(slug: string): LegalPageMeta | null {
  return LEGAL_PAGES[slug] || null
}
