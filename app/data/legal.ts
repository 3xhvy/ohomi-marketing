import type { LegalPageContent } from '~/types/legal'
import privacyEn from '~/content/privacy.en.json'
import privacyVi from '~/content/privacy.vi.json'

/**
 * Static rather than the source's `import(\`../content/${type}.${lang}.json\`)`:
 * a template-literal dynamic import is resolved by bundler analysis, which does
 * not hold up in the Nitro server build. Only `privacy` has content today.
 */
const CONTENT: Record<'privacy', Record<'en' | 'vi', LegalPageContent>> = {
  privacy: {
    en: privacyEn as LegalPageContent,
    vi: privacyVi as LegalPageContent,
  },
}

export function loadLegalContent(
  pageType: 'privacy',
  language: 'en' | 'vi' = 'vi',
): LegalPageContent {
  return CONTENT[pageType][language] ?? CONTENT[pageType].en
}
