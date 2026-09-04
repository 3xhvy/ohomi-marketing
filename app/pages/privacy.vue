<script setup lang="ts">
import { loadLegalContent } from '~/data/legal'

const route = useRoute()
const { siteUrl } = useRuntimeConfig().public

const language = computed(() => {
  const lang = route.query.lang as string | undefined
  return (lang === 'en' || lang === 'vi' ? lang : 'vi') as 'en' | 'vi'
})

// Resolved synchronously during render, unlike the source page which showed a
// "Loading privacy policy..." state — that shipped an empty document to crawlers.
const content = computed(() => loadLegalContent('privacy', language.value))

// Taken from the document itself rather than the shared `seo` block: this page
// honours `?lang=`, and the content file's own title always matches the body
// that gets rendered.
useSeoMeta({
  title: () => `${content.value.title} — Ohomi`,
  description: () => content.value.description,
  ogTitle: () => `${content.value.title} — Ohomi`,
  ogDescription: () => content.value.description,
})
// `?lang=en` is the same document, so it canonicalises to the unsuffixed URL.
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/privacy` }] })
</script>

<template>
  <LegalPageLayout :content="content" page-type="privacy" :language="language" />
</template>
