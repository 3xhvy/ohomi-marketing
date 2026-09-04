<!-- web/src/pages/landing/sections/ScrollProgress.vue -->
<template>
  <div class="oh-progress" aria-hidden="true">
    <svg class="oh-progress__track" width="16" height="162" viewBox="0 0 16 162" fill="none">
      <line x1="8" y1="0" x2="8" y2="162" stroke="#14b8a6" stroke-width="1.5" opacity="0.25" />
      <circle
        v-for="(dot, i) in DOTS"
        :key="i"
        :cx="8"
        :cy="dot.cy"
        :r="activeIdx === i ? 5.5 : 3.5"
        :fill="activeIdx === i ? '#14b8a6' : 'none'"
        stroke="#14b8a6"
        :stroke-width="activeIdx === i ? 0 : 1.5"
        :opacity="activeIdx === i ? 1 : 0.45"
        style="pointer-events: auto; cursor: default; transition: r 0.15s ease, opacity 0.15s ease;"
        @mouseenter="hoveredIdx = i"
        @mouseleave="hoveredIdx = -1"
      />
    </svg>
    <span
      v-for="(dot, i) in DOTS"
      :key="`l${i}`"
      class="oh-progress__label"
      :style="{ top: `${dot.cy}px`, opacity: hoveredIdx === i ? 1 : 0 }"
    >{{ dot.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOTS = [
  { cy: 0,   label: 'For Landlords' },
  { cy: 27,  label: 'For Tenants' },
  { cy: 54,  label: 'Web App' },
  { cy: 81,  label: 'Mobile App' },
  { cy: 108, label: 'Smart Home' },
  { cy: 135, label: 'Customers' },
  { cy: 162, label: 'Get Started' },
]

const activeIdx  = ref(-1)
const hoveredIdx = ref(-1)
const triggers: ScrollTrigger[] = []

onMounted(() => {
  document.querySelectorAll<HTMLElement>('.oh-stack').forEach((el, i) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter:     () => { activeIdx.value = i },
        onEnterBack: () => { activeIdx.value = i },
      })
    )
  })
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<style scoped>
.oh-progress {
  position: fixed;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  pointer-events: none;
  user-select: none;
}

.oh-progress__track { display: block; overflow: visible; }

.oh-progress__label {
  position: absolute;
  left: 20px;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 600;
  color: #14b8a6;
  white-space: nowrap;
  letter-spacing: 0.03em;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

@media (max-width: 900px) {
  .oh-progress { display: none; }
}
</style>
