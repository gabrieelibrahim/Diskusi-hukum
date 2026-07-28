import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// GET /api/categories — list all categories
export async function GET() {
  try {
    const rows = await db.select().from(categories).orderBy(desc(categories.id))
    return NextResponse.json({ data: rows })
  } catch (error) {
    console.error('[categories/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST /api/categories — create category (auth required)
export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Nama dan slug wajib diisi' }, { status: 400 })
    }

    const existing = await db.select().from(categories).where(eq(categories.slug, slug)).get()
    if (existing) {
      return NextResponse.json({ error: 'Slug sudah digunakan' }, { status: 409 })
    }

    const inserted = await db
      .insert(categories)
      .values({ name, slug, description: description ?? '' })
      .returning()

    return NextResponse.json({ data: inserted[0] }, { status: 201 })
  } catch (error) {
    console.error('[categories/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}