<template>
  <main class="oh-main">
    <section class="oh-demo-section">
      <div class="oh-demo-section__inner">
        <h1 class="oh-h2 oh-h2--light">{{ t('demoPage.title') }}</h1>
        <p class="oh-demo-section__lead">{{ t('demoPage.subtitle') }}</p>
        <ul class="oh-demo-section__bullets">
          <li v-for="item in bullets" :key="item">{{ item }}</li>
        </ul>
        <div class="oh-demo-section__form">
          <DemoForm source="demo-page" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t, tList } = useLandingI18n()
const { siteUrl } = useRuntimeConfig().public
const bullets = computed(() => tList<string>('demoPage.bullets'))

useSeoMeta({
  title: t('seo.demoTitle'),
  description: t('demoPage.subtitle'),
  ogTitle: t('seo.demoTitle'),
  ogDescription: t('demoPage.subtitle'),
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/demo` }] })
</script>

<style scoped>
.oh-demo-section {
  padding: 96px 24px 112px;
  text-align: center;
  background: radial-gradient(
    ellipse 80% 60% at 50% 0%,
    rgba(var(--oh-brand-rgb), 0.14),
    transparent 68%
  );
}

.oh-demo-section__inner {
  max-width: 580px;
  margin: 0 auto;
}

.oh-demo-section__lead {
  margin: 16px 0 0;
  color: var(--oh-text-2);
  font-size: 17px;
  line-height: 1.5;
}

.oh-demo-section__bullets {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  justify-content: center;
  color: var(--oh-brand-light);
  font-size: 13px;
}

.oh-demo-section__form {
  margin-top: 40px;
  text-align: left;
}
</style>
