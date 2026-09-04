export type LandingLang = 'en' | 'vi'

export interface LabelValue {
  value: string
  caption: string
}

export interface PairRow {
  pain?: string
  solution?: string
  with?: string
  without?: string
}

export interface QaItem {
  question: string
  answer: string
}

export interface FeatureCopy {
  chipLabel: string
  title: string
  description: string
}

export interface FeatureCardCopy {
  title: string
  desc: string
  stat: string
  pain: string
}

export interface LandingDict {
  nav: {
    home: string
    product: string
    about: string
    blog: string
    login: string
    bookDemo: string
    language: string
    langEn: string
    langVi: string
  }
  hero: {
    chipProperties: string
    chipTenants: string
    chipSmartHome: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    note: string
  }
  problem: {
    eyebrow: string
    items: { pain: string; solution: string }[]
  }
  tabs: {
    eyebrow: string
    heading: string
    labels: {
      properties: string
      tenants: string
      'smart-home': string
    }
    features: Record<string, FeatureCopy>
  }
  comparison: {
    eyebrow: string
    heading: string
    withLabel: string
    withoutLabel: string
    rows: { with: string; without: string }[]
  }
  stats: {
    items: LabelValue[]
  }
  testimonial: {
    quote: string
    name: string
    role: string
    initials: string
  }
  hero3d: {
    badge: string
    title: string
    titleLine1: string
    titleLine2: string
    sub: string
    subStart: string
    subMetric: string
    subEnd: string
    ctaDemo: string
    ctaApp: string
    ctaIos: string
    ctaAndroid: string
    proofItems: string[]
    pressLabel: string
    scrollHint: string
    socialProof: string
    cardA: {
      title: string
      tenant: string
      amount: string
      due: string
      paid: string
      more: string
      viewAll: string
    }
    cardB: {
      delta: string
      label: string
    }
    commandCenter: {
      eyebrow: string
      occupancy: string
      occupancyValue: string
      contracts: string
      contractsValue: string
      maintenance: string
      maintenanceValue: string
      revenue: string
      revenueValue: string
    }
    dashboard: {
      eyebrow: string
      title: string
      period: string
      propertyA: string
      propertyB: string
      propertyC: string
      occupancyLabel: string
      revenueLabel: string
      contractsLabel: string
      maintenanceLabel: string
      calendarTitle: string
      paid: string
      due: string
      vacant: string
      ticketsTitle: string
      ticket1: string
      ticket2: string
      propertyCardTitle: string
      propertyCardMeta: string
      alertTitle: string
      alertMeta: string
      screenshotAlt: string
    }
  }
  landlord: {
    eyebrow: string
    heading: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    ctaNote: string
    proofPairs: Array<{ before: string; after: string }>
    features: {
      autoInvoice: FeatureCardCopy
      contractAlert: FeatureCardCopy
      revenueDash: FeatureCardCopy
      maintenance: FeatureCardCopy
      occupancy: FeatureCardCopy
      multiProperty: FeatureCardCopy
    }
  }
  tenants: {
    eyebrow: string
    heading: string
    lead: string
    steps: Array<{ title: string; desc: string; stat: string }>
    history: {
      title: string
      meta: string
      items: Array<{ label: string; badge: string }>
    }
    ctaIos: string
    ctaAndroid: string
  }
  mobileApp: {
    eyebrow: string
    heading: string
    lead: string
    features: string[]
    socialProof: string
    stats: Array<{ number: string; label: string }>
    qrLabel: string
    storeCaption: string
    badgeAppStore: string
    badgePlayStore: string
    mockScreens: Array<{ label: string; value: string; lines: number[] }>
  }
  webApp: {
    eyebrow: string
    heading: string
    lead: string
    features: Array<{ title: string; desc: string }>
    dashboard: {
      period: string
      navItems: Array<{ label: string; badge?: string }>
      stats: Array<{ label: string; value: string; sub: string; type: 'ok' | 'warn' }>
      propListTitle: string
      propViewAll: string
      props: Array<{ name: string; meta: string; occ: string; level: 'high' | 'med' }>
      todayTitle: string
      todayBadge: string
      tickets: Array<{ text: string; meta: string; type: 'open' | 'urgent' | 'ok' }>
    }
  }
  smartHome: {
    eyebrow: string
    heading: string
    lead: string
    features: Array<{ title: string; desc: string }>
    devicePanel: {
      title: string
      livePill: string
      devices: Array<{
        name: string
        reading: string
        unit: string
        status: string
        type: 'ok' | 'warn'
      }>
    }
    feed: {
      title: string
      items: Array<{ time: string; event: string; badge: string; type: 'ok' | 'warn' }>
    }
    metrics: Array<{ value: string; label: string }>
  }
  socialProofSection: {
    eyebrow: string
    heading: string
    items: Array<{ quote: string; name: string; role: string; initials: string }>
  }
  pricingSection: {
    eyebrow: string
    heading: string
    lead: string
    bestValue: string
    plans: Array<{
      tier: string
      range: string
      price: string
      unit: string
      period: string
      features: string[]
      cta: string
      highlight: boolean
    }>
  }
  finalCta: {
    eyebrow: string
    heading: string
    lead: string
    fieldName: string
    fieldPhone: string
    fieldRooms: string
    roomsOptions: string[]
    submit: string
    trustItems: string[]
    successTitle: string
    successSub: string
    phonePlaceholder: string
    errorRequired: string
    errorPhoneInvalid: string
    errorSubmit: string
    errorRateLimited: string
  }
  faq: {
    eyebrow: string
    heading: string
    items: QaItem[]
  }
  footer: {
    tagline: string
    productHeading: string
    linkProduct: string
    linkMobileApp: string
    companyHeading: string
    linkAbout: string
    linkTeam: string
    linkOffers: string
    linkBlog: string
    linkDemo: string
    legalHeading: string
    legalPrivacy: string
    bottomRight: string
  }
  product: {
    tabsLabel: string
    tabWeb: string
    tabMobile: string
  }
  about: {
    storyEyebrow: string
    storyHeading: string
    storyParagraphs: string[]
    contactHeading: string
    contactEmail: string
    contactPhone: string
    contactCity: string
    teamEyebrow: string
    teamHeading: string
    teamMembers: Array<{ name: string; role: string; photo: string }>
    voucherEyebrow: string
    voucherHeading: string
    vouchers: Array<{ title: string; description: string; code: string; validUntil: string }>
    vouchersEmpty: string
  }
  blog: {
    lead: string
    error: string
    empty: string
    notFound: string
    back: string
    readMore: string
    retry: string
    home: string
    toc: string
    related: string
    readingTime: string
  }
  demoPage: {
    title: string
    subtitle: string
    bullets: string[]
  }
  seo: {
    homeTitle: string
    homeDescription: string
    productTitle: string
    productDescription: string
    aboutTitle: string
    aboutDescription: string
    demoTitle: string
    blogTitle: string
  }
}
