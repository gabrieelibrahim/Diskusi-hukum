// Server-side API helper
// For server components to fetch from the same app's API routes

const BASE_URL = process.env.API_URL || 'http://localhost:3000'

export async function fetchAPI(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, { cache: 'no-store' })
  if (!res.ok) {
    console.error(`API error: ${res.status} for ${path}`)
    return null
  }
  return res.json()
}

export async function fetchPublishedArticles() {
  const json = await fetchAPI('/api/articles?status=published')
  return json?.data || []
}

export async function fetchArticlesByCategory(slug: string) {
  const json = await fetchAPI(`/api/articles?status=published&category=${slug}`)
  return json?.data || []
}

export async function fetchArticlesByTag(slug: string) {
  const json = await fetchAPI(`/api/articles?status=published&tag=${slug}`)
  return json?.data || []
}

export async function fetchArticleBySlug(slug: string) {
  const json = await fetchAPI(`/api/articles/${slug}`)
  return json?.data || null
}

export async function fetchCategories() {
  const json = await fetchAPI('/api/categories')
  return json?.data || []
}

export async function fetchTags() {
  const json = await fetchAPI('/api/tags')
  return json?.data || []
}

export async function fetchContributors() {
  const json = await fetchAPI('/api/contributors')
  return json?.data || []
}

export async function fetchEvents() {
  const json = await fetchAPI('/api/events?all=true')
  return json?.data || []
}
