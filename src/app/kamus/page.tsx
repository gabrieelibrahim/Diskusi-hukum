import type { Metadata } from 'next'
import { glossaryTerms } from '@/data/content'

export const metadata: Metadata = {
  title: 'Kamus Hukum — Diskusi Hukum',
  description: 'Glosarium istilah hukum Indonesia yang sering digunakan dalam artikel Diskusi Hukum.',
}

function groupByLetter(terms: typeof glossaryTerms) {
  const groups: Record<string, typeof glossaryTerms> = {}
  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(term)
  }
  const sorted = Object.keys(groups).sort()
  return sorted.map((letter) => ({ letter, terms: groups[letter] }))
}

export default function KamusPage() {
  const grouped = groupByLetter(glossaryTerms)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Kamus Hukum
      </h1>
      <p className="text-slate mb-10">
        {glossaryTerms.length} istilah hukum yang sering digunakan dalam artikel-artikel Diskusi Hukum.
      </p>

      {/* Alphabet Jump */}
      <div className="flex flex-wrap gap-1 mb-10">
        {grouped.map((g) => (
          <a
            key={g.letter}
            href={`#${g.letter}`}
            className="w-9 h-9 flex items-center justify-center bg-bg-alt text-slate hover:bg-accent hover:text-white rounded-lg text-sm font-semibold transition-colors"
          >
            {g.letter}
          </a>
        ))}
      </div>

      {grouped.map((group) => (
        <section key={group.letter} id={group.letter} className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
            {group.letter}
          </h2>
          <dl className="space-y-4">
            {group.terms.map((term) => (
              <div key={term.slug}>
                <dt>
                  <a
                    href={`/kamus/${term.slug}`}
                    className="font-semibold text-accent hover:underline"
                  >
                    {term.term}
                  </a>
                </dt>
                <dd className="text-sm text-charcoal mt-1">{term.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
