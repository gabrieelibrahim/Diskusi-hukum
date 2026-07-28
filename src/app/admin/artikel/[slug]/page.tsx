'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiGet, apiPut } from '@/lib/api'
import TiptapEditor from '@/components/TiptapEditor'
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react'

export default function EditArtikelPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('draft')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet(`/api/articles/${slug}`)
      .then((data: any) => {
        setTitle(data.title || '')
        setExcerpt(data.excerpt || '')
        setContent(data.content || '')
        setCategory(data.category?.name || data.category || '')
        setAuthor(data.author?.name || data.author || '')
        setStatus(data.status || 'draft')
      })
      .catch(() => alert('Gagal memuat artikel'))
      .finally(() => setLoading(false))
  }, [slug])

  const handleSave = async (newStatus: string) => {
    if (!title.trim()) { alert('Judul harus diisi.'); return }
    setSaving(true)
    try {
      await apiPut(`/api/articles/${slug}`, {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        category,
        authorName: author.trim(),
        status: newStatus,
      })
      router.push('/admin/artikel')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-8 text-gray-400">Memuat artikel...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
            <IconArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>Edit Artikel</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleSave('draft')} disabled={saving} className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
            Simpan Draft
          </button>
          <button onClick={() => handleSave(status === 'published' ? 'published' : 'review')} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors disabled:opacity-50">
            <IconDeviceFloppy size={16} />
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul artikel"
            className="w-full border border-gray-200 rounded-xl px-5 py-4 text-xl font-heading font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]" />
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Ringkasan singkat"
            rows={3} className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] resize-none" />
          <TiptapEditor content={content} onChange={setContent} />
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h3 className="font-semibold text-sm text-gray-800">Pengaturan</h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Penulis</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}