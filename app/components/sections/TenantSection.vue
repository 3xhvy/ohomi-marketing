<!-- web/src/pages/landing/sections/TenantSection.vue -->
<template>
  <section id="tenants" class="oh-section oh-tenants">
    <div class="oh-tenants__header reveal-up">
      <h2 class="oh-h2" style="text-align:center">{{ t('tenants.heading') }}</h2>
      <p class="oh-lead" style="text-align:center;margin:0 auto 48px">{{ t('tenants.lead') }}</p>
    </div>

    <div class="oh-tenants__grid">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="oh-tenants__step reveal-up"
        :class="{ 'is-active': activeStep === i }"
        @mouseenter="activeStep = i"
      >
        <div class="oh-tenants__card card-3d">
          <div class="oh-tenants__icon" v-html="ICONS[i]" aria-hidden="true"></div>
          <h3 class="oh-tenants__step-title">{{ step.title }}</h3>
          <p class="oh-tenants__step-desc">{{ step.desc }}</p>
          <span class="oh-tenants__badge">{{ step.stat }}</span>
        </div>
      </div>
    </div>

    <div class="oh-tenants__history reveal-up">
      <div class="oh-tenants__history-head">
        <div class="oh-tenants__history-icon" v-html="HISTORY_ICON" aria-hidden="true"></div>
        <strong>{{ dict.tenants.history.title }}</strong>
        <span>{{ dict.tenants.history.meta }}</span>
      </div>
      <div class="oh-tenants__history-list">
        <div v-for="item in dict.tenants.history.items" :key="item.label" class="oh-tenants__history-row">
          <span class="oh-tenants__history-dot" aria-hidden="true"></span>
          <span>{{ item.label }}</span>
          <strong>{{ item.badge }}</strong>
        </div>
      </div>
    </div>

    <div class="oh-tenants__cta reveal-up">
      <a href="https://apps.apple.com" class="oh-tenants__store" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        {{ t('tenants.ctaIos') }}
      </a>
      <a href="https://play.google.com" class="oh-tenants__store" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.18 23.76c.3.17.64.24.99.19l12.2-7.06-2.71-2.71-10.48 9.58zM20.47 10.34l-2.89-1.67-3.05 3.05 3.05 3.05 2.91-1.69c.83-.48.83-1.26-.02-1.74zM2.01.27C1.69.49 1.5.88 1.5 1.41v21.18c0 .53.19.92.51 1.14l.11.07 11.87-11.87v-.14L2.12.2l-.11.07zM6.37 3.71l10.2 5.9-2.71 2.71L6.37 5.43V3.71z"/></svg>
        {{ t('tenants.ctaAndroid') }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, tList, dict } = useLandingI18n()
const activeStep = ref(0)
const steps = computed(() => tList<{ title: string; desc: string; stat: string }>('tenants.steps'))

let interval: ReturnType<typeof setInterval> | undefined

const ICONS = [
  '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l3 3v15H6V3Z" stroke="currentColor" stroke-width="1.7"/><path d="M14 3v4h4M9 11h6M9 15h4" stroke="currentColor" stroke-width="1.7"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="4" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="14" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.7"/><path d="M14 14h2v2h-2v-2Zm4 0h2v6h-6v-2h4v-4Z" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none"><path d="M15 6.5a4.5 4.5 0 0 0-5.7 5.7l-4 4a2 2 0 0 0 2.8 2.8l4-4A4.5 4.5 0 0 0 18 9.3l-3 3-2.3-2.3 3-3Z" stroke="currentColor" stroke-width="1.7"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none"><path d="M18 9a6 6 0 1 0-12 0c0 7-2 7-2 9h16c0-2-2-2-2-9Z" stroke="currentColor" stroke-width="1.7"/><path d="M10 21h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
]

const HISTORY_ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 0 2.34-5.66L4 8.68" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 4v4.68h4.68M12 8v4l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'

onMounted(() => {
  // Header fades up
  gsap.to('#tenants .oh-tenants__header', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#tenants', start: 'top 80%', once: true },
  })

  // Timeline steps: staggered cascade — each step comes up in sequence
  gsap.utils.toArray<HTMLElement>('#tenants .reveal-up').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 34, filter: 'blur(10px)' },
      {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.62,
      delay: 0.2 + i * 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#tenants', start: 'top 80%', once: true },
      },
    )
  })

  // Active step auto-cycles
  let tick = 0
  const totalSteps = steps.value.length
  interval = setInterval(() => {
    tick = (tick + 1) % totalSteps
    activeStep.value = tick
  }, 2200)

  // Pause auto-cycle on hover
  const timeline = document.querySelector('#tenants .oh-tenants__grid')
  if (timeline) {
    timeline.addEventListener('mouseenter', () => clearInterval(interval))
  }
})

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.oh-tenants { text-align: center; }

