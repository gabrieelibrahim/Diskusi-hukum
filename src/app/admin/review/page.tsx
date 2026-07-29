'use client'

import { useState, useEffect } from 'react'
import { apiGet, apiPut } from '@/lib/api'
// API returns flat fields (authorName, categorySlug) not nested objects
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
  const [queue, setQueue] = useState<any[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  const loadQueue = () => {
    setLoading(true)
    apiGet('/api/articles?status=review')
      .then((data) => setQueue(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadQueue()
  }, [])

  const handleAccept = async (article: any) => {
    const note = notes[article.id]
    if (note && !confirm(`Artikel akan diterbitkan. Catatan: "${note}"`)) return
    try {
      await apiPut(`/api/articles/${article.slug}`, { status: 'published' })
      loadQueue()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleReject = async (article: any) => {
    const note = notes[article.id]
    if (!note) {
      alert('Silakan isi catatan review sebelum menolak.')
      return
    }
    try {
      await apiPut(`/api/articles/${article.slug}`, { status: 'draft' })
      loadQueue()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IconClipboardCheck size={24} style={{ color: '#C9A84C' }} />
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Review Artikel
        </h1>
      </div>

      {loading && <div className="text-center py-8 text-gray-400">Memuat data...</div>}

      {!loading && queue.length === 0 && (
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
                    {article.author?.name || article.authorName || '-'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconFolder size={13} />
                    {article.category?.name || article.categorySlug || '-'}
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
                onClick={() => handleAccept(article)}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <IconClipboardCheck size={16} />
                Terima & Terbitkan
              </button>
              <button
                onClick={() => handleReject(article)}
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
