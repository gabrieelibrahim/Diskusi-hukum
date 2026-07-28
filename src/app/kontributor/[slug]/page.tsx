import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { contributors } from '@/data/content'
import { articles } from '@/data/articles'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const contributor = contributors.find((c) => c.slug === params.slug)
  if (!contributor) return { title: 'Kontributor Tidak Ditemukan' }
  return {
    title: `${contributor.name} — Kontributor Diskusi Hukum`,
    description: contributor.bio,
  }
}

export default function KontributorDetailPage({ params }: Props) {
  const contributor = contributors.find((c) => c.slug === params.slug)
  if (!contributor) notFound()

  const contributorArticles = articles.filter((a) => a.author.slug === params.slug)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate mb-6">
        <a href="/" className="hover:text-accent transition-colors">Beranda</a>
        <span>/</span>
        <a href="/kontributor" className="hover:text-accent transition-colors">Kontributor</a>
        <span>/</span>
        <span className="text-charcoal">{contributor.name}</span>
      </nav>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl shrink-0">
          {contributor.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary mb-1">
            {contributor.name}
          </h1>
          <p className="text-sm text-slate">
            Bergabung sejak{' '}
            {new Date(contributor.joinedAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' | '}
            {contributorArticles.length} artikel
          </p>
        </div>
      </div>

      <div className="bg-bg-alt rounded-xl p-6 mb-10">
        <p className="text-charcoal leading-relaxed">{contributor.bio}</p>
      </div>

      <h2 className="font-heading text-2xl font-bold text-primary mb-6">
        Artikel oleh {contributor.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributorArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {contributorArticles.length === 0 && (
        <p className="text-slate">Belum ada artikel dari kontributor ini.</p>
      )}
    </div>
  )
}
