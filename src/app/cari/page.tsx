'use client'

import { useState, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import { mapArticle } from '@/lib/api'

interface Props {
  searchParams: { q?: string }
}

export default function CariPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }
    setLoading(true)
    fetch('/api/articles?q=' + encodeURIComponent(query) + '&status=published')
      .then((res) => res.json())
      .then((json) => {
        setResults((json.data || []).map(mapArticle))
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
        Cari Artikel
      </h1>

      <div className="max-w-xl mb-10">
        <SearchBar />
      </div>

      {query ? (
        <>
          <p className="text-slate mb-8">
            {loading
              ? 'Mencari...'
              : results.length > 0
                ? 'Menampilkan ' + results.length + ' hasil untuk "' + query + '"'
                : 'Tidak ditemukan hasil untuk "' + query + '"'}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-border overflow-hidden h-72 animate-pulse" />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          )}
        </>
      ) : (
        <p className="text-slate">Masukkan kata kunci untuk mencari artikel.</p>
      )}
    </div>
  )
}
