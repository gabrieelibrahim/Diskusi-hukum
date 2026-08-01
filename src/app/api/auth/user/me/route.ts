import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { verifyAuth, isUserAuth } from '@/middleware/auth'
import { eq } from 'drizzle-orm'

// GET /api/auth/user/me — current member info from Bearer token
export async function GET(request: NextRequest) {
  try {
    const payload = verifyAuth(request)
    if (!isUserAuth(payload) || !payload.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.select().from(users).where(eq(users.id, payload.userId)).get()
    if (!user) {
      return NextResponse.json({ error: 'Akun tidak ditemukan' }, { status: 404 })
    }

    // Refresh expired status
    let status = user.subscriptionStatus
    if (status === 'premium' && user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt) < new Date()) {
      status = 'expired'
      await db
        .update(users)
        .set({ subscriptionStatus: 'expired', updatedAt: new Date().toISOString() })
        .where(eq(users.id, user.id))
    }

    return NextResponse.json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscriptionStatus: status,
        subscriptionExpiresAt: user.subscriptionExpiresAt,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('[auth/user/me]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
