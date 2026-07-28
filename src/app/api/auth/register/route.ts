import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { adminUsers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter' }, { status: 400 })
    }

    const existing = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).get()
    if (existing) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await db.insert(adminUsers).values({
      username,
      passwordHash,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ message: 'Admin berhasil didaftarkan' }, { status: 201 })
  } catch (error) {
    console.error('[auth/register]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}