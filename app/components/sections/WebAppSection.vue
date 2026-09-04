<!-- web/src/pages/landing/sections/WebAppSection.vue -->
<template>
  <section id="web-app" class="oh-section">
    <div class="oh-webapp">
      <div class="oh-webapp__header reveal-up">
        <p class="oh-eyebrow">{{ t('webApp.eyebrow') }}</p>
        <h2 class="oh-h2">{{ t('webApp.heading') }}</h2>
        <p class="oh-lead">{{ t('webApp.lead') }}</p>
      </div>

      <!-- Browser chrome mockup -->
      <div class="oh-webapp__browser" aria-hidden="true">
        <div class="oh-webapp__chrome">
          <div class="oh-webapp__chrome-dots">
            <span style="background:#ff5f56" /><span style="background:#ffbd2e" /><span style="background:#27c93f" />
          </div>
          <div class="oh-webapp__chrome-bar">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            app.ohomi.vn
          </div>
        </div>

        <!-- App shell -->
        <div class="oh-webapp__shell">
          <!-- Sidebar -->
          <div class="oh-webapp__sidebar">
            <div class="oh-webapp__logo">Oh<span>omi</span></div>
            <nav class="oh-webapp__nav">
              <div
                v-for="(item, i) in dashboard.navItems"
                :key="i"
                class="oh-webapp__nav-item"
                :class="{ 'oh-webapp__nav-item--active': i === 0 }"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span class="oh-webapp__nav-icon" v-html="NAV_ICONS[i]" />
                {{ item.label }}
                <span v-if="item.badge" class="oh-webapp__nav-badge">{{ item.badge }}</span>
              </div>
            </nav>
          </div>

          <!-- Main -->
          <div class="oh-webapp__main">
            <div class="oh-webapp__topbar">
              <span class="oh-webapp__topbar-title">{{ t('webApp.eyebrow') }} — {{ dashboard.period }}</span>
              <div class="oh-webapp__topbar-right">
                <span class="oh-webapp__period">{{ dashboard.period }}</span>
                <div class="oh-webapp__avatar">N</div>
              </div>
            </div>

            <div class="oh-webapp__body">
              <!-- Stats row -->
              <div class="oh-webapp__stats">
                <div v-for="(stat, i) in dashboard.stats" :key="i" class="oh-webapp__stat">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span class="oh-webapp__stat-ico" v-html="STAT_ICONS[i]" />
                  <div class="oh-webapp__stat-label">{{ stat.label }}</div>
                  <div class="oh-webapp__stat-value">{{ stat.value }}</div>
                  <div
                    class="oh-webapp__stat-sub"
                    :class="{ 'oh-webapp__stat-sub--warn': stat.type === 'warn' }"
                  >{{ stat.sub }}</div>
                </div>
              </div>

              <!-- Two columns -->
              <div class="oh-webapp__cols">
                <!-- Property list -->
                <div class="oh-webapp__panel">
                  <div class="oh-webapp__panel-hdr">
                    <span>{{ dashboard.propListTitle }}</span>
                    <a>{{ dashboard.propViewAll }}</a>
                  </div>
                  <div v-for="prop in dashboard.props" :key="prop.name" class="oh-webapp__prop-row">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div class="oh-webapp__prop-ico" v-html="BUILDING_ICON" />
                    <div class="oh-webapp__prop-info">
                      <div class="oh-webapp__prop-name">{{ prop.name }}</div>
                      <div class="oh-webapp__prop-meta">{{ prop.meta }}</div>
                    </div>
                    <span
                      class="oh-webapp__prop-occ"
                      :class="{ 'oh-webapp__prop-occ--med': prop.level === 'med' }"
                    >{{ prop.occ }}</span>
                  </div>
                </div>

                <!-- Today's tickets -->
                <div class="oh-webapp__panel">
                  <div class="oh-webapp__panel-hdr">
                    <span>{{ dashboard.todayTitle }}</span>
                    <span class="oh-webapp__today-badge">{{ dashboard.todayBadge }}</span>
                  </div>
                  <div v-for="tick in dashboard.tickets" :key="tick.text" class="oh-webapp__tick">
                    <div class="oh-webapp__tick-dot" :class="`oh-webapp__tick-dot--${tick.type}`" />
                    <div>
                      <div class="oh-webapp__tick-text">{{ tick.text }}</div>
                      <div class="oh-webapp__tick-meta">{{ tick.meta }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature highlights -->
      <div class="oh-webapp__features">
        <div
          v-for="(feat, i) in webFeatures"
          :key="feat.title"
          class="oh-webapp__feat reveal-up"
        >
          <div class="oh-webapp__feat-ico-wrap">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="FEAT_ICONS[i]" />
          </div>
          <h3>{{ feat.title }}</h3>
          <p>{{ feat.desc }}</p>
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

const webFeatures = computed(() => tList<{ title: string; desc: string }>('webApp.features'))
const dashboard   = computed(() => dict.value.webApp.dashboard)

// ── Sidebar nav icons (7) ─────────────────────────────────
const NAV_ICONS: string[] = [
  // Overview — grid squares
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" fill="rgba(20,184,166,0.2)"/><rect x="14" y="3" width="7" height="7" rx="1" fill="rgba(20,184,166,0.2)"/><rect x="3" y="14" width="7" height="7" rx="1" fill="rgba(20,184,166,0.2)"/><rect x="14" y="14" width="7" height="7" rx="1" fill="rgba(20,184,166,0.2)"/></svg>`,
  // Properties — building
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
  // Tenants — users
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></svg>`,
  // Finance — bar chart
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M6 20v-5M10 20v-9M14 20v-6M18 20v-3"/></svg>`,
  // Maintenance — wrench
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a6 6 0 0 1-7.5 7.5l-4.8 4.8a2.1 2.1 0 0 1-3-3l4.8-4.8a6 6 0 0 1 4.5-4.5z"/></svg>`,
  // Contracts — document
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="12" height="18" rx="1.5"/><path d="M8 6h5M8 9.5h5M8 13h3"/></svg>`,
  // IoT — hub
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1"/></svg>`,
]

// ── Stat card icons (4) ───────────────────────────────────
const STAT_ICONS: string[] = [
  // Occupancy — grid squares (teal highlighted)
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="5" height="5" rx="1" fill="rgba(20,184,166,0.25)" stroke="#14b8a6"/><rect x="10" y="3" width="5" height="5" rx="1" fill="rgba(20,184,166,0.25)" stroke="#14b8a6"/><rect x="17" y="3" width="4" height="5" rx="1" stroke="currentColor" stroke-opacity="0.35"/><rect x="3" y="10" width="5" height="5" rx="1" fill="rgba(20,184,166,0.25)" stroke="#14b8a6"/><rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" stroke-opacity="0.35"/><rect x="17" y="10" width="4" height="5" rx="1" stroke="currentColor" stroke-opacity="0.35"/><rect x="3" y="17" width="5" height="4" rx="1" fill="rgba(20,184,166,0.25)" stroke="#14b8a6"/><rect x="10" y="17" width="5" height="4" rx="1" stroke="currentColor" stroke-opacity="0.35"/><rect x="17" y="17" width="4" height="4" rx="1" stroke="currentColor" stroke-opacity="0.35"/></svg>`,
  // Revenue — bar chart with teal highlight
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M6 20v-5M10 20v-9M14 20v-6" stroke="currentColor" stroke-opacity="0.35"/><rect x="12.5" y="8" width="3" height="12" rx="0.5" fill="rgba(20,184,166,0.2)" stroke="#14b8a6"/><path d="M5 10l4-4 4 3 4-5" stroke="#14b8a6"/><circle cx="17" cy="4" r="1.5" fill="#14b8a6" stroke="none"/></svg>`,
  // Contracts — doc + clock (amber)
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="12" height="18" rx="1.5"/><path d="M8 6h5M8 9.5h5M8 13h3"/><circle cx="17" cy="17" r="4" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1.5"/><path d="M17 14.5v2.5" stroke="#f59e0b" stroke-width="1.5"/><circle cx="17" cy="18.5" r="0.5" fill="#f59e0b" stroke="none"/></svg>`,
  // Maintenance — wrench + dot (amber)
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a6 6 0 0 1-7.5 7.5l-4.8 4.8a2.1 2.1 0 0 1-3-3l4.8-4.8a6 6 0 0 1 4.5-4.5z"/><circle cx="19" cy="5" r="2" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="1.2"/></svg>`,
]

// ── Property list icon ────────────────────────────────────
const BUILDING_ICON =
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" fill="rgba(20,184,166,0.1)"/><path d="M9 21V12h6v9"/></svg>`

// ── Feature card icons (3) ────────────────────────────────
const FEAT_ICONS: string[] = [
  // Real-time reports
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M6 20v-5M10 20v-9M14 20v-6" stroke="currentColor" stroke-opacity="0.4"/><rect x="12.5" y="8" width="3" height="12" rx="0.5" fill="rgba(20,184,166,0.2)" stroke="#14b8a6"/><path d="M5 10l4-4 4 3 4-5" stroke="#14b8a6"/><circle cx="17" cy="4" r="1.5" fill="#14b8a6" stroke="none"/></svg>`,
  // Staff permissions
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></svg>`,
  // Any device
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" fill="rgba(20,184,166,0.1)"/><path d="M12 18h.01"/><path d="M9 6h6M9 10h6M9 14h4"/></svg>`,
]

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('#web-app .reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })

  const browser = document.querySelector('.oh-webapp__browser') as HTMLElement | null
  if (browser) {
    gsap.from(browser, {
      x: 80, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: browser, start: 'top 80%', once: true },
    })
  }
})
</script>

