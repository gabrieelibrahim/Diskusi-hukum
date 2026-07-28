import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticlesByCategory } from '@/data/articles'
import { categories } from '@/data/content'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categories.find((c) => c.slug === params.slug)
  if (!cat) return { title: 'Kategori Tidak Ditemukan' }
  return {
    title: `${cat.name} — Diskusi Hukum`,
    description: cat.description,
  }
}

export default function KategoriPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug)
  if (!category) notFound()

  const articles = getArticlesByCategory(params.slug)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate mb-6">
        <a href="/" className="hover:text-accent transition-colors">Beranda</a>
        <span>/</span>
        <span className="text-charcoal">{category.name}</span>
      </nav>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        {category.name}
      </h1>
      <p className="text-slate mb-2">{category.description}</p>
      <p className="text-sm text-slate mb-10">
        {articles.length} artikel
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-slate py-12">
          Belum ada artikel dalam kategori ini.
        </p>
      )}
    </div>
  )
}
