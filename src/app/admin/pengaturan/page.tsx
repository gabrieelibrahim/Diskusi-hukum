'use client'

import { useState, useEffect } from 'react'
import { IconSettings, IconDeviceFloppy, IconCheck } from '@tabler/icons-react'

interface Settings {
  siteName: string
  description: string
  logo: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
}

const defaultSettings: Settings = {
  siteName: 'Diskusi Hukum',
  description: 'Komunitas belajar hukum Indonesia. Memahami hukum dengan bahasa yang jelas dan aplikatif.',
  logo: '',
  facebook: '',
  twitter: '',
  instagram: '',
  youtube: '',
}

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('admin_settings')
    if (stored) {
      setSettings({ ...defaultSettings, ...JSON.parse(stored) })
    }
  }, [])

  const handleChange = (key: keyof Settings, value: string) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('admin_settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fields: { key: keyof Settings; label: string; type?: string; placeholder?: string }[] = [
    { key: 'siteName', label: 'Nama Situs' },
    { key: 'description', label: 'Deskripsi' },
    { key: 'logo', label: 'URL Logo', placeholder: 'https://...' },
  ]

  const socialFields: { key: keyof Settings; label: string; placeholder: string }[] = [
    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
    { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
  ]

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-3">
        <IconSettings size={24} style={{ color: '#C9A84C' }} />
        <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
          Pengaturan
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Site info */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">Informasi Situs</h2>

          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              {f.key === 'description' ? (
                <textarea
                  value={settings[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] resize-none"
                  rows={3}
                />
              ) : (
                <input
                  value={settings[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                />
              )}
            </div>
          ))}
        </section>

        {/* Social media */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">Media Sosial</h2>

          {socialFields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                value={settings[f.key]}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
              />
            </div>
          ))}
        </section>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors"
          >
            <IconDeviceFloppy size={18} />
            Simpan Pengaturan
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
              <IconCheck size={16} />
              Tersimpan!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
