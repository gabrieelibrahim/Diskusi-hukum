import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { adminUsers } from '@/db/schema'
import { signToken } from '@/middleware/auth'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 })
    }

    const user = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).get()

    if (!user) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 })
    }

    const token = signToken({ username: user.username })

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('[auth/login]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}