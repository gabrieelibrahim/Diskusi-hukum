import { NextResponse } from 'next/server'
import { seed } from '@/db/seed'

/**
 * GET /api/seed
 *
 * Runs the database seed (initial setup).
 * Idempotent — uses onConflictDoNothing, safe to call multiple times.
 */
export async function GET() {
  try {
    await seed()
    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    console.error('[api/seed]', error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}