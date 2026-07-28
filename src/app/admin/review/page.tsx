'use client'

import { useState, useEffect } from 'react'
import { articles } from '../../../data/articles'
import type { Article } from '../../../lib/types'
import {
  IconClipboardCheck,
  IconX,
  IconMessage,
  IconFileDescription,
  IconUser,
  IconFolder,
  IconCalendar,
} from '@tabler/icons-react'

export default function AdminReviewPage() {
  const [queue, setQueue] = useState<Article[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    const stored = localStorage.getItem('admin_articles')
    if (stored) {
      const all: Article[] = JSON.parse(stored)
      setQueue(all.filter((a) => a.status === 'review'))
    } else {
      setQueue(articles.filter((a) => a.status === 'review'))
    }
  }, [])

  const updateArticle = (id: string, newStatus: 'published' | 'draft') => {
    const stored = localStorage.getItem('admin_articles')
    const all: Article[] = stored ? JSON.parse(stored) : [...articles]
    const updated = all.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    )
    localStorage.setItem('admin_articles', JSON.stringify(updated))
    setQueue(updated.filter((a) => a.status === 'review'))
  }

  const handleAccept = (id: string) => {
    const note = notes[id]
    if (note && !confirm(`Artikel akan diterbitkan. Catatan: "${note}"`)) return
    updateArticle(id, 'published')
  }

  const handleReject = (id: string) => {
    const note = notes[id]
    if (!note) {
      alert('Silakan isi catatan review sebelum menolak.')
      return
    }
    updateArticle(id, 'draft')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IconClipboardCheck size={24} style={{ color: '#C9A84C' }} />
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Review Artikel
        </h1>
      </div>

      {queue.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
          <IconClipboardCheck size={40} className="mx-auto mb-3 opacity-40" />
          <p>Tidak ada artikel yang perlu direview.</p>
        </div>
      )}

      <div className="space-y-4">
        {queue.map((article) => (
          <div key={article.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <IconFileDescription size={18} className="text-gray-400 shrink-0" />
                  <h3 className="font-semibold text-gray-800">{article.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <IconUser size={13} />
                    {article.author.name}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconFolder size={13} />
                    {article.category.name}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconCalendar size={13} />
                    {article.publishedAt}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-yellow-200 bg-yellow-50 text-yellow-700 shrink-0">
                Review
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <IconMessage size={15} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-500">Catatan Review</span>
              </div>
              <textarea
                placeholder="Catatan review (wajib untuk menolak)..."
                value={notes[article.id] || ''}
                onChange={(e) => setNotes({ ...notes, [article.id]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] resize-none"
                rows={2}
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => handleAccept(article.id)}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <IconClipboardCheck size={16} />
                Terima & Terbitkan
              </button>
              <button
                onClick={() => handleReject(article.id)}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                <IconX size={16} />
                Tolak (Kembalikan ke Draft)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
