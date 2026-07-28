import type { Metadata } from 'next'
import { events } from '@/data/content'

export const metadata: Metadata = {
  title: 'Agenda — Diskusi Hukum',
  description: 'Agenda diskusi, seminar, dan workshop komunitas Diskusi Hukum.',
}

const typeColors: Record<string, string> = {
  diskusi: 'bg-blue-100 text-blue-700',
  seminar: 'bg-purple-100 text-purple-700',
  workshop: 'bg-green-100 text-green-700',
}

export default function AgendaPage() {
  const now = new Date()
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const past = events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Agenda
      </h1>
      <p className="text-slate mb-10">
        Kegiatan dan acara komunitas Diskusi Hukum.
      </p>

      {/* Upcoming */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Acara Mendatang
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                          typeColors[event.type] || 'bg-gray-100 text-gray-700'
                        }`}
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
        ) : (
          <p className="text-slate">Belum ada acara mendatang.</p>
        )}
      </section>

      {/* Past Events */}
      {past.length > 0 && (
        <section>
          <h2 className="font-heading text-2xl font-bold text-primary mb-6">
            Acara Sebelumnya
          </h2>
          <div className="space-y-4">
            {past.map((event) => (
              <div
                key={event.id}
                className="bg-bg-alt border border-border rounded-xl p-6 opacity-75"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                          typeColors[event.type] || 'bg-gray-100 text-gray-700'
                        }`}
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
    </div>
  )
}
