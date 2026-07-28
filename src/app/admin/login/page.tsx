'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconLock, IconUser, IconLogin } from '@tabler/icons-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true')
      router.push('/admin')
    } else {
      setError('Username atau password salah.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center mx-auto mb-4">
            <IconLock size={22} className="text-[#C9A84C]" />
          </div>
          <h1 className="font-heading text-xl font-bold text-gray-900">Diskusi Hukum</h1>
          <p className="text-sm text-gray-500 mt-1">Masuk ke panel admin</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 flex items-center gap-2">
                <IconLock size={15} />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Username</label>
              <div className="relative">
                <IconUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <IconLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C9A84C] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#B8973A] transition-colors flex items-center justify-center gap-2"
            >
              <IconLogin size={16} />
              Masuk
            </button>
          </form>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Hubungi admin untuk mendapatkan akses
        </p>
      </div>
    </div>
  )
}
