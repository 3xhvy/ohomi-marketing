<!-- web/src/pages/landing/sections/MobileAppSection.vue -->
<template>
  <section id="mobile-app" class="oh-section--dark">
    <div class="oh-section__inner oh-mobile">
      <div class="oh-mobile__copy reveal-up">
        <h2 class="oh-h2">{{ t('mobileApp.heading') }}</h2>
        <p class="oh-lead">{{ t('mobileApp.lead') }}</p>

        <div class="oh-mobile__pills">
          <span v-for="feat in features" :key="feat" class="oh-mobile__pill">
            <span class="oh-mobile__pill-dot" />{{ feat }}
          </span>
        </div>

        <div class="oh-mobile__stats">
          <div v-for="stat in dict.mobileApp.stats" :key="stat.label" class="oh-mobile__stat">
            <strong>{{ stat.number }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>

        <div class="oh-mobile__downloads">
          <AppBadges />
          <div class="oh-mobile__qr">
            <div class="oh-mobile__qr-code" aria-hidden="true">
              <span v-for="i in 25" :key="i"></span>
            </div>
            <p>{{ t('mobileApp.qrLabel') }}</p>
          </div>
        </div>
      </div>

      <div class="oh-mobile__phone reveal-up">
        <div class="oh-mobile__phone-frame">
          <div class="oh-mobile__phone-notch" />
          <div class="oh-mobile__screen">
            <img
              class="oh-mobile__screenshot"
              :src="hostHomeDashboard"
              :alt="t('hero3d.dashboard.screenshotAlt')"
              loading="lazy"
              width="591"
              height="1280"
            />
          </div>
        </div>
        <p class="oh-mobile__social-proof">{{ t('mobileApp.socialProof') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import hostHomeDashboard from '~/assets/img/host-home-dashboard.png'

gsap.registerPlugin(ScrollTrigger)
const { t, tList, dict } = useLandingI18n()

const features = computed(() => tList<string>('mobileApp.features'))

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('#mobile-app .reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })

  const phone = document.querySelector('.oh-mobile__phone-frame') as HTMLElement | null
  if (phone) {
    gsap.to(phone, { y: -10, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  }
})
</script>

<style scoped>
.oh-mobile {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
  gap: 72px;
  align-items: center;
}

.oh-mobile__copy {
  max-width: 560px;
}

.oh-mobile__copy .oh-h2,
.oh-mobile__copy .oh-lead {
  white-space: pre-line;
  text-align: left;
}

.oh-mobile__copy .oh-eyebrow {
  color: var(--oh-brand-light);
  opacity: 1;
}

.oh-mobile__copy .oh-h2 {
  color: rgba(248, 250, 252, 0.96);
}

.oh-mobile__copy .oh-lead {
  margin-bottom: 26px;
  color: rgba(226, 232, 240, 0.78);
}

.oh-mobile__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}

.oh-mobile__pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 34px;
  padding: 0 13px;
  border-radius: 999px;
  color: #ecfeff;
  background: rgba(var(--oh-brand-rgb), 0.2);
  border: 1px solid rgba(94, 234, 212, 0.32);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  font-size: 13px;
  font-weight: 600;
}

.oh-mobile__pill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--oh-brand-light);
  flex-shrink: 0;
  box-shadow: 0 0 0 5px rgba(var(--oh-brand-rgb), 0.12);
}

.oh-mobile__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 26px;
}

.oh-mobile__stat {
  min-height: 76px;
  padding: 14px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 30px rgba(0,0,0,0.18);
  text-align: center;
}

.oh-mobile__stat strong {
  display: block;
  color: #fff;
  font-size: 22px;
  line-height: 1.1;
}

.oh-mobile__stat span {
  display: block;
  margin-top: 6px;
  color: rgba(226, 232, 240, 0.78);
  font-size: 12px;
}

.oh-mobile__downloads {
  display: flex;
  align-items: center;
  gap: 22px;
}

.oh-mobile__downloads :deep(.app-badges__btn) {
  min-height: 48px;
  padding: 0 20px;
  background: rgba(2, 8, 13, 0.86);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.34);
  box-shadow: 0 16px 38px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08);
  font-weight: 800;
}

.oh-mobile__downloads :deep(.app-badges__btn:hover) {
  opacity: 1;
  background: rgba(15, 23, 42, 0.96);
  border-color: rgba(94, 234, 212, 0.55);
  transform: translateY(-1px);
}

.oh-mobile__qr {
  text-align: center;
}

.oh-mobile__qr-code {
  width: 88px;
  height: 88px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  padding: 8px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(255,255,255,0.36);
  box-shadow: 0 16px 38px rgba(0,0,0,0.2);
}

.oh-mobile__qr-code span {
  border-radius: 3px;
  background: rgba(8, 80, 65, 0.16);
}

.oh-mobile__qr-code span:nth-child(1),
.oh-mobile__qr-code span:nth-child(2),
.oh-mobile__qr-code span:nth-child(4),
.oh-mobile__qr-code span:nth-child(6),
.oh-mobile__qr-code span:nth-child(9),
.oh-mobile__qr-code span:nth-child(11),
.oh-mobile__qr-code span:nth-child(13),
.oh-mobile__qr-code span:nth-child(15),
.oh-mobile__qr-code span:nth-child(17),
.oh-mobile__qr-code span:nth-child(20),
.oh-mobile__qr-code span:nth-child(22),
.oh-mobile__qr-code span:nth-child(24),
.oh-mobile__qr-code span:nth-child(25) {
  background: #085041;
}

.oh-mobile__qr p {
  margin: 7px 0 0;
  color: rgba(226, 232, 240, 0.82);
  font-size: 12px;
  font-weight: 600;
}

.oh-mobile__phone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.oh-mobile__phone-frame {
  width: 292px;
  height: 632px;
  background: #1a1a2e;
  border-radius: 36px;
  border: 3px solid rgba(255,255,255,0.15);
  padding: 16px 8px 8px;
  position: relative;
  box-shadow: 0 0 60px rgba(15,118,110,0.3), 0 20px 60px rgba(0,0,0,0.5);
}

.oh-mobile__phone-notch {
  width: 60px;
  height: 12px;
  background: #0a0a14;
  border-radius: 8px;
  margin: 0 auto 8px;
}

.oh-mobile__screen {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: #f8fffd;
  position: relative;
}

.oh-mobile__screenshot {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
}

.oh-mobile__social-proof {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  margin: 0;
  text-align: center;
}

@media (max-width: 900px) {
  .oh-mobile {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 42px;
  }
  .oh-mobile__copy {
    max-width: 100%;
  }
  .oh-mobile__copy .oh-h2,
  .oh-mobile__copy .oh-lead {
    text-align: center;
  }
  .oh-mobile__pills,
  .oh-mobile__downloads {
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .oh-mobile__stats {
    grid-template-columns: 1fr;
  }
  .oh-mobile__downloads {
    flex-direction: column;
  }
  .oh-mobile__qr {
    display: none;
  }
  .oh-mobile__phone-frame {
    width: min(286px, calc(100vw - 48px));
    height: 612px;
  }
}
</style>
