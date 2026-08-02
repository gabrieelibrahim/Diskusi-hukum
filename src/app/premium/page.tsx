'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconCrown, IconCheck, IconCoin, IconMessages, IconShield, IconArrowRight, IconUser } from '@tabler/icons-react'

const PRICE = '25K'

export default function PremiumPage() {
  const router = useRouter()
  const [member, setMember] = useState<any | null>(null)
  const [loadingMember, setLoadingMember] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('member_token')
    if (!token) {
      setLoadingMember(false)
      return
    }
    fetch('/api/auth/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        if (json.data) setMember(json.data)
      })
      .catch(() => {})
      .finally(() => setLoadingMember(false))
  }, [])

  const isPremium = member?.subscriptionStatus === 'premium'

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#1B2A4A] rounded-2xl flex items-center justify-center mx-auto mb-5">
          <IconCrown size={32} className="text-[#C9A84C]" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1B2A4A' }}>
          Langganan Premium
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: '#5A6577' }}>
          Akses semua artikel Diskusi Hukum tanpa batas dengan berlangganan bulanan.
        </p>
      </div>

      {/* Member status banner */}
      {loadingMember ? (
        <div className="h-14 bg-gray-100 rounded-xl animate-pulse mb-10" />
      ) : member ? (
        <div
          className={`rounded-xl border p-4 mb-10 flex flex-wrap items-center justify-between gap-3 ${
            isPremium ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center">
              <IconUser size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{member.name}</p>
              <p className="text-xs text-gray-500">
                {isPremium
                  ? `Premium aktif hingga ${new Date(member.subscriptionExpiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  : member.subscriptionStatus === 'expired'
                  ? 'Langganan Anda telah berakhir. Perpanjang untuk melanjutkan akses.'
                  : 'Anda adalah member gratis. Upgrade untuk akses penuh.'}
              </p>
            </div>
          </div>
          {isPremium && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B2A4A] bg-[#C9A84C] px-3 py-1.5 rounded-full">
              <IconCrown size={13} /> PREMIUM
            </span>
          )}
        </div>
      ) : null}

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <div className="p-8 md:p-10 text-center" style={{ backgroundColor: '#1B2A4A' }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
            Premium Bulanan
          </p>
          <p className="font-display font-bold text-5xl md:text-6xl text-white mb-2">{PRICE}</p>
          <p className="text-sm" style={{ color: '#8490B1' }}>per bulan, akses tanpa batas</p>
        </div>
        <div className="p-8 md:p-10 space-y-5">
          <div className="flex items-start gap-4">
            <IconCheck size={20} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Baca Semua Artikel</p>
              <p className="text-sm text-gray-500">Akses penuh seluruh isi artikel tanpa batasan.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IconCheck size={20} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Artikel Terbaru &amp; Populer</p>
              <p className="text-sm text-gray-500">Tetap update dengan konten hukum terbaru dan terpopuler.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IconCheck size={20} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Berhenti Kapan Saja</p>
              <p className="text-sm text-gray-500">Langganan bulanan tanpa kontrak mengikat.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to subscribe */}
      <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: '#1B2A4A' }}>
        Cara Berlangganan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center mx-auto mb-4">
            <IconUser size={24} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">1. Login / Daftar</h3>
          <p className="text-sm text-gray-500">Masuk dengan akun member Anda.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center mx-auto mb-4">
            <IconCoin size={24} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">2. Transfer 25K</h3>
          <p className="text-sm text-gray-500">Transfer Rp25.000 ke rekening yang dikirimkan.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center mx-auto mb-4">
            <IconMessages size={24} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">3. Kirim Bukti</h3>
          <p className="text-sm text-gray-500">Kirim bukti via WhatsApp, admin aktifkan premium.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-[#F5F6FA] rounded-2xl p-8 md:p-12">
        <h2 className="font-heading text-2xl font-bold mb-3" style={{ color: '#1B2A4A' }}>
          {isPremium ? 'Anda Sudah Premium' : 'Siap Berlangganan?'}
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {isPremium
            ? 'Nikmati semua artikel tanpa batas. Terima kasih sudah berlangganan!'
            : 'Klik tombol di bawah untuk memulai langganan premium.'}
        </p>
        {isPremium ? (
          <button
            onClick={() => router.push('/artikel')}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#C9A84C' }}
          >
            Mulai Membaca <IconArrowRight size={18} />
          </button>
        ) : (
          <a
            href={
              member
                ? `https://wa.me/6285802042005?text=${encodeURIComponent(
                    `Halo Admin 👋\n\nSaya ingin berlangganan Premium Diskusi Hukum.\n\nEmail akun saya: ${member.email}\n\nMohon informasi proses pembayarannya.`,
                  )}`
                : 'https://wa.me/6285802042005?text=' +
                  encodeURIComponent(
                    'Halo Admin 👋\n\nSaya ingin berlangganan Premium Diskusi Hukum (Rp25.000/bulan).\n\nMohon informasi cara daftar dan pembayarannya.\n\nTerima kasih.',
                  )
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#C9A84C' }}
          >
            Berlangganan via WhatsApp <IconArrowRight size={18} />
          </a>
        )}
      </div>
    </div>
  )
}
