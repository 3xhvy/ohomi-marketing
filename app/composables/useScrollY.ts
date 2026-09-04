/**
 * Current vertical scroll offset, SSR-safe.
 *
 * Replaces `useScroll(window)` from @vueuse/core, which the source components
 * called at setup time — that dereferences `window` during server rendering and
 * crashes the request. Starts at 0 on the server and begins tracking on mount.
 */
export function useScrollY() {
  const y = ref(0)

  onMounted(() => {
    const update = () => {
      y.value = window.scrollY
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', update))
  })

  return y
}

/**
 * Whether the visitor asked for reduced motion. Replaces `useMediaQuery` from
 * @vueuse/core for the same SSR reason. Defaults to `false` on the server so the
 * animated markup is what gets rendered and hydrated.
 */
export function useReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    const update = (e: MediaQueryListEvent) => {
      reduced.value = e.matches
    }
    mq.addEventListener('change', update)
    onUnmounted(() => mq.removeEventListener('change', update))
  })

  return reduced
}
