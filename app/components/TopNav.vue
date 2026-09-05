<!-- web/src/pages/landing/sections/TopNav.vue -->
<template>
  <nav
    class="oh-nav"
    :class="[
      `oh-nav--over-${navTheme}`,
      { 'oh-nav--scrolled': scrolled, 'oh-nav--mobile-open': mobileOpen },
    ]"
    data-testid="oh-topnav"
    aria-label="Primary"
  >
    <div class="oh-nav__inner">
      <NuxtLink to="/" class="oh-nav__brand" aria-label="Ohomi">
        <OwenHomeLogo :width="118" :height="28" />
      </NuxtLink>

      <ul class="oh-nav__links" role="list">
        <li v-for="link in navLinks" :key="link.id">
          <NuxtLink
            :to="link.to"
            :class="{ 'is-active': isActive(link.to) }"
          >{{ link.label }}</NuxtLink>
        </li>
      </ul>

      <div class="oh-nav__actions">
        <LanguageSwitcher />
        <a :href="`${appUrl}/host/login`" class="oh-nav__login">{{ t('nav.login') }}</a>
        <CtaButton :href="demoHref" variant="primary" @click.prevent="goDemo">
          {{ t('nav.bookDemo') }}
        </CtaButton>
      </div>

      <button class="oh-nav__burger" :aria-expanded="mobileOpen" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span /><span /><span />
      </button>
    </div>

    <div v-if="mobileOpen" class="oh-nav__mobile" role="dialog" aria-modal="true" :aria-label="t('nav.home')" @click="mobileOpen = false">
      <ul role="list">
        <li v-for="link in navLinks" :key="link.id">
          <NuxtLink :to="link.to" @click="mobileOpen = false">{{ link.label }}</NuxtLink>
        </li>
        <li>
          <a :href="`${appUrl}/host/login`" @click="mobileOpen = false">{{ t('nav.login') }}</a>
        </li>
        <li>
          <a :href="demoHref" @click.prevent="goDemo">{{ t('nav.bookDemo') }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { t } = useLandingI18n()
const route = useRoute()
const { appUrl } = useRuntimeConfig().public
const y = useScrollY()
const scrolled = computed(() => y.value > 60)
const mobileOpen = ref(false)
const navTheme = ref<'dark' | 'light' | 'brand-dark'>('dark')

watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && mobileOpen.value) mobileOpen.value = false
}

const navLinks = computed(() => [
  { to: '/', id: 'home', label: t('nav.home') },
  { to: '/product', id: 'product', label: t('nav.product') },
  { to: '/about', id: 'about', label: t('nav.about') },
  { to: '/blog', id: 'blog', label: t('nav.blog') },
])

// Path-based rather than the source's `route.name` check: Nuxt derives route
// names from the file tree, so the old `landing-*` names no longer exist.
function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

const { goToDemo } = useDemoIntent()
const demoHref = computed(() => (route.path === '/' ? '#final-cta' : '/demo'))

function goDemo() {
  mobileOpen.value = false
  if (route.path === '/') {
    goToDemo()
    return
  }
  navigateTo('/demo')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.oh-nav {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  padding: 8px 16px;
  transition: background 300ms ease;
}

.oh-nav__inner {
  width: 100%;
  max-width: none;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 20px;
  border: 1px solid transparent;
  border-radius: var(--oh-radius-lg);
  backdrop-filter: blur(22px) saturate(1.65);
  -webkit-backdrop-filter: blur(22px) saturate(1.65);
  transition:
    background 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease,
    color 320ms ease;
}

.oh-nav--over-dark .oh-nav__inner {
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025)),
    rgba(8, 15, 26, 0.62);
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 14px 34px rgba(0, 0, 0, 0.28);
}

.oh-nav--over-light .oh-nav__inner {
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.62)),
    rgba(255, 255, 255, 0.7);
  border-color: rgba(15, 23, 42, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 12px 30px rgba(15, 23, 42, 0.1);
}

.oh-nav--over-brand-dark .oh-nav__inner {
  background:
    linear-gradient(120deg, rgba(var(--oh-brand-rgb), 0.24), rgba(255, 255, 255, 0.05)),
    rgba(8, 15, 26, 0.68);
  border-color: rgba(20, 184, 166, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 16px 38px rgba(15, 118, 110, 0.16);
}

.oh-nav__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: #f8fafc;
}

.oh-nav__brand :deep(.oh-logo) {
  gap: 6px;
}

.oh-nav__brand :deep(.oh-logo__mark) {
  width: 22px;
  height: 22px;
}

.oh-nav__brand :deep(.oh-logo__word) {
  font-size: 1.05rem;
}

.oh-nav--over-light .oh-nav__brand {
  color: var(--oh-text);
}

.oh-nav__links {
  display: flex;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.oh-nav__links a {
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--oh-text-2);
  border: none;
  border-radius: var(--oh-radius-md);
  transition:
    color 180ms ease,
    background 180ms ease;
  text-decoration: none;
}

