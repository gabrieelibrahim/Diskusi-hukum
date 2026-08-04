'use client'

import { useRef, useState } from 'react'
import { IconUpload, IconFileText, IconAlertTriangle, IconCheck, IconLoader2 } from '@tabler/icons-react'

interface Props {
  onImported: (html: string) => void
}

export default function DocumentUploader({ onImported }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [done, setDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File | undefined | null) => {
    setError('')
    setDone(false)
    if (!file) return

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowed.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan PDF, DOC, atau DOCX.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file maksimal 10MB.')
      return
    }

    setUploading(true)
    setFileName(file.name)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/import-document', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json.error || 'Import dokumen gagal')
      }
      if (!json.data?.html?.trim()) {
        throw new Error('Tidak ada konten yang bisa diimport dari file ini.')
      }
      onImported(json.data.html)
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Import dokumen gagal')
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0])
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          uploading
            ? 'border-[#C9A84C] bg-[#C9A84C]/5'
            : done
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-[#C9A84C] hover:bg-[#F5F6FA]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleChange}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <IconLoader2 size={32} className="text-[#C9A84C] animate-spin" />
            <p className="text-sm font-medium text-gray-700">Memproses {fileName || 'dokumen'}...</p>
            <p className="text-xs text-gray-400">Mengubah dokumen menjadi artikel</p>
          </div>
        ) : done ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <IconCheck size={24} className="text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">{fileName || 'Dokumen'} berhasil diimport</p>
            <p className="text-xs text-gray-400">Klik atau seret file lain untuk mengganti</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center">
              <IconUpload size={24} className="text-[#C9A84C]" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Seret &amp; letakkan file di sini, atau <span className="text-[#B8963C] underline">pilih file</span>
            </p>
            <p className="text-xs text-gray-400">PDF, DOC, atau DOCX — maksimal 10MB</p>
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-400">
              <IconFileText size={14} /> Konten otomatis diubah menjadi artikel
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          <IconAlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}
    </div>
  )
}
