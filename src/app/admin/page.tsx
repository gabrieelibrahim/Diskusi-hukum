'use client'

import { useState } from 'react'
import Link from 'next/link'
import { articles } from '../../data/articles'
import { categories, tags, contributors } from '../../data/content'
import {
  IconFileText,
  IconFolder,
  IconTags,
  IconUsers,
  IconArrowUpRight,
  IconPlus,
  IconEye,
  IconPhoto,
} from '@tabler/icons-react'

export default function AdminDashboardPage() {
  const [articleList] = useState(articles)

  const recentArticles = [...articleList]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)

  const stats = [
    { label: 'Total Artikel', value: articleList.length, icon: IconFileText, color: '#1B2A4A', bg: 'bg-blue-50' },
    { label: 'Kategori', value: categories.length, icon: IconFolder, color: '#C9A84C', bg: 'bg-yellow-50' },
    { label: 'Tag', value: tags.length, icon: IconTags, color: '#5B6B97', bg: 'bg-indigo-50' },
    { label: 'Kontributor', value: contributors.length, icon: IconUsers, color: '#8490B1', bg: 'bg-gray-50' },
  ]

  const quickActions = [
    { label: 'Tulis Artikel', href: '/admin/artikel', icon: IconPlus, desc: 'Buat konten baru' },
    { label: 'Review', href: '/admin/review', icon: IconEye, desc: 'Artikel menunggu review' },
    { label: 'Kelola Kategori', href: '/admin/taksonomi', icon: IconFolder, desc: 'Atur taksonomi' },
    { label: 'Media', href: '/admin/media', icon: IconPhoto, desc: 'Upload media' },
  ]

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      published: 'bg-green-50 text-green-700 border-green-200',
      review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      draft: 'bg-gray-50 text-gray-600 border-gray-200',
    }
    return map[status] || 'bg-gray-50 text-gray-600 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-bold mt-1 text-gray-900">{s.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon size={20} style={{ color: s.color }} stroke={1.5} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((a) => {
          const Icon = a.icon
          return (
            <Link
              key={a.label}
              href={a.href}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-[#1B2A4A] transition-colors">
                <Icon size={18} className="text-gray-500 group-hover:text-white" stroke={1.5} />
              </div>
              <p className="text-sm font-semibold text-gray-800">{a.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
            </Link>
          )
        })}
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Artikel Terbaru</h2>
          <Link href="/admin/artikel" className="text-xs font-medium text-[#C9A84C] hover:underline flex items-center gap-1">
            Lihat Semua <IconArrowUpRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Judul</th>
                <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{a.title}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{a.category.name}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">{a.publishedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
