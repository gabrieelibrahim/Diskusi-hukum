'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/artikel', label: 'Artikel', icon: '📝' },
  { href: '/admin/review', label: 'Review', icon: '🔍' },
  { href: '/admin/taksonomi', label: 'Taksonomi', icon: '🏷️' },
  { href: '/admin/kontributor', label: 'Kontributor', icon: '👥' },
  { href: '/admin/usulan-topik', label: 'Usulan Topik', icon: '💡' },
  { href: '/admin/agenda', label: 'Agenda', icon: '📅' },
  { href: '/admin/media', label: 'Media', icon: '🖼️' },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 min-h-screen bg-primary text-white flex flex-col shrink-0">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="text-accent font-heading font-bold text-lg tracking-tight">
          Diskusi Hukum
        </Link>
        <p className="text-xs text-white/50 mt-1 font-body">Panel Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                active
                  ? 'bg-accent/20 text-accent'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base" role="img" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
