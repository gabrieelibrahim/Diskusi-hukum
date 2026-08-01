import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'diskusi-hukum-secret'

type TokenPayload = {
  username?: string
  role?: 'admin' | 'user'
  userId?: number
  email?: string
  subscriptionStatus?: 'free' | 'premium' | 'expired'
  subscriptionExpiresAt?: string | null
  iat?: number
  exp?: number
}

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' })
}

export function verifyAuth(request: Request): TokenPayload | null {
  const auth = request.headers.get('authorization')
  if (!auth) return null
  const token = auth.replace('Bearer ', '')
  try {
    return jwt.verify(token, SECRET) as TokenPayload
  } catch {
    return null
  }
}

// Convenience helpers for admin/user gating
export function isAdminAuth(payload: TokenPayload | null): payload is TokenPayload & { role: 'admin' } {
  return !!payload && payload.role === 'admin'
}

export function isUserAuth(payload: TokenPayload | null): payload is TokenPayload & { role: 'user' } {
  return !!payload && payload.role === 'user'
}