import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/middleware/auth'
import mammoth from 'mammoth'
import WordExtractor from 'word-extractor'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs'
import path from 'path'
import { pathToFileURL } from 'url'

// pdf.js runs in a "fake worker" on the server. Point workerSrc at the actual
// worker module so the dynamic import can resolve it in the Node runtime.
GlobalWorkerOptions.workerSrc = pathToFileURL(
  path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.mjs'),
).href

const MAX_SIZE = 10 * 1024 * 1024 // 10MB

// Escapes HTML special characters so untrusted text is rendered as-is, never as markup.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Converts plain paragraphs of text into HTML paragraphs.
function paragraphsToHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n+/g, ' ').trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n')
}

// POST /api/import-document — parse an uploaded document (PDF/DOC/DOCX) into article HTML
export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'File wajib diunggah' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Ukuran file maksimal 10MB' }, { status: 400 })
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Tipe file tidak diizinkan. Gunakan PDF, DOC, atau DOCX.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    let html = ''

    if (file.type === 'application/pdf') {
      try {
        const doc = await getDocument({ data: new Uint8Array(buffer) }).promise
        const pageTexts: string[] = []
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i)
          const textContent = await page.getTextContent()
          // pdf.js splits text into fragments; re-join them into lines (on y
          // change) with a space between words, skipping spaces before/after
          // punctuation so "kata." stays as one token.
          const items: any[] = textContent.items
          const lines: string[] = []
          let line = ''
          let lineY = NaN
          const CLOSING = new Set(['.', ',', ':', ';', '!', '?', ')', ']', '}', '"', "'"])
          const OPENING = new Set(['(', '[', '{', '"', "'"])
          for (const item of items) {
            const str = item.str ?? ''
            if (!str) continue
            const y = item.transform?.[5] ?? 0
            const prevChar = line ? line[line.length - 1] : ''
            if (!Number.isNaN(lineY) && Math.abs(y - lineY) > 1) {
              lines.push(line.trim())
              line = ''
            }
            lineY = y
            if (
              line &&
              !line.endsWith(' ') &&
              !str.startsWith(' ') &&
              !CLOSING.has(str) &&
              !OPENING.has(prevChar)
            ) {
              line += ' '
            }
            line += str
          }
          if (line.trim()) lines.push(line.trim())
          pageTexts.push(lines.join('\n'))
        }
        await doc.destroy()
        const text = pageTexts.join('\n\n').trim()
        if (!text) {
          return NextResponse.json({ error: 'Tidak ada teks yang bisa diekstrak dari PDF (mungkin file scan).' }, { status: 422 })
        }
        html = paragraphsToHtml(text)
      } catch (err) {
        console.error('[import-document/PDF]', err)
        return NextResponse.json({ error: 'Gagal membaca PDF. Pastikan file tidak rusak.' }, { status: 422 })
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const result = await mammoth.convertToHtml({ buffer })
        html = (result.value || '').trim()
        if (!html) {
          return NextResponse.json({ error: 'Tidak ada konten yang bisa diekstrak dari DOCX.' }, { status: 422 })
        }
      } catch (err) {
        console.error('[import-document/DOCX]', err)
        return NextResponse.json({ error: 'Gagal membaca DOCX. Pastikan file tidak rusak.' }, { status: 422 })
      }
    } else {
      // Legacy .doc — extract raw text with word-extractor
      try {
        const extractor = new WordExtractor()
        const doc = await extractor.extract(buffer)
        const text = (doc.getBody() || '').trim()
        if (!text) {
          return NextResponse.json({ error: 'Tidak ada konten yang bisa diekstrak dari DOC.' }, { status: 422 })
        }
        html = paragraphsToHtml(text)
      } catch (err) {
        console.error('[import-document/DOC]', err)
        return NextResponse.json({ error: 'Gagal membaca DOC. Pastikan file tidak rusak.' }, { status: 422 })
      }
    }

    return NextResponse.json({ data: { html } }, { status: 200 })
  } catch (error) {
    console.error('[import-document/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
