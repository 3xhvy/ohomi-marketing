<!-- web/src/pages/landing/sections/LandlordSection.vue -->
<template>
  <section id="landlord" class="oh-section">
    <!-- Centered header -->
    <div class="oh-ll__header reveal-up">
      <h2 class="oh-h2">{{ t('landlord.heading') }}</h2>
      <p class="oh-lead">{{ t('landlord.lead') }}</p>
    </div>

    <div class="oh-ll__proof reveal-up">
      <div v-for="pair in dict.landlord.proofPairs" :key="pair.before" class="oh-ll__proof-item">
        <span class="oh-ll__before">✕ {{ pair.before }}</span>
        <span class="oh-ll__after">✓ {{ pair.after }}</span>
      </div>
    </div>

    <!-- Feature cards: hero first, rest in 2-col grid -->
    <div class="oh-ll__grid">
      <!-- Hero card: autoInvoice — full width, has mockup -->
      <FeatureCard3D
        :icon="ICONS.autoInvoice"
        :title="dict.landlord.features.autoInvoice.title"
        :desc="dict.landlord.features.autoInvoice.desc"
        :stat="dict.landlord.features.autoInvoice.stat"
        :pain="dict.landlord.features.autoInvoice.pain"
        :hero="true"
        class="oh-ll__hero-card reveal-up"
      />

      <!-- Secondary cards -->
      <FeatureCard3D
        v-for="(key, idx) in secondaryKeys"
        :key="key"
        :icon="ICONS[key]"
        :title="dict.landlord.features[key].title"
        :desc="dict.landlord.features[key].desc"
        :stat="dict.landlord.features[key].stat"
        :pain="dict.landlord.features[key].pain"
        class="reveal-up"
        :class="{ 'oh-ll__card--extra': idx > 1 }"
        :data-idx="idx"
      />
    </div>

    <!-- Contextual CTA -->
    <div class="oh-ll__cta reveal-up">
      <div class="oh-ll__cta-actions">
        <a href="#final-cta" class="oh-ll__cta-btn" @click.prevent="goToDemo()">{{ t('landlord.ctaPrimary') }}</a>
        <a href="#pricing" class="oh-ll__cta-btn oh-ll__cta-btn--secondary" @click.prevent="goToPricing()">{{ t('landlord.ctaSecondary') }}</a>
      </div>
      <span class="oh-ll__cta-note">{{ t('landlord.ctaNote') }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, dict } = useLandingI18n()
const { goToDemo, goToPricing } = useDemoIntent()

const secondaryKeys = ['contractAlert', 'revenueDash', 'maintenance', 'occupancy', 'multiProperty'] as const

const ICONS: Record<string, string> = {
  autoInvoice: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="2" width="12" height="18" rx="1.5" stroke="currentColor"/>
    <path d="M8 6h4M8 10h4M8 14h2" stroke="currentColor"/>
    <circle cx="17" cy="17" r="4" fill="#0d2030" stroke="#14b8a6" stroke-width="1.5"/>
    <path d="M15.5 17l1 1 2-2" stroke="#14b8a6" stroke-width="1.5"/>
  </svg>`,

  contractAlert: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="2" width="13" height="16" rx="1.5" stroke="currentColor"/>
    <path d="M8 6h5M8 9.5h5M8 13h3" stroke="currentColor"/>
    <circle cx="17.5" cy="16.5" r="4" fill="#0d2030" stroke="#14b8a6" stroke-width="1.5"/>
    <path d="M17.5 14.5v2.2l1.3 1.3" stroke="#14b8a6" stroke-width="1.5"/>
  </svg>`,

  revenueDash: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 20h18M6 20v-5M10 20v-9M14 20v-6" stroke="currentColor"/>
    <rect x="12.5" y="8" width="3" height="12" rx="0.5" fill="#14b8a6" fill-opacity="0.25" stroke="#14b8a6"/>
    <path d="M5 10l4-4 4 3 4-5" stroke="#14b8a6" stroke-width="1.5"/>
    <circle cx="17" cy="4" r="1.5" fill="#14b8a6" stroke="none"/>
  </svg>`,

  maintenance: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a6 6 0 0 1-7.5 7.5l-4.8 4.8a2.1 2.1 0 0 1-3-3l4.8-4.8a6 6 0 0 1 4.5-4.5z" stroke="currentColor"/>
    <circle cx="19" cy="5" r="2" fill="#14b8a6" fill-opacity="0.3" stroke="#14b8a6" stroke-width="1.2"/>
  </svg>`,

  occupancy: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="5" height="5" rx="1" fill="#14b8a6" fill-opacity="0.25" stroke="#14b8a6"/>
    <rect x="10" y="3" width="5" height="5" rx="1" fill="#14b8a6" fill-opacity="0.25" stroke="#14b8a6"/>
    <rect x="17" y="3" width="4" height="5" rx="1" stroke="currentColor" stroke-opacity="0.45"/>
    <rect x="3" y="10" width="5" height="5" rx="1" fill="#14b8a6" fill-opacity="0.25" stroke="#14b8a6"/>
    <rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" stroke-opacity="0.45"/>
    <rect x="17" y="10" width="4" height="5" rx="1" stroke="currentColor" stroke-opacity="0.45"/>
    <rect x="3" y="17" width="5" height="4" rx="1" fill="#14b8a6" fill-opacity="0.25" stroke="#14b8a6"/>
    <rect x="10" y="17" width="5" height="4" rx="1" stroke="currentColor" stroke-opacity="0.45"/>
    <rect x="17" y="17" width="4" height="4" rx="1" stroke="currentColor" stroke-opacity="0.45"/>
  </svg>`,

  multiProperty: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="9" width="6" height="12" rx="1" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="17" rx="1" fill="#14b8a6" fill-opacity="0.12" stroke="#14b8a6"/>
    <rect x="16" y="7" width="6" height="14" rx="1" stroke="currentColor" stroke-opacity="0.5"/>
    <path d="M10.5 8h3M10.5 11.5h3M10.5 15h3" stroke="#14b8a6" stroke-width="1.2"/>
    <path d="M3.5 13h3M3.5 16.5h3" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.2"/>
    <path d="M17 11h3M17 14.5h3" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.2"/>
  </svg>`,
}

onMounted(() => {
  const trigger = { trigger: '#landlord', start: 'top 76%', once: true }

  // Header
  gsap.to('#landlord .oh-ll__header', {
    opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
    scrollTrigger: trigger,
  })

  gsap.to('#landlord .oh-ll__proof', {
    opacity: 1, y: 0, duration: 0.58, delay: 0.08, ease: 'power3.out',
    scrollTrigger: trigger,
  })

  // Hero card
  gsap.to('#landlord .oh-ll__hero-card', {
    opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out',
    scrollTrigger: trigger,
  })

  // Secondary cards: cascade
  gsap.utils.toArray<HTMLElement>('#landlord .oh-ll__grid .reveal-up:not(.oh-ll__hero-card)').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.5,
      delay: 0.2 + i * 0.07,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#landlord .oh-ll__grid', start: 'top 82%', once: true },
    })
  })

  // CTA
  gsap.to('#landlord .oh-ll__cta', {
    opacity: 1, y: 0, duration: 0.55, delay: 0.35, ease: 'power2.out',
    scrollTrigger: { trigger: '#landlord .oh-ll__cta', start: 'top 90%', once: true },
  })
})
</script>

<style scoped>
/* ─── Header ─── */
.oh-ll__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}

.oh-ll__header .oh-h2 {
  white-space: pre-line;
}

/* ─── Grid ─── */
.oh-ll__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Hero card: span both columns */
.oh-ll__hero-card {
  grid-column: 1 / -1;
}

/* Cards start hidden for GSAP */
.oh-ll__grid .reveal-up {
  opacity: 0;
  transform: perspective(600px) rotateX(8deg) translateY(20px);
  transform-origin: top center;
}

.oh-ll__header.reveal-up {
  opacity: 0;
  transform: translateY(20px);
}

.oh-ll__proof {
  max-width: 940px;
  margin: 0 auto 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  opacity: 0;
  transform: translateY(20px);
}

.oh-ll__proof-item {
  min-height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 9px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.16);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.oh-ll__before,
.oh-ll__after {
  display: block;
  font-size: 12px;
  line-height: 1.35;
}

.oh-ll__before {
  color: var(--oh-text-3);
  text-decoration: line-through;
  text-decoration-color: rgba(100, 116, 139, 0.5);
}

.oh-ll__after {
  color: var(--oh-brand);
  font-weight: 700;
}

/* ─── CTA ─── */
.oh-ll__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 48px;
  opacity: 0;
  transform: translateY(16px);
}

.oh-ll__cta-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.oh-ll__cta-btn {
  display: inline-flex;
  align-items: center;
  height: 46px;
  padding: 0 28px;
  background: var(--oh-brand);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: background 180ms ease, transform 120ms ease, box-shadow 180ms ease;
  box-shadow: 0 0 0 0 rgba(var(--oh-brand-rgb), 0);
}

.oh-ll__cta-btn--secondary {
  background: transparent;
  color: var(--oh-brand);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.35);
}

.oh-ll__cta-btn--secondary:hover {
  background: rgba(var(--oh-brand-rgb), 0.08);
  color: var(--oh-brand-hover);
  border-color: rgba(var(--oh-brand-rgb), 0.55);
}

.oh-ll__cta-btn:hover {
  background: color-mix(in srgb, var(--oh-brand) 88%, #fff);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(var(--oh-brand-rgb), 0.3);
}

.oh-ll__cta-note {
  font-size: 12px;
  color: var(--oh-text-3);
}

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .oh-ll__proof {
    grid-template-columns: 1fr;
  }
  .oh-ll__grid {
    grid-template-columns: 1fr;
  }
  .oh-ll__hero-card {
    grid-column: 1;
  }
  .oh-ll__card--extra {
    display: none;
  }
}
</style>
