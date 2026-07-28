'use client'

import { useState, useEffect } from 'react'
import type { TopicSuggestion } from '../../../lib/types'
import { IconBulb, IconCheck, IconX, IconUser, IconMail, IconCalendar } from '@tabler/icons-react'

export default function AdminUsulanTopikPage() {
  const [topics, setTopics] = useState<TopicSuggestion[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('admin_topic_suggestions')
    if (stored) {
      setTopics(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('admin_topic_suggestions', JSON.stringify(topics))
  }, [topics])

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setTopics(topics.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      approved: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
    }
    return map[status] || 'bg-gray-50 text-gray-600 border-gray-200'
  }

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      approved: 'Disetujui',
      pending: 'Menunggu',
      rejected: 'Ditolak',
    }
    return map[status] || status
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IconBulb size={24} style={{ color: '#C9A84C' }} />
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Usulan Topik
        </h1>
      </div>

      {topics.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
          <IconBulb size={40} className="mx-auto mb-3 opacity-40" />
          <p>Belum ada usulan topik.</p>
        </div>
      )}

      <div className="space-y-4">
        {topics.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <IconBulb size={18} style={{ color: '#C9A84C' }} className="shrink-0" />
                  <h3 className="font-semibold text-gray-800">{t.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <IconUser size={13} />
                    {t.name}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconMail size={13} />
                    {t.email}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconCalendar size={13} />
                    {t.createdAt}
                  </span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${statusBadge(t.status)}`}>
                {t.status === 'approved' ? <IconCheck size={13} /> : t.status === 'rejected' ? <IconX size={13} /> : null}
                {statusLabel(t.status)}
              </span>
            </div>

            {t.status === 'pending' && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => updateStatus(t.id, 'approved')}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <IconCheck size={16} />
                  Setujui
                </button>
                <button
                  onClick={() => updateStatus(t.id, 'rejected')}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <IconX size={16} />
                  Tolak
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
