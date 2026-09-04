export default defineNuxtPlugin(() => {
  const { setLang } = useLandingI18n()

  // Restoring after hydration is deliberate: applying it during setup would make
  // the client render `en` while the server sent `vi`, which Vue flags as a
  // hydration mismatch.
  onNuxtReady(() => {
    try {
      const stored = window.localStorage.getItem('owen_language')
      if (stored === 'en' || stored === 'vi') setLang(stored)
    } catch {
      // private mode
    }
  })
})
