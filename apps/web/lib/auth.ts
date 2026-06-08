import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

interface JsonUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: string
}

function loadJsonUsers(): JsonUser[] {
  try {
    const p = path.join(process.cwd(), 'data', 'users.json')
    if (!fs.existsSync(p)) return []
    const raw    = fs.readFileSync(p, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : (parsed.users ?? [])
  } catch (e) {
    console.error('[auth] loadJsonUsers error:', e)
    return []
  }
}

async function findAndVerifyUser(email: string, password: string): Promise<{ id: string; email: string; name: string; role: string } | null> {
  const emailLower = email.toLowerCase()

  // Try Prisma first (when DATABASE_URL is set in production)
  try {
    const { prisma } = await import('@/lib/prisma')
    if (prisma) {
      const user = await prisma.user.findUnique({ where: { email: emailLower } })
      if (user?.passwordHash) {
        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    }
  } catch {
    // Prisma not available — fall through to JSON
  }

  // Fallback: JSON file store (dev)
  const users = loadJsonUsers()
  const user  = users.find(u => u.email.toLowerCase() === emailLower)
  if (!user) return null

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return null

  return { id: user.id, email: user.email, name: user.name, role: user.role }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await findAndVerifyUser(credentials.email, credentials.password)
          if (user) console.log('[auth] authorize: success')
          else      console.error('[auth] authorize: failed — invalid credentials')
          return user
        } catch (e) {
          console.error('[auth] authorize exception:', e)
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string; role?: string }).id   = token.id as string
        (session.user as { id?: string; role?: string }).role = token.role as string
      }
      return session
    },
  },
  pages: { signIn: '/login' },
  secret: process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET
    ? (() => { throw new Error('NEXTAUTH_SECRET must be set in production') })()
    : (process.env.NEXTAUTH_SECRET ?? 'iv-dev-secret-change-in-production'),
}
