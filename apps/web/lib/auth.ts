import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

interface User {
  id: string
  email: string
  name: string
  passwordHash: string
  role: string
}

function getUsersFilePath() {
  return path.join(process.cwd(), 'data', 'users.json')
}

function loadUsers(): User[] {
  try {
    const p = getUsersFilePath()
    if (!fs.existsSync(p)) return []
    const raw = fs.readFileSync(p, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : (parsed.users ?? [])
  } catch (e) {
    console.error('[auth] loadUsers error:', e)
    return []
  }
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
        if (!credentials?.email || !credentials?.password) {
          console.error('[auth] authorize: missing credentials')
          return null
        }

        try {
          const users = loadUsers()
          console.log(`[auth] authorize: found ${users.length} users, looking for ${credentials.email}`)

          const user = users.find(
            u => u.email.toLowerCase() === credentials.email.toLowerCase()
          )

          if (!user) {
            console.error(`[auth] authorize: no user found for ${credentials.email}`)
            return null
          }

          const valid = await bcrypt.compare(credentials.password, user.passwordHash)
          if (!valid) {
            console.error(`[auth] authorize: wrong password for ${credentials.email}`)
            return null
          }

          console.log(`[auth] authorize: success for ${credentials.email}`)
          return { id: user.id, email: user.email, name: user.name, role: user.role }
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
  secret: process.env.NEXTAUTH_SECRET ?? 'iv-dev-secret-change-in-production',
}
