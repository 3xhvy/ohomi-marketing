<!-- web/src/pages/landing/sections/HeroSection.vue -->
<template>
  <section id="home" class="oh-hero3d">
    <div class="oh-hero3d__inner">

      <!-- ── Left: copy ─────────────────────────────────── -->
      <div ref="copyRef" class="oh-hero3d__copy">
        <span class="oh-hero3d__badge">
          <span class="oh-hero3d__badge-icon">◆</span>{{ t('hero3d.badge') }}
        </span>

        <!-- Title: L1 = category label (smaller/dimmer), L2 = hook (dominant) -->
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
          <a href="#mobile-app" class="oh-btn oh-btn--ghost" @click.prevent="scrollToMobile">
            {{ t('hero3d.ctaApp') }}
          </a>
        </div>
      </div>

      <!-- ── Right: Mobile app hero ────────────────────── -->
      <div
        ref="sceneRef"
        class="oh-hero3d__scene oh-hero3d__scene--mobile"
      >
        <div class="oh-mobile-hero" aria-hidden="true">
          <div class="oh-mobile-hero__map">
            <span class="oh-map-pin oh-map-pin--a"></span>
            <span class="oh-map-pin oh-map-pin--b"></span>
            <span class="oh-map-pin oh-map-pin--c"></span>
            <span class="oh-map-block oh-map-block--a"></span>
            <span class="oh-map-block oh-map-block--b"></span>
            <span class="oh-map-block oh-map-block--c"></span>
          </div>

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

    </div>

    <!-- Press bar: third-party credibility below the fold -->
    <div class="oh-hero3d__press">
      <span class="oh-hero3d__press-label">{{ t('hero3d.pressLabel') }}</span>
      <span class="oh-hero3d__press-name">CafeF</span>
      <span class="oh-hero3d__press-sep" aria-hidden="true">·</span>
      <span class="oh-hero3d__press-name">VnExpress</span>
      <span class="oh-hero3d__press-sep" aria-hidden="true">·</span>
      <span class="oh-hero3d__press-name">Nhịp Cầu Đầu Tư</span>
      <span class="oh-hero3d__press-sep" aria-hidden="true">·</span>
      <span class="oh-hero3d__press-name">Doanh Nhân Sài Gòn</span>
    </div>

  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import hostHomeDashboard from '~/assets/img/host-home-dashboard.png'

const { t, lang } = useLandingI18n()

const copyRef       = ref<HTMLElement | null>(null)
const sceneRef      = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
const scrollY       = useScrollY()

let countTimerId: ReturnType<typeof setTimeout> | undefined

// ── Dashboard widget: live counter refs ─────────────────────────────
const occupancyNum   = ref(0)
const contractsNum   = ref(0)
const maintenanceNum = ref(0)
const revenueNum     = ref(0)

const isVi = computed(() => lang.value === 'vi')

const occupancyDisplay = computed(() =>
  isVi.value ? `${occupancyNum.value}% đã thuê` : `${occupancyNum.value}% filled`
)
const contractsDisplay = computed(() =>
  isVi.value ? `${contractsNum.value} sắp gia hạn` : `${contractsNum.value} renewals due`
)
const maintenanceDisplay = computed(() =>
  isVi.value ? `${maintenanceNum.value} phiếu đang mở` : `${maintenanceNum.value} open tickets`
)
const revenueDisplay = computed(() =>
  isVi.value ? `↑ ${revenueNum.value}% tháng này` : `↑ ${revenueNum.value}% this month`
)

