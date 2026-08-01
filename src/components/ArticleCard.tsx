'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const date = new Date(article.publishedAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-xl border border-[#E2E5EC] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      <Link href={`/artikel/${article.slug}`} className="flex flex-col h-full">
        {/* Cover image */}
        <div className="relative h-48 bg-[#F5F6FA] overflow-hidden">
          {article.cover && article.cover.length > 0 ? (
            <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F5F6FA]">
              <svg className="w-10 h-10 text-[#C9A84C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          )}
          {/* Premium badge */}
          {article.premium && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#1B2A4A] bg-[#C9A84C] px-2 py-1 rounded-full shadow-sm">
              PREMIUM
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 items-start">
          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-3" style={{ backgroundColor: '#C9A84C' }}>
            {article.category.name}
          </span>

          {/* Title */}
          <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200" style={{ color: '#1B2A4A' }}>
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#5A6577] font-body leading-relaxed mb-4 line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Meta - pushed to bottom */}
          <div className="flex items-center justify-between text-xs text-[#5A6577] mt-auto">
            <span className="font-medium">{article.author.name}</span>
            <div className="flex items-center gap-3">
              <span>{date}</span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {article.readingTime} min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
