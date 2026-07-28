import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-slate mb-8 max-w-md mx-auto">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
