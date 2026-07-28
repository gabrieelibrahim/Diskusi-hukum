import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { settings } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// GET /api/settings — get settings
export async function GET() {
  try {
    let row = await db.select().from(settings).get()

    // If no settings exist, create defaults
    if (!row) {
      const inserted = await db
        .insert(settings)
        .values({
          siteName: 'Diskusi Hukum',
          siteDescription: 'Platform edukasi hukum untuk masyarakat Indonesia.',
          logoUrl: '',
          socialLinks: JSON.stringify({}),
        })
        .returning()
      row = inserted[0]
    }

    // Parse JSON fields
    const result = {
      ...row,
      socialLinks: row.socialLinks ? JSON.parse(row.socialLinks) : {},
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('[settings/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// PUT /api/settings — update settings (auth required)
export async function PUT(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Get existing settings
    let existing = await db.select().from(settings).get()

    if (!existing) {
      // Create new settings row
      const inserted = await db
        .insert(settings)
        .values({
          siteName: body.siteName ?? 'Diskusi Hukum',
          siteDescription: body.siteDescription ?? '',
          logoUrl: body.logoUrl ?? '',
          socialLinks: body.socialLinks ? JSON.stringify(body.socialLinks) : '{}',
        })
        .returning()
      existing = inserted[0]
    } else {
      // Update existing settings
      const updateData: Record<string, any> = {}

      if (body.siteName !== undefined) updateData.siteName = body.siteName
      if (body.siteDescription !== undefined) updateData.siteDescription = body.siteDescription
      if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl
      if (body.socialLinks !== undefined) updateData.socialLinks = JSON.stringify(body.socialLinks)

      await db.update(settings).set(updateData).where(eq(settings.id, existing.id))
    }

    const updated = await db.select().from(settings).get()

    return NextResponse.json({
      data: {
        ...updated,
        socialLinks: updated?.socialLinks ? JSON.parse(updated.socialLinks) : {},
      },
    })
  } catch (error) {
    console.error('[settings/PUT]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}