<style scoped>
.oh-webapp { max-width: 900px; margin: 0 auto; }
.oh-webapp__header { margin-bottom: 40px; }

/* ── Browser chrome ── */
.oh-webapp__browser {
  border-radius: var(--oh-radius-lg);
  overflow: hidden;
  border: 1px solid var(--oh-border);
  box-shadow: 0 16px 48px rgba(0,0,0,0.1);
  margin-bottom: 48px;
}
.oh-webapp__chrome {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid var(--oh-border);
}
.oh-webapp__chrome-dots { display: flex; gap: 6px; }
.oh-webapp__chrome-dots span { width: 12px; height: 12px; border-radius: 50%; display: block; }
.oh-webapp__chrome-bar {
  background: white; border: 1px solid var(--oh-border); border-radius: 6px;
  padding: 4px 12px; font-size: 12px; color: var(--oh-text-3);
  flex: 1; max-width: 260px;
  display: flex; align-items: center; gap: 6px;
}

/* ── App shell ── */
.oh-webapp__shell { display: flex; height: 380px; background: #f0f4fa; }

.oh-webapp__sidebar {
  width: 168px; background: #1a2535; flex-shrink: 0;
  display: flex; flex-direction: column; padding: 14px 0;
}
.oh-webapp__logo {
  padding: 0 14px 14px; border-bottom: 1px solid rgba(255,255,255,0.07);
  font-size: 13px; font-weight: 800; color: #fff;
}
.oh-webapp__logo span { color: #14b8a6; }
.oh-webapp__nav { padding: 10px 0; flex: 1; }
.oh-webapp__nav-item {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 14px; font-size: 11px; color: rgba(255,255,255,0.42);
}
.oh-webapp__nav-icon { display: flex; align-items: center; flex-shrink: 0; }
.oh-webapp__nav-item--active {
  color: #fff; background: rgba(20,184,166,0.12);
  border-right: 2px solid #14b8a6;
}
.oh-webapp__nav-badge {
  background: #14b8a6; color: white;
  font-size: 9px; font-weight: 800; padding: 1px 5px;
  border-radius: 3px; margin-left: auto;
}

.oh-webapp__main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.oh-webapp__topbar {
  padding: 10px 16px; background: white;
  border-bottom: 1px solid #e8eef6;
  display: flex; align-items: center; justify-content: space-between;
}
.oh-webapp__topbar-title { font-size: 12px; font-weight: 700; color: #1a2535; }
.oh-webapp__topbar-right { display: flex; align-items: center; gap: 8px; }
.oh-webapp__period {
  font-size: 10px; color: #8a9bb0; background: #f0f4fa;
  padding: 3px 8px; border-radius: 5px;
}
.oh-webapp__avatar {
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #0d766e);
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 800; color: white;
}

.oh-webapp__body {
  padding: 12px 16px; flex: 1; overflow: hidden;
  display: flex; flex-direction: column; gap: 10px;
}

/* Stats row */
.oh-webapp__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.oh-webapp__stat {
  background: white; border-radius: 9px; padding: 10px 12px;
  border: 1px solid #e8eef6;
}
.oh-webapp__stat-ico { display: block; margin-bottom: 5px; }
.oh-webapp__stat-label { font-size: 10px; color: #8a9bb0; font-weight: 600; margin-bottom: 2px; }
.oh-webapp__stat-value { font-size: 16px; font-weight: 800; color: #1a2535; line-height: 1; }
.oh-webapp__stat-sub { font-size: 9px; margin-top: 3px; color: #14b8a6; font-weight: 600; }
.oh-webapp__stat-sub--warn { color: #f59e0b; }

/* Two cols */
.oh-webapp__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; }
.oh-webapp__panel {
  background: white; border-radius: 9px;
  border: 1px solid #e8eef6; overflow: hidden;
}
.oh-webapp__panel-hdr {
  padding: 8px 12px; border-bottom: 1px solid #f0f4fa;
  font-size: 10px; font-weight: 700; color: #1a2535;
  display: flex; align-items: center; justify-content: space-between;
}
.oh-webapp__panel-hdr a { font-size: 9px; color: #14b8a6; font-weight: 600; cursor: pointer; }

/* Property rows */
.oh-webapp__prop-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 12px; border-bottom: 1px solid #f6f8fb;
}
.oh-webapp__prop-row:last-child { border-bottom: none; }
.oh-webapp__prop-ico {
  width: 26px; height: 26px; border-radius: 7px;
  background: rgba(20,184,166,0.1); display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
}
.oh-webapp__prop-info { flex: 1; }
.oh-webapp__prop-name { font-size: 10px; font-weight: 700; color: #1a2535; }
.oh-webapp__prop-meta { font-size: 9px; color: #a0aec0; margin-top: 1px; }
.oh-webapp__prop-occ { font-size: 11px; font-weight: 800; color: #14b8a6; }
.oh-webapp__prop-occ--med { color: #f59e0b; }

/* Tickets */
.oh-webapp__today-badge {
  background: rgba(245,158,11,0.12); color: #b45309;
  font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 3px;
}
.oh-webapp__tick {
  display: flex; align-items: flex-start; gap: 7px;
  padding: 7px 12px; border-bottom: 1px solid #f6f8fb;
}
.oh-webapp__tick:last-child { border-bottom: none; }
.oh-webapp__tick-dot {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 3px;
}
.oh-webapp__tick-dot--open   { background: #f59e0b; }
.oh-webapp__tick-dot--urgent { background: #e53e3e; }
.oh-webapp__tick-dot--ok     { background: #14b8a6; }
.oh-webapp__tick-text { font-size: 10px; color: #4a5568; line-height: 1.3; }
.oh-webapp__tick-meta { font-size: 9px; color: #a0aec0; margin-top: 1px; }

/* ── Feature grid ── */
.oh-webapp__features {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
.oh-webapp__feat {
  text-align: center; padding: 24px;
  border: 1px solid var(--oh-border); border-radius: var(--oh-radius-lg);
  background: var(--oh-surface);
}
.oh-webapp__feat-ico-wrap {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(20,184,166,0.08); border: 1px solid rgba(20,184,166,0.15);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.oh-webapp__feat h3 { font-size: 15px; font-weight: 600; margin: 0 0 6px; }
.oh-webapp__feat p  { font-size: 13px; color: var(--oh-text-2); margin: 0; }

@media (max-width: 640px) {
  .oh-webapp__features { grid-template-columns: 1fr; }
  .oh-webapp__shell { height: 320px; }
  .oh-webapp__sidebar { width: 120px; }
  .oh-webapp__nav-item { font-size: 9px; padding: 6px 10px; }
}
</style>
