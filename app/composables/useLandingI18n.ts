import { en } from '~/i18n/en'
import { vi } from '~/i18n/vi'
import type { LandingDict, LandingLang } from '~/i18n/types'

const DICTS: Record<LandingLang, LandingDict> = { en, vi }

/**
 * Lookup a nested dot-separated path in the active dict.
 * Object keys may themselves contain `.` (e.g. feature codes `PROP.01`), so at
 * each step we pick the longest matching prefix of remaining segments.
 */
function lookup(dict: LandingDict, path: string): unknown {
  const parts = path.split('.')
  let i = 0
  let node: unknown = dict
  while (i < parts.length) {
    if (node == null || typeof node !== 'object') return undefined
    const record = node as Record<string, unknown>
    let advanced = false
    for (let j = parts.length; j > i; j--) {
      const candidate = parts.slice(i, j).join('.')
      if (Object.prototype.hasOwnProperty.call(record, candidate)) {
        node = record[candidate]
        i = j
        advanced = true
        break
      }
    }
    if (!advanced) return undefined
  }
  return node
}

export function useLandingI18n() {
  const currentLang = useState<LandingLang>('landing-lang', () => 'vi')
  const dict = computed<LandingDict>(() => DICTS[currentLang.value])

  const t = (path: string, params?: Record<string, string | number>): string => {
    const value = lookup(dict.value, path)
    let out = typeof value === 'string' ? value : path
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        out = out.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      }
    }
    return out
  }

  function tList<T = unknown>(path: string): T[] {
    const value = lookup(dict.value, path)
    return Array.isArray(value) ? (value as T[]) : []
  }

  const setLang = (lang: LandingLang) => {
    currentLang.value = lang
    if (import.meta.client) {
      try {
        window.localStorage.setItem('owen_language', lang)
      } catch {
        // private mode
      }
      document.documentElement.lang = lang
    }
  }

  return {
    lang: computed(() => currentLang.value),
    dict,
    t,
    tList,
    setLang,
  }
}
