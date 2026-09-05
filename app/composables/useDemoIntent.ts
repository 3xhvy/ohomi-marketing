export function useDemoIntent() {
  const selectedRooms = useState<string>('demo-rooms', () => '')
  const route = useRoute()

  function goToDemo(rooms?: string) {
    if (rooms) selectedRooms.value = rooms
    if (import.meta.client && document.getElementById('final-cta')) {
      document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    return navigateTo({ path: '/demo', hash: rooms ? undefined : undefined })
  }

  function goToPricing() {
    if (import.meta.client && document.getElementById('pricing')) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (route.path === '/') {
      return navigateTo({ path: '/', hash: 'pricing' })
    }
    return navigateTo('/#pricing')
  }

  return { selectedRooms, goToDemo, goToPricing }
}
