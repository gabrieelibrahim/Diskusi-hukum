import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { verifyAuth, isAdminAuth } from '@/middleware/auth'
import { eq } from 'drizzle-orm'

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
