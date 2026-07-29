import type { Metadata } from 'next'
import { IconMessages, IconShield, IconClock, IconCoin, IconCheck, IconArrowRight } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Konsultasi Hukum — Diskusi Hukum',
  description: 'Konsultasi hukum privat bersama Kevin Wong, S.H. Hanya 25K per sesi. Dapatkan solusi hukum untuk masalah Anda.',
}

export default function KonsultasiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#1B2A4A] rounded-2xl flex items-center justify-center mx-auto mb-5">
          <IconMessages size={32} className="text-[#C9A84C]" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1B2A4A' }}>
          Konsultasi Hukum Privat
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: '#5A6577' }}>
          Diskusikan masalah hukum Anda secara privat dengan praktisi hukum berpengalaman.
        </p>
      </div>

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <div className="p-8 md:p-10 text-center" style={{ backgroundColor: '#1B2A4A' }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Mulai dari</p>
          <p className="font-display font-bold text-5xl md:text-6xl text-white mb-2">25K</p>
          <p className="text-sm" style={{ color: '#8490B1' }}>per sesi konsultasi</p>
        </div>
        <div className="p-8 md:p-10 space-y-5">
          <div className="flex items-start gap-4">
            <IconCheck size={20} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Konsultasi Via WhatsApp</p>
              <p className="text-sm text-gray-500">Diskusi privat dan langsung dengan praktisi hukum.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IconCheck size={20} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Konsultasi 1x Sesi</p>
              <p className="text-sm text-gray-500">Satu sesi konsultasi untuk satu masalah hukum spesifik.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IconCheck size={20} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Tanpa Ribet</p>
              <p className="text-sm text-gray-500">Cukup kirim pesan, dapatkan arahan hukum yang jelas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: '#1B2A4A' }}>Cara Konsultasi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center mx-auto mb-4">
            <IconCoin size={24} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">1. Transfer 25K</h3>
          <p className="text-sm text-gray-500">Lakukan pembayaran ke rekening yang akan dikirimkan.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center mx-auto mb-4">
            <IconMessages size={24} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">2. Kirim Bukti</h3>
          <p className="text-sm text-gray-500">Kirim bukti transfer via WhatsApp dan jelaskan masalah Anda.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center mx-auto mb-4">
            <IconShield size={24} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">3. Konsultasi</h3>
          <p className="text-sm text-gray-500">Dapatkan jawaban dan arahan hukum dari praktisi.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-[#F5F6FA] rounded-2xl p-8 md:p-12">
        <h2 className="font-heading text-2xl font-bold mb-3" style={{ color: '#1B2A4A' }}>
          Siap Konsultasi?
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Klik tombol di bawah untuk memulai konsultasi via WhatsApp.
        </p>
        <a
          href="https://wa.me/6285802042005?text=Halo%20saya%20tertarik%20konsultasi%20hukum%2025k"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:brightness-110"
          style={{ backgroundColor: '#C9A84C' }}
        >
          Konsultasi Sekarang
          <IconArrowRight size={18} />
        </a>
      </div>
    </div>
  )
}
