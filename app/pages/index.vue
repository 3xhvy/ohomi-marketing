<template>
  <main class="oh-main">
    <div class="oh-main__hero" data-nav-theme="dark" data-transition-theme="dark">
      <HeroSection />
    </div>

    <div class="oh-stack" data-stack-idx="0" data-nav-theme="dark">
      <SocialProofSection />
    </div>
    <div class="oh-stack" data-stack-idx="1" data-nav-theme="dark">
      <LandlordSection />
    </div>
    <div class="oh-stack" data-stack-idx="2" data-nav-theme="dark">
      <TenantSection />
    </div>
    <div class="oh-stack" data-stack-idx="3" data-nav-theme="dark">
      <PricingSection />
    </div>
    <div class="oh-stack" data-stack-idx="4" data-nav-theme="dark">
      <FaqSection />
    </div>
    <div class="oh-stack" data-stack-idx="5" data-nav-theme="dark">
      <FinalCta />
    </div>
  </main>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const { t } = useLandingI18n()
const { siteUrl } = useRuntimeConfig().public

useSeoMeta({
  title: t('seo.homeTitle'),
  description: t('seo.homeDescription'),
  ogTitle: t('seo.homeTitle'),
  ogDescription: t('seo.homeDescription'),
  ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/` }] })

let ctx: gsap.Context | null = null

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => runScrollEffects())
  })
})

function runScrollEffects() {
  gsap.utils.toArray<HTMLElement>('.oh-stack').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 52, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 35%', scrub: 0.75 },
      },
    )
  })

  gsap.to('.oh-main__hero', {
    scale: 0.985,
    opacity: 0.92,
    ease: 'none',
    scrollTrigger: {
      trigger: '.oh-stack[data-stack-idx="0"]',
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
  })

  const stacks = document.querySelectorAll<HTMLElement>('.oh-stack')

  // idx 0 — SocialProof: subtle x drift from right
  if (stacks[0]) {
    gsap.fromTo(
      stacks[0],
      { x: 10 },
      { x: 0, ease: 'power2.out', scrollTrigger: { trigger: stacks[0], start: 'top 96%', end: 'top 50%', scrub: 0.75 } },
    )
  }

  // idx 2 — Tenant: subtle x drift
  if (stacks[2]) {
    gsap.fromTo(
      stacks[2],
      { x: -10 },
      { x: 0, ease: 'power2.out', scrollTrigger: { trigger: stacks[2], start: 'top 96%', end: 'top 36%', scrub: 0.75 } },
    )
  }

  // last — FinalCta: opacity punch
  const last = stacks[stacks.length - 1]
  if (last) {
    gsap.fromTo(
      last,
      { opacity: 0.86 },
      { opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: last, start: 'top 96%', end: 'top 50%', scrub: 0.75 } },
    )
  }

  gsap.utils.toArray<HTMLElement>('.oh-stack').forEach((el) => {
    gsap.fromTo(
      el,
      { '--section-parallax-y': '-18px' },
      { '--section-parallax-y': '18px', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    )
  })
}

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.oh-main {
  position: relative;
}

.oh-main__hero {
  position: relative;
  z-index: 0;
  transform-origin: center top;
}
</style>
