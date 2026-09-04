export default defineNuxtConfig({
  compatibilityDate: '2026-09-04',
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/landing.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://ohomi.net',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://ohomi.vn',
    },
  },
  routeRules: {
    '/blog': { isr: 600 },
    '/blog/**': { isr: 600 },
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})
