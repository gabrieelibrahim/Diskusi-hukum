// API helper for client-side fetching
// Use relative URLs so requests go to the same origin

function authHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ─── Generic API helpers for client components ──────────────

export async function apiGet(path: string) {
  const res = await fetch(path, {
    headers: { ...authHeaders() },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `API error: ${res.status}`)
  }
  const json = await res.json()
  // Handle both { data: ... } wrapper and direct array responses
  return json.data !== undefined ? json.data : json
}

export async function apiPost(path: string, body?: any) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `API error: ${res.status}`)
  }
  return res.json()
}

export async function apiPut(path: string, body: any) {
  const res = await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `API error: ${res.status}`)
  }
  return res.json()
}

export async function apiPatch(path: string, body: any) {
  const res = await fetch(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `API error: ${res.status}`)
  }
  return res.json()
}

export async function apiDelete(path: string) {
  const res = await fetch(path, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `API error: ${res.status}`)
  }
  return res.json()
}

// ─── JSON helpers ───────────────────────────────────────────

export function safeParseJSON(str: string | undefined | null, fallback: any = []) {
  if (!str) return fallback
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

// ─── Data mapping helpers ───────────────────────────────────

export function mapArticle(article: any) {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || '',
    content: article.content || '',
    cover: article.cover || '',
    author: {
      name: article.authorName || '',
      slug: article.authorSlug || '',
    },
    category: article.category
      ? { name: article.category.name, slug: article.category.slug }
      : { name: article.categorySlug || '', slug: article.categorySlug || '' },
    tags: article.tags || [],
    publishedAt: article.publishedAt || '',
    updatedAt: article.updatedAt || '',
    status: article.status || 'published',
    readingTime: article.readingTime || 0,
    sources: safeParseJSON(article.sources, []),
    glossary: safeParseJSON(article.glossary, []),
    keyPoints: safeParseJSON(article.keyPoints, []),
    disclaimer: article.disclaimer || undefined,
    premium: article.premium ?? false,
    premiumAccess: article.premiumAccess ?? false,
  }
}

export function mapContributor(c: any) {
  return {
    name: c.name,
    slug: c.slug,
    bio: c.bio || '',
    avatar: c.avatar || '',
    articleCount: c.articleCount || 0,
    joinedAt: c.joinedAt || '',
  }
}
