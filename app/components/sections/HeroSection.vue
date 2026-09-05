<template>
  <section id="home" class="oh-hero3d">
    <div class="oh-hero3d__inner">
      <div ref="copyRef" class="oh-hero3d__copy">
        <span class="oh-hero3d__badge">{{ t('hero3d.badge') }}</span>

        <h1 class="oh-hero3d__title">
          <span class="oh-hero3d__title-l1">{{ t('hero3d.titleLine1') }}</span>
          <span class="oh-hero3d__title-bar" aria-hidden="true"></span>
          <span class="oh-hero3d__title-l2">{{ t('hero3d.titleLine2') }}</span>
        </h1>

        <p class="oh-hero3d__sub">
          {{ t('hero3d.subStart') }}
          <span>{{ t('hero3d.subMetric') }}</span>
          {{ t('hero3d.subEnd') }}
        </p>

        <div class="oh-hero3d__ctas">
          <a href="#final-cta" class="oh-btn oh-btn--primary" @click.prevent="scrollToDemo">
            {{ t('hero3d.ctaDemo') }}
          </a>
          <a href="#pricing" class="oh-btn oh-btn--ghost" @click.prevent="scrollToPricing">
            {{ t('hero3d.ctaPricing') }}
          </a>
        </div>
      </div>

      <div ref="sceneRef" class="oh-hero3d__scene">
        <div class="oh-phone">
          <div class="oh-phone__frame">
            <div class="oh-phone__speaker"></div>
            <div class="oh-phone__screen">
              <img
                class="oh-phone__screenshot"
                :src="hostHomeDashboard"
                :alt="t('hero3d.dashboard.screenshotAlt')"
              />
            </div>
          </div>
        </div>

        <div class="oh-mobile-card oh-mobile-card--property">
          <strong>{{ t('hero3d.dashboard.propertyCardTitle') }}</strong>
          <span>{{ t('hero3d.dashboard.propertyCardMeta') }}</span>
        </div>

        <div class="oh-mobile-card oh-mobile-card--alert">
          <strong>{{ t('hero3d.dashboard.alertTitle') }}</strong>
          <span>{{ t('hero3d.dashboard.alertMeta') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import hostHomeDashboard from '~/assets/img/host-home-dashboard.png'

const { t } = useLandingI18n()

const copyRef = ref<HTMLElement | null>(null)
const sceneRef = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()

function scrollToDemo() {
  document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToPricing() {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (!reducedMotion.value && copyRef.value) {
    gsap.from(copyRef.value.children, {
      opacity: 0, y: 20, duration: 0.45, stagger: 0.1, ease: 'power2.out',
    })
  }

  if (!reducedMotion.value && sceneRef.value) {
    gsap.from(sceneRef.value, {
      opacity: 0,
      y: 24,
      scale: 0.98,
      duration: 0.7,
      delay: 0.25,
      ease: 'power2.out',
    })
  }
})
</script>

<style scoped>
.oh-hero3d {
  position: relative;
  min-height: calc(100vh + 64px);
  margin-top: -64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: clip;
  overflow-y: visible;
  background-color: transparent;
}

.oh-hero3d::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 65% 75% at 72% 55%, rgba(var(--oh-brand-rgb), 0.22) 0%, transparent 60%),
    radial-gradient(ellipse 50% 55% at 12% 35%, rgba(var(--oh-brand-rgb), 0.14) 0%, transparent 65%);
}

.oh-hero3d::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent 0%, rgba(8, 15, 26, 0.18) 100%);
  pointer-events: none;
  z-index: 2;
}

.oh-hero3d__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1360px;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: center;
  gap: 64px;
  padding: 150px 48px 80px;
}

@media (min-width: 1200px) {
  .oh-hero3d__inner {
    grid-template-columns: minmax(520px, 0.95fr) minmax(440px, 1.05fr);
    padding: 150px 88px 80px;
  }
}

.oh-hero3d__copy {
  max-width: 620px;
}

.oh-hero3d__badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  background: rgba(var(--oh-brand-rgb), 0.1);
  color: var(--oh-brand-light);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.4);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 24px;
}

.oh-hero3d__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: 620px;
  font-size: clamp(2.15rem, 3.25vw, 3.05rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0;
  margin: 0 0 20px;
}

.oh-hero3d__title-l1 {
  max-width: 560px;
  color: rgba(240, 240, 245, 0.72);
  font-size: 0.76em;
  font-weight: 700;
  white-space: pre-line;
}

