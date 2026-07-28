'use client'

import { useState } from 'react'

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-[#5A6577]">Bagikan:</span>
      <button
        onClick={copyUrl}
        className="text-sm hover:text-[#C9A84C] transition-colors"
        style={{ color: copied ? '#22c55e' : '#5A6577' }}
      >
        {copied ? 'Tersalin!' : 'Salin URL'}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#5A6577] hover:text-[#C9A84C] transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#5A6577] hover:text-[#C9A84C] transition-colors"
      >
        Twitter
      </a>
    </div>
  )
}
