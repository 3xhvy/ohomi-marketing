<template>
  <div class="ohomi-landing">
    <!-- Decorative scroll indicator: drives GSAP ScrollTrigger off measured
         layout and is aria-hidden, so it has no server-render value. -->
    <ClientOnly>
      <ScrollProgress />
    </ClientOnly>
    <TopNav />
    <slot />
    <SiteFooter />
  </div>
</template>
