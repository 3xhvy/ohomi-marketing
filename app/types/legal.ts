export interface LegalPageMeta {
  type: 'privacy' | 'terms' | 'cookies'
  title: string
  slug: string
  description: string
}

export interface LegalSection {
  id: string
  title: string
  content: string
  subsections?: LegalSubsection[]
  contact?: {
    email: string
    phone: string
  }
}

export interface LegalSubsection {
  title: string
  content: string
}

export interface LegalPageContent {
  title: string
  description: string
  slug: string
  lastUpdated: string
  sections: LegalSection[]
}
