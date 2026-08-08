'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconLock, IconMail, IconUser, IconLogin, IconUserPlus } from '@tabler/icons-react'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/user/login' : '/api/auth/user/register'
      const body =
        mode === 'login'
          ? { email, password }
          : { name, email, password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan')

      if (mode === 'login') {
        localStorage.setItem('member_token', data.token)
        router.push('/')
      } else {
        // After register, switch to login mode with a success hint
        setMode('login')
        setError('')
        alert('Akun berhasil dibuat. Silakan masuk.')
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all'

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#F5F6FA] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center mx-auto mb-4">
            <IconLock size={22} className="text-[#C9A84C]" />
          </div>
          <h1 className="font-heading text-xl font-bold" style={{ color: '#1B2A4A' }}>
            {mode === 'login' ? 'Masuk sebagai Member' : 'Buat Akun Member'}
          </h1>
          <p className="text-sm text-[#5A6577] mt-1">
            {mode === 'login'
              ? 'Masuk dengan akun member Anda'
              : 'Daftar gratis untuk mulai membaca'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E5EC] p-6">
          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError('') }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'login' ? 'bg-white shadow-sm text-[#1B2A4A]' : 'text-gray-500'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError('') }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'register' ? 'bg-white shadow-sm text-[#1B2A4A]' : 'text-gray-500'
              }`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Nama</label>
                <div className="relative">
                  <IconUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass + ' pl-9'}
                    placeholder="Nama lengkap"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
              <div className="relative">
                <IconMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass + ' pl-9'}
                  placeholder="nama@email.com"
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
                  className={inputClass + ' pl-9'}
                  placeholder={mode === 'register' ? 'Minimal 6 karakter' : '••••••••'}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A84C] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#B8973A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === 'login' ? <IconLogin size={16} /> : <IconUserPlus size={16} />}
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
