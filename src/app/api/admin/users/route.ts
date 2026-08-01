import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { verifyAuth, isAdminAuth } from '@/middleware/auth'
import { desc } from 'drizzle-orm'

// GET /api/admin/users — list all members (admin only)
export async function GET(request: NextRequest) {
  try {
    const payload = verifyAuth(request)
    if (!isAdminAuth(payload)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rows = await db.select().from(users).orderBy(desc(users.createdAt))

    // Never leak password hashes
    return NextResponse.json({
      data: rows.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        subscriptionStatus: u.subscriptionStatus,
        subscriptionExpiresAt: u.subscriptionExpiresAt,
        createdAt: u.createdAt,
      })),
    })
  } catch (error) {
    console.error('[admin/users/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
