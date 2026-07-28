'use client'

import { useState, useRef, useEffect } from 'react'
import ArticleCard from './ArticleCard'
import type { Article } from '@/lib/types'

interface Props {
  articles: Article[]
}

export default function ArticleCarousel({ articles }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState)
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [])

  const scroll = (dir: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[0] as HTMLElement
    const gap = 24
    const scrollAmount = (card?.offsetWidth || 300) + gap
    el.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Prev */}
      <button
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
        aria-label="Sebelumnya"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`div::-webkit-scrollbar { display: none }`}</style>
        {articles.slice(0, 10).map((article) => (
          <div key={article.id} className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
        aria-label="Selanjutnya"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
