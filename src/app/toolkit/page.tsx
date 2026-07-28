import type { Metadata } from 'next'
import { toolkits } from '@/data/content'

export const metadata: Metadata = {
  title: 'Toolkit — Diskusi Hukum',
  description: 'Checklist dan alat bantu praktis untuk memahami dan menangani situasi hukum sehari-hari.',
}

export default function ToolkitPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
        Toolkit
      </h1>
      <p className="text-slate mb-10">
        Checklist dan alat bantu praktis untuk membantu Anda memahami dan menangani situasi hukum.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolkits.map((toolkit) => (
          <div
            key={toolkit.id}
            className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">{toolkit.icon}</div>
            <h2 className="font-heading text-lg font-bold text-primary mb-2">
              {toolkit.title}
            </h2>
            <p className="text-sm text-slate mb-4">{toolkit.excerpt}</p>
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {toolkit.category}
            </span>
            <ul className="space-y-2">
              {toolkit.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                  <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {toolkits.length === 0 && (
        <p className="text-center text-slate py-12">Belum ada toolkit.</p>
      )}
    </div>
  )
}
