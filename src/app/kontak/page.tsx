'use client'

import { useState } from 'react'

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Simulate sending — store to localStorage
    const stored = JSON.parse(localStorage.getItem('contact-messages') || '[]')
    stored.push({ ...form, createdAt: new Date().toISOString() })
    localStorage.setItem('contact-messages', JSON.stringify(stored))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-5xl mb-4">&#9993;</div>
        <h1 className="font-heading text-3xl font-bold text-primary mb-4">
          Pesan Terkirim
        </h1>
        <p className="text-slate mb-8">
          Terima kasih, {form.nama}! Kami akan membalas pesan Anda secepatnya.
        </p>
        <a
          href="/"
          className="text-accent font-medium hover:underline"
        >
          Kembali ke Beranda
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Kontak
      </h1>
      <p className="text-slate mb-8">
        Punya pertanyaan, saran, atau ingin bekerja sama? Hubungi kami melalui formulir di
        bawah ini.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-primary mb-1">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            required
            value={form.nama}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            placeholder="email@anda.com"
          />
        </div>

        <div>
          <label htmlFor="subjek" className="block text-sm font-medium text-primary mb-1">
            Subjek
          </label>
          <input
            type="text"
            id="subjek"
            name="subjek"
            required
            value={form.subjek}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            placeholder="Subjek pesan"
          />
        </div>

        <div>
          <label htmlFor="pesan" className="block text-sm font-medium text-primary mb-1">
            Pesan
          </label>
          <textarea
            id="pesan"
            name="pesan"
            required
            rows={6}
            value={form.pesan}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-y"
            placeholder="Tulis pesan Anda di sini..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  )
}
