import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { articles, categories, tags, articleTags } from '@/db/schema'
import { eq, like, or, desc, and, sql } from 'drizzle-orm'
import { verifyAuth } from '@/middleware/auth'

// Slug-ify helper
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// GET /api/articles — list articles with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const q = searchParams.get('q')
    const categorySlug = searchParams.get('category')
    const tagSlug = searchParams.get('tag')
    const sort = searchParams.get('sort') // 'popular' | 'latest'
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
    const offset = Number(searchParams.get('offset')) || 0

    const conditions: any[] = []

    // Filter by status (default to published for public)
    if (status) {
      conditions.push(eq(articles.status, status))
    } else {
      conditions.push(eq(articles.status, 'published'))
    }

    // Search by title or excerpt
    if (q) {
      conditions.push(
        or(
          like(articles.title, `%${q}%`),
          like(articles.excerpt, `%${q}%`),
          like(articles.content, `%${q}%`),
        ),
      )
    }

    // Filter by category slug
    if (categorySlug) {
      conditions.push(eq(articles.categorySlug, categorySlug))
    }

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(articles)
      .where(and(...conditions))
      .get()

    const total = countResult?.count ?? 0

    // Fetch articles — sort by popular (views) or latest (publishedAt)
    const orderByClause = sort === 'popular'
      ? desc(articles.views)
      : desc(articles.publishedAt)

    const rows = await db
      .select()
      .from(articles)
      .where(and(...conditions))
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset)

    // Fetch category names
    const allCategories = await db.select().from(categories)
    const catMap = new Map(allCategories.map((c) => [c.slug, c]))

    // If tag filter, filter after the fact
    let result = rows
    if (tagSlug) {
      const tagRows = await db.select().from(tags).where(eq(tags.slug, tagSlug)).get()
      if (tagRows) {
        const articleTagRows = await db
          .select()
          .from(articleTags)
          .where(eq(articleTags.tagId, tagRows.id))
        const articleIds = new Set(articleTagRows.map((at) => at.articleId))
        result = rows.filter((r) => articleIds.has(r.id))
      } else {
        result = []
      }
    }

    // Attach tags to each article
    const articlesWithTags = await Promise.all(
      result.map(async (article) => {
        const atRows = await db
          .select({ tag: tags })
          .from(articleTags)
          .innerJoin(tags, eq(articleTags.tagId, tags.id))
          .where(eq(articleTags.articleId, article.id))

        return {
          ...article,
          category: catMap.get(article.categorySlug ?? '') ?? null,
          tags: atRows.map((r) => r.tag),
        }
      }),
    )

    return NextResponse.json({
      data: articlesWithTags,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('[articles/GET]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST /api/articles — create article (auth required)
export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      content,
      excerpt,
      cover,
      categorySlug,
      tagIds,
      status,
      readingTime,
      sources,
      glossary,
      keyPoints,
      authorName,
      authorSlug,
    } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Judul dan konten wajib diisi' }, { status: 400 })
    }

    const slug = body.slug || slugify(title)

    // Check slug uniqueness
    const existing = await db.select().from(articles).where(eq(articles.slug, slug)).get()
    if (existing) {
      return NextResponse.json({ error: 'Slug sudah digunakan, gunakan slug lain' }, { status: 409 })
    }

    const now = new Date().toISOString()

    const inserted = await db
      .insert(articles)
      .values({
        title,
        slug,
        excerpt: excerpt ?? '',
        content,
        cover: cover ?? '',
        authorName: authorName ?? 'Admin',
        authorSlug: authorSlug ?? 'admin',
        categorySlug: categorySlug ?? null,
        publishedAt: status === 'published' ? now : null,
        updatedAt: now,
        status: status ?? 'draft',
        readingTime: readingTime ?? Math.ceil(content.length / 1000),
        sources: sources ? JSON.stringify(sources) : '[]',
        glossary: glossary ? JSON.stringify(glossary) : '[]',
        keyPoints: keyPoints ? JSON.stringify(keyPoints) : '[]',
      })
      .returning()

    const article = inserted[0]

    // Link tags
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0 && article) {
      for (const tagId of tagIds) {
        await db.insert(articleTags).values({ articleId: article.id, tagId }).onConflictDoNothing()
      }
    }

    return NextResponse.json({ data: article }, { status: 201 })
  } catch (error) {
    console.error('[articles/POST]', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}