.oh-hero3d__title-l2 {
  max-width: 620px;
  font-size: 1em;
  font-weight: 900;
  white-space: pre-line;
  color: var(--oh-brand-light);
}

.oh-hero3d__title-bar {
  width: 64px;
  height: 2px;
  background: var(--oh-brand-light);
  margin: 2px 0;
}

.oh-hero3d__sub {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(240, 240, 245, 0.78);
  margin: 0 0 28px;
  max-width: 540px;
}

.oh-hero3d__sub span {
  color: var(--oh-brand-light);
  font-weight: 700;
}

.oh-hero3d__ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.oh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 12px 24px;
  border-radius: var(--oh-radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
  border: none;
  text-decoration: none;
}

.oh-btn--primary {
  background: var(--oh-brand);
  color: #fff;
}

.oh-btn--primary:hover {
  background: var(--oh-brand-hover);
}

.oh-btn--ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.88);
  border: 1.5px solid rgba(255, 255, 255, 0.28);
}

.oh-btn--ghost:hover {
  border-color: var(--oh-brand-light);
  color: var(--oh-brand-light);
}

.oh-hero3d__scene {
  position: relative;
  min-height: 560px;
}

.oh-phone {
  position: absolute;
  left: 54%;
  top: 24px;
  width: 318px;
  transform: translateX(-50%) rotate(-3deg);
  filter: drop-shadow(0 34px 70px rgba(0, 0, 0, 0.34));
}

.oh-phone__frame {
  position: relative;
  height: 690px;
  padding: 10px;
  border-radius: 42px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04)),
    #07131c;
  border: 1px solid rgba(255,255,255,0.22);
}

.oh-phone__speaker {
  position: absolute;
  z-index: 3;
  top: 16px;
  left: 50%;
  width: 62px;
  height: 18px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #02080d;
  border: 1px solid rgba(255,255,255,0.08);
}

.oh-phone__screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 33px;
  background: #f8fffd;
}

.oh-phone__screenshot {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.oh-mobile-card {
  position: absolute;
  z-index: 4;
  min-width: 190px;
  padding: 13px 15px;
  border-radius: 16px;
  color: #f8fafc;
  background: rgba(8, 15, 26, 0.88);
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 18px 54px rgba(0,0,0,0.28);
  animation: oh-float 4.2s ease-in-out infinite;
}

.oh-mobile-card strong,
.oh-mobile-card span {
  display: block;
}

.oh-mobile-card strong {
  margin-bottom: 5px;
  color: #fff;
  font-size: 13px;
}

.oh-mobile-card span {
  color: rgba(226, 232, 240, 0.78);
  font-size: 11px;
}

.oh-mobile-card--property { left: 78px; top: 118px; }
.oh-mobile-card--alert { right: 8px; bottom: 54px; animation-delay: -1.5s; }

@keyframes oh-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

@media (prefers-reduced-motion: reduce) {
  .oh-mobile-card {
    animation: none;
  }
}

@media (max-width: 900px) {
  .oh-hero3d__inner {
    grid-template-columns: 1fr;
    padding: 100px 20px 40px;
    text-align: center;
    gap: 28px;
  }
  .oh-hero3d__scene {
    min-height: 420px;
  }
  .oh-phone {
    left: 50%;
    top: 0;
    width: min(260px, calc(100vw - 96px));
    transform: translateX(-50%) rotate(-1deg);
  }
  .oh-phone__frame {
    height: 520px;
  }
  .oh-hero3d__sub,
  .oh-hero3d__copy,
  .oh-hero3d__title {
    max-width: 100%;
    width: 100%;
  }
  .oh-hero3d__title {
    font-size: clamp(1.55rem, 7vw, 2.35rem);
  }
  .oh-hero3d__title-l1,
  .oh-hero3d__title-l2 {
    white-space: normal;
    max-width: 100%;
  }
  .oh-hero3d__copy { align-items: center; display: flex; flex-direction: column; }
  .oh-hero3d__title { align-items: center; }
  .oh-hero3d__ctas {
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
  }
  .oh-btn { width: 100%; }
}

@media (max-width: 480px) {
  .oh-hero3d {
    min-height: auto;
  }
  .oh-hero3d__ctas { width: 100%; flex-direction: column; }
  .oh-btn { width: 100%; }
  .oh-hero3d__scene {
    min-height: 360px;
  }
  .oh-phone {
    width: min(230px, calc(100vw - 42px));
  }
  .oh-phone__frame { height: 460px; }
  .oh-mobile-card { display: none; }
}
</style>
