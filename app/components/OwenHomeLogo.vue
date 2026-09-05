<template>
  <span class="oh-logo" :style="{ width: `${width}px`, height: `${height}px` }">
    <img class="oh-logo__mark" src="/logo.png" alt="" width="32" height="32" />
    <span class="oh-logo__word">Ohomi</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: number | string
  height?: number | string
}>(), {
  width: 118,
  height: 32,
})
</script>

<style scoped>
.oh-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: inherit;
}

.oh-logo__mark {
  width: 26px;
  height: 26px;
  object-fit: contain;
  flex-shrink: 0;
}

.oh-logo__word {
  font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  color: inherit;
}
</style>
