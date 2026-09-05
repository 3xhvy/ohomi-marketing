<template>
  <div
    class="oh-lang"
    role="group"
    :aria-label="t('nav.language')"
    data-testid="oh-language-switcher"
  >
    <button
      type="button"
      :class="['oh-lang__opt', { 'is-active': lang === 'en' }]"
      :aria-pressed="lang === 'en'"
      data-testid="oh-lang-en"
      @click="setLang('en')"
    >
      {{ t('nav.langEn') }}
    </button>
    <span class="oh-lang__sep" aria-hidden="true">·</span>
    <button
      type="button"
      :class="['oh-lang__opt', { 'is-active': lang === 'vi' }]"
      :aria-pressed="lang === 'vi'"
      data-testid="oh-lang-vi"
      @click="setLang('vi')"
    >
      {{ t('nav.langVi') }}
    </button>
  </div>
</template>

<script setup lang="ts">

const { t, lang, setLang } = useLandingI18n()
</script>

<style scoped>
.oh-lang {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  padding: 1px 4px;
  border-radius: 999px;
  border: 0.5px solid var(--oh-border);
  background: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.oh-lang__opt {
  background: none;
  border: none;
  min-width: 24px;
  min-height: 22px;
  padding: 0 5px;
  font: inherit;
  cursor: pointer;
  color: var(--oh-text-2);
  border-radius: 999px;
  transition:
    color 180ms ease,
    background 180ms ease;
}
.oh-lang__opt:hover {
  color: var(--oh-text);
}
.oh-lang__opt.is-active {
  color: var(--oh-brand);
}
.oh-lang__opt:focus-visible {
  outline: 2px solid var(--oh-brand-light);
  outline-offset: 1px;
}
.oh-lang__sep {
  color: var(--oh-text-3);
  opacity: 0.6;
  font-size: 11px;
}
</style>
