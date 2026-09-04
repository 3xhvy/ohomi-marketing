<!-- web/src/pages/landing/sections/SmartHomeSection.vue -->
<template>
  <section id="smart-home" class="oh-section--dark">
    <div class="oh-section__inner oh-iot">

      <!-- IoT Command Panel (replaces SVG hub) -->
      <div class="oh-iot__panel reveal-up" aria-hidden="true">
        <!-- Panel header -->
        <div class="oh-iot__panel-head">
          <span class="oh-iot__panel-title">{{ dict.smartHome.devicePanel.title }}</span>
          <span class="oh-iot__live-pill">
            <span class="oh-iot__live-dot" />
            {{ dict.smartHome.devicePanel.livePill }}
          </span>
        </div>

        <!-- 2×2 device grid -->
        <div class="oh-iot__devices">
          <div
            v-for="(device, i) in dict.smartHome.devicePanel.devices"
            :key="device.name"
            class="oh-iot__device"
            :class="`oh-iot__device--${device.type}`"
          >
            <div class="oh-iot__device-icon" v-html="DEVICE_ICONS[i % DEVICE_ICONS.length]" />
            <div class="oh-iot__device-info">
              <span class="oh-iot__device-name">{{ device.name }}</span>
              <span class="oh-iot__device-reading">
                {{ device.reading }}<small v-if="device.unit"> {{ device.unit }}</small>
              </span>
              <span class="oh-iot__device-status" :class="`oh-iot__device-status--${device.type}`">
                {{ device.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Live feed -->
        <div class="oh-iot__feed">
          <p class="oh-iot__feed-title">{{ dict.smartHome.feed.title }}</p>
          <div
            v-for="item in dict.smartHome.feed.items"
            :key="item.time"
            class="oh-iot__feed-row"
          >
            <span class="oh-iot__feed-time">{{ item.time }}</span>
            <span class="oh-iot__feed-event">{{ item.event }}</span>
            <span class="oh-iot__feed-badge" :class="`oh-iot__feed-badge--${item.type}`">
              {{ item.badge }}
            </span>
          </div>
        </div>
      </div>

      <!-- Content: metrics + features -->
      <div class="oh-iot__content reveal-up">
        <h2 class="oh-h2 oh-h2--light">{{ t('smartHome.heading') }}</h2>
        <p style="color:rgba(255,255,255,0.6); font-size:16px; margin-bottom:28px">{{ t('smartHome.lead') }}</p>

        <!-- Metric strip -->
        <div class="oh-iot__metrics">
          <div v-for="m in dict.smartHome.metrics" :key="m.label" class="oh-iot__metric">
            <span class="oh-iot__metric-val">{{ m.value }}</span>
            <span class="oh-iot__metric-lbl">{{ m.label }}</span>
          </div>
        </div>

        <!-- Feature list with SVG icons -->
        <div class="oh-iot__features">
          <div v-for="(feat, i) in features" :key="feat.title" class="oh-iot__feat">
            <div class="oh-iot__feat-ico" v-html="FEAT_ICONS[i % FEAT_ICONS.length]" />
            <div>
              <h4>{{ feat.title }}</h4>
              <p>{{ feat.desc }}</p>
            </div>
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
const features = computed(() => tList<{ title: string; desc: string }>('smartHome.features'))

// ── SVG icons — stroke-width 1.5, teal accent, rounded caps (matches LandlordSection) ──

const DEVICE_ICONS: string[] = [
  // 0 — lock (front door)
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" fill="rgba(20,184,166,0.15)"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    <circle cx="12" cy="16" r="1" fill="#14b8a6"/>
  </svg>`,
  // 1 — water drop (water meter)
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2-7-8-14z" fill="rgba(20,184,166,0.15)"/>
    <path d="M7.5 17.5A4.5 4.5 0 0 0 12 20"/>
  </svg>`,
  // 2 — lightning bolt (electricity meter)
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(20,184,166,0.15)"/>
  </svg>`,
  // 3 — camera (security camera)
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M23 7 16 12 23 17V7z" fill="rgba(20,184,166,0.15)"/>
    <rect x="1" y="5" width="15" height="14" rx="2" fill="rgba(20,184,166,0.15)"/>
  </svg>`,
]

const FEAT_ICONS: string[] = [
  // Smart alerts
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="rgba(20,184,166,0.12)"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>`,
  // Auto meter / gauge
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" fill="rgba(20,184,166,0.12)"/>
    <path d="M12 6v6l4 2"/>
    <circle cx="18" cy="18" r="4" fill="rgba(20,184,166,0.12)"/>
    <path d="M18 16v2l1 1"/>
  </svg>`,
  // Remote control / wifi
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" fill="none"/>
    <path d="M1.42 9a16 16 0 0 1 21.16 0" fill="none"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" fill="none"/>
    <circle cx="12" cy="20" r="1" fill="#14b8a6"/>
  </svg>`,
]

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('#smart-home .reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
})
</script>

<style scoped>
/* ── Layout ── */
.oh-iot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* ── IoT Command Panel ── */
.oh-iot__panel {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05);
}

.oh-iot__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.oh-iot__panel-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.02em;
}

.oh-iot__live-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.12);
  border: 1px solid rgba(20, 184, 166, 0.25);
  padding: 2px 8px;
  border-radius: 20px;
}

.oh-iot__live-dot {
  width: 6px;
  height: 6px;
  background: #14b8a6;
  border-radius: 50%;
  animation: iot-pulse 2s ease-in-out infinite;
}

@keyframes iot-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ── Device 2×2 grid ── */
.oh-iot__devices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.oh-iot__device {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 10px 12px;
  transition: border-color 0.2s;
}

.oh-iot__device--ok  { border-color: rgba(20, 184, 166, 0.2); }
.oh-iot__device--warn { border-color: rgba(245, 158, 11, 0.25); }

.oh-iot__device-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 184, 166, 0.08);
  border-radius: 8px;
}

.oh-iot__device-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.oh-iot__device-name {
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oh-iot__device-reading {
  font-size: 14px;
  font-weight: 700;
  color: #f0f4f8;
}

.oh-iot__device-reading small {
  font-size: 10px;
  font-weight: 400;
  color: rgba(255,255,255,0.45);
}

.oh-iot__device-status {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.oh-iot__device-status--ok   { color: #14b8a6; }
.oh-iot__device-status--warn { color: #f59e0b; }

/* ── Live feed ── */
.oh-iot__feed {
  border-top: 1px solid rgba(255,255,255,0.07);
  padding-top: 14px;
}

.oh-iot__feed-title {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 10px;
}

.oh-iot__feed-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

.oh-iot__feed-row:last-child { border-bottom: none; }

.oh-iot__feed-time {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  width: 38px;
}

.oh-iot__feed-event {
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oh-iot__feed-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 10px;
  flex-shrink: 0;
}

.oh-iot__feed-badge--ok   { background: rgba(20,184,166,0.15); color: #14b8a6; }
.oh-iot__feed-badge--warn { background: rgba(245,158,11,0.15);  color: #f59e0b; }

/* ── Content side ── */
.oh-iot__content { display: flex; flex-direction: column; }

/* ── Metric strip ── */
.oh-iot__metrics {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  border: 1px solid rgba(20,184,166,0.18);
  border-radius: 12px;
  overflow: hidden;
}

.oh-iot__metric {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  border-right: 1px solid rgba(20,184,166,0.12);
  background: rgba(20,184,166,0.05);
}

.oh-iot__metric:last-child { border-right: none; }

.oh-iot__metric-val {
  font-size: 22px;
  font-weight: 800;
  color: #14b8a6;
  line-height: 1;
  margin-bottom: 4px;
}

.oh-iot__metric-lbl {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  text-align: center;
}

/* ── Feature list ── */
.oh-iot__features { display: flex; flex-direction: column; gap: 20px; }

.oh-iot__feat {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.oh-iot__feat-ico {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20,184,166,0.1);
  border: 1px solid rgba(20,184,166,0.2);
  border-radius: 8px;
  margin-top: 1px;
}

.oh-iot__feat h4 {
  font-size: 15px;
  font-weight: 600;
  color: #f0f4f8;
  margin: 0 0 4px;
}

.oh-iot__feat p {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin: 0;
  line-height: 1.5;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .oh-iot { grid-template-columns: 1fr; }
}
</style>
