import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

// POST /api/auth/user/register — create a regular (member) account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Nama, email, dan password wajib diisi' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter' }, { status: 400 })
    }

    const existing = await db.select().from(users).where(eq(users.email, email.toLowerCase())).get()
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const now = new Date().toISOString()

    const inserted = await db
      .insert(users)
      .values({
        name,
        email: email.toLowerCase(),
        passwordHash,
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    const user = inserted[0]
    if (!user) {
      return NextResponse.json({ error: 'Gagal membuat akun' }, { status: 500 })
    }

    return NextResponse.json(
      {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[auth/user/register]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
