'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiGet, apiPost, apiDelete } from '@/lib/api'
// API returns flat fields (authorName, categorySlug) not nested objects
import {
  IconFileText,
  IconEdit,
  IconTrash,
  IconPlus,
  IconSearch,
  IconFilter,
  IconX,
} from '@tabler/icons-react'

type ArticleStatus = 'all' | 'draft' | 'review' | 'published'

export default function AdminArtikelPage() {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<ArticleStatus>('all')
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  // Inline add form state
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')

  const loadArticles = () => {
    setLoading(true)
    setError('')
    apiGet('/api/articles')
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const filtered = list
    .filter((a) => filter === 'all' || a.status === filter)
    .filter(
      (a) =>
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase())
    )

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      published: 'bg-green-50 text-green-700 border-green-200',
      review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      draft: 'bg-gray-50 text-gray-600 border-gray-200',
    }
    return map[status] || 'bg-gray-50 text-gray-600 border-gray-200'
  }

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      published: 'Terbit',
      review: 'Review',
      draft: 'Draft',
    }
    return map[status] || status
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Hapus artikel ini?')) return
    try {
      await apiDelete(`/api/articles/${slug}`)
      loadArticles()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !category.trim() || !author.trim()) return
    try {
      await apiPost('/api/articles', {
        title: title.trim(),
        category: category.trim(),
        author: author.trim(),
      })
      setTitle('')
      setCategory('')
      setAuthor('')
      setShowForm(false)
      loadArticles()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const tabs: { key: ArticleStatus; label: string }[] = [
    { key: 'all', label: 'Semua' },
    { key: 'published', label: 'Terbit' },
    { key: 'review', label: 'Review' },
    { key: 'draft', label: 'Draft' },
  ]

  const getCount = (status: ArticleStatus) =>
    status === 'all' ? list.length : list.filter((a) => a.status === status).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Kelola Artikel
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/artikel/tulis"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors"
          >
            <IconPlus size={18} />
            Tulis Artikel Baru
          </Link>
        </div>
      </div>

      {/* Inline add form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-white rounded-xl border border-gray-200 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Artikel Baru</h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IconX size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                placeholder="Judul artikel"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                placeholder="Nama kategori"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                placeholder="Nama penulis"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors"
            >
              Simpan sebagai Draft
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Loading & Error */}
      {loading && <div className="text-center py-8 text-gray-400">Memuat data...</div>}
      {error && <div className="text-center py-4 text-red-500 text-sm">{error}</div>}

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === t.key
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={filter === t.key ? { backgroundColor: '#1B2A4A' } : {}}
            >
              {t.label} ({getCount(t.key)})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: '#F5F6FA' }}>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Judul</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Penulis</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <IconFileText size={16} className="text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-800 max-w-[220px] truncate">{a.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{a.category?.name || a.categorySlug || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge(a.status)}`}>
                      {statusLabel(a.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{a.author?.name || a.authorName || '-'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{a.publishedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/artikel/${a.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <IconEdit size={14} />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(a.slug)}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <IconTrash size={14} />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    Tidak ada artikel.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
