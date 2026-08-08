export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  cover: string
  author: { name: string; slug: string; avatar?: string }
  category: { name: string; slug: string }
  tags: { name: string; slug: string }[]
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'review' | 'published'
  content: string
  readingTime: number
  sources: { label: string; url: string }[]
  glossary: { term: string; definition: string }[]
  keyPoints: string[]
  disclaimer?: string
}

export interface Category {
  name: string
  slug: string
  description: string
  count: number
}

export interface Tag {
  name: string
  slug: string
  count: number
}

export interface GlossaryTerm {
  term: string
  slug: string
  definition: string
  category: string
}

export interface Toolkit {
  id: string
  title: string
  slug: string
  excerpt: string
  icon: string
  items: string[]
  category: string
}

export interface TopicSuggestion {
  id: string
  title: string
  description: string
  name: string
  email: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Contributor {
  name: string
  slug: string
  bio: string
  avatar?: string
  articleCount: number
  joinedAt: string
}

export interface Event {
  id: string
  title: string
  slug: string
  date: string
  time: string
  description: string
  type: 'diskusi' | 'seminar' | 'workshop'
  link?: string
}
