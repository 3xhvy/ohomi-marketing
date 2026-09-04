<template>
  <main class="oh-blog-list">
    <header class="oh-blog-list__head">
      <h1>{{ t('nav.blog') }}</h1>
      <p>{{ t('blog.lead') }}</p>
    </header>

    <div v-if="error" class="oh-blog-state">
      <p>{{ t('blog.error') }}</p>
      <button type="button" class="oh-blog-retry" @click="refresh()">{{ t('blog.retry') }}</button>
    </div>
    <div v-else-if="posts.length === 0" class="oh-blog-state">
      <p>{{ t('blog.empty') }}</p>
    </div>
    <div v-else class="oh-blog-grid">
      <NuxtLink
        v-for="(post, i) in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="oh-blog-card"
        :style="{ '--stagger': `${Math.min(i, 8) * 40}ms` }"
      >
        <div class="oh-blog-card__media">
          <img
            v-if="post.cover_url && !brokenCovers[post.slug]"
            :src="post.cover_url"
            :alt="post.title"
            class="oh-blog-card__cover"
            loading="lazy"
            @error="markBroken(post.slug)"
          />
          <div v-else class="oh-blog-card__cover oh-blog-card__cover--empty" aria-hidden="true" />
        </div>
        <div class="oh-blog-card__body">
          <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
          <h2>{{ post.title }}</h2>
          <p v-if="post.excerpt">{{ post.excerpt }}</p>
          <span class="oh-blog-card__more">{{ t('blog.readMore') }}</span>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const { t, lang } = useLandingI18n()
const { siteUrl } = useRuntimeConfig().public
const { fetchPosts } = useBlogApi()

// Unlike a post page, a failed list still returns 200 with the shell: the URL
// itself is valid and permanent, so it must not report an error status.
const { data: posts, error, refresh } = await useAsyncData('blog-list', () => fetchPosts(), {
  default: () => [],
})

useSeoMeta({
  title: t('seo.blogTitle'),
  description: t('blog.lead'),
  ogTitle: t('seo.blogTitle'),
  ogDescription: t('blog.lead'),
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/blog` }] })

const brokenCovers = ref<Record<string, true>>({})

function markBroken(slug: string) {
  brokenCovers.value = { ...brokenCovers.value, [slug]: true }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(lang.value === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}
</script>

<style scoped>
.oh-blog-list {
  background: transparent;
  color: #f9fafb;
  min-height: 60vh;
  padding: 48px 24px 96px;
}

.oh-blog-list__head {
  max-width: 720px;
  margin: 0 auto 48px;
  text-align: center;
}

.oh-blog-list__head h1 {
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  letter-spacing: -0.03em;
  color: #f9fafb;
  text-wrap: balance;
}

.oh-blog-list__head p {
  margin: 14px auto 0;
  max-width: 42ch;
  font-size: 14px;
  line-height: 20px;
  color: #d1d5db;
  text-wrap: pretty;
}

.oh-blog-state {
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  color: #d1d5db;
}

.oh-blog-retry {
  margin-top: 16px;
  min-height: 44px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #374151;
  background: #1f2937;
  color: #3dc8b9;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.oh-blog-retry:hover {
  background: #15504b;
  border-color: #3dc8b9;
}

.oh-blog-retry:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 200, 185, 0.4);
}

.oh-blog-grid {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}

.oh-blog-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #374151;
  border-radius: 8px;
  background: #1f2937;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.28s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.15s ease;
  animation: oh-blog-card-in 0.55s cubic-bezier(0.25, 1, 0.5, 1) both;
  animation-delay: var(--stagger, 0ms);
}

.oh-blog-card:hover {
  transform: translateY(-4px);
  border-color: #3dc8b9;
}

.oh-blog-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 200, 185, 0.4);
}

.oh-blog-card__media {
  background: #111827;
}

.oh-blog-card__cover {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.oh-blog-card__cover--empty {
  background: #15504b;
}

.oh-blog-card__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.oh-blog-card time {
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #9ca3af;
}

.oh-blog-card h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #f9fafb;
  text-wrap: balance;
}

.oh-blog-card p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #d1d5db;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-wrap: pretty;
}

.oh-blog-card__more {
  margin-top: auto;
  padding-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #3dc8b9;
  transition: color 0.15s ease;
}

.oh-blog-card:hover .oh-blog-card__more {
  color: #7dd2c3;
}

@keyframes oh-blog-card-in {
  from {
    opacity: 0.55;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .oh-blog-card {
    animation: none;
    transition: border-color 0.15s ease;
  }

  .oh-blog-card:hover {
    transform: none;
  }
}

@media (max-width: 640px) {
  .oh-blog-list {
    padding: 32px 16px 72px;
  }

  .oh-blog-list__head {
    margin-bottom: 32px;
  }

  .oh-blog-list__head h1 {
    font-size: 30px;
    line-height: 38px;
  }

  .oh-blog-grid {
    gap: 16px;
  }
}
</style>
