'use client'

import { useState, useEffect } from 'react'
import { IconPhoto, IconUpload, IconTrash, IconFile, IconFileTypePdf, IconMovie, IconMusic } from '@tabler/icons-react'

interface MediaItem {
  id: string
  name: string
  type: string
  size: string
  date: string
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('admin_media')
    if (stored) {
      setMediaList(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('admin_media', JSON.stringify(mediaList))
  }, [mediaList])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newItems: MediaItem[] = Array.from(files).map((f) => ({
      id: `media-${Date.now()}-${f.name}`,
      name: f.name,
      type: f.type || 'unknown',
      size: formatSize(f.size),
      date: new Date().toISOString().split('T')[0],
    }))
    setMediaList([...newItems, ...mediaList])
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (!files.length) return
    const newItems: MediaItem[] = Array.from(files).map((f) => ({
      id: `media-${Date.now()}-${f.name}`,
      name: f.name,
      type: f.type || 'unknown',
      size: formatSize(f.size),
      date: new Date().toISOString().split('T')[0],
    }))
    setMediaList([...newItems, ...mediaList])
  }

  const handleDelete = (id: string) => {
    if (!confirm('Hapus media ini?')) return
    setMediaList(mediaList.filter((m) => m.id !== id))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const mediaTypeIcon = (type: string, size: number = 24) => {
    if (type.startsWith('image/')) return <IconPhoto size={size} className="text-blue-500" />
    if (type.startsWith('video/')) return <IconMovie size={size} className="text-purple-500" />
    if (type.startsWith('audio/')) return <IconMusic size={size} className="text-green-500" />
    if (type.includes('pdf')) return <IconFileTypePdf size={size} className="text-red-500" />
    return <IconFile size={size} className="text-gray-400" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IconPhoto size={24} style={{ color: '#C9A84C' }} />
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Media Library
        </h1>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          dragOver ? 'border-[#C9A84C] bg-[#F8F2E0]' : 'border-gray-200'
        }`}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <IconUpload size={28} className="text-gray-400" />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Seret file ke sini atau klik untuk upload
        </p>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-[#B8963C] transition-colors">
          <IconUpload size={16} />
          Pilih File
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      {/* Media items */}
      {mediaList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center text-center group hover:shadow-sm transition-shadow relative"
            >
              <div className="mb-3 mt-1">
                {mediaTypeIcon(m.type, 32)}
              </div>
              <p className="text-xs font-medium text-gray-700 truncate w-full">{m.name}</p>
              <p className="text-xs text-gray-400 mt-1">{m.size}</p>
              <button
                onClick={() => handleDelete(m.id)}
                className="mt-2 inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <IconTrash size={12} />
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}

      {mediaList.length === 0 && (
        <div className="text-center text-gray-400 py-12 text-sm">
          <IconPhoto size={40} className="mx-auto mb-3 opacity-30" />
          Belum ada file media.
        </div>
      )}
    </div>
  )
}
