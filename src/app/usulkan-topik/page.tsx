'use client'

import { useState } from 'react'

export default function UsulkanTopikPage() {
  const [form, setForm] = useState({ judul: '', deskripsi: '', nama: '', email: '' })
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
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.judul,
          description: form.deskripsi,
          name: form.nama,
          email: form.email,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Gagal mengirim usulan')
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-5xl mb-4">&#10003;</div>
        <h1 className="font-heading text-3xl font-bold text-primary mb-4">
          Topik Berhasil Diusulkan
        </h1>
        <p className="text-slate mb-8">
          Terima kasih, {form.nama}! Tim kami akan meninjau usulan topik Anda dan
          memberitahu perkembangannya melalui email.
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
        Usulkan Topik
      </h1>
      <p className="text-slate mb-8">
        Punya ide topik hukum yang ingin dibahas? Sampaikan kepada kami!
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="judul" className="block text-sm font-medium text-primary mb-1">
            Judul Topik
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            required
            value={form.judul}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            placeholder="Contoh: Perlindungan Hukum bagi Pekerja Freelance"
          />
        </div>

        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-primary mb-1">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            required
            rows={5}
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-y"
            placeholder="Jelaskan apa yang ingin Anda bahas, mengapa topik ini penting, dan aspek hukum apa yang ingin diangkat."
          />
        </div>

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

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Mengirim...' : 'Kirim Usulan'}
        </button>
      </form>
    </div>
  )
}
