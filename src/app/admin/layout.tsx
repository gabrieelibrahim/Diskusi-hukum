'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  IconDashboard,
  IconFileText,
  IconClipboardCheck,
  IconTags,
  IconUsers,
  IconBulb,
  IconCalendarEvent,
  IconPhoto,
  IconSettings,
  IconMenu2,
  IconX,
  IconLogout,
  IconChevronRight,
  IconCrown,
} from '@tabler/icons-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: IconDashboard },
  { href: '/admin/artikel', label: 'Artikel', icon: IconFileText },
  { href: '/admin/review', label: 'Review', icon: IconClipboardCheck },
  { href: '/admin/taksonomi', label: 'Taksonomi', icon: IconTags },
  { href: '/admin/kontributor', label: 'Kontributor', icon: IconUsers },
  { href: '/admin/member', label: 'Member', icon: IconCrown },
  { href: '/admin/usulan-topik', label: 'Usulan Topik', icon: IconBulb },
  { href: '/admin/agenda', label: 'Agenda', icon: IconCalendarEvent },
  { href: '/admin/media', label: 'Media', icon: IconPhoto },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: IconSettings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_logged_in')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (!isLoggedIn) return null

  const pageTitle = navItems.find(n => pathname === n.href)?.label ?? 'Dashboard'

  return (
    <div className="min-h-screen flex bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-56 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
          <Link href="/admin" className="font-heading text-base font-bold text-[#1B2A4A]">
            <span className="text-[#C9A84C]">Diskusi</span> Hukum
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>
            <IconX size={20} />
          </button>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-[#1B2A4A] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} stroke={1.5} />
                <span>{item.label}</span>
                {isActive && <IconChevronRight size={14} className="ml-auto" stroke={2} />}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <IconLogout size={18} stroke={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
              <IconMenu2 size={20} />
            </button>
            <h1 className="font-heading text-base font-semibold text-gray-800">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Admin</span>
            <span className="w-7 h-7 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-xs font-semibold">A</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
