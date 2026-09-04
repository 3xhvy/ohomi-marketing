<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LegalPageContent, LegalSection } from '~/types/legal'
import '~/assets/css/legal-template.css'

interface Props {
  content: LegalPageContent
  pageType: 'privacy' | 'terms' | 'cookies'
  language: 'en' | 'vi'
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()

const activeSection = ref<string>('')

// Watch scroll to update active section in TOC (scrollspy)
onMounted(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll('.legal-section')
    let current = ''

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 150) {
        current = section.id
      }
    })

    activeSection.value = current
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
})

// Switch language
const switchLanguage = (lang: 'en' | 'vi') => {
  router.push({ name: route.name as string, query: { lang } })
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="ohomi-landing">
    <div class="ohomi-legal">
      <!-- Hero Section -->
      <div class="legal-hero">
        <nav class="breadcrumb">
          <NuxtLink to="/" class="link">Home</NuxtLink>
          <span>&nbsp;/&nbsp;</span>
          <span>{{ content.title }}</span>
        </nav>
        <h1>{{ content.title }}</h1>
        <p class="meta">Last updated: {{ formatDate(content.lastUpdated) }}</p>
      </div>

      <!-- Two-column layout: TOC + Content -->
      <div class="legal-container">
        <!-- Sidebar TOC (desktop only, hidden on mobile) -->
        <aside class="legal-toc">
          <nav>
            <div v-for="section in content.sections" :key="section.id" class="toc-item">
              <a
                :href="`#${section.id}`"
                :class="{ active: activeSection === section.id }"
              >
                {{ section.title }}
              </a>
            </div>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="legal-content">
          <section
            v-for="section in content.sections"
            :key="section.id"
            :id="section.id"
            class="legal-section"
          >
            <h2>{{ section.title }}</h2>
            <p>{{ section.content }}</p>

            <!-- Subsections (if any) -->
            <div v-if="section.subsections && section.subsections.length > 0" class="subsections">
              <div
                v-for="(subsection, idx) in section.subsections"
                :key="idx"
                class="legal-subsection"
              >
                <h3>{{ subsection.title }}</h3>
                <p>{{ subsection.content }}</p>
              </div>
            </div>

            <!-- Contact Block (if applicable) -->
            <div v-if="section.contact" class="contact-block">
              <p>
                <strong>Email:</strong>&nbsp;
                <a :href="`mailto:${section.contact.email}`">{{ section.contact.email }}</a>
              </p>
              <p>
                <strong>Phone:</strong>&nbsp;{{ section.contact.phone }}
              </p>
            </div>
          </section>
        </main>
      </div>

      <!-- Language Switcher -->
      <div class="language-switcher">
        <a
          href="#"
          :class="{ active: language === 'en' }"
          @click.prevent="switchLanguage('en')"
        >
          EN
        </a>
        <a
          href="#"
          :class="{ active: language === 'vi' }"
          @click.prevent="switchLanguage('vi')"
        >
          VI
        </a>
      </div>
    </div>
  </div>
</template>
