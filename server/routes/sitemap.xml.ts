interface PostRef {
  slug: string
  published_at: string
}

function xmlEscape(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const { apiBase, siteUrl } = useRuntimeConfig(event).public
  const staticPaths = ['/', '/product', '/about', '/blog', '/demo', '/privacy']

  // Fails soft on purpose: an empty sitemap would tell Google the blog has no
  // pages, which is worse than a sitemap that is briefly missing the posts.
  let posts: PostRef[] = []
  try {
    const body = await $fetch<{ data: PostRef[] }>(`${apiBase}/api/public/v1/blog/posts`)
    posts = body.data ?? []
  } catch {
    posts = []
  }

  const entries = [
    ...staticPaths.map((p) => ({ loc: `${siteUrl}${p}`, lastmod: '' })),
    ...posts.map((p) => ({ loc: `${siteUrl}/blog/${p.slug}`, lastmod: p.published_at })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${xmlEscape(e.loc)}</loc>${e.lastmod ? `<lastmod>${xmlEscape(e.lastmod)}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=600')
  return body
})
