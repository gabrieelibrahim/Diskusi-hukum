import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchArticlesByTag, fetchTags } from '@/lib/server-api'
import { mapArticle } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tags = await fetchTags()
  const tag = tags.find((t: any) => t.slug === params.slug)
  if (!tag) return { title: 'Tag Tidak Ditemukan' }
  return {
    title: '#' + tag.name + '  Diskusi Hukum',
    description: 'Artikel dengan tag ' + tag.name,
  }
}

export default async function TagPage({ params }: Props) {
  const [tags, rawArticles] = await Promise.all([
    fetchTags(),
    fetchArticlesByTag(params.slug),
  ])

  const tag = tags.find((t: any) => t.slug === params.slug)
  if (!tag) notFound()

  const articles = (rawArticles || []).map(mapArticle)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-slate mb-6">
        <a href="/" className="hover:text-accent transition-colors">Beranda</a>
        <span>/</span>
        <span className="text-charcoal">Tag</span>
        <span>/</span>
        <span className="text-charcoal">#{tag.name}</span>
      </nav>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        #<span className="text-accent">{tag.name}</span>
      </h1>
      <p className="text-sm text-slate mb-10">{articles.length} artikel</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-slate py-12">
          Belum ada artikel dengan tag ini.
        </p>
      )}
    </div>
  )
}
