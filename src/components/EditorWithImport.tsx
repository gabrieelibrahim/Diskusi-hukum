'use client'

import { useState } from 'react'
import TiptapEditor from '@/components/TiptapEditor'
import DocumentUploader from '@/components/DocumentUploader'
import { IconPencil, IconUpload, IconFileText, IconAlertTriangle, IconCheck } from '@tabler/icons-react'

interface Props {
  content: string
  onChange: (html: string) => void
}

type Mode = 'manual' | 'upload'

export default function EditorWithImport({ content, onChange }: Props) {
  const [mode, setMode] = useState<Mode>('manual')

  return (
    <div className="space-y-3">
      {/* Mode switcher */}
      <div className="inline-flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
        <button
          type="button"
          onClick={() => setMode('manual')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === 'manual' ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={mode === 'manual' ? { backgroundColor: '#1B2A4A' } : {}}
        >
          <IconPencil size={16} />
          Ketik Manual
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === 'upload' ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={mode === 'upload' ? { backgroundColor: '#1B2A4A' } : {}}
        >
          <IconUpload size={16} />
          Upload File
        </button>
      </div>

      {/* Mode: upload document */}
      {mode === 'upload' && (
        <div className="space-y-3">
          <DocumentUploader onImported={onChange} />

          <div className="flex items-start gap-2 bg-[#F5F6FA] border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-500">
            <IconFileText size={15} className="shrink-0 mt-0.5 text-[#B8963C]" />
            <div className="space-y-1">
              <p>
                Teks dari <strong>PDF</strong> otomatis diubah menjadi paragraf. <strong>DOCX</strong> mempertahankan
                format heading, list, dan bold. <strong>DOC</strong> diambil teksnya saja.
              </p>
              <p>Setelah import, Anda bisa pindah ke tab “Ketik Manual” untuk menyempurnakan isi artikel.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mode: manual editor (keeps state between toggles) */}
      <div className={mode === 'upload' ? 'hidden' : ''}>
        <TiptapEditor content={content} onChange={onChange} />
      </div>

      {mode === 'upload' && content.trim() ? (
        <div className="flex items-center gap-2 text-xs text-green-600">
          <IconCheck size={14} /> Editor berisi konten dari dokumen. Kembali ke “Ketik Manual” untuk menyuntingnya.
        </div>
      ) : mode === 'upload' ? (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <IconAlertTriangle size={14} /> Belum ada konten diimport.
        </div>
      ) : null}
    </div>
  )
}
