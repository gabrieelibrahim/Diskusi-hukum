import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'diskusi-hukum-secret'

export function signToken(payload: { username: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' })
}

export function verifyAuth(request: Request) {
  const auth = request.headers.get('authorization')
  if (!auth) return null
  const token = auth.replace('Bearer ', '')
  try {
    return jwt.verify(token, SECRET) as { username: string; iat: number; exp: number }
  } catch {
    return null
  }
}