'use client'

import { useState } from 'react'
import type { TopicSuggestion } from '@/lib/types'

export default function UsulkanTopikPage() {
  const [form, setForm] = useState({ judul: '', deskripsi: '', nama: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const suggestion: TopicSuggestion = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      title: form.judul,
      description: form.deskripsi,
      name: form.nama,
      email: form.email,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
    const stored = JSON.parse(localStorage.getItem('topic-suggestions') || '[]')
    stored.push(suggestion)
    localStorage.setItem('topic-suggestions', JSON.stringify(stored))
    setSubmitted(true)
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
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Kirim Usulan
        </button>
      </form>
    </div>
  )
}
