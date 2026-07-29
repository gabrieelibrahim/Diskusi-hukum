'use client'

import { useState, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { mapArticle } from '@/lib/api'

const PER_PAGE = 9

export default function ArtikelPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch('/api/articles?status=published'),
          fetch('/api/categories'),
        ])
        const articlesJson = await articlesRes.json()
        const categoriesJson = await categoriesRes.json()

        const allArticles = (articlesJson.data || []).map(mapArticle)

        // Compute article counts per category
        const counts: Record<string, number> = {}
        allArticles.forEach((a: any) => {
          const slug = a.category.slug
          counts[slug] = (counts[slug] || 0) + 1
        })

        const catsWithCount = (categoriesJson.data || []).map((c: any) => ({
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          count: counts[c.slug] || 0,
        }))

        setArticles(allArticles)
        setCategories(catsWithCount)
      } catch (err) {
        console.error('Gagal memuat data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Reset to page 1 when category filter changes
  useEffect(() => setPage(1), [activeCategory])

  const sorted = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const filtered = activeCategory
    ? sorted.filter((a) => a.category.slug === activeCategory)
    : sorted

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Semua Artikel
      </h1>
      <p className="text-slate mb-8">
        {loading ? 'Memuat...' : `${filtered.length} artikel tersedia`}
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-primary text-white'
              : 'bg-bg-alt text-slate hover:bg-border'
          }`}
        >
          Semua
        </button>
        {categories
          .filter((c) => c.count > 0)
          .map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-primary text-white'
                  : 'bg-bg-alt text-slate hover:bg-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-border overflow-hidden h-72 animate-pulse" />
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-slate py-12">
          Tidak ada artikel dalam kategori ini.
        </p>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-[#1B2A4A] text-white'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  )
}
