<template>
  <main class="oh-main">
    <div class="oh-product-tabs" role="tablist" :aria-label="t('product.tabsLabel')">
      <button
        type="button"
        role="tab"
        :aria-selected="tab === 'web'"
        :class="{ 'is-active': tab === 'web' }"
        @click="setTab('web')"
      >
        {{ t('product.tabWeb') }}
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="tab === 'mobile'"
        :class="{ 'is-active': tab === 'mobile' }"
        @click="setTab('mobile')"
      >
        {{ t('product.tabMobile') }}
      </button>
    </div>
    <template v-if="tab === 'web'">
      <div class="oh-stack" data-nav-theme="dark"><WebAppSection /></div>
      <div class="oh-stack" data-nav-theme="dark"><SmartHomeSection /></div>
    </template>
    <template v-else>
      <div class="oh-stack" data-nav-theme="dark"><MobileAppSection /></div>
    </template>
    <div class="oh-stack" data-nav-theme="dark"><FinalCta /></div>
  </main>
</template>

<script setup lang="ts">
const { t } = useLandingI18n()
const route = useRoute()
const router = useRouter()
const { siteUrl } = useRuntimeConfig().public

const tab = computed(() => (route.query.tab === 'mobile' ? 'mobile' : 'web'))

function setTab(v: 'web' | 'mobile') {
  router.replace({ query: { ...route.query, tab: v } })
}

useSeoMeta({
  title: t('seo.productTitle'),
  description: t('seo.productDescription'),
  ogTitle: t('seo.productTitle'),
  ogDescription: t('seo.productDescription'),
})
// Both tabs are the same document to a crawler; point them at one canonical URL
// so `?tab=mobile` is not treated as duplicate content.
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/product` }] })
</script>

<style scoped>
.oh-product-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 96px 24px 24px;
}

.oh-product-tabs button {
  min-height: 44px;
  padding: 10px 20px;
  border-radius: var(--oh-radius-lg);
  border: 1px solid var(--oh-card-3d-border);
  background: var(--oh-card-3d-bg);
  color: var(--oh-text-2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: color 150ms, background 150ms, border-color 150ms;
}

.oh-product-tabs button.is-active {
  color: var(--oh-brand-light);
  background: rgba(var(--oh-brand-rgb), 0.18);
  border-color: rgba(var(--oh-brand-rgb), 0.35);
}

.oh-product-tabs button:hover {
  color: var(--oh-text);
}
</style>
