'use client'

import { useState, useEffect } from 'react'
import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api'
import ImageUploader from '@/components/ImageUploader'
import type { Event } from '@/lib/types'
import {
  IconCalendarEvent,
  IconEdit,
  IconTrash,
  IconPlus,
  IconX,
  IconLink,
  IconClock,
} from '@tabler/icons-react'

export default function AdminAgendaPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const emptyForm = {
    title: '',
    date: '',
    time: '',
    description: '',
    type: 'diskusi' as Event['type'],
    link: '',
    cover: '',
  }

  const [form, setForm] = useState(emptyForm)

  const loadEvents = () => {
    setLoading(true)
    apiGet('/api/events')
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const openNew = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEdit = (e: Event) => {
    setForm({
      title: e.title,
      date: e.date,
      time: e.time,
      description: e.description,
      type: e.type,
      link: e.link || '',
      cover: (e as any).cover || '',
    })
    setEditingId(e.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.date) return

    const payload = {
      title: form.title.trim(),
      slug: slugify(form.title.trim()),
      date: form.date,
      time: form.time,
      description: form.description.trim(),
      type: form.type,
      link: form.link.trim() || null,
      cover: form.cover || null,
    }

    try {
      if (editingId) {
        await apiPatch('/api/events', { ...payload, id: editingId })
      } else {
        await apiPost('/api/events', payload)
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
      loadEvents()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus agenda ini?')) return
    try {
      await apiDelete(`/api/events?id=${id}`)
      loadEvents()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const typeLabel: Record<string, string> = {
    diskusi: 'Diskusi',
    seminar: 'Seminar',
    workshop: 'Workshop',
  }

  const typeColor: Record<string, string> = {
    diskusi: 'bg-blue-50 text-blue-700 border-blue-200',
    seminar: 'bg-purple-50 text-purple-700 border-purple-200',
    workshop: 'bg-orange-50 text-orange-700 border-orange-200',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconCalendarEvent size={24} style={{ color: '#C9A84C' }} />
          <h1 className="text-xl font-semibold" style={{ color: '#1B2A4A' }}>
            Agenda
          </h1>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors"
        >
          <IconPlus size={18} />
          Tambah Agenda
        </button>
      </div>

      {loading && <div className="text-center py-8 text-gray-400">Memuat data...</div>}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              {editingId ? 'Edit Agenda' : 'Tambah Agenda Baru'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IconX size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
              <input
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="19:00 - 21:00 WIB"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] resize-none"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
              >
                <option value="diskusi">Diskusi</option>
                <option value="seminar">Seminar</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link (opsional)</label>
              <input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploader value={form.cover} onChange={(url) => setForm({ ...form, cover: url })} label="Foto agenda (opsional)" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:bg-[#B8963C] transition-colors"
            >
              {editingId ? 'Simpan' : 'Tambah'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Events list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200" style={{ backgroundColor: '#F5F6FA' }}>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Judul</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Tipe</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Waktu</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <IconCalendarEvent size={16} className="text-gray-400 shrink-0" />
                    <span className="font-medium text-gray-800">{ev.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColor[ev.type] || ''}`}>
                    {typeLabel[ev.type] || ev.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{ev.date}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                  <span className="inline-flex items-center gap-1">
                    <IconClock size={13} />
                    {ev.time}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(ev)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <IconEdit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <IconTrash size={14} />
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Belum ada agenda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
