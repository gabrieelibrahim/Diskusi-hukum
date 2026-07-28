'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Article } from '@/lib/types'

interface SidebarProps {
  headings: { id: string; text: string; level: number }[]
  relatedArticles: Article[]
}

export default function Sidebar({ headings, relatedArticles }: SidebarProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: silently fail if clipboard API unavailable
    }
  }

  return (
    <aside className="space-y-8">
      {/* Daftar Isi */}
      {headings.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E2E5EC] p-5">
          <h4 className="font-heading font-semibold text-sm text-primary uppercase tracking-wider mb-4">
            Daftar Isi
          </h4>
          <nav className="space-y-2">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`block text-sm font-body leading-relaxed hover:text-accent transition-colors duration-200 ${
                  h.level === 3
                    ? 'ml-4 text-[#5A6577]'
                    : 'text-primary font-medium'
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Artikel Terkait */}
      {relatedArticles.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E2E5EC] p-5">
          <h4 className="font-heading font-semibold text-sm text-primary uppercase tracking-wider mb-4">
            Artikel Terkait
          </h4>
          <div className="space-y-4">
            {relatedArticles.slice(0, 5).map((a) => (
              <Link
                key={a.slug}
                href={`/artikel/${a.slug}`}
                className="block group"
              >
                <h5 className="text-sm font-heading font-medium text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {a.title}
                </h5>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#5A6577]">
                    {new Date(a.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-xs text-[#5A6577]">&middot;</span>
                  <span className="text-xs text-[#5A6577]">
                    {a.readingTime} min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="bg-white rounded-xl border border-[#E2E5EC] p-5">
        <h4 className="font-heading font-semibold text-sm text-primary uppercase tracking-wider mb-4">
          Bagikan
        </h4>
        <button
          onClick={handleShare}
          className="w-full py-2.5 px-4 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          {copied ? 'Tersalin!' : 'Salin Tautan'}
        </button>
      </div>
    </aside>
  )
}
