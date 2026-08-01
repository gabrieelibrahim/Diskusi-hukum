// Shared helpers for premium content gating (server-side only)

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { verifyAuth, isAdminAuth, isUserAuth } from '@/middleware/auth'

export const PREVIEW_PARAGRAPHS = 3

export type AccessLevel = {
  isAdmin: boolean
  isPremium: boolean
  // true when the caller is an authenticated premium member or admin
  canViewFull: boolean
  // true when the caller is a logged-in member (free or premium)
  isMember: boolean
}

/**
 * Resolve the caller's access level.
 * Important: reads the latest subscription status from the database (keyed by
 * the token's userId), so admin activation/expiry takes effect immediately even
 * for tokens that were signed before the status changed.
 */
export async function resolveAccess(request: Request): Promise<AccessLevel> {
  const payload = verifyAuth(request)
  if (isAdminAuth(payload)) {
    return { isAdmin: true, isPremium: false, canViewFull: true, isMember: false }
  }
  if (isUserAuth(payload) && payload.userId) {
    const row = await db.select().from(users).where(eq(users.id, payload.userId)).get().catch(() => null)
    const status = row?.subscriptionStatus ?? payload.subscriptionStatus ?? 'free'
    const premium =
      status === 'premium' && (!row?.subscriptionExpiresAt || new Date(row.subscriptionExpiresAt) > new Date())
    return { isAdmin: false, isPremium: premium, canViewFull: premium, isMember: true }
  }
  return { isAdmin: false, isPremium: false, canViewFull: false, isMember: false }
}

// Return the first N paragraphs of markdown content (preview for free users)
export function previewContent(content: string, paragraphs: number = PREVIEW_PARAGRAPHS): string {
  if (!content) return ''
  // Split into blocks on blank lines; keep headings together with their first paragraph
  const blocks = content.split(/\n\s*\n/).filter((b) => b.trim().length > 0)
  return blocks.slice(0, paragraphs).join('\n\n')
}

export const FULL_ACCESS_EXTRA_FIELDS = ['content']
