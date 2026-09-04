export interface BlogPostSummary {
  slug: string
  title: string
  excerpt?: string
  cover_url?: string
  published_at: string
}

export interface BlogBlock {
  type: string
  text?: string
  items?: string[]
  url?: string
  language?: string
}

export interface BlogPost extends BlogPostSummary {
  blocks?: BlogBlock[]
}

/**
 * Client for the Go blog proxy. Notion credentials live only in the backend, so
 * this repo never talks to Notion directly.
 *
 * Do not add `useRequestHeaders()` here. Nuxt does not forward client headers on
 * server-side `$fetch` by default, and that default is what we want: the backend
 * trusts `X-Forwarded-For` unconditionally when keying its rate limiter, so
 * passing a visitor-supplied value through would let anyone spoof past it.
 */
export function useBlogApi() {
  const { apiBase } = useRuntimeConfig().public

  const get = async <T>(path: string): Promise<T> => {
    const body = await $fetch<{ data: T }>(`${apiBase}/api/public/v1/blog${path}`)
    return body.data
  }

  return {
    fetchPosts: () => get<BlogPostSummary[]>('/posts'),
    fetchPost: (slug: string) => get<BlogPost>(`/posts/${encodeURIComponent(slug)}`),
  }
}
