<template>
  <a
    v-if="!isLoading"
    :href="href"
    :class="['oh-cta', `oh-cta--${variant}`]"
    :aria-busy="isLoading"
  >
    <slot />
  </a>
  <button
    v-else
    type="button"
    :class="['oh-cta', `oh-cta--${variant}`, 'is-loading']"
    disabled
    aria-busy="true"
  >
    <span class="oh-cta__spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type CtaVariant = 'primary' | 'secondary'

withDefaults(
  defineProps<{
    href: string
    variant?: CtaVariant
  }>(),
  {
    variant: 'primary',
  },
)

const isLoading = ref(false)
</script>

<style scoped>
.oh-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  padding: 12px 20px;
  border-radius: var(--oh-radius-md);
  transition:
    background-color 200ms ease-out,
    color 200ms ease-out,
    border-color 200ms ease-out,
    box-shadow 200ms ease-out;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  gap: 8px;
}

.oh-cta--primary {
  background: var(--oh-brand);
  color: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 118, 110, 0.15);
}

.oh-cta--primary:hover:not(.is-loading) {
  background: var(--oh-brand-hover);
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.25);
}

.oh-cta--primary:focus-visible {
  outline: 2px solid var(--oh-brand);
  outline-offset: 2px;
}

.oh-cta--secondary {
  background: transparent;
  color: var(--oh-text);
  border: 1px solid var(--oh-border);
  padding: 11px 19px;
}

.oh-cta--secondary:hover:not(.is-loading) {
  background: var(--oh-brand-soft);
  color: var(--oh-brand);
  border-color: var(--oh-brand-light);
}

.oh-cta--secondary:focus-visible {
  outline: 2px solid var(--oh-brand);
  outline-offset: 2px;
}

.oh-cta.is-loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.oh-cta__spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .oh-cta {
    transition: none;
  }

  .oh-cta__spinner {
    animation: none;
    border-top-color: currentColor;
  }
}
</style>
