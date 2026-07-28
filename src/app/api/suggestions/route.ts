import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { topicSuggestions } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// GET /api/suggestions — list topic suggestions (auth required)
export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let result
    if (status) {
      result = await db
        .select()
        .from(topicSuggestions)
        .where(eq(topicSuggestions.status, status))
        .orderBy(desc(topicSuggestions.id))
    } else {
      result = await db.select().from(topicSuggestions).orderBy(desc(topicSuggestions.id))
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('[suggestions/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST /api/suggestions — submit new topic suggestion (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, name, email } = body

    if (!title || !name || !email) {
      return NextResponse.json({ error: 'Judul, nama, dan email wajib diisi' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 })
    }

    const inserted = await db
      .insert(topicSuggestions)
      .values({
        title,
        description: description ?? '',
        name,
        email,
        status: 'pending',
      })
      .returning()

    return NextResponse.json({ data: inserted[0], message: 'Usulan topik berhasil dikirim' }, { status: 201 })
  } catch (error) {
    console.error('[suggestions/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// PATCH /api/suggestions — approve/reject suggestion (auth required)
export async function PATCH(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, status } = body

    if (!id) {
      return NextResponse.json({ error: 'ID usulan wajib diisi' }, { status: 400 })
    }

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Status harus approved atau rejected' }, { status: 400 })
    }

    const existing = await db.select().from(topicSuggestions).where(eq(topicSuggestions.id, id)).get()
    if (!existing) {
      return NextResponse.json({ error: 'Usulan tidak ditemukan' }, { status: 404 })
    }

    await db.update(topicSuggestions).set({ status }).where(eq(topicSuggestions.id, id))

    const updated = await db.select().from(topicSuggestions).where(eq(topicSuggestions.id, id)).get()

    return NextResponse.json({
      data: updated,
      message: status === 'approved' ? 'Usulan disetujui' : 'Usulan ditolak',
    })
  } catch (error) {
    console.error('[suggestions/PATCH]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}