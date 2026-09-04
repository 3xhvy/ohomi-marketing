<!-- web/src/pages/landing/sections/SocialProofSection.vue -->
<template>
  <section id="social-proof" class="oh-section oh-proof">
    <div class="oh-proof__header reveal-up">
      <h2 class="oh-h2 oh-h2--light" v-html="headingHtml" />
    </div>

    <div class="oh-proof__grid">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="oh-proof__card reveal-up"
      >
        <div class="oh-proof__stars">★★★★★</div>
        <blockquote class="oh-proof__quote">"{{ item.quote }}"</blockquote>
        <div class="oh-proof__author">
          <span class="oh-proof__avatar">{{ item.initials }}</span>
          <div>
            <div class="oh-proof__name">{{ item.name }}</div>
            <div class="oh-proof__role">{{ item.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, tList, dict } = useLandingI18n()

const items = computed(() => dict.value.socialProofSection.items)
const headingHtml = computed(() =>
  (t('socialProofSection.heading') as string).replace('\n', '<br />')
)

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('#social-proof .reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
})
</script>

<style scoped>
.oh-proof { padding-bottom: 80px; }
.oh-proof__header { margin-bottom: 48px; }

.oh-proof__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 960px;
  margin: 0 auto;
}

.oh-proof__card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 200ms, box-shadow 200ms;
}
.oh-proof__card:hover {
  border-color: rgba(20, 184, 166, 0.35);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.oh-proof__stars {
  font-size: 14px;
  color: #14b8a6;
  letter-spacing: 2px;
}

.oh-proof__quote {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(240, 244, 248, 0.85);
  flex: 1;
  margin: 0;
  font-style: italic;
}

.oh-proof__author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.oh-proof__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #0f766e);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.oh-proof__name {
  font-size: 13px;
  font-weight: 600;
  color: #f0f4f8;
}
.oh-proof__role {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
}

@media (max-width: 768px) {
  .oh-proof__grid { grid-template-columns: 1fr; }
}
</style>
