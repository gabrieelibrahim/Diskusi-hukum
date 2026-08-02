'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconLock, IconCrown, IconCheck } from '@tabler/icons-react'

interface PaywallProps {
  isLoggedIn: boolean
  onShowLogin: () => void
}

export default function Paywall({ isLoggedIn, onShowLogin }: PaywallProps) {
  const router = useRouter()

  return (
    <div className="relative rounded-2xl border border-[#C9A84C]/40 bg-gradient-to-b from-[#1B2A4A] to-[#16223B] p-8 md:p-10 text-center overflow-hidden">
      {/* Soft crown decoration */}
      <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/15 flex items-center justify-center mx-auto mb-5">
        <IconCrown size={28} className="text-[#C9A84C]" />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
        {isLoggedIn ? 'Lanjutkan Membaca dengan Premium' : 'Buka Akses Penuh Artikel Ini'}
      </h3>
      <p className="text-[#8490B1] text-sm leading-relaxed max-w-md mx-auto mb-6">
        {isLoggedIn
          ? 'Aktifkan langganan Premium untuk membaca seluruh isi artikel tanpa batas.'
          : 'Login sebagai member atau langganan Premium untuk membaca seluruh isi artikel tanpa batas.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {!isLoggedIn && (
          <button
            onClick={onShowLogin}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-colors"
          >
            <IconLock size={16} />
            Masuk sebagai Member
          </button>
        )}
        <button
          onClick={() => router.push('/premium')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2A4A] bg-[#C9A84C] hover:bg-[#B8973A] px-6 py-3 rounded-xl transition-colors"
        >
          <IconCrown size={16} />
          {isLoggedIn ? 'Upgrade ke Premium' : 'Langganan Premium'}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-[#8490B1]">
        <span className="flex items-center gap-1.5">
          <IconCheck size={13} className="text-[#C9A84C]" />
          Rp25.000 / bulan
        </span>
        <span className="flex items-center gap-1.5">
          <IconCheck size={13} className="text-[#C9A84C]" />
          Akses semua artikel
        </span>
        <span className="flex items-center gap-1.5">
          <IconCheck size={13} className="text-[#C9A84C]" />
          Tanpa batas
        </span>
      </div>
    </div>
  )
}
