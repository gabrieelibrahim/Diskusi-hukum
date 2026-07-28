import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { events } from '@/db/schema'
import { eq, desc, asc, gte } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// GET /api/events — list events (upcoming by default)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get('upcoming')
    const all = searchParams.get('all')

    let result
    if (all === 'true') {
      result = await db.select().from(events).orderBy(desc(events.date))
    } else if (upcoming === 'false') {
      result = await db.select().from(events).orderBy(desc(events.date))
    } else {
      // Default: only upcoming events
      const today = new Date().toISOString().split('T')[0]
      result = await db
        .select()
        .from(events)
        .where(gte(events.date, today))
        .orderBy(asc(events.date))
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('[events/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST /api/events — create event (auth required)
export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, date, time, description, type, link } = body

    if (!title || !slug || !date) {
      return NextResponse.json({ error: 'Judul, slug, dan tanggal wajib diisi' }, { status: 400 })
    }

    const existing = await db.select().from(events).where(eq(events.slug, slug)).get()
    if (existing) {
      return NextResponse.json({ error: 'Slug sudah digunakan' }, { status: 409 })
    }

    const inserted = await db
      .insert(events)
      .values({
        title,
        slug,
        date,
        time: time ?? '',
        description: description ?? '',
        type: type ?? 'diskusi',
        link: link ?? null,
      })
      .returning()

    return NextResponse.json({ data: inserted[0] }, { status: 201 })
  } catch (error) {
    console.error('[events/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// DELETE /api/events — delete event (auth required)
export async function DELETE(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID event wajib diisi' }, { status: 400 })
    }

    const existing = await db.select().from(events).where(eq(events.id, Number(id))).get()
    if (!existing) {
      return NextResponse.json({ error: 'Event tidak ditemukan' }, { status: 404 })
    }

    await db.delete(events).where(eq(events.id, Number(id)))

    return NextResponse.json({ message: 'Event berhasil dihapus' })
  } catch (error) {
    console.error('[events/DELETE]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}