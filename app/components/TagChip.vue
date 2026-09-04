<template>
  <span :class="['oh-chip', `oh-chip--${variant}`]">{{ label }}</span>
</template>

<script lang="ts">
export type TagChipVariant = 'peach' | 'blue' | 'green' | 'lavender' | 'amber'
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: TagChipVariant
    label: string
  }>(),
  {
    variant: 'peach',
  },
)
</script>

<style scoped>
.oh-chip {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.01em;
  line-height: 1.4;
}
.oh-chip--peach {
  background: var(--oh-chip-peach-bg);
  color: var(--oh-chip-peach-fg);
}
.oh-chip--blue {
  background: var(--oh-chip-blue-bg);
  color: var(--oh-chip-blue-fg);
}
.oh-chip--green {
  background: var(--oh-chip-green-bg);
  color: var(--oh-chip-green-fg);
}
.oh-chip--lavender {
  background: var(--oh-chip-lavender-bg);
  color: var(--oh-chip-lavender-fg);
}
.oh-chip--amber {
  background: var(--oh-chip-amber-bg);
  color: var(--oh-chip-amber-fg);
}
</style>
