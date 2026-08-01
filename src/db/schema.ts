import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

// ─── Categories ────────────────────────────────────────────
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
})

// ─── Tags ──────────────────────────────────────────────────
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
})

// ─── Articles ──────────────────────────────────────────────
export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  cover: text('cover'),
  authorName: text('author_name'),
  authorSlug: text('author_slug'),
  categorySlug: text('category_slug'),
  publishedAt: text('published_at'),
  updatedAt: text('updated_at'),
  status: text('status').default('draft'), // draft | review | published
  readingTime: integer('reading_time'),
  sources: text('sources'),       // JSON string
  glossary: text('glossary'),     // JSON string
  keyPoints: text('key_points'),  // JSON string
  views: integer('views').default(0),
})

// ─── Article-Tags (M:M) ───────────────────────────────────
export const articleTags = sqliteTable('article_tags', {
  articleId: integer('article_id')
    .notNull()
    .references(() => articles.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.tagId] }),
}))

// ─── Contributors ──────────────────────────────────────────
export const contributors = sqliteTable('contributors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  bio: text('bio'),
  avatar: text('avatar'),
  approved: integer('approved').default(0), // boolean: 0 | 1
})

// ─── Events ───────────────────────────────────────────────
export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  date: text('date'),
  time: text('time'),
  description: text('description'),
  type: text('type'),             // diskusi | seminar | workshop
  link: text('link'),
  cover: text('cover'),
})

// ─── Topic Suggestions ────────────────────────────────────
export const topicSuggestions = sqliteTable('topic_suggestions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title'),
  description: text('description'),
  name: text('name'),
  email: text('email'),
  status: text('status').default('pending'), // pending | approved | rejected
})

// ─── Media ─────────────────────────────────────────────────
export const media = sqliteTable('media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename'),
  originalName: text('original_name'),
  mimetype: text('mimetype'),
  size: integer('size'),
  path: text('path'),
  createdAt: text('created_at'),
})

// ─── Settings (single-row) ─────────────────────────────────
export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }).default(1),
  siteName: text('site_name'),
  siteDescription: text('site_description'),
  logoUrl: text('logo_url'),
  socialLinks: text('social_links'), // JSON string
})

// ─── Admin Users ───────────────────────────────────────────
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at'),
})

// ─── Regular Users (public members) ────────────────────────
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  // free | premium | expired
  subscriptionStatus: text('subscription_status').default('free'),
  // ISO date when the current premium period ends (null if not premium)
  subscriptionExpiresAt: text('subscription_expires_at'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
})

// ─── Inferred Types ────────────────────────────────────────
export type Category = InferSelectModel<typeof categories>
export type NewCategory = InferInsertModel<typeof categories>

export type Tag = InferSelectModel<typeof tags>
export type NewTag = InferInsertModel<typeof tags>

export type Article = InferSelectModel<typeof articles>
export type NewArticle = InferInsertModel<typeof articles>

export type ArticleTag = InferSelectModel<typeof articleTags>
export type NewArticleTag = InferInsertModel<typeof articleTags>

export type Contributor = InferSelectModel<typeof contributors>
export type NewContributor = InferInsertModel<typeof contributors>

export type Event = InferSelectModel<typeof events>
export type NewEvent = InferInsertModel<typeof events>

export type TopicSuggestion = InferSelectModel<typeof topicSuggestions>
export type NewTopicSuggestion = InferInsertModel<typeof topicSuggestions>

export type Media = InferSelectModel<typeof media>
export type NewMedia = InferInsertModel<typeof media>

export type Setting = InferSelectModel<typeof settings>
export type NewSetting = InferInsertModel<typeof settings>

export type AdminUser = InferSelectModel<typeof adminUsers>
export type NewAdminUser = InferInsertModel<typeof adminUsers>

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>