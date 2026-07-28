'use client'

import { useState, useEffect } from 'react'
import { apiGet, apiPost, apiDelete } from '@/lib/api'
import type { Category, Tag } from '@/lib/types'
import { IconFolder, IconTags, IconPlus, IconTrash, IconHash } from '@tabler/icons-react'

export default function AdminTaksonomiPage() {
  const [cats, setCats] = useState<Category[]>([])
  const [tagList, setTagList] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  // Category form
  const [catName, setCatName] = useState('')
  const [catDesc, setCatDesc] = useState('')

  // Tag form
  const [tagName, setTagName] = useState('')

  useEffect(() => {
    setLoading(true)
    Promise.all([
      apiGet('/api/categories').then((data) => setCats(Array.isArray(data) ? data : [])),
      apiGet('/api/tags').then((data) => setTagList(Array.isArray(data) ? data : [])),
    ])
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!catName.trim()) return
    try {
      await apiPost('/api/categories', {
        name: catName.trim(),
        slug: slugify(catName),
        description: catDesc.trim(),
      })
      setCatName('')
      setCatDesc('')
      const data = await apiGet('/api/categories')
      setCats(Array.isArray(data) ? data : [])
    } catch (err: any) {
      alert(err.message)
    }
  }

  const deleteCategory = async (slug: string) => {
    if (!confirm(`Hapus kategori "${slug}"?`)) return
    try {
      await apiDelete(`/api/categories/${slug}`)
      const data = await apiGet('/api/categories')
      setCats(Array.isArray(data) ? data : [])
    } catch (err: any) {
      alert(err.message)
    }
  }

  const addTag = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tagName.trim()) return
    try {
      await apiPost('/api/tags', {
        name: tagName.trim(),
        slug: slugify(tagName),
      })
      setTagName('')
      const data = await apiGet('/api/tags')
      setTagList(Array.isArray(data) ? data : [])
    } catch (err: any) {
      alert(err.message)
    }
  }

  const deleteTag = async (slug: string) => {
    if (!confirm(`Hapus tag "${slug}"?`)) return
    try {
      await apiDelete(`/api/tags/${slug}`)
      const data = await apiGet('/api/tags')
      setTagList(Array.isArray(data) ? data : [])
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-10">
      {loading && <div className="text-center py-8 text-gray-400">Memuat data...</div>}

      {/* Categories */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <IconFolder size={22} style={{ color: '#C9A84C' }} />
          <h2 className="text-lg font-semibold" style={{ color: '#1B2A4A' }}>
            Kategori
          </h2>
        </div>

        <form onSubmit={addCategory} className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <input
            placeholder="Nama kategori"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
            required
          />
          <input
            placeholder="Deskripsi (opsional)"
            value={catDesc}
            onChange={(e) => setCatDesc(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors shrink-0"
          >
            <IconPlus size={16} />
            Tambah
          </button>
        </form>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: '#F5F6FA' }}>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Artikel</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <IconFolder size={15} className="text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{c.slug}</td>
                  <td className="px-4 py-3 text-gray-500">{c.count}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteCategory(c.slug)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <IconTrash size={13} />
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tags */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <IconTags size={22} style={{ color: '#C9A84C' }} />
          <h2 className="text-lg font-semibold" style={{ color: '#1B2A4A' }}>
            Tag
          </h2>
        </div>

        <form onSubmit={addTag} className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <input
            placeholder="Nama tag"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors shrink-0"
          >
            <IconPlus size={16} />
            Tambah
          </button>
        </form>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: '#F5F6FA' }}>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Artikel</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tagList.map((t) => (
                <tr key={t.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <IconHash size={15} className="text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-800">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{t.slug}</td>
                  <td className="px-4 py-3 text-gray-500">{t.count}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteTag(t.slug)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <IconTrash size={13} />
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
