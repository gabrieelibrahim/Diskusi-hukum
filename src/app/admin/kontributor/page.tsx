'use client'

import { useState, useEffect } from 'react'
import { contributors as initialContributors } from '../../../data/content'
import { IconUsers, IconUserCheck, IconUserX, IconCalendar, IconFileText } from '@tabler/icons-react'

interface ContributorWithApproval {
  name: string
  slug: string
  bio: string
  articleCount: number
  joinedAt: string
  approved: boolean
}

export default function AdminKontributorPage() {
  const [list, setList] = useState<ContributorWithApproval[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('admin_contributors')
    if (stored) {
      setList(JSON.parse(stored))
    } else {
      const initial = initialContributors.map((c) => ({
        ...c,
        approved: true,
      }))
      setList(initial)
      localStorage.setItem('admin_contributors', JSON.stringify(initial))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('admin_contributors', JSON.stringify(list))
  }, [list])

  const toggleApproval = (slug: string) => {
    setList(list.map((c) => (c.slug === slug ? { ...c, approved: !c.approved } : c)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IconUsers size={24} style={{ color: '#C9A84C' }} />
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Kelola Kontributor
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200" style={{ backgroundColor: '#F5F6FA' }}>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nama</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Bio</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Artikel</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Bergabung</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell max-w-[250px] truncate">{c.bio}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-gray-500 hidden md:flex">
                    <IconFileText size={14} />
                    {c.articleCount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-gray-500 hidden lg:flex">
                    <IconCalendar size={14} />
                    {c.joinedAt}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      c.approved
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {c.approved ? <IconUserCheck size={13} /> : <IconUserX size={13} />}
                    {c.approved ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleApproval(c.slug)}
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      c.approved
                        ? 'border-red-200 text-red-600 hover:bg-red-50'
                        : 'border-green-200 text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {c.approved ? <IconUserX size={14} /> : <IconUserCheck size={14} />}
                    {c.approved ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  Belum ada kontributor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
