'use client'

import { useState, useRef } from 'react'
import { IconPhoto, IconUpload, IconX, IconRefresh } from '@tabler/icons-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

/**
 * Reusable image uploader for admin forms.
 * Picks a file from the explorer, uploads it to /api/media, then shows a preview.
 * The resolved public URL (e.g. /uploads/abc.webp) is passed back via onChange.
 */
export default function ImageUploader({ value, onChange, label = 'Foto' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diizinkan (JPG, PNG, WEBP, dll).')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB.')
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Upload gagal')
      }
      const json = await res.json()
      onChange(json.data.path)
    } catch (err: any) {
      alert(err.message || 'Upload gagal')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>

      {value ? (
        // Preview mode
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => onChange('')}
              className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
              title="Hapus foto"
            >
              <IconX size={15} />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-8 h-8 rounded-full bg-[#1B2A4A] text-[#C9A84C] flex items-center justify-center hover:brightness-110 transition-colors shadow-sm"
              title="Ganti foto"
            >
              <IconRefresh size={15} />
            </button>
          </div>
        </div>
      ) : (
        // Upload mode
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            dragOver ? 'border-[#C9A84C] bg-[#F8F2E0]' : 'border-gray-200 hover:border-[#C9A84C]/50'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-2">
            {uploading ? (
              <span className="w-4 h-4 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            ) : (
              <IconPhoto size={18} className="text-gray-400" />
            )}
          </div>
          <p className="text-xs text-gray-500">
            {uploading ? 'Mengupload...' : (
              <>
                <span className="text-[#C9A84C] font-medium">Pilih foto</span> atau seret ke sini
              </>
            )}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP · maks 10MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
        disabled={uploading}
      />
    </div>
  )
}
