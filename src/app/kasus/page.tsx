import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bedah Kasus — Diskusi Hukum',
  description: 'Analisis dan bedah kasus hukum publik.',
}

export default function KasusPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold mb-2" style={{ color: '#1B2A4A' }}>Bedah Kasus</h1>
      <p className="text-[#5A6577] font-body mb-8">Analisis dan bedah kasus hukum publik.</p>
      <div className="bg-[#F5F6FA] rounded-xl p-12 text-center">
        <p className="text-[#5A6577] font-body">Halaman ini akan sehadir dengan artikel bedah kasus.</p>
      </div>
    </div>
  )
}
