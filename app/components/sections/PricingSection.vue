<!-- web/src/pages/landing/sections/PricingSection.vue -->
<template>
  <section id="pricing" class="oh-section oh-pricing">
    <div class="oh-pricing__inner">
      <div class="oh-pricing__header reveal-up">
        <h2 class="oh-h2 oh-h2--light" v-html="headingHtml" />
        <p class="oh-pricing__lead">{{ t('pricingSection.lead') }}</p>
      </div>

      <div class="oh-pricing__grid">
        <div
          v-for="(plan, i) in plans"
          :key="i"
          class="oh-plan reveal-up"
          :class="{ 'oh-plan--highlight': plan.highlight }"
        >
          <div v-if="plan.highlight" class="oh-plan__badge">
            <span class="oh-plan__badge-star">★</span>
            {{ dict.pricingSection.bestValue }}
          </div>

          <p class="oh-plan__tier">{{ plan.tier }}</p>
          <p class="oh-plan__range">{{ plan.range }}</p>

          <div class="oh-plan__price-row">
            <span class="oh-plan__price">{{ plan.price }}</span>
            <span class="oh-plan__unit">{{ plan.unit }}</span>
          </div>
          <p class="oh-plan__period">{{ plan.period }}</p>

          <ul class="oh-plan__features">
            <li v-for="(feat, j) in plan.features" :key="j" class="oh-plan__feat">
              <span class="oh-plan__check">✓</span>
              {{ feat }}
            </li>
          </ul>

          <button
            type="button"
            class="oh-plan__cta"
            :class="{ 'oh-plan__cta--primary': plan.highlight }"
            @click="selectPlan(i)"
          >
            {{ plan.cta }}
          </button>
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
const { goToDemo } = useDemoIntent()

function selectPlan(index: number) {
  const rooms = tList<string>('finalCta.roomsOptions')[index] ?? ''
  goToDemo(rooms)
}

const plans = computed(() => dict.value.pricingSection.plans)
const headingHtml = computed(() =>
  (t('pricingSection.heading') as string).replace('\n', '<br />')
)

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('#pricing .reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })
})
</script>

<style scoped>
.oh-pricing {
  padding: 96px 24px 80px;
  text-align: center;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(20, 184, 166, 0.1), transparent 65%);
}

.oh-pricing__inner {
  max-width: 1120px;
  margin: 0 auto;
}

.oh-pricing__header {
  margin-bottom: 56px;
}

.oh-pricing__lead {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.65;
  max-width: 480px;
  margin: 12px auto 0;
}

/* Grid */
.oh-pricing__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: stretch;
}

/* Plan card */
.oh-plan {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  padding: 28px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  transition: border-color 220ms, box-shadow 220ms;
}

.oh-plan:hover {
  border-color: rgba(20, 184, 166, 0.28);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.22);
}

.oh-plan--highlight {
  background: rgba(13, 95, 89, 0.28);
  border-color: rgba(20, 184, 166, 0.4);
  box-shadow:
    0 0 0 1px rgba(20, 184, 166, 0.18) inset,
    0 16px 56px rgba(0, 0, 0, 0.3);
}

/* Best value badge */
.oh-plan__badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #14b8a6;
  color: #072b27;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 14px;
  border-radius: 999px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
}

.oh-plan__badge-star {
  font-size: 10px;
  color: #f59e0b;
}

.oh-plan__tier {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
  margin-bottom: 4px;
}

.oh-plan__range {
  font-size: 20px;
  font-weight: 700;
  color: #f0f4f8;
  margin: 0 0 16px;
  line-height: 1.2;
}

.oh-plan__price-row {
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 2px;
}

.oh-plan__price {
  font-size: 32px;
  font-weight: 800;
  color: #14b8a6;
  line-height: 1;
}

.oh-plan__unit {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.72);
  margin-left: 2px;
}

.oh-plan__period {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.68);
  margin: 0 0 20px;
}

/* Divider before features */
.oh-plan__features {
  list-style: none;
  margin: 0 0 24px;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.oh-plan__feat {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13.5px;
  color: rgba(240, 244, 248, 0.8);
  line-height: 1.4;
}

.oh-plan__check {
  color: #14b8a6;
  font-size: 12px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* CTA button */
.oh-plan__cta {
  width: 100%;
  min-height: 44px;
  padding: 12px 0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 180ms, box-shadow 180ms;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #f0f4f8;
  margin-top: auto;
}

.oh-plan__cta:hover {
  opacity: 0.82;
}

.oh-plan__cta--primary {
  background: #14b8a6;
  border-color: #14b8a6;
  color: #072b27;
  font-weight: 700;
  box-shadow: 0 4px 18px rgba(20, 184, 166, 0.35);
}

.oh-plan__cta--primary:hover {
  opacity: 1;
  box-shadow: 0 6px 24px rgba(20, 184, 166, 0.5);
}

@media (max-width: 1024px) {
  .oh-pricing__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .oh-pricing {
    padding: 72px 16px 64px;
  }
  .oh-pricing__grid {
    grid-template-columns: 1fr;
  }
}
</style>
