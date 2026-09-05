<!-- web/src/pages/landing/components/DemoForm.vue -->
<template>
  <div v-if="success" class="df-success">
    <div class="df-success__icon">✓</div>
    <h3>{{ t('finalCta.successTitle') }}</h3>
    <p>{{ t('finalCta.successSub') }}</p>
    <button type="button" class="df-again" @click="reset">{{ t('finalCta.successAgain') }}</button>
  </div>

  <form v-else class="df-form" @submit.prevent="submit" novalidate>
    <div class="df-field">
      <label for="df-name">{{ t('finalCta.fieldName') }}</label>
      <input
        id="df-name"
        v-model="form.name"
        name="name"
        type="text"
        autocomplete="name"
        required
        :placeholder="t('finalCta.fieldName')"
        :aria-invalid="!!errors.name"
        :aria-describedby="errors.name ? 'df-name-error' : undefined"
      />
      <span v-if="errors.name" id="df-name-error" class="df-error" role="alert">{{ errors.name }}</span>
    </div>
    <div class="df-field">
      <label for="df-phone">{{ t('finalCta.fieldPhone') }}</label>
      <input
        id="df-phone"
        v-model="form.phone"
        name="tel"
        type="tel"
        autocomplete="tel"
        required
        :placeholder="t('finalCta.phonePlaceholder')"
        :aria-invalid="!!errors.phone"
        :aria-describedby="errors.phone ? 'df-phone-error' : undefined"
      />
      <span v-if="errors.phone" id="df-phone-error" class="df-error" role="alert">{{ errors.phone }}</span>
    </div>
    <div class="df-field">
      <label for="df-rooms">{{ t('finalCta.fieldRooms') }}</label>
      <select
        id="df-rooms"
        v-model="form.rooms"
        required
        :aria-invalid="!!errors.rooms"
        :aria-describedby="errors.rooms ? 'df-rooms-error' : undefined"
      >
        <option value="" disabled>{{ t('finalCta.fieldRooms') }}</option>
        <option v-for="opt in tList<string>('finalCta.roomsOptions')" :key="opt" :value="opt">{{ opt }}</option>
      </select>
      <span v-if="errors.rooms" id="df-rooms-error" class="df-error" role="alert">{{ errors.rooms }}</span>
    </div>
    <div v-if="submitError" class="df-error-block">
      <span class="df-error df-error--submit" role="alert">{{ submitError }}</span>
      <button type="button" class="df-retry" @click="submit">{{ t('finalCta.errorRetry') }}</button>
    </div>
    <button type="submit" class="df-submit" :disabled="loading" :aria-busy="loading">
      <span v-if="loading">...</span>
      <span v-else>{{ t('finalCta.submit') }}</span>
    </button>
    <div class="df-trust">
      <span v-for="item in tList<string>('finalCta.trustItems')" :key="item">✓ {{ item }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ source?: string }>(), { source: 'landing' })
const emit = defineEmits<{ (e: 'success'): void }>()
const { t, tList } = useLandingI18n()
const { apiBase } = useRuntimeConfig().public
const { selectedRooms } = useDemoIntent()

const form = reactive({ name: '', phone: '', rooms: selectedRooms.value })

const errors = reactive({ name: '', phone: '', rooms: '' })
const loading = ref(false)
const success = ref(false)
const submitError = ref('')

watch(selectedRooms, (value) => {
  if (value) form.rooms = value
})

function reset() {
  success.value = false
  submitError.value = ''
}

function validate(): boolean {
  errors.name = form.name.trim() ? '' : t('finalCta.errorRequired')
  errors.phone = /^[0-9\s+\-]{8,15}$/.test(form.phone.trim()) ? '' : t('finalCta.errorPhoneInvalid')
  errors.rooms = form.rooms ? '' : t('finalCta.errorRequired')
  return !errors.name && !errors.phone && !errors.rooms
}

async function submit() {
  submitError.value = ''
  if (!validate()) return
  loading.value = true
  try {
    const res = await fetch(`${apiBase}/api/public/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source: props.source }),
    })
    if (res.status === 429) {
      submitError.value = t('finalCta.errorRateLimited')
      return
    }
    if (!res.ok) throw new Error(`lead submit failed: ${res.status}`)
    success.value = true
    emit('success')
  } catch {
    submitError.value = t('finalCta.errorSubmit')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.df-form { display: flex; flex-direction: column; gap: 18px; }

.df-field { display: flex; flex-direction: column; gap: 7px; }
.df-field label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.df-field input,
.df-field select {
  padding: 13px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.06);
  color: #f0f4f8;
  transition: border-color 180ms, background 180ms, box-shadow 180ms;
  appearance: none;
  -webkit-appearance: none;
}

.df-field input::placeholder { color: rgba(255, 255, 255, 0.5); }
.df-field select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 40px; cursor: pointer; }
.df-field select option { background: #0f2028; color: #f0f4f8; }

.df-field input:focus,
.df-field select:focus {
  outline: none;
  border-color: #14b8a6;
  background: rgba(20, 184, 166, 0.08);
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
}

.df-error { font-size: 12px; color: #fdba74; }
.df-error--submit { text-align: center; }
.df-error-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.df-retry,
.df-again {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #f0f4f8;
  border-radius: 10px;
  padding: 10px 16px;
  min-height: 44px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.df-again { margin-top: 16px; }

.df-submit {
  padding: 15px;
  background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: opacity 150ms, box-shadow 150ms, transform 100ms;
  box-shadow: 0 4px 20px rgba(20, 184, 166, 0.3);
  margin-top: 4px;
}
.df-submit:hover:not(:disabled) {
  opacity: 0.92;
  box-shadow: 0 6px 28px rgba(20, 184, 166, 0.45);
  transform: translateY(-1px);
}
.df-submit:active:not(:disabled) { transform: translateY(0); }
.df-submit:disabled { opacity: 0.5; cursor: not-allowed; }

.df-trust {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 12px;
  color: #5eead4;
  padding-top: 4px;
}

.df-success {
  text-align: center;
  padding: 32px 0;
}
.df-success__icon {
  width: 52px; height: 52px;
  background: linear-gradient(135deg, #14b8a6, #0f766e);
  color: #fff;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(20, 184, 166, 0.4);
}
.df-success h3 { font-size: 20px; font-weight: 700; color: #f0f4f8; margin: 0 0 8px; }
.df-success p  { color: rgba(255,255,255,0.55); margin: 0; }
</style>
