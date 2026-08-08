'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost } from '@/lib/api'
import EditorWithImport from '@/components/EditorWithImport'
import ImageUploader from '@/components/ImageUploader'
import CategorySelect from '@/components/CategorySelect'
import TagSelect from '@/components/TagSelect'
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react'

export default function TulisArtikelPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [tagIds, setTagIds] = useState<number[]>([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [cover, setCover] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async (status: 'draft' | 'review') => {
    if (!title.trim() || !content.trim()) {
      alert('Judul dan konten harus diisi.')
      return
    }
    setSaving(true)
    try {
      await apiPost('/api/articles', {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        categorySlug: category,
        cover,
        authorName: author.trim(),
        tagIds,
        status,
      })
      router.push('/admin/artikel')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
            <IconArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>Tulis Artikel</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => handleSave('review')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors disabled:opacity-50"
          >
            <IconDeviceFloppy size={16} />
            {saving ? 'Menyimpan...' : 'Kirim ke Review'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul artikel"
            className="w-full border border-gray-200 rounded-xl px-5 py-4 text-xl font-heading font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
          />

          {/* Excerpt */}
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Ringkasan singkat (2-4 kalimat)"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] resize-none"
          />

          {/* Editor */}
          <EditorWithImport content={content} onChange={setContent} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h3 className="font-semibold text-sm text-gray-800">Foto Sampul</h3>
            <ImageUploader value={cover} onChange={setCover} label="Foto artikel" />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h3 className="font-semibold text-sm text-gray-800">Pengaturan</h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Penulis</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama penulis" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
              <CategorySelect value={category} onChange={setCategory} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tag</label>
              <TagSelect value={tagIds} onChange={setTagIds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}