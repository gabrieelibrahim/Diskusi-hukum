import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { verifyAuth, isAdminAuth } from '@/middleware/auth'
import { eq } from 'drizzle-orm'

// PATCH /api/admin/users/[id] — update member subscription (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const payload = verifyAuth(request)
    if (!isAdminAuth(payload)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = Number(params.id)
    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    }

    const user = await db.select().from(users).where(eq(users.id, id)).get()
    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 })
    }

    const body = await request.json()
    const { subscriptionStatus, durationMonths } = body

    if (!subscriptionStatus || !['free', 'premium'].includes(subscriptionStatus)) {
      return NextResponse.json({ error: 'Status langganan tidak valid' }, { status: 400 })
    }

    let expiresAt = user.subscriptionExpiresAt
    if (subscriptionStatus === 'premium') {
      // Default 1 month; admin can pass durationMonths
      const months = Number(durationMonths) || 1
      const base = expiresAt && new Date(expiresAt) > new Date() ? new Date(expiresAt) : new Date()
      base.setMonth(base.getMonth() + months)
      expiresAt = base.toISOString()
    } else {
      expiresAt = null
    }

    const now = new Date().toISOString()
    await db
      .update(users)
      .set({ subscriptionStatus, subscriptionExpiresAt: expiresAt, updatedAt: now })
      .where(eq(users.id, id))

    return NextResponse.json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscriptionStatus,
        subscriptionExpiresAt: expiresAt,
      },
    })
  } catch (error) {
    console.error('[admin/users/id/PATCH]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] — remove a member (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const payload = verifyAuth(request)
    if (!isAdminAuth(payload)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = Number(params.id)
    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    }

    const user = await db.select().from(users).where(eq(users.id, id)).get()
    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 })
    }

    await db.delete(users).where(eq(users.id, id))

    return NextResponse.json({ message: 'Pengguna berhasil dihapus' })
  } catch (error) {
    console.error('[admin/users/id/DELETE]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
