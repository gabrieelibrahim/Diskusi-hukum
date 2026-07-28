import type { Metadata } from 'next'
import Link from 'next/link'
import { tags } from '@/data/content'

export const metadata: Metadata = {
  title: 'Tag — Diskusi Hukum',
  description: 'Jelajahi artikel berdasarkan tag.',
}

export default function TagListPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold mb-2" style={{ color: '#1B2A4A' }}>Tag</h1>
      <p className="text-[#5A6577] font-body mb-8">Jelajahi artikel berdasarkan topik spesifik.</p>
      <div className="flex flex-wrap gap-3">
        {tags.sort((a, b) => b.count - a.count).map((t) => (
          <Link
            key={t.slug}
            href={`/tag/${t.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2E5EC] text-sm font-medium hover:border-accent/50 hover:text-accent transition-all duration-200"
            style={{ color: '#5A6577' }}
          >
            {t.name}
            <span className="text-xs bg-[#F5F6FA] px-2 py-0.5 rounded-full">{t.count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
