'use client'

import { useState, useEffect } from 'react'
import { IconCrown, IconUser, IconTrash, IconRefresh } from '@tabler/icons-react'
import { apiGet, apiPatch, apiDelete } from '@/lib/api'

export default function AdminMemberPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState<any | null>(null)

  const loadUsers = () => {
    setLoading(true)
    apiGet('/api/admin/users')
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const activatePremium = async (user: any, months = 1) => {
    try {
      await apiPatch(`/api/admin/users/${user.id}`, {
        subscriptionStatus: 'premium',
        durationMonths: months,
      })
      loadUsers()
    } catch (err: any) {
      alert(err.message || 'Gagal mengaktifkan premium')
    }
  }

  const setFree = async (user: any) => {
    try {
      await apiPatch(`/api/admin/users/${user.id}`, { subscriptionStatus: 'free' })
      loadUsers()
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status')
    }
  }

  const removeUser = async (user: any) => {
    if (!window.confirm(`Hapus member ${user.name}?`)) return
    try {
      await apiDelete(`/api/admin/users/${user.id}`)
      loadUsers()
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus')
    }
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      premium: 'bg-[#C9A84C]/15 text-[#B8973A] border-[#C9A84C]/40',
      expired: 'bg-red-50 text-red-600 border-red-200',
      free: 'bg-gray-50 text-gray-500 border-gray-200',
    }
    return map[status] || 'bg-gray-50 text-gray-500 border-gray-200'
  }

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      premium: 'Premium',
      expired: 'Expired',
      free: 'Free',
    }
    return map[status] || status
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Member</h1>
          <p className="text-sm text-gray-500">Kelola akun member &amp; status langganan premium</p>
        </div>
        <button
          onClick={loadUsers}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
        >
          <IconRefresh size={16} /> Muat Ulang
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 border-b border-gray-100 last:border-0 animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <IconUser size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Belum ada member terdaftar.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Member</th>
                  <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider hidden md:table-cell">Berakhir</th>
                  <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider hidden lg:table-cell">Terdaftar</th>
                  <th className="px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge(u.subscriptionStatus)}`}>
                        {u.subscriptionStatus === 'premium' && <IconCrown size={12} className="mr-1" />}
                        {statusLabel(u.subscriptionStatus)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">
                      {u.subscriptionExpiresAt
                        ? new Date(u.subscriptionExpiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {u.subscriptionStatus !== 'premium' ? (
                          <button
                            onClick={() => activatePremium(u, 1)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#B8973A] border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-3 py-1.5 rounded-lg hover:bg-[#C9A84C]/20 transition-colors"
                          >
                            <IconCrown size={13} /> Aktifkan Premium
                          </button>
                        ) : (
                          <button
                            onClick={() => setFree(u)}
                            className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Set Free
                          </button>
                        )}
                        <button
                          onClick={() => removeUser(u)}
                          className="text-xs font-medium text-red-500 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Note about manual activation */}
      <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl p-4 text-sm text-gray-600">
        <strong className="text-[#1B2A4A]">Alur aktivasi premium:</strong> Member transfer Rp25.000 lalu kirim bukti via WhatsApp.
        Setelah dicek, klik <strong>“Aktifkan Premium”</strong> di sini. Status premium otomatis berlaku 1 bulan.
      </div>
    </div>
  )
}