.oh-nav__links a:hover {
  color: var(--oh-text);
  background: var(--oh-brand-soft);
}

.oh-nav__links a.is-active {
  color: var(--oh-brand);
  background: var(--oh-brand-soft);
}

.oh-nav__links a:focus-visible {
  outline: 2px solid var(--oh-brand-light);
  outline-offset: 2px;
}

.oh-nav__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.oh-nav__actions :deep(.oh-cta) {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 600;
}

.oh-nav--over-dark :deep(.oh-lang),
.oh-nav--over-brand-dark :deep(.oh-lang) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.16);
}

.oh-nav--over-dark :deep(.oh-lang__opt),
.oh-nav--over-brand-dark :deep(.oh-lang__opt) {
  color: rgba(226, 232, 240, 0.7);
}

.oh-nav--over-dark :deep(.oh-lang__opt:hover),
.oh-nav--over-brand-dark :deep(.oh-lang__opt:hover) {
  color: #f8fffe;
}

.oh-nav--over-dark :deep(.oh-lang__opt.is-active),
.oh-nav--over-brand-dark :deep(.oh-lang__opt.is-active) {
  color: var(--oh-brand-light);
}

.oh-nav__login {
  font-size: 14px;
  color: var(--oh-text-2);
  transition: color 150ms;
}
.oh-nav__login:hover { color: var(--oh-text); }
.oh-nav__login:focus-visible {
  outline: 2px solid var(--oh-brand-light);
  outline-offset: 3px;
  border-radius: 4px;
}

.oh-nav--over-dark .oh-nav__links a,
.oh-nav--over-brand-dark .oh-nav__links a,
.oh-nav--over-dark .oh-nav__login,
.oh-nav--over-brand-dark .oh-nav__login {
  color: rgba(226, 232, 240, 0.76);
}

.oh-nav--over-dark .oh-nav__links a:hover,
.oh-nav--over-brand-dark .oh-nav__links a:hover {
  color: #f8fffe;
  background: rgba(var(--oh-brand-rgb), 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.oh-nav--over-dark .oh-nav__login:hover,
.oh-nav--over-brand-dark .oh-nav__login:hover {
  color: #fff;
}

.oh-nav--over-dark .oh-nav__links a.is-active,
.oh-nav--over-brand-dark .oh-nav__links a.is-active {
  color: var(--oh-brand-light);
  background: rgba(var(--oh-brand-rgb), 0.26);
}

.oh-nav--over-dark .oh-nav__links a.is-active:hover,
.oh-nav--over-brand-dark .oh-nav__links a.is-active:hover {
  color: #f0fdfa;
  background: rgba(var(--oh-brand-rgb), 0.34);
}

.oh-nav--over-light .oh-nav__links a,
.oh-nav--over-light .oh-nav__login {
  color: var(--oh-text-2);
}

.oh-nav--over-light .oh-nav__links a:hover,
.oh-nav--over-light .oh-nav__login:hover {
  color: var(--oh-text);
}

.oh-nav--over-light .oh-nav__links a.is-active {
  color: var(--oh-brand);
  background: var(--oh-brand-soft);
}

.oh-nav--over-dark .oh-nav__burger span,
.oh-nav--over-brand-dark .oh-nav__burger span {
  background: rgba(226, 232, 240, 0.88);
}

.oh-nav--over-light .oh-nav__burger span {
  background: var(--oh-text);
}

.oh-nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}
.oh-nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--oh-text);
  border-radius: 2px;
}

.oh-nav__mobile {
  position: fixed;
  inset: 0;
  background: var(--oh-surface);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}
.oh-nav__mobile ul { list-style: none; padding: 0; margin: 0; text-align: center; }
.oh-nav__mobile li { margin: 0; }
.oh-nav__mobile a {
  display: block;
  min-height: 44px;
  padding: 16px 24px;
  font-size: 22px;
  font-weight: 600;
  color: var(--oh-text);
  text-decoration: none;
}

@media (min-width: 1200px) {
  .oh-nav {
    padding: 8px 24px;
  }
  .oh-nav__inner {
    padding: 8px 24px;
  }
}

@media (max-width: 900px) {
  .oh-nav {
    padding: 6px 12px;
  }
  .oh-nav__inner {
    padding: 4px 8px;
    gap: 10px;
  }
  .oh-nav__links { display: none; }
  .oh-nav__login { display: none; }
  .oh-nav__burger { display: flex; }
}

@media (max-width: 520px) {
  .oh-nav {
    padding: 6px 8px;
  }
  .oh-nav__inner {
    gap: 6px;
    padding: 4px 8px;
  }
  .oh-nav__brand :deep(.oh-logo__word) {
    font-size: 1rem;
  }
  .oh-nav__actions {
    gap: 4px;
    min-width: 0;
  }
  .oh-nav__actions :deep(.oh-cta) {
    padding: 7px 10px;
    font-size: 13px;
  }
}
</style>