function runCounters() {
  if (reducedMotion.value) {
    // No animation — jump to final values immediately for users who prefer less motion
    occupancyNum.value   = 92
    contractsNum.value   = 6
    maintenanceNum.value = 3
    revenueNum.value     = 12
    return
  }
  // Stagger the 4 counters so they don't all finish at the same time
  const o = { v: 0 }
  gsap.to(o, { v: 92, duration: 0.95, ease: 'power2.out', delay: 0.05, onUpdate() { occupancyNum.value   = Math.round(o.v) } })
  const r = { v: 0 }
  gsap.to(r, { v: 12, duration: 0.85, ease: 'power2.out', delay: 0.12, onUpdate() { revenueNum.value     = Math.round(r.v) } })
  const c = { v: 0 }
  gsap.to(c, { v: 6,  duration: 0.78, ease: 'power2.out', delay: 0.18, onUpdate() { contractsNum.value   = Math.round(c.v) } })
  const m = { v: 0 }
  gsap.to(m, { v: 3,  duration: 0.7, ease: 'power2.out', delay: 0.24, onUpdate() { maintenanceNum.value = Math.round(m.v) } })
}

function scrollToDemo() {
  document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToMobile() {
  document.getElementById('mobile-app')?.scrollIntoView({ behavior: 'smooth' })
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

  // Wait for the command card CSS animation to finish (0.65s delay + card duration + buffer)
  countTimerId = setTimeout(runCounters, 520)
})

onUnmounted(() => {
  clearTimeout(countTimerId)
})
</script>

<style scoped>
.oh-hero3d {
  position: relative;
  min-height: calc(100vh + 74px);
  margin-top: -74px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: transparent;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* teal + purple ambient glows */
.oh-hero3d::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 65% 75% at 72% 55%, rgba(var(--oh-brand-rgb), 0.22) 0%, transparent 60%),
    radial-gradient(ellipse 50% 55% at 12% 35%, rgba(var(--oh-brand-rgb), 0.14) 0%, transparent 65%),
    radial-gradient(ellipse 40% 40% at 50% 90%, rgba(139, 92, 246, 0.1) 0%, transparent 60%);
}

/* bottom vignette — sections stack over it via .oh-stack */
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

/* ── Layout ───────────────────────────────────────────────────────── */
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

/* ── Badge ────────────────────────────────────────────────────────── */
.oh-hero3d__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: rgba(var(--oh-brand-rgb), 0.1);
  color: var(--oh-brand-light);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.4);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
  box-shadow: 0 0 12px rgba(var(--oh-brand-rgb), 0.2);
}
.oh-hero3d__badge-icon { font-size: 10px; line-height: 1; }

/* ── Title hierarchy ──────────────────────────────────────────────── */
/*
  L1 = category descriptor → smaller, dimmer → lets eye skip to the hook
  L2 = emotional hook      → larger, heavier → dominant visual read
*/
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
  letter-spacing: 0;
  white-space: pre-line;
}
.oh-hero3d__title-l2 {
  max-width: 620px;
  font-size: 1em;
  font-weight: 900;
  letter-spacing: 0;
  white-space: pre-line;
  color: var(--oh-brand-light);
}
.oh-hero3d__title-bar {
  width: 64px;
  height: 2px;
  background: var(--oh-brand-light);
  box-shadow: 0 0 12px var(--oh-brand);
  margin: 2px 0;
}

/* ── Proof chips ──────────────────────────────────────────────────── */
.oh-hero3d__proofline {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 0 22px;
}
.oh-hero3d__proof-chip {
  font-size: 12px;
  font-weight: 700;
  color: var(--oh-brand-light);
  background: rgba(var(--oh-brand-rgb), 0.1);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.28);
  border-radius: 999px;
  padding: 4px 12px;
  letter-spacing: 0;
}

/* ── Sub ──────────────────────────────────────────────────────────── */
.oh-hero3d__sub {
  font-size: 17px;
  line-height: 1.7;
  /* was 0.65 — bumped to pass WCAG AA on dark bg */
  color: rgba(240, 240, 245, 0.78);
  margin: 0 0 28px;
  max-width: 540px;
}
.oh-hero3d__sub span {
  color: var(--oh-brand-light);
  font-weight: 700;
}

