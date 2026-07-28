import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { contributors } from '@/db/schema'
import { eq, desc, asc } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// GET /api/contributors — list contributors (approved by default, all if auth)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all')
    const user = verifyAuth(request)

    let result
    if (all === 'true' && user) {
      // Admin can see all contributors including unapproved
      result = await db.select().from(contributors).orderBy(desc(contributors.id))
    } else {
      // Public only sees approved ones
      result = await db
        .select()
        .from(contributors)
        .where(eq(contributors.approved, 1))
        .orderBy(asc(contributors.name))
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('[contributors/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST /api/contributors — register new contributor (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, bio, avatar } = body

    if (!name) {
      return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 })
    }

    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    // Check for existing slug
    const existing = await db.select().from(contributors).where(eq(contributors.slug, slug)).get()
    if (existing) {
      return NextResponse.json({ error: 'Kontributor dengan nama tersebut sudah terdaftar' }, { status: 409 })
    }

    const inserted = await db
      .insert(contributors)
      .values({
        name,
        slug,
        bio: bio ?? '',
        avatar: avatar ?? '',
        approved: 0, // needs admin approval
      })
      .returning()

    return NextResponse.json({ data: inserted[0], message: 'Pendaftaran berhasil, menunggu persetujuan admin' }, { status: 201 })
  } catch (error) {
    console.error('[contributors/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// PATCH /api/contributors — approve/deactivate (auth required)
export async function PATCH(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, approved } = body

    if (!id) {
      return NextResponse.json({ error: 'ID kontributor wajib diisi' }, { status: 400 })
    }

    const existing = await db.select().from(contributors).where(eq(contributors.id, id)).get()
    if (!existing) {
      return NextResponse.json({ error: 'Kontributor tidak ditemukan' }, { status: 404 })
    }

    const newStatus = approved === true || approved === 1 ? 1 : 0

    await db.update(contributors).set({ approved: newStatus }).where(eq(contributors.id, id))

    const updated = await db.select().from(contributors).where(eq(contributors.id, id)).get()

    return NextResponse.json({
      data: updated,
      message: newStatus ? 'Kontributor disetujui' : 'Kontributor dinonaktifkan',
    })
  } catch (error) {
    console.error('[contributors/PATCH]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}