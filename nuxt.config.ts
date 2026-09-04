export default defineNuxtConfig({
  compatibilityDate: '2026-09-04',
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/landing.css'],
  // Ported components reference each other by bare name (`<HeroSection />`), so
  // directory-based prefixing would silently render them as unknown elements.
  components: [{ path: '~/components', pathPrefix: false }],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://ohomi.net',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://ohomi.vn',
      // The nav login link left the app's own domain when marketing moved here,
      // so it can no longer be a relative path.
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'https://host.ohomi.net',
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
