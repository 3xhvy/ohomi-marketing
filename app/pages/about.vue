<template>
  <main class="oh-main">
    <section id="about" class="oh-about-section">
      <div class="oh-about-section__inner">
        <p class="oh-eyebrow">{{ t('about.storyEyebrow') }}</p>
        <h1 class="oh-h2 oh-h2--light">{{ t('about.storyHeading') }}</h1>
        <p v-for="(p, i) in storyParagraphs" :key="i" class="oh-about-section__lead">{{ p }}</p>
        <div class="oh-about-contact">
          <h2 class="oh-about-contact__heading">{{ t('about.contactHeading') }}</h2>
          <ul>
            <li><a :href="`mailto:${t('about.contactEmail')}`">{{ t('about.contactEmail') }}</a></li>
            <li><a :href="`tel:${t('about.contactPhone').replace(/\s/g, '')}`">{{ t('about.contactPhone') }}</a></li>
            <li>{{ t('about.contactCity') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="team" class="oh-about-section">
      <div class="oh-about-section__inner">
        <p class="oh-eyebrow">{{ t('about.teamEyebrow') }}</p>
        <h2 class="oh-h2 oh-h2--light">{{ t('about.teamHeading') }}</h2>
        <div class="oh-team-grid">
          <article v-for="member in teamMembers" :key="member.name + member.photo" class="oh-team-card">
            <img :src="teamPhoto(member.photo)" :alt="member.name" class="oh-team-card__photo" loading="lazy" />
            <h3>{{ member.name }}</h3>
            <p>{{ member.role }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="voucher" class="oh-about-section">
      <div class="oh-about-section__inner">
        <p class="oh-eyebrow">{{ t('about.voucherEyebrow') }}</p>
        <h2 class="oh-h2 oh-h2--light">{{ t('about.voucherHeading') }}</h2>
        <p v-if="vouchers.length === 0" class="oh-about-section__lead">{{ t('about.vouchersEmpty') }}</p>
        <div v-else class="oh-voucher-grid">
          <article v-for="(v, i) in vouchers" :key="i" class="oh-voucher-card">
            <h3>{{ v.title }}</h3>
            <p>{{ v.description }}</p>
            <p class="oh-voucher-card__code">{{ v.code }}</p>
            <p class="oh-voucher-card__valid">{{ v.validUntil }}</p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t, dict, tList } = useLandingI18n()
const route = useRoute()
const { siteUrl } = useRuntimeConfig().public

const storyParagraphs = computed(() => tList<string>('about.storyParagraphs'))
const teamMembers = computed(() => dict.value.about.teamMembers)
const vouchers = computed(() => dict.value.about.vouchers)

useSeoMeta({
  title: t('seo.aboutTitle'),
  description: t('seo.aboutDescription'),
  ogTitle: t('seo.aboutTitle'),
  ogDescription: t('seo.aboutDescription'),
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/about` }] })

// Served from `public/` rather than resolved through `import.meta.url`: that
// pattern resolves against the server bundle's own location at runtime, which
// yields a broken path once Nitro has been built.
function teamPhoto(filename: string) {
  return `/team/${filename}`
}

async function scrollToHash() {
  const id = route.hash.replace(/^#/, '')
  if (!id) return
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Client-only: the source ran this with `immediate: true`, which reaches for
// `document` during server rendering.
onMounted(() => {
  watch(() => route.hash, scrollToHash, { immediate: true })
})
</script>

<style scoped>
.oh-about-section {
  padding: 96px 24px 80px;
  text-align: center;
  background: radial-gradient(
    ellipse 70% 50% at 50% 0%,
    rgba(var(--oh-brand-rgb), 0.1),
    transparent 65%
  );
}

.oh-about-section__inner {
  max-width: 960px;
  margin: 0 auto;
}

.oh-about-section__lead {
  max-width: 640px;
  margin: 16px auto 0;
  color: var(--oh-text-2);
  font-size: 16px;
  line-height: 1.65;
}

.oh-about-contact {
  margin-top: 40px;
  padding: 24px;
  border: 1px solid var(--oh-card-3d-border);
  border-radius: var(--oh-radius-lg);
  background: var(--oh-card-3d-bg);
}

.oh-about-contact__heading {
  margin: 0 0 12px;
  font-size: 16px;
  color: var(--oh-text);
}

.oh-about-contact ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--oh-text-2);
}

.oh-about-contact a {
  color: var(--oh-brand-light);
  text-decoration: none;
}

.oh-team-grid,
.oh-voucher-grid {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  text-align: left;
}

.oh-team-card,
.oh-voucher-card {
  border: 1px solid var(--oh-card-3d-border);
  border-radius: var(--oh-radius-lg);
  background: var(--oh-card-3d-bg);
  padding: 16px;
}

.oh-team-card__photo {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--oh-radius-md);
  margin-bottom: 12px;
}

.oh-team-card h3,
.oh-voucher-card h3 {
  margin: 0 0 6px;
  font-size: 16px;
  color: var(--oh-text);
}

.oh-team-card p,
.oh-voucher-card p {
  margin: 0;
  color: var(--oh-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.oh-voucher-card__code {
  margin-top: 12px !important;
  font-weight: 700;
  color: var(--oh-brand-light) !important;
  letter-spacing: 0.04em;
}

.oh-voucher-card__valid {
  margin-top: 6px !important;
  font-size: 12px !important;
  color: var(--oh-text-3) !important;
}
</style>