/* ── Social proof ─────────────────────────────────────────────────── */
.oh-hero3d__social {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.oh-hero3d__avatars { display: flex; }
.oh-hero3d__avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid rgba(8, 15, 26, 0.8);
  margin-left: -8px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.oh-hero3d__avatar:first-child { margin-left: 0; }
/* Three distinct gradients — look like real distinct people, not a template */
.oh-hero3d__avatar--1 { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.oh-hero3d__avatar--2 { background: linear-gradient(135deg, #0369a1, #38bdf8); }
.oh-hero3d__avatar--3 { background: linear-gradient(135deg, #7c3aed, #a78bfa); }

.oh-hero3d__stars { color: #f59e0b; font-size: 13px; letter-spacing: 2px; }
/* was 0.5 — bumped to WCAG AA at 13px */
.oh-hero3d__social-text { color: rgba(240, 240, 245, 0.68); font-size: 13px; font-weight: 500; }

/* ── CTAs ─────────────────────────────────────────────────────────── */
.oh-hero3d__ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
.oh-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: var(--oh-radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;
  text-decoration: none;
  white-space: nowrap;
}
.oh-btn--primary { background: var(--oh-brand); color: #fff; }
.oh-btn--primary:hover {
  background: var(--oh-brand-hover);
  box-shadow: 0 0 20px rgba(var(--oh-brand-rgb), 0.4);
}
.oh-btn--ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  border: 1.5px solid rgba(255, 255, 255, 0.22);
}
.oh-btn--ghost:hover { border-color: var(--oh-brand-light); color: var(--oh-brand-light); }
/* App buttons: slightly tighter, icon visible */
.oh-btn--app { padding: 10px 16px; font-size: 13px; }

/* ── Dashboard showcase ───────────────────────────────────────────── */
.oh-hero3d__scene {
  position: relative;
  min-height: 560px;
}

.oh-mobile-hero {
  position: relative;
  min-height: 560px;
  perspective: 1200px;
}

.oh-mobile-hero__map {
  position: absolute;
  inset: 48px 0 0;
  border-radius: 32px;
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(25deg, rgba(20, 184, 166, 0.12), transparent 58%),
    radial-gradient(ellipse at 55% 62%, rgba(20, 184, 166, 0.28), transparent 64%);
  background-size: 86px 86px, auto, auto;
  opacity: 0.78;
  transform: rotateX(58deg) rotateZ(-9deg) translateY(70px);
  transform-origin: center bottom;
  filter: blur(0.2px);
}

.oh-map-block,
.oh-map-pin {
  position: absolute;
  display: block;
}

.oh-map-block {
  border-radius: 7px;
  background: rgba(20, 184, 166, 0.18);
  border: 1px solid rgba(94, 234, 212, 0.22);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
}
.oh-map-block--a { width: 92px; height: 62px; left: 12%; top: 42%; }
.oh-map-block--b { width: 132px; height: 78px; left: 58%; top: 28%; }
.oh-map-block--c { width: 78px; height: 110px; left: 72%; top: 58%; }

.oh-map-pin {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #f97316;
  box-shadow: 0 0 0 8px rgba(249, 115, 22, 0.12), 0 0 24px rgba(249, 115, 22, 0.45);
}
.oh-map-pin--a { left: 26%; top: 34%; }
.oh-map-pin--b { left: 63%; top: 44%; background: var(--oh-brand-light); box-shadow: 0 0 0 8px rgba(20, 184, 166, 0.12), 0 0 24px rgba(20, 184, 166, 0.48); }
.oh-map-pin--c { left: 78%; top: 68%; }

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
  box-shadow:
    inset 0 0 0 2px rgba(255,255,255,0.06),
    0 0 86px rgba(20, 184, 166, 0.18);
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
  color: #0f172a;
  background: #f8fffd;
}

.oh-phone__screen::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.32), transparent 36%);
  pointer-events: none;
  z-index: 2;
}

.oh-phone__screenshot {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.oh-app-top,
.oh-app-card,
.oh-app-stats,
.oh-app-nav {
  position: relative;
  z-index: 1;
}

.oh-app-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}
.oh-app-top span,
.oh-app-top em {
  display: block;
  color: rgba(226, 232, 240, 0.62);
  font-size: 10px;
  font-style: normal;
}
.oh-app-top strong {
  display: block;
  margin-top: 4px;
  color: #fff;
  font-size: 17px;
  line-height: 1.2;
}

.oh-app-card,
.oh-app-stats > div {
  border-radius: 19px;
  background: rgba(255,255,255,0.078);
  border: 1px solid rgba(255,255,255,0.11);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
}

.oh-app-card {
  padding: 14px;
  margin-bottom: 11px;
}
.oh-app-card--summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 104px;
  background:
    radial-gradient(circle at 88% 18%, rgba(20, 184, 166, 0.2), transparent 40%),
    rgba(255,255,255,0.09);
}

.oh-app-card span,
.oh-app-stats span {
  display: block;
  margin-bottom: 7px;
  color: rgba(226, 232, 240, 0.66);
  font-size: 11px;
}
.oh-app-card strong,
.oh-app-stats strong {
  display: block;
  color: #fff;
  font-size: 17px;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.oh-app-ring {
  width: 82px;
  height: 82px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background:
    conic-gradient(var(--oh-brand-light) 0 92%, rgba(255,255,255,0.12) 92% 100%);
  box-shadow: 0 0 26px rgba(20, 184, 166, 0.22);
}
.oh-app-ring span {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin: 0;
  border-radius: 50%;
  color: #fff;
  background: #0a1b24;
  font-size: 18px;
  font-weight: 900;
}

.oh-app-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 11px;
}
.oh-app-stats > div {
  min-height: 86px;
  padding: 12px;
}

.oh-app-card h3 {
  margin: 0 0 12px;
  color: rgba(248, 250, 252, 0.9);
  font-size: 12px;
  font-weight: 800;
}

.oh-app-task {
  display: grid;
  grid-template-columns: 9px 1fr;
  gap: 8px;
  align-items: start;
  margin-bottom: 10px;
}
.oh-app-task span {
  width: 8px;
  height: 8px;
  margin-top: 4px;
  border-radius: 50%;
  background: var(--oh-brand-light);
  box-shadow: 0 0 0 5px rgba(20, 184, 166, 0.1);
}
.oh-app-task.is-hot span {
  background: #f97316;
  box-shadow: 0 0 0 5px rgba(249, 115, 22, 0.12);
}
.oh-app-task p {
  margin: 0;
  color: rgba(226, 232, 240, 0.78);
  font-size: 11px;
  line-height: 1.35;
}

.oh-app-calendar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.oh-app-calendar span {
  min-height: 38px;
  border-radius: 12px;
  padding: 7px;
  background: rgba(255,255,255,0.06);
  color: rgba(226, 232, 240, 0.7);
  font-size: 10px;
  font-weight: 800;
}
.oh-app-calendar .is-paid { background: rgba(20, 184, 166, 0.18); color: #ccfbf1; }
.oh-app-calendar .is-due { background: rgba(249, 115, 22, 0.18); color: #fed7aa; }
.oh-app-calendar .is-vacant { background: rgba(56, 189, 248, 0.18); color: #bae6fd; }

.oh-app-nav {
  height: 42px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-items: center;
  padding: 0 18px;
  margin-top: 2px;
  border-radius: 18px;
  background: rgba(2, 8, 13, 0.44);
}
.oh-app-nav span {
  width: 22px;
  height: 6px;
  justify-self: center;
  border-radius: 999px;
  background: rgba(255,255,255,0.18);
}
.oh-app-nav .is-active {
  width: 30px;
  background: var(--oh-brand-light);
  box-shadow: 0 0 16px rgba(20, 184, 166, 0.5);
}

.oh-mobile-card {
  position: absolute;
  z-index: 4;
  min-width: 190px;
  padding: 13px 15px;
  border-radius: 16px;
  color: #f8fafc;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.045)),
    rgba(8, 15, 26, 0.68);
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 18px 54px rgba(0,0,0,0.28);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
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
  color: rgba(226, 232, 240, 0.68);
  font-size: 11px;
}
.oh-mobile-card--property { left: 78px; top: 118px; }
.oh-mobile-card--alert { right: 8px; bottom: 54px; animation-delay: -1.5s; }

@keyframes oh-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

/* ── Press bar ────────────────────────────────────────────────────── */
.oh-hero3d__press {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px 80px 32px;
  max-width: 1280px;
  width: 100%;
}
.oh-hero3d__press-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(240, 240, 245, 0.38);
}
.oh-hero3d__press-name {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(240, 240, 245, 0.5);
  transition: color 200ms ease;
  cursor: default;
}
.oh-hero3d__press-name:hover { color: rgba(240, 240, 245, 0.75); }
.oh-hero3d__press-sep { color: rgba(240, 240, 245, 0.2); font-size: 14px; }

/* ── Scroll hint ──────────────────────────────────────────────────── */
.oh-hero3d__scroll-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  /* was 0.4 — contrast fix */
  color: rgba(240, 240, 245, 0.52);
  transition: opacity 400ms ease;
  z-index: 3;
}
.oh-hero3d__scroll-hint.is-hidden { opacity: 0; pointer-events: none; }
.oh-hero3d__chevron { animation: oh-scroll-hint 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
@keyframes oh-scroll-hint {
  0%   { transform: translateY(0); opacity: 0.6; }
  50%  { transform: translateY(6px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.6; }
}

/* ── Reduced-motion overrides ─────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .oh-mobile-card,
  .oh-hero3d__chevron {
    animation: none;
  }
}

/* ── Responsive ───────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .oh-hero3d__inner {
    grid-template-columns: 1fr;
    padding: 100px 24px 60px;
    text-align: center;
    gap: 40px;
  }
  .oh-hero3d__scene,
  .oh-mobile-hero {
    min-height: 600px;
  }
  .oh-phone {
    left: 50%;
    top: 0;
    width: min(306px, calc(100vw - 96px));
    transform: translateX(-50%) rotate(-1deg);
  }
  .oh-phone__frame {
    height: 660px;
  }
  .oh-mobile-card--property {
    left: 18px;
    top: 42px;
  }
  .oh-mobile-card--alert {
    right: 24px;
    bottom: 20px;
  }
  .oh-hero3d__sub    { max-width: 100%; }
  .oh-hero3d__copy   { align-items: center; display: flex; flex-direction: column; }
  .oh-hero3d__title  { align-items: center; }
  .oh-hero3d__proofline { justify-content: center; }
  .oh-hero3d__social { justify-content: center; }
  .oh-hero3d__ctas   { justify-content: center; }
  .oh-hero3d__scroll-hint { display: none; }
  .oh-hero3d__press  { padding: 12px 24px 20px; }
}

@media (max-width: 480px) {
  .oh-hero3d__ctas { gap: 8px; }
  .oh-btn--app { padding: 9px 12px; }
  .oh-hero3d__scene,
  .oh-mobile-hero {
    min-height: 540px;
  }
  .oh-phone {
    width: min(286px, calc(100vw - 42px));
  }
  .oh-phone__frame { height: 622px; }
  .oh-app-card { padding: 12px; }
  .oh-app-card strong,
  .oh-app-stats strong { font-size: 14px; }
  .oh-app-calendar { gap: 5px; }
  .oh-app-calendar span { min-height: 30px; font-size: 9px; }
  .oh-mobile-card { display: none; }
  .oh-hero3d__press { gap: 10px; }
}
</style>
