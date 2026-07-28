import type { Metadata } from 'next'
import { fetchContributors } from '@/lib/server-api'

export const metadata: Metadata = {
  title: 'Kontributor  Diskusi Hukum',
  description: 'Para kontributor yang menulis artikel di Diskusi Hukum.',
}

export default async function KontributorPage() {
  const contributors = await fetchContributors()

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Kontributor
      </h1>
      <p className="text-slate mb-10">
        {contributors.length} kontributor yang telah bergabung bersama Diskusi Hukum.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor: any) => (
          <a
            key={contributor.slug}
            href={"/kontributor/" + contributor.slug}
            className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
                {contributor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-primary group-hover:text-accent transition-colors">
                  {contributor.name}
                </h3>
                <p className="text-xs text-slate">
                  {contributor.articleCount || 0} artikel
                </p>
              </div>
            </div>
            <p className="text-sm text-charcoal line-clamp-3">{contributor.bio}</p>
          </a>
        ))}
      </div>

      {contributors.length === 0 && (
        <p className="text-center text-slate py-12">
          Belum ada kontributor. Jadilah yang pertama!
        </p>
      )}
    </div>
  )
}
