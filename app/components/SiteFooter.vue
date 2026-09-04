<!-- web/src/pages/landing/sections/SiteFooter.vue -->
<template>
  <footer class="oh-footer">
    <div class="oh-footer__inner">
      <div class="oh-footer__col oh-footer__col--brand">
        <OwenHomeLogo :width="120" :height="32" />
        <p>{{ t('footer.tagline') }}</p>
        <div class="oh-footer__social">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Zalo">z</a>
          <a href="#" aria-label="YouTube">▶</a>
        </div>
      </div>

      <div class="oh-footer__col">
        <h4>{{ t('footer.productHeading') }}</h4>
        <ul>
          <li><NuxtLink to="/product?tab=web">{{ t('footer.linkProduct') }}</NuxtLink></li>
          <li><NuxtLink to="/product?tab=mobile">{{ t('footer.linkMobileApp') }}</NuxtLink></li>
        </ul>
      </div>

      <div class="oh-footer__col">
        <h4>{{ t('footer.companyHeading') }}</h4>
        <ul>
          <li><NuxtLink to="/about">{{ t('footer.linkAbout') }}</NuxtLink></li>
          <li><NuxtLink to="/about#team">{{ t('footer.linkTeam') }}</NuxtLink></li>
          <li><NuxtLink to="/about#voucher">{{ t('footer.linkOffers') }}</NuxtLink></li>
          <li><NuxtLink to="/blog">{{ t('footer.linkBlog') }}</NuxtLink></li>
          <li><NuxtLink to="/demo">{{ t('footer.linkDemo') }}</NuxtLink></li>
        </ul>
      </div>

      <div class="oh-footer__col">
        <h4>{{ t('footer.legalHeading') }}</h4>
        <ul>
          <li><NuxtLink to="/privacy">{{ t('footer.legalPrivacy') }}</NuxtLink></li>
        </ul>
      </div>
    </div>

    <div class="oh-footer__bottom">
      <p>{{ bottomText }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useLandingI18n()
const year = new Date().getFullYear()
const bottomText = computed(() =>
  (t('footer.bottomRight') as string).replace('{year}', String(year)),
)
</script>

<style scoped>
.oh-footer {
  background: var(--oh-glass-dark);
  backdrop-filter: blur(10px) saturate(1.12);
  -webkit-backdrop-filter: blur(10px) saturate(1.12);
  color: var(--oh-text-2);
  padding: 64px 24px 0;
}

.oh-footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--oh-card-3d-border);
}

.oh-footer__col--brand p {
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0 20px;
  max-width: 220px;
  color: var(--oh-text-2);
}

.oh-footer__social {
  display: flex;
  gap: 10px;
}

.oh-footer__social a {
  width: 32px;
  height: 32px;
  border-radius: var(--oh-radius-full, 999px);
  border: 1px solid var(--oh-card-3d-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--oh-text-2);
  text-decoration: none;
}

.oh-footer__col h4 {
  margin: 0 0 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--oh-text);
}

.oh-footer__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.oh-footer__col a {
  color: var(--oh-text-2);
  text-decoration: none;
  font-size: 14px;
}

.oh-footer__col a:hover {
  color: var(--oh-brand-light);
}

.oh-footer__bottom {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 0 28px;
  font-size: 13px;
  color: var(--oh-text-3);
}

@media (max-width: 900px) {
  .oh-footer__inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .oh-footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>
