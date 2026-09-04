<template>
  <main class="oh-blog-post">
    <article class="oh-blog-shell">
      <div class="oh-crumb">
        <NuxtLink to="/">{{ t('blog.home') }}</NuxtLink>
        <span class="oh-crumb__sep">/</span>
        <NuxtLink to="/blog">{{ t('nav.blog') }}</NuxtLink>
        <span class="oh-crumb__sep">/</span>
        <span class="oh-crumb__current">{{ post.title }}</span>
      </div>

      <header class="oh-post-head">
        <h1>{{ post.title }}</h1>
        <div class="oh-post-meta">
          <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
          <span class="oh-post-meta__dot" aria-hidden="true"></span>
          <span>{{ t('blog.readingTime', { min: readingMinutes }) }}</span>
        </div>
      </header>

      <img
        v-if="post.cover_url"
        :src="post.cover_url"
        :alt="post.title"
        class="oh-blog-post__cover"
      />

      <div class="oh-post-layout" :class="{ 'oh-post-layout--solo': !toc.length }">
        <aside v-if="toc.length" class="oh-toc" :aria-label="t('blog.toc')">
          <p class="oh-toc__label">{{ t('blog.toc') }}</p>
          <nav class="oh-toc__nav">
            <a
              v-for="item in toc"
              :key="item.id"
              :href="`#${item.id}`"
              class="oh-toc__link"
              :class="{ 'oh-toc__link--active': activeTocId === item.id }"
            >{{ item.text }}</a>
          </nav>
        </aside>

        <div ref="blocksEl" class="oh-blog-post__blocks">
          <template v-for="(block, i) in post.blocks || []" :key="i">
            <h2 v-if="block.type === 'heading_1'" :id="headingId(block, i)">{{ block.text }}</h2>
            <h3 v-else-if="block.type === 'heading_2'" :id="headingId(block, i)">{{ block.text }}</h3>
            <h4 v-else-if="block.type === 'heading_3'">{{ block.text }}</h4>
            <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
            <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
            <hr v-else-if="block.type === 'divider'" />
            <ul v-else-if="block.type === 'bulleted_list'">
              <li v-for="(item, j) in block.items || []" :key="j">{{ item }}</li>
            </ul>
            <ol v-else-if="block.type === 'numbered_list'">
              <li v-for="(item, j) in block.items || []" :key="j">{{ item }}</li>
            </ol>
            <figure v-else-if="block.type === 'image' && block.url">
              <img :src="block.url" :alt="block.text || ''" loading="lazy" />
              <figcaption v-if="block.text">{{ block.text }}</figcaption>
            </figure>
            <pre v-else-if="block.type === 'code'"><code>{{ block.text }}</code></pre>
          </template>
        </div>
      </div>
    </article>

    <section v-if="related.length" class="oh-related">
      <h3>{{ t('blog.related') }}</h3>
      <div class="oh-blog-grid">
        <NuxtLink
          v-for="rel in related"
          :key="rel.slug"
          :to="`/blog/${rel.slug}`"
          class="oh-blog-card"
        >
          <img
            v-if="rel.cover_url"
            :src="rel.cover_url"
            :alt="rel.title"
            class="oh-blog-card__cover"
            loading="lazy"
          />
          <div class="oh-blog-card__body">
            <time>{{ formatDate(rel.published_at) }}</time>
            <h4>{{ rel.title }}</h4>
            <p v-if="rel.excerpt">{{ rel.excerpt }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { BlogBlock } from '~/composables/useBlogApi'

const { t, lang } = useLandingI18n()
const route = useRoute()
const { siteUrl } = useRuntimeConfig().public
const { fetchPost, fetchPosts } = useBlogApi()

const slug = computed(() => String(route.params.slug || ''))

const { data: post, error } = await useAsyncData(
  () => `blog-post-${slug.value}`,
  () => fetchPost(slug.value),
  { watch: [slug] },
)

// A missing post is a real 404 so crawlers drop it; anything else upstream is
// transient, and 503 tells them to come back rather than de-index the URL.
if (error.value || !post.value) {
  const status = (error.value as { statusCode?: number; status?: number } | null)?.statusCode
    ?? (error.value as { status?: number } | null)?.status
  throw createError({
    statusCode: status === 404 ? 404 : 503,
    statusMessage: status === 404 ? 'Post not found' : 'Blog temporarily unavailable',
    fatal: true,
  })
}

// Replaces the source page's manual document.title / meta injection, which only
// ran after hydration and was the reason none of this got indexed.
useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogImage: () => post.value?.cover_url,
  ogType: 'article',
  articlePublishedTime: () => post.value?.published_at,
})
useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/blog/${slug.value}` }],
})

const { data: related } = await useAsyncData(
  () => `blog-related-${slug.value}`,
  async () => (await fetchPosts()).filter((p) => p.slug !== slug.value).slice(0, 3),
  { default: () => [], watch: [slug] },
)

const blocksEl = ref<HTMLElement | null>(null)
const activeTocId = ref('')
let observer: IntersectionObserver | null = null

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function headingId(block: { text?: string }, i: number) {
  return `${slugify(block.text || '')}-${i}`
}

const toc = computed(() => {
  const blocks: BlogBlock[] = post.value?.blocks || []
  return blocks
    .map((block, i) => ({ block, i }))
    .filter(({ block }) => block.type === 'heading_1' || block.type === 'heading_2')
    .map(({ block, i }) => ({ id: headingId(block, i), text: block.text || '' }))
})

const readingMinutes = computed(() => {
  const blocks: BlogBlock[] = post.value?.blocks || []
  const words = blocks
    .map((b) => (b.text || '') + (b.items || []).join(' '))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
})

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(lang.value === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function setupScrollSpy() {
  observer?.disconnect()
  if (!blocksEl.value || toc.value.length === 0) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeTocId.value = entry.target.id
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  )
  for (const item of toc.value) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }
}

onMounted(async () => {
  await nextTick()
  setupScrollSpy()
})

watch(slug, async () => {
  await nextTick()
  setupScrollSpy()
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.oh-blog-post {
  --oh-post-surface: #1f2937;
  --oh-post-teal: #3dc8b9;
  --oh-post-text: #f9fafb;
  --oh-post-text-dim: #d1d5db;
  --oh-post-text-faint: #9ca3af;
  --oh-post-border: #374151;
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  background: transparent;
  color: var(--oh-post-text);
  padding: 28px 24px 96px;
}

.oh-blog-post > * {
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}

.oh-blog-shell {
  position: relative;
  padding: 28px 32px 40px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 12px;
  box-shadow:
    0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  overflow: hidden;
  animation: oh-blog-shell-in 0.55s var(--ease-out-quart) both;
}

.oh-blog-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle 420px at 88% 8%, #15504b 0%, transparent 70%);
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

.oh-blog-shell > * {
  position: relative;
  z-index: 1;
}

.oh-blog-state {
  margin-top: 40px;
  text-align: center;
  color: var(--oh-post-text-dim);
}

.oh-blog-retry {
  margin-top: 16px;
  min-height: 44px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid var(--oh-post-border);
  background: #111827;
  color: var(--oh-post-teal);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.oh-blog-retry:hover {
  background: #15504b;
  border-color: var(--oh-post-teal);
}

.oh-blog-retry:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 200, 185, 0.4);
}

.oh-crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: var(--oh-post-text-faint);
}

.oh-crumb a:hover {
  color: var(--oh-post-teal);
}

.oh-crumb a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 200, 185, 0.4);
  border-radius: 8px;
}

.oh-crumb__sep {
  opacity: 0.45;
}

.oh-crumb__current {
  color: var(--oh-post-text-dim);
  max-width: 42ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oh-post-head {
  padding: 28px 0 8px;
}

.oh-post-head h1 {
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  letter-spacing: -0.03em;
  color: var(--oh-post-text);
  text-wrap: balance;
  max-width: 22ch;
}

.oh-post-meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #111827;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: var(--oh-post-text-dim);
}

.oh-post-meta__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--oh-post-text-faint);
}

.oh-blog-post__cover {
  display: block;
  width: 100%;
  margin: 28px 0 8px;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #111827;
}

.oh-post-layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 40px;
  padding: 36px 0 8px;
}

.oh-post-layout--solo {
  grid-template-columns: minmax(0, 1fr);
}

.oh-toc {
  position: sticky;
  top: 96px;
  align-self: start;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #111827;
}

.oh-toc__label {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--oh-post-text-faint);
}

.oh-toc__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oh-toc__link {
  display: block;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  color: var(--oh-post-text-dim);
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.oh-toc__link:hover {
  color: var(--oh-post-text);
  background: #1f2937;
}

.oh-toc__link--active {
  color: var(--oh-post-teal);
  background: #15504b;
  font-weight: 600;
}

.oh-toc__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 200, 185, 0.4);
}

.oh-blog-post__blocks {
  text-align: left;
  color: var(--oh-post-text-dim);
  font-size: 14px;
  line-height: 1.75;
  max-width: 68ch;
  text-wrap: pretty;
}

.oh-blog-post__blocks h2 {
  margin: 44px 0 14px;
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: -0.02em;
  color: var(--oh-post-text);
  scroll-margin-top: 104px;
  text-wrap: balance;
}

.oh-blog-post__blocks h2:first-child {
  margin-top: 0;
}

.oh-blog-post__blocks h3 {
  margin: 36px 0 12px;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: var(--oh-post-text);
  scroll-margin-top: 104px;
  text-wrap: balance;
}

.oh-blog-post__blocks h4 {
  margin: 28px 0 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--oh-post-text);
}

.oh-blog-post__blocks p,
.oh-blog-post__blocks blockquote,
.oh-blog-post__blocks ul,
.oh-blog-post__blocks ol,
.oh-blog-post__blocks pre,
.oh-blog-post__blocks figure,
.oh-blog-post__blocks hr {
  margin: 0 0 20px;
}

.oh-blog-post__blocks ul,
.oh-blog-post__blocks ol {
  padding-left: 1.35em;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.oh-blog-post__blocks ul {
  list-style: disc;
}

.oh-blog-post__blocks ol {
  list-style: decimal;
}

.oh-blog-post__blocks li {
  padding-left: 4px;
  color: var(--oh-post-text-dim);
}

.oh-blog-post__blocks li::marker {
  color: var(--oh-post-teal);
  font-weight: 600;
}

.oh-blog-post__blocks blockquote {
  padding: 16px 18px;
  border: 1px solid #374151;
  border-radius: 8px;
  background: #111827;
  color: var(--oh-post-text);
  font-size: 14px;
  line-height: 1.65;
}

.oh-blog-post__blocks hr {
  border: none;
  height: 1px;
  background: #374151;
}

.oh-blog-post__blocks img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #374151;
}

.oh-blog-post__blocks figcaption {
  margin-top: 8px;
  font-size: 12px;
  line-height: 18px;
  color: var(--oh-post-text-faint);
}

.oh-blog-post__blocks pre {
  padding: 16px;
  border-radius: 8px;
  background: #111827;
  border: 1px solid #374151;
  overflow-x: auto;
  font-size: 14px;
  line-height: 20px;
}

.oh-related {
  margin-top: 40px;
  padding: 28px 32px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 12px;
  box-shadow:
    0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
}

.oh-related h3 {
  margin: 0 0 24px;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  color: var(--oh-post-text);
  text-wrap: balance;
}

.oh-blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  text-align: left;
}

.oh-blog-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #374151;
  border-radius: 8px;
  background: #111827;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.28s var(--ease-out-quart),
    border-color 0.15s ease;
}

.oh-blog-card:hover {
  transform: translateY(-3px);
  border-color: #3dc8b9;
}

.oh-blog-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 200, 185, 0.4);
}

.oh-blog-card__cover {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  background: #111827;
}

.oh-blog-card__body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.oh-blog-card time {
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: var(--oh-post-text-faint);
}

.oh-blog-card h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--oh-post-text);
  text-wrap: balance;
}

.oh-blog-card p {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--oh-post-text-dim);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes oh-blog-shell-in {
  from {
    opacity: 0.7;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .oh-blog-shell {
    animation: none;
  }

  .oh-blog-card,
  .oh-blog-retry,
  .oh-toc__link {
    transition: none;
  }

  .oh-blog-card:hover {
    transform: none;
  }
}

@media (max-width: 900px) {
  .oh-blog-post {
    padding: 20px 16px 72px;
  }

  .oh-blog-shell,
  .oh-related {
    padding: 20px 18px 28px;
  }

  .oh-post-head h1 {
    font-size: 30px;
    line-height: 38px;
    max-width: none;
  }

  .oh-post-layout {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 24px;
  }

  .oh-toc {
    position: static;
  }

  .oh-blog-post__blocks h2 {
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
