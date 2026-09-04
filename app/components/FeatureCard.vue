<template>
  <article class="oh-fcard">
    <header class="oh-fcard__head">
      <TagChip :variant="chipVariant" :label="chipLabel" />
      <span class="oh-fcard__code font-mono-plus">{{ code }}</span>
    </header>
    <h3 class="oh-fcard__title">{{ title }}</h3>
    <p class="oh-fcard__desc">{{ description }}</p>
  </article>
</template>

<script setup lang="ts">
import TagChip, { type TagChipVariant } from './TagChip.vue'

defineProps<{
  chipVariant: TagChipVariant
  chipLabel: string
  code: string
  title: string
  description: string
}>()
</script>

<style scoped>
.oh-fcard {
  background: linear-gradient(135deg, #ffffff 0%, rgba(15, 118, 110, 0.02) 100%);
  border: 1px solid var(--oh-border);
  border-radius: var(--oh-radius-lg);
  padding: 20px 22px;
  cursor: pointer;
  transition:
    box-shadow 200ms ease-out,
    transform 200ms ease-out,
    border-color 200ms ease-out,
    background 200ms ease-out;
}

.oh-fcard:hover {
  box-shadow: 0 8px 24px rgba(15, 118, 110, 0.12);
  border-color: var(--oh-brand-light);
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(224, 247, 246, 0.3), rgba(3, 105, 161, 0.02));
}

.oh-fcard:focus-within {
  box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2);
  border-color: var(--oh-brand);
}

.oh-fcard__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.oh-fcard__code {
  font-size: 11px;
  color: var(--oh-text-3);
  letter-spacing: 0.06em;
  font-weight: 600;
  background: linear-gradient(90deg, var(--oh-brand), var(--oh-accent-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.oh-fcard__title {
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--oh-text), var(--oh-brand-ink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 6px 0;
}

.oh-fcard__desc {
  font-size: 13px;
  color: var(--oh-text-2);
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

@media (prefers-reduced-motion: reduce) {
  .oh-fcard {
    transition: none;
  }

  .oh-fcard:hover {
    transform: none;
  }
}
</style>
