'use client'

import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '@/lib/api'
import { IconX, IconSearch } from '@tabler/icons-react'

interface Tag {
  id: number
  name: string
  slug: string
}

/**
 * Multi-select tag yang diisi dari database (GET /api/tags).
 * Value-nya berupa array id tag (sesuai yang dikirim ke /api/articles sebagai tagIds).
 */
export default function TagSelect({
  value,
  onChange,
}: {
  value: number[]
  onChange: (ids: number[]) => void
}) {
  const [tags, setTags] = useState<Tag[]>([])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    apiGet('/api/tags')
      .then((data) => setTags(Array.isArray(data) ? data : []))
      .catch(() => setTags([]))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tags
    return tags.filter((t) => t.name.toLowerCase().includes(q))
  }, [tags, query])

  const toggle = (id: number) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])
  }

  const selected = tags.filter((t) => value.includes(t.id))

  return (
    <div className="relative">
      {/* Tombol untuk membuka pemilih */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] flex items-center justify-between gap-2"
      >
        <span className={selected.length === 0 ? 'text-gray-400' : 'text-gray-800'}>
          {selected.length === 0 ? 'Pilih tag' : `${selected.length} tag dipilih`}
        </span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {/* Chip tag yang dipilih */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              #{t.name}
              <button
                type="button"
                onClick={() => toggle(t.id)}
                className="hover:text-red-600 transition-colors"
                aria-label={`Hapus tag ${t.name}`}
              >
                <IconX size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Daftar pemilih */}
      {open && (
        <>
          {/* Backdrop agar klik luar menutup */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-2 max-h-56 overflow-y-auto">
            <div className="relative mb-1.5">
              <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari tag..."
                className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
              />
            </div>
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 py-2 px-1">Tidak ada tag</p>
            ) : (
              filtered.map((t) => (
                <label
                  key={t.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(t.id)}
                    onChange={() => toggle(t.id)}
                    className="accent-[#C9A84C]"
                  />
                  <span className="text-gray-700">{t.name}</span>
                </label>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}