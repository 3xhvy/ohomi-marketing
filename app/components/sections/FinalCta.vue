<!-- web/src/pages/landing/sections/FinalCta.vue -->
<template>
  <section id="final-cta" class="oh-cta">
    <div class="oh-cta__inner">
      <div class="oh-cta__header reveal-up">
        <h2 class="oh-h2 oh-h2--light" v-html="headingHtml" />
        <p class="oh-cta__lead">{{ t('finalCta.lead') }}</p>
      </div>
      <div class="oh-cta__form-wrap">
        <DemoForm />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t } = useLandingI18n()

const headingHtml = computed(() => (t('finalCta.heading') as string).replace('\n', '<br />'))

onMounted(() => {
  gsap.to('.oh-cta .reveal-up', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#final-cta', start: 'top 80%', once: true },
  })

  gsap.from('.oh-cta__form-wrap', {
    y: 72, opacity: 0, scale: 0.96,
    duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#final-cta', start: 'top 72%', once: true },
  })
})
</script>

<style scoped>
.oh-cta {
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20, 184, 166, 0.14), transparent 68%);
  padding: 96px 24px 112px;
  text-align: center;
}

.oh-cta__inner {
  max-width: 580px;
  margin: 0 auto;
}

.oh-cta__header { margin-bottom: 40px; }

.oh-cta__lead {
  font-size: 17px;
  color: rgba(255,255,255,0.78);
  margin: 0;
  line-height: 1.6;
}

.oh-cta__form-wrap {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 24px;
  padding: 36px 32px;
  text-align: left;
  backdrop-filter: blur(28px) saturate(1.1);
  -webkit-backdrop-filter: blur(28px) saturate(1.1);
  box-shadow:
    0 32px 72px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(20, 184, 166, 0.07) inset,
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
}
</style>
