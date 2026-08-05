'use client'

import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/api'

interface Category {
  id: number
  name: string
  slug: string
}

/**
 * Dropdown pilihan kategori yang diisi dari database (GET /api/categories).
 * Value-nya berupa slug kategori, sesuai yang dikirim ke /api/articles.
 */
export default function CategorySelect({
  value,
  onChange,
}: {
  value: string
  onChange: (slug: string) => void
}) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    apiGet('/api/categories')
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]))
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
    >
      <option value="">Pilih kategori</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </select>
  )
}