.oh-tenants__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  max-width: 860px;
  margin: 0 auto;
}

.oh-tenants__step {
  /* GSAP entrance initial state */
  opacity: 0;
  transform: translateY(28px);
}

.oh-tenants__num {
  display: inline-flex;
  margin-bottom: 12px;
  color: var(--oh-text-3);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: color 300ms;
}

.oh-tenants__step.is-active .oh-tenants__num {
  color: var(--oh-brand);
}

.oh-tenants__card {
  background: var(--oh-surface);
  border: 1px solid var(--oh-border);
  border-radius: var(--oh-radius-lg);
  padding: 24px;
  z-index: 1;
  transition: border-color 300ms, box-shadow 300ms, transform 120ms ease-out;
  width: 100%;
  min-height: 220px;
  text-align: left;
}

.oh-tenants__step.is-active .oh-tenants__card {
  border-color: var(--oh-brand);
  box-shadow: 0 0 0 1px var(--oh-brand), 0 8px 24px var(--oh-3d-glow-teal);
  transform: translateY(-2px);
}

.oh-tenants__icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  margin-bottom: 16px;
  border-radius: 13px;
  color: var(--oh-brand);
  background: rgba(var(--oh-brand-rgb), 0.08);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.2);
}

.oh-tenants__icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.oh-tenants__step-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--oh-text);
  margin: 0 0 8px;
}

.oh-tenants__step-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--oh-text-2);
  margin: 0 0 14px;
}

.oh-tenants__badge {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  color: var(--oh-brand);
  background: rgba(var(--oh-brand-rgb), 0.08);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.18);
  font-size: 12px;
  font-weight: 700;
}

.oh-tenants__history,
.oh-tenants__cta {
  opacity: 0;
  transform: translateY(28px);
}

.oh-tenants__history {
  max-width: 860px;
  margin: 18px auto 0;
  padding: 26px;
  border-radius: var(--oh-radius-lg);
  background:
    linear-gradient(135deg, rgba(255,255,255,0.98), rgba(244, 253, 250, 0.96)),
    #ffffff;
  border: 1px solid rgba(var(--oh-brand-rgb), 0.24);
  box-shadow: 0 18px 54px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255,255,255,0.88);
  text-align: left;
}

.oh-tenants__history-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.oh-tenants__history-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: var(--oh-brand);
  background: rgba(var(--oh-brand-rgb), 0.12);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.18);
}

.oh-tenants__history-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.oh-tenants__history-head strong {
  color: #0f172a;
  font-size: 15px;
  font-weight: 800;
}

.oh-tenants__history-head span {
  margin-left: auto;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
}

.oh-tenants__history-list {
  border-top: 1px solid rgba(var(--oh-brand-rgb), 0.16);
}

.oh-tenants__history-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(var(--oh-brand-rgb), 0.14);
  color: #334155;
  font-size: 14px;
  font-weight: 600;
}

.oh-tenants__history-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--oh-brand);
  box-shadow: 0 0 0 5px rgba(var(--oh-brand-rgb), 0.1);
}

.oh-tenants__history-row strong {
  padding: 5px 10px;
  border-radius: 999px;
  color: #0f766e;
  background: rgba(var(--oh-brand-rgb), 0.12);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.16);
  font-size: 12px;
  font-weight: 800;
}

.oh-tenants__cta {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 34px;
}

.oh-tenants__store {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 50px;
  padding: 0 24px;
  border-radius: 12px;
  color: #fff;
  background: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.18);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.18);
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 140ms ease, opacity 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.oh-tenants__store:hover {
  opacity: 1;
  background: #111827;
  box-shadow: 0 22px 52px rgba(15, 23, 42, 0.24);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .oh-tenants__grid {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 400px;
  }
  .oh-tenants__history-head,
  .oh-tenants__history-row {
    align-items: flex-start;
  }
  .oh-tenants__history-head {
    flex-direction: column;
  }
  .oh-tenants__history-head span {
    margin-left: 0;
  }
  .oh-tenants__history-row {
    grid-template-columns: auto minmax(0, 1fr);
  }
  .oh-tenants__history-row strong {
    grid-column: 2;
    width: fit-content;
  }
  .oh-tenants__cta {
    flex-direction: column;
    align-items: stretch;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }
  .oh-tenants__store {
    justify-content: center;
  }
}
</style>
