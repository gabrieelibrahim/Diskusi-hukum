import { searchArticles } from '@/data/articles'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'

interface Props {
  searchParams: { q?: string }
}

export default function CariPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const results = query ? searchArticles(query) : []

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
            {results.length > 0
              ? `Menampilkan ${results.length} hasil untuk "${query}"`
              : `Tidak ditemukan hasil untuk "${query}"`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-slate">Masukkan kata kunci untuk mencari artikel.</p>
      )}
    </div>
  )
}
