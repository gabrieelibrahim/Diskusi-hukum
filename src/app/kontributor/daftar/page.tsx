'use client'

import { useState } from 'react'
import type { Contributor } from '@/lib/types'

export default function DaftarKontributorPage() {
  const [form, setForm] = useState({ nama: '', email: '', bio: '', bidang: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = form.nama.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const contributor: Contributor = {
      name: form.nama,
      slug,
      bio: form.bio,
      articleCount: 0,
      joinedAt: new Date().toISOString().split('T')[0],
    }
    const stored = JSON.parse(localStorage.getItem('contributors') || '[]')
    stored.push(contributor)
    localStorage.setItem('contributors', JSON.stringify(stored))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-5xl mb-4">&#10003;</div>
        <h1 className="font-heading text-3xl font-bold text-primary mb-4">
          Pendaftaran Berhasil
        </h1>
        <p className="text-slate mb-8">
          Terima kasih, {form.nama}! Kami akan meninjau pendaftaran Anda dan menghubungi
          melalui email dalam waktu 1x24 jam.
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
        Daftar Kontributor
      </h1>
      <p className="text-slate mb-8">
        Ingin bergabung sebagai kontributor? Isi formulir di bawah dan tim kami akan menghubungi
        Anda.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-primary mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            required
            value={form.nama}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            placeholder="Nama lengkap Anda"
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
          <label htmlFor="bidang" className="block text-sm font-medium text-primary mb-1">
            Bidang Minat
          </label>
          <select
            id="bidang"
            name="bidang"
            required
            value={form.bidang}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow bg-white"
          >
            <option value="">Pilih bidang minat</option>
            <option value="Hukum Perdata">Hukum Perdata</option>
            <option value="Hukum Pidana">Hukum Pidana</option>
            <option value="Hukum Bisnis">Hukum Bisnis</option>
            <option value="Hukum Ketenagakerjaan">Hukum Ketenagakerjaan</option>
            <option value="Hukum Digital & Privasi">Hukum Digital &amp; Privasi</option>
            <option value="Hukum Keluarga">Hukum Keluarga</option>
            <option value="Tata Negara">Tata Negara</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-primary mb-1">
            Bio / Pengalaman
          </label>
          <textarea
            id="bio"
            name="bio"
            required
            rows={5}
            value={form.bio}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-y"
            placeholder="Ceritakan latar belakang dan pengalaman Anda di bidang hukum. Sertakan pendidikan, pekerjaan, atau portofolio tulisan (jika ada)."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Daftar Jadi Kontributor
        </button>
      </form>
    </div>
  )
}
