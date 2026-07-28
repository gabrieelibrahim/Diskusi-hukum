import type { Metadata } from 'next'
import './globals.css'
import Shell from './shell'

export const metadata: Metadata = {
  title: 'Diskusi Hukum - Komunitas Belajar Hukum Indonesia',
  description:
    'Website artikel dan komunitas yang membahas hukum Indonesia dengan bahasa yang jelas.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Diskusi Hukum - Komunitas Belajar Hukum Indonesia',
    description:
      'Website artikel dan komunitas yang membahas hukum Indonesia dengan bahasa yang jelas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="font-heading min-h-screen flex flex-col">
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
