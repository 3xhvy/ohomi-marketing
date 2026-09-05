<!-- web/src/pages/landing/components/FeatureCard3D.vue -->
<template>
  <div
    class="fc3d"
    :class="{ 'fc3d--hero': hero }"
    @mousemove="onMove"
    @mouseleave="onLeave"
    :style="style"
  >
    <!-- Main content column -->
    <div class="fc3d__body">
      <!-- Pain chip: what problem this replaces -->
      <div v-if="pain" class="fc3d__pain">✗ {{ pain }}</div>

      <!-- Icon wrapper -->
      <div class="fc3d__icon-wrap" v-html="icon" aria-hidden="true"></div>

      <h3 class="fc3d__title">{{ title }}</h3>
      <p class="fc3d__desc">{{ desc }}</p>

      <!-- Micro-stat proof badge -->
      <div v-if="stat" class="fc3d__stat">{{ stat }}</div>
    </div>

    <!-- Hero-only: mini receipt mockup, mirrors the real receipts module -->
    <div v-if="hero" class="fc3d__mockup" aria-hidden="true">
      <div class="fc3d__invoice">
        <div class="fc3d__inv-header">
          <span class="fc3d__inv-label">HD-2026-0042</span>
          <span class="fc3d__inv-tag fc3d__inv-tag--processing">Đã phát hành</span>
        </div>
        <div class="fc3d__inv-tenant">Phòng 302 · Nguyễn Văn A</div>
        <div class="fc3d__inv-period">01/06/2026 — 30/06/2026</div>
        <div class="fc3d__inv-amount">1.200.000&nbsp;₫</div>
        <!-- Animated "sending" pulse -->
        <div class="fc3d__inv-pulse"></div>
      </div>

      <div class="fc3d__invoice fc3d__invoice--dim">
        <div class="fc3d__inv-header">
          <span class="fc3d__inv-label">HD-2026-0041</span>
          <span class="fc3d__inv-tag fc3d__inv-tag--success">Đã thanh toán</span>
        </div>
        <div class="fc3d__inv-tenant">Phòng 204 · Trần Thị B</div>
        <div class="fc3d__inv-period">01/05/2026 — 31/05/2026</div>
        <div class="fc3d__inv-amount">950.000&nbsp;₫</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  icon: string   // SVG HTML string
  title: string
  desc: string
  stat?: string
  pain?: string
  hero?: boolean
}>()

const rotX = ref(0)
const rotY = ref(0)

function onMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const { left, top, width, height } = el.getBoundingClientRect()
  const x = (e.clientX - left) / width  - 0.5
  const y = (e.clientY - top)  / height - 0.5
  rotY.value =  x * 6
  rotX.value = -y * 6
}

function onLeave() {
  rotX.value = 0
  rotY.value = 0
}

const style = computed(() => ({
  transform: `perspective(1200px) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg)`,
}))
</script>

<style scoped>
.fc3d {
  background: var(--oh-surface);
  border: 1px solid var(--oh-border);
  border-radius: var(--oh-radius-lg);
  padding: 24px;
  transition: transform 120ms ease-out, box-shadow 200ms ease;
  cursor: default;
  will-change: transform;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Hero variant: side-by-side */
.fc3d--hero {
  flex-direction: row;
  align-items: stretch;
  gap: 32px;
  padding: 32px;
  background: linear-gradient(
    135deg,
    rgba(var(--oh-brand-rgb), 0.06) 0%,
    var(--oh-surface) 60%
  );
  border-color: rgba(var(--oh-brand-rgb), 0.22);
}

.fc3d:hover {
  box-shadow:
    0 0 0 1px var(--oh-brand),
    0 8px 32px var(--oh-3d-glow-teal);
}

/* ─── Body column ─── */
.fc3d__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.fc3d--hero .fc3d__body {
  max-width: 320px;
}

/* Pain chip: dim strikethrough */
.fc3d__pain {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  color: var(--oh-text-3);
  text-decoration: line-through;
  text-decoration-color: rgba(var(--oh-text-3-rgb, 120 130 150), 0.5);
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 2px 10px;
  margin-bottom: 14px;
  width: fit-content;
  opacity: 0.7;
}

/* Icon container */
.fc3d__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(var(--oh-brand-rgb), 0.08);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.18);
  margin-bottom: 14px;
  transition: background 200ms ease, border-color 200ms ease;
  flex-shrink: 0;
}

.fc3d:hover .fc3d__icon-wrap {
  background: rgba(var(--oh-brand-rgb), 0.13);
  border-color: rgba(var(--oh-brand-rgb), 0.32);
}

.fc3d__icon-wrap :deep(svg) {
  display: block;
  flex-shrink: 0;
}

.fc3d__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--oh-text);
  margin: 0 0 6px;
}

.fc3d--hero .fc3d__title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.fc3d__desc {
  font-size: 13px;
  line-height: 1.55;
  color: var(--oh-text-2);
  margin: 0;
}

/* Micro-stat proof badge */
.fc3d__stat {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--oh-brand);
  background: rgba(var(--oh-brand-rgb), 0.08);
  border: 1px solid rgba(var(--oh-brand-rgb), 0.2);
  border-radius: 20px;
  padding: 3px 10px;
  margin-top: 14px;
  width: fit-content;
}

.fc3d__stat::before {
  content: '✦';
  font-size: 8px;
  opacity: 0.7;
}

/* ─── Hero mockup column ─── */
.fc3d__mockup {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  min-width: 0;
}

/* Invoice cards */
.fc3d__invoice {
  background: var(--oh-bg, #fff);
  border: 1px solid var(--oh-border);
  border-radius: 10px;
  padding: 14px 16px;
  position: relative;
  overflow: hidden;
}

.fc3d__invoice--dim {
  opacity: 0.45;
  transform: scale(0.97);
  transform-origin: top center;
}

.fc3d__inv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.fc3d__inv-label {
  font-size: 11px;
  font-weight: 600;
  color: #404854;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}

/* Status tag — mirrors the app's real receipt status palette (a-tag colors) */
.fc3d__inv-tag {
  font-size: 10px;
  font-weight: 600;
  border-radius: 20px;
  padding: 2px 8px;
  white-space: nowrap;
}

.fc3d__inv-tag--processing {
  color: var(--oh-brand);
  background: rgba(var(--oh-brand-rgb), 0.1);
}

.fc3d__inv-tag--success {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.1);
}

.fc3d__inv-tenant {
  font-size: 12px;
  color: #404854;
  margin-bottom: 4px;
}

.fc3d__inv-period {
  font-size: 11px;
  color: #6b7280;
  margin-bottom: 8px;
}

.fc3d__inv-amount {
  font-size: 18px;
  font-weight: 700;
  color: #0f1219;
  font-variant-numeric: tabular-nums;
}

/* Pulse ring: auto-collect animation */
@keyframes inv-pulse {
  0%   { transform: scale(0.8); opacity: 0.9; }
  70%  { transform: scale(2.2); opacity: 0;   }
  100% { transform: scale(2.2); opacity: 0;   }
}

.fc3d__inv-pulse {
  position: absolute;
  top: 12px;
  right: 38px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--oh-brand);
  animation: inv-pulse 2s ease-out infinite;
}

/* Responsive: hero stacks on narrow */
@media (max-width: 640px) {
  .fc3d--hero {
    flex-direction: column;
  }

  .fc3d--hero .fc3d__body {
    max-width: none;
  }
}
</style>
