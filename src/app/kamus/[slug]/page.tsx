import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { glossaryTerms } from '@/data/content'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = glossaryTerms.find((t) => t.slug === params.slug)
  if (!term) return { title: 'Istilah Tidak Ditemukan' }
  return {
    title: `${term.term} — Kamus Hukum Diskusi Hukum`,
    description: term.definition,
  }
}

export default function KamusDetailPage({ params }: Props) {
  const term = glossaryTerms.find((t) => t.slug === params.slug)
  if (!term) notFound()

  const relatedTerms = glossaryTerms.filter(
    (t) => t.category === term.category && t.slug !== term.slug
  )

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-slate mb-6">
        <a href="/" className="hover:text-accent transition-colors">Beranda</a>
        <span>/</span>
        <a href="/kamus" className="hover:text-accent transition-colors">Kamus Hukum</a>
        <span>/</span>
        <span className="text-charcoal">{term.term}</span>
      </nav>

      <div className="bg-white border border-border rounded-xl p-8">
        <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {term.category}
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
          {term.term}
        </h1>
        <p className="text-lg text-charcoal leading-relaxed mb-6">
          {term.definition}
        </p>
      </div>

      {relatedTerms.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-xl font-bold text-primary mb-4">
            Istilah Terkait dalam {term.category}
          </h2>
          <ul className="space-y-2">
            {relatedTerms.map((t) => (
              <li key={t.slug}>
                <a
                  href={`/kamus/${t.slug}`}
                  className="text-accent hover:underline font-medium"
                >
                  {t.term}
                </a>
                <p className="text-sm text-slate">{t.definition}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <a
          href="/kamus"
          className="text-accent font-medium hover:underline text-sm"
        >
          &larr; Kembali ke Kamus Hukum
        </a>
      </div>
    </div>
  )
}
