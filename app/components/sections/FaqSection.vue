<template>
  <section id="faq" class="oh-section oh-faq">
    <div class="oh-faq__inner">
      <div class="oh-faq__header">
        <p class="oh-eyebrow">{{ t('faq.eyebrow') }}</p>
        <h2 class="oh-h2 oh-h2--light">{{ t('faq.heading') }}</h2>
      </div>
      <div class="oh-faq__list">
        <div v-for="(item, i) in items" :key="i" class="oh-faq__item">
          <button
            type="button"
            class="oh-faq__question"
            data-testid="oh-faq-question"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-answer-${i}`"
            @click="toggle(i)"
          >
            <span>{{ item.question }}</span>
            <span class="oh-faq__chevron" aria-hidden="true">{{ openIndex === i ? '−' : '+' }}</span>
          </button>
          <div
            :id="`faq-answer-${i}`"
            class="oh-faq__answer"
            data-testid="oh-faq-answer"
            :hidden="openIndex !== i"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const { t, dict } = useLandingI18n()
const items = computed(() => dict.value.faq.items)
const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<style scoped>
.oh-faq {
  padding: 96px 24px 80px;
  text-align: center;
  background: radial-gradient(
    ellipse 70% 50% at 50% 0%,
    rgba(var(--oh-brand-rgb), 0.1),
    transparent 65%
  );
}

.oh-faq__inner {
  max-width: 720px;
  margin: 0 auto;
}

.oh-faq__header {
  margin-bottom: 40px;
}

.oh-faq__list {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.oh-faq__item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--oh-radius-lg);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.oh-faq__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: none;
  border: none;
  color: var(--oh-text);
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.oh-faq__chevron {
  flex-shrink: 0;
  color: var(--oh-brand-light);
  font-size: 20px;
}

.oh-faq__answer {
  padding: 0 20px 18px;
  color: var(--oh-text-2);
  font-size: 15px;
  line-height: 1.6;
}

.oh-faq__answer p {
  margin: 0;
}
</style>
