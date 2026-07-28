'use client'

interface Props {
  content: string
}

function parseSections(text: string) {
  const lines = text.split('\n')
  const sections: { type: 'heading' | 'subheading' | 'text' | 'list' | 'table' | 'empty'; content: string; items?: string[] }[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === '') {
      sections.push({ type: 'empty', content: '' })
      continue
    }

    if (trimmed.startsWith('### ')) {
      sections.push({ type: 'subheading', content: trimmed.replace('### ', '') })
      continue
    }

    if (trimmed.startsWith('## ')) {
      sections.push({ type: 'heading', content: trimmed.replace('## ', '') })
      continue
    }

    if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
      const last = sections[sections.length - 1]
      const text = trimmed.replace(/^- \*\*(.*?)\*\*/, '$1 — ').replace(/^- /, '')
      if (last && last.type === 'list') {
        last.items!.push(text)
      } else {
        sections.push({ type: 'list', content: '', items: [text] })
      }
      continue
    }

    if (trimmed.startsWith('| ')) {
      const last = sections[sections.length - 1]
      if (last && last.type === 'table') {
        last.content += '\n' + trimmed
      } else {
        sections.push({ type: 'table', content: trimmed })
      }
      continue
    }

    // numbered list
    if (/^\d+\./.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s*/, '')
      const last = sections[sections.length - 1]
      if (last && last.type === 'list') {
        last.items!.push(text)
      } else {
        sections.push({ type: 'list', content: '', items: [text] })
      }
      continue
    }

    // checkbox list
    if (trimmed.startsWith('- [ ]')) {
      const text = trimmed.replace(/^- \[ \] /, '')
      const last = sections[sections.length - 1]
      if (last && last.type === 'list') {
        last.items!.push('☐ ' + text)
      } else {
        sections.push({ type: 'list', content: '', items: ['☐ ' + text] })
      }
      continue
    }

    sections.push({ type: 'text', content: trimmed })
  }

  return sections
}

function renderInline(text: string) {
  // bold **text**
  let rendered = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // italic *text*
  rendered = rendered.replace(/\*(.*?)\*/g, '<em>$1</em>')
  return rendered
}

export default function ArticleContent({ content }: Props) {
  const sections = parseSections(content)

  return (
    <div className="prose-custom space-y-4">
      {sections.map((sec, i) => {
        switch (sec.type) {
          case 'heading':
            return (
              <h2
                key={i}
                className="font-heading text-2xl font-bold text-primary mt-8 mb-4"
              >
                {sec.content}
              </h2>
            )
          case 'subheading':
            return (
              <h3
                key={i}
                className="font-heading text-lg font-semibold text-primary mt-6 mb-3"
              >
                {sec.content}
              </h3>
            )
          case 'text':
            return (
              <p
                key={i}
                className="text-charcoal leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderInline(sec.content) }}
              />
            )
          case 'list':
            return (
              <ul key={i} className="list-disc list-inside space-y-1 text-charcoal">
                {sec.items?.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                ))}
              </ul>
            )
          case 'table': {
            const rows = sec.content.split('\n').filter(Boolean)
            const header = rows[0]?.split('|').filter(Boolean).map((c) => c.trim()) || []
            const bodyRows = rows.slice(2).map((r) => r.split('|').filter(Boolean).map((c) => c.trim()))
            return (
              <div key={i} className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-border text-sm">
                  <thead>
                    <tr className="bg-bg-alt">
                      {header.map((h, j) => (
                        <th key={j} className="border border-border px-4 py-2 text-left font-semibold text-primary">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-bg-alt'}>
                        {row.map((cell, k) => (
                          <td key={k} className="border border-border px-4 py-2 text-charcoal">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          default:
            return null
        }
      })}
    </div>
  )
}
