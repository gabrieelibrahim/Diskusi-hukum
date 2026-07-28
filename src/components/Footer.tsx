import Link from 'next/link'

export default function Footer() {
  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/kategori', label: 'Kategori' },
    { href: '/kamus', label: 'Kamus Hukum' },
    { href: '/toolkit', label: 'Toolkit' },
    { href: '/tentang', label: 'Tentang' },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Tentang */}
          <div>
            <h3 className="font-heading font-bold text-lg text-accent mb-4">
              Diskusi Hukum
            </h3>
            <p className="text-sm text-white/70 font-body leading-relaxed">
              Platform edukasi hukum yang menyajikan informasi hukum praktis
              dan mudah dipahami untuk masyarakat umum.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-accent uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <nav className="space-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-accent uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <p className="text-sm text-white/70 font-body leading-relaxed mb-2">
              Punya pertanyaan atau usulan topik? Hubungi kami melalui email.
            </p>
            <a
              href="mailto:halo@diskusi-hukum.id"
              className="text-sm text-accent hover:text-accent/80 transition-colors duration-200"
            >
              halo@diskusi-hukum.id
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <p className="text-center text-xs text-white/50">
            &copy; {new Date().getFullYear()} Diskusi Hukum. Hak cipta dilindungi
            undang-undang.
          </p>
        </div>
      </div>
    </footer>
  )
}
