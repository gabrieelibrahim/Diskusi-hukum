'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/cari?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5A6577] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari artikel hukum..."
        className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E2E5EC] rounded-xl text-sm font-body text-[#1E1E1E] placeholder-[#5A6577] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
      />
    </form>
  )
}
