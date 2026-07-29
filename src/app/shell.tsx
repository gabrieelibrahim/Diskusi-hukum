'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useState, FormEvent } from 'react'
import { articles } from '@/data/articles'
import { events } from '@/data/content'
import {
  IconInfoCircle,
  IconUsers,
  IconCalendarEvent,
  IconUserPlus,
  IconChevronRight,
  IconArrowRight,
  IconClock,
  IconTrendingUp,
  IconStar,
  IconLayoutGrid,
  IconScale,
  IconTool,
  IconClipboardCheck,
  IconMessages,
} from '@tabler/icons-react'

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdmin) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

function Header() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/cari?q=${encodeURIComponent(query.trim())}`)
      setShowSearch(false)
      setQuery('')
    }
  }

  return (
    <header className="bg-[#1B2A4A] sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src="/images/logo.png" alt="Diskusi Hukum" className="h-10 w-auto" />
          <span className="font-heading text-xl font-bold" style={{ color: '#C9A84C' }}>Diskusi Hukum</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-center gap-6 text-sm font-medium text-[#8490B1] flex-1">
          <a href="/" className="hover:text-[#C9A84C] transition-colors duration-200">Beranda</a>
          {/* Artikel Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#C9A84C] transition-colors duration-200">
              Artikel ▾
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[700px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex gap-10">
                {/* Menu List */}
                <div className="flex-1 space-y-1 text-gray-700">
                  {[
                    { href: '/artikel', label: 'Artikel Terbaru', icon: IconClock },
                    { href: '/artikel?sort=popular', label: 'Artikel Populer', icon: IconTrendingUp },
                    { href: '/artikel?sort=editors-pick', label: "Editor's Pick", icon: IconStar },
                    { href: '/artikel', label: 'Semua Artikel', icon: IconLayoutGrid },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl hover:text-[#C9A84C] transition-colors group/item"
                    >
                      <item.icon size={20} className="text-gray-400 group-hover/item:text-[#C9A84C]" stroke={1.5} />
                      <span className="font-medium text-sm">{item.label}</span>
                      <IconChevronRight size={16} className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>

                {/* Featured Article */}
                <div className="w-[300px] border-l border-gray-100 pl-10">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Featured</h4>
                  <a href={`/artikel/${articles[0].slug}`} className="group/featured block">
                    <div className="h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                       <img src={articles[0].cover || '/images/hero.png'} className="w-full h-full object-cover group-hover/featured:scale-105 transition-transform duration-500" alt={articles[0].title} />
                    </div>
                    <h5 className="font-semibold text-gray-900 leading-snug group-hover/featured:text-[#C9A84C] transition-colors">{articles[0].title}</h5>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{articles[0].excerpt}</p>
                    <p className="text-xs text-gray-400 mt-3">{articles[0].readingTime} min read</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Komunitas Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#C9A84C] transition-colors duration-200">
              Komunitas ▾
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex gap-8">
                {/* Menu List */}
                <div className="flex-1 space-y-1">
                  {[
                    { href: '/tentang', label: 'Tentang Komunitas', icon: IconInfoCircle },
                    { href: '/kontributor', label: 'Kontributor', icon: IconUsers },
                    { href: '/agenda', label: 'Agenda Diskusi', icon: IconCalendarEvent },
                    { href: '/kontributor/daftar', label: 'Bergabung', icon: IconUserPlus },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-gray-700 hover:text-[#C9A84C] transition-colors group/item"
                    >
                      <item.icon size={20} className="text-gray-400 group-hover/item:text-[#C9A84C]" stroke={1.5} />
                      <span className="font-medium text-sm">{item.label}</span>
                      <IconChevronRight size={16} className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>

                {/* Featured Agenda Card */}
                <div className="w-[300px] border-l border-gray-100 pl-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Agenda Terbaru</h4>
                  <div className="bg-[#1B2A4A] rounded-2xl p-5 text-white">
                    <p className="text-[10px] uppercase tracking-wider text-[#C9A84C] font-bold mb-2">{events[0].date}</p>
                    <h5 className="font-semibold leading-snug mb-3">{events[0].title}</h5>
                    <a href={`/agenda/${events[0].slug}`} className="text-xs font-medium flex items-center gap-1 text-[#C9A84C] hover:underline">
                      Selengkapnya <IconArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Konsultasi */}
          <a href="/konsultasi" className="hover:text-[#C9A84C] transition-colors duration-200">
            Konsultasi
          </a>
        </div>

        {/* Search + CTA */}
        <div className="flex items-center gap-3">
          {/* Desktop search form */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel..."
              className="w-48 lg:w-56 bg-[#16223B] text-white placeholder-[#5A6577] rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all"
            />
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A6577] pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          {/* Mobile search toggle */}
          <button
            className="md:hidden text-[#C9A84C]"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Cari"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

                  </div>
      </nav>

      {/* Mobile search bar */}
      {showSearch && (
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full bg-[#16223B] text-white placeholder-[#5A6577] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40"
            autoFocus
          />
        </form>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src="/images/logo.png" alt="Diskusi Hukum" className="h-12 w-auto mb-4" />
            <p className="text-sm text-[#8490B1] leading-relaxed">
              Komunitas belajar hukum Indonesia. Memahami hukum dengan bahasa yang jelas dan aplikatif.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-white">Navigasi</h4>
            <ul className="space-y-2 text-sm text-[#8490B1]">
              <li><a href="/artikel" className="hover:text-[#C9A84C] transition-colors duration-200">Artikel</a></li>
              <li><a href="/agenda" className="hover:text-[#C9A84C] transition-colors duration-200">Agenda</a></li>
              <li><a href="/konsultasi" className="hover:text-[#C9A84C] transition-colors duration-200">Konsultasi</a></li>
              <li><a href="/artikel" className="hover:text-[#C9A84C] transition-colors duration-200">Artikel</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-white">Komunitas</h4>
            <ul className="space-y-2 text-sm text-[#8490B1]">
              <li><a href="/tentang" className="hover:text-[#C9A84C] transition-colors duration-200">Tentang</a></li>
              <li><a href="/kontributor" className="hover:text-[#C9A84C] transition-colors duration-200">Kontributor</a></li>
              <li><a href="/kontributor/daftar" className="hover:text-[#C9A84C] transition-colors duration-200">Daftar Kontributor</a></li>
              <li><a href="/usulkan-topik" className="hover:text-[#C9A84C] transition-colors duration-200">Usulkan Topik</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-white">Lainnya</h4>
            <ul className="space-y-2 text-sm text-[#8490B1]">
              <li><a href="/pedoman-editorial" className="hover:text-[#C9A84C] transition-colors duration-200">Pedoman Editorial</a></li>
              <li><a href="/kontak" className="hover:text-[#C9A84C] transition-colors duration-200">Kontak</a></li>
              <li><a href="/privasi" className="hover:text-[#C9A84C] transition-colors duration-200">Kebijakan Privasi</a></li>
              <li><a href="/syarat" className="hover:text-[#C9A84C] transition-colors duration-200">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-[#8490B1]">
          <p>&copy; {new Date().getFullYear()} Diskusi Hukum. Semua konten bersifat informatif dan bukan nasihat hukum resmi.</p>
        </div>
      </div>
    </footer>
  )
}
