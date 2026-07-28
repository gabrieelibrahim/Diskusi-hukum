'use client'

import { useState } from 'react'
import { articles } from '@/data/articles'
import { categories } from '@/data/content'
import ArticleCard from '@/components/ArticleCard'

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const sorted = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const filtered = activeCategory
    ? sorted.filter((a) => a.category.slug === activeCategory)
    : sorted

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Semua Artikel
      </h1>
      <p className="text-slate mb-8">
        {filtered.length} artikel tersedia
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate py-12">
          Tidak ada artikel dalam kategori ini.
        </p>
      )}
    </div>
  )
}
