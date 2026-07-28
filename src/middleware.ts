import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js Middleware — runs on every request.
 *
 * - Adds CORS headers for API routes
 * - Protects /api/admin/* routes (only those not already protected by individual route handlers)
 * - Handles preflight OPTIONS requests
 */

// Routes that require authentication
const protectedApiPaths = ['/api/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  // ── CORS Headers ───────────────────────────────────────────
  const response = NextResponse.next()

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With',
  )
  response.headers.set('Access-Control-Max-Age', '86400')

  // ── Handle preflight ───────────────────────────────────────
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // ── Protected API routes ───────────────────────────────────
  // /api/* routes are protected individually in their handlers via verifyAuth(),
  // so we don't block them here to allow public endpoints like POST /api/suggestions.
  // For /api/admin specifically, we can add a blanket check.
  if (protectedApiPaths.some((p) => pathname.startsWith(p))) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
  ],
}