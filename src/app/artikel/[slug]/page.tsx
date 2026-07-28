import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticleBySlug, getArticlesByTag } from '@/data/articles'
import ArticleContent from './ArticleContent'
import ShareButtons from '@/components/ShareButtons'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Artikel Tidak Ditemukan' }
  return {
    title: `${article.title} — Diskusi Hukum`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  }
}

export default function ArticleDetailPage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const relatedArticles = article.tags.length > 0
    ? getArticlesByTag(article.tags[0].slug).filter((a) => a.slug !== article.slug).slice(0, 3)
    : []

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        {/* Main Content */}
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate mb-6">
            <a href="/" className="hover:text-accent transition-colors">Beranda</a>
            <span>/</span>
            <a href="/artikel" className="hover:text-accent transition-colors">Artikel</a>
            <span>/</span>
            <a
              href={`/kategori/${article.category.slug}`}
              className="hover:text-accent transition-colors"
            >
              {article.category.name}
            </a>
          </nav>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate mb-8">
            <span>
              Oleh{' '}
              <a
                href={`/kontributor/${article.author.slug}`}
                className="text-accent font-medium hover:underline"
              >
                {article.author.name}
              </a>
            </span>
            <span className="text-border">|</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}</span>
            <span className="text-border">|</span>
            <span>{article.readingTime} menit membaca</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <a
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="bg-bg-alt text-slate hover:text-accent hover:bg-accent/10 px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                #{tag.name}
              </a>
            ))}
          </div>

          {/* Key Points */}
          {article.keyPoints.length > 0 && (
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-3">
                Poin Penting
              </h2>
              <ul className="space-y-2">
                {article.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                    <span className="text-accent mt-1 shrink-0">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          <ArticleContent content={article.content} />

          {/* Dasar Hukum */}
          {article.sources.length > 0 && (
            <div className="mt-10 bg-bg-alt rounded-xl p-6">
              <h2 className="font-heading text-lg font-bold text-primary mb-3">
                Dasar Hukum &amp; Referensi
              </h2>
              <ul className="space-y-2">
                {article.sources.map((src, i) => (
                  <li key={i}>
                    <a
                      href={src.url}
                      className="text-accent hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Glossary */}
          {article.glossary.length > 0 && (
            <div className="mt-6 bg-bg-alt rounded-xl p-6">
              <h2 className="font-heading text-lg font-bold text-primary mb-3">
                Istilah dalam Artikel
              </h2>
              <dl className="space-y-3">
                {article.glossary.map((g, i) => (
                  <div key={i}>
                    <dt className="font-semibold text-sm text-primary">{g.term}</dt>
                    <dd className="text-sm text-slate">{g.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Disclaimer */}
          {article.disclaimer && (
            <div className="mt-6 border border-border rounded-xl p-4 text-sm text-slate">
              <strong className="text-charcoal">Disclaimer:</strong> {article.disclaimer}
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-[#E2E5EC]">
            <ShareButtons title={article.title} />
          </div>

          {/* Back link */}
          <div className="mt-8">
            <a
              href="/artikel"
              className="text-accent font-medium hover:underline text-sm"
            >
              &larr; Kembali ke semua artikel
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Artikel Terkait
            </h3>
            {relatedArticles.length > 0 ? (
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/artikel/${rel.slug}`}
                    className="block group"
                  >
                    <h4 className="text-sm font-medium text-charcoal group-hover:text-accent transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate mt-1">
                      {rel.readingTime} menit membaca
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate">Tidak ada artikel terkait.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
