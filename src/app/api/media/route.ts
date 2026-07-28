import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { media } from '@/db/schema'
import { eq, desc, like } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// GET /api/media — list media (auth required)
export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
    const offset = Number(searchParams.get('offset')) || 0

    let result
    if (type) {
      result = await db
        .select()
        .from(media)
        .where(like(media.mimetype, `${type}%`))
        .orderBy(desc(media.createdAt))
        .limit(limit)
        .offset(offset)
    } else {
      result = await db
        .select()
        .from(media)
        .orderBy(desc(media.createdAt))
        .limit(limit)
        .offset(offset)
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('[media/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST /api/media — upload media file (auth required, multipart/form-data)
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

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Ukuran file maksimal 10MB' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Tipe file tidak diizinkan' }, { status: 400 })
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'bin'
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = path.join(uploadsDir, filename)
    await writeFile(filePath, buffer)

    const now = new Date().toISOString()

    const inserted = await db
      .insert(media)
      .values({
        filename,
        originalName: file.name,
        mimetype: file.type,
        size: file.size,
        path: `/uploads/${filename}`,
        createdAt: now,
      })
      .returning()

    return NextResponse.json({ data: inserted[0] }, { status: 201 })
  } catch (error) {
    console.error('[media/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}