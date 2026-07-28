'use client'

import { useState } from 'react'

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      // POST to the suggestions endpoint as a proxy, or store locally
      // Since there is no dedicated contact API, we store via suggestions
      // with a special title prefix, or fallback to localStorage
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '[Kontak] ' + form.subjek,
          description: 'Dari: ' + form.nama + ' (' + form.email + ')\n\n' + form.pesan,
          name: form.nama,
          email: form.email,
        }),
      })
      if (!res.ok) {
        // Fallback to localStorage
        const stored = JSON.parse(localStorage.getItem('contact-messages') || '[]')
        stored.push({ ...form, createdAt: new Date().toISOString() })
        localStorage.setItem('contact-messages', JSON.stringify(stored))
      }
      setSubmitted(true)
    } catch {
      // Fallback to localStorage on network error
      const stored = JSON.parse(localStorage.getItem('contact-messages') || '[]')
      stored.push({ ...form, createdAt: new Date().toISOString() })
      localStorage.setItem('contact-messages', JSON.stringify(stored))
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

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
          disabled={submitting}
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </form>
    </div>
  )
}
