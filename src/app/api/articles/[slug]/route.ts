import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { articles, tags, articleTags, categories } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// GET /api/articles/[slug] — single article by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params

    const article = await db.select().from(articles).where(eq(articles.slug, slug)).get()

    if (!article) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 })
    }

    // Get category
    const category = article.categorySlug
      ? await db.select().from(categories).where(eq(categories.slug, article.categorySlug)).get()
      : null

    // Get tags
    const tagRows = await db
      .select({ tag: tags })
      .from(articleTags)
      .innerJoin(tags, eq(articleTags.tagId, tags.id))
      .where(eq(articleTags.articleId, article.id))

    return NextResponse.json({
      data: {
        ...article,
        category,
        tags: tagRows.map((r) => r.tag),
      },
    })
  } catch (error) {
    console.error('[articles/slug/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// PATCH /api/articles/[slug]/view — increment article views (public)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params
    await db.update(articles).set({ views: sql`views + 1` }).where(eq(articles.slug, slug))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[articles/slug/PATCH]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// PUT /api/articles/[slug] — update article (auth required)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = params
    const body = await request.json()

    const existing = await db.select().from(articles).where(eq(articles.slug, slug)).get()
    if (!existing) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 })
    }

    const updateData: Record<string, any> = {}

    const fields = [
      'title', 'excerpt', 'content', 'cover', 'authorName', 'authorSlug',
      'categorySlug', 'status', 'readingTime',
    ]
    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // Handle slug change
    if (body.slug && body.slug !== slug) {
      const slugExists = await db.select().from(articles).where(eq(articles.slug, body.slug)).get()
      if (slugExists) {
        return NextResponse.json({ error: 'Slug sudah digunakan' }, { status: 409 })
      }
      updateData.slug = body.slug
    }

    // Handle JSON fields
    if (body.sources !== undefined) {
      updateData.sources = JSON.stringify(body.sources)
    }
    if (body.glossary !== undefined) {
      updateData.glossary = JSON.stringify(body.glossary)
    }
    if (body.keyPoints !== undefined) {
      updateData.keyPoints = JSON.stringify(body.keyPoints)
    }

    // Set publishedAt when status changes to published for the first time
    if (body.status === 'published' && existing.status !== 'published') {
      updateData.publishedAt = new Date().toISOString()
    }

    updateData.updatedAt = new Date().toISOString()

    await db.update(articles).set(updateData).where(eq(articles.slug, slug))

    // Update tag associations if provided
    if (body.tagIds && Array.isArray(body.tagIds)) {
      // Remove existing tags
      await db.delete(articleTags).where(eq(articleTags.articleId, existing.id))
      // Add new tags
      for (const tagId of body.tagIds) {
        await db.insert(articleTags).values({ articleId: existing.id, tagId }).onConflictDoNothing()
      }
    }

    const updated = await db.select().from(articles).where(eq(articles.slug, updateData.slug || slug)).get()

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('[articles/slug/PUT]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// DELETE /api/articles/[slug] — delete article (auth required)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = params

    const existing = await db.select().from(articles).where(eq(articles.slug, slug)).get()
    if (!existing) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 })
    }

    await db.delete(articles).where(eq(articles.slug, slug))

    return NextResponse.json({ message: 'Artikel berhasil dihapus' })
  } catch (error) {
    console.error('[articles/slug/DELETE]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}