'use client'

import { useState, useEffect } from 'react'
import PaginationBar from '@/components/PaginationBar'

const PER_PAGE_UPCOMING = 5

const typeColors: Record<string, string> = {
  diskusi: 'bg-blue-100 text-blue-700',
  seminar: 'bg-purple-100 text-purple-700',
  workshop: 'bg-green-100 text-green-700',
}

export default function AgendaPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [upcomingPage, setUpcomingPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/events?all=true')
        const json = await res.json()
        setEvents(json.data || [])
      } catch (err) {
        console.error('Gagal memuat agenda', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const now = new Date()

  const upcoming = events
    .filter((e: any) => new Date(e.date) >= now)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const past = events
    .filter((e: any) => new Date(e.date) < now)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalUpcomingPages = Math.ceil(upcoming.length / PER_PAGE_UPCOMING)
  const paginatedUpcoming = upcoming.slice(
    (upcomingPage - 1) * PER_PAGE_UPCOMING,
    upcomingPage * PER_PAGE_UPCOMING
  )

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Agenda
      </h1>
      <p className="text-slate mb-10">
        Kegiatan dan acara komunitas Diskusi Hukum.
      </p>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-6 h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">
              Acara Mendatang
            </h2>
            {upcoming.length > 0 ? (
              <>
                <div className="space-y-4">
                  {paginatedUpcoming.map((event: any) => (
                    <div
                      key={event.id}
                      className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={
                                'text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ' +
                                (typeColors[event.type] || 'bg-gray-100 text-gray-700')
                              }
                            >
                              {event.type}
                            </span>
                          </div>
                          <h3 className="font-heading text-lg font-bold text-primary mb-1">
                            {event.link ? (
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors"
                              >
                                {event.title}
                              </a>
                            ) : (
                              event.title
                            )}
                          </h3>
                          <p className="text-sm text-charcoal mb-3">{event.description}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-primary whitespace-nowrap">
                            {new Date(event.date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-slate">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationBar
                  page={upcomingPage}
                  totalPages={totalUpcomingPages}
                  onPageChange={setUpcomingPage}
                />
              </>
            ) : (
              <p className="text-slate">Belum ada acara mendatang.</p>
            )}
          </section>

          {past.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Acara Sebelumnya
              </h2>
              <div className="space-y-4">
                {past.map((event: any) => (
                  <div
                    key={event.id}
                    className="bg-bg-alt border border-border rounded-xl p-6 opacity-75"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={
                              'text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ' +
                              (typeColors[event.type] || 'bg-gray-100 text-gray-700')
                            }
                          >
                            {event.type}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-primary mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-charcoal">{event.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-primary whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-slate">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
