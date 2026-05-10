import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Minimal NextAuth config for the web frontend.
// Authentication state is stored client-side via JWT session.
// Actual user verification happens via the API service.
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Delegate auth to the API service
          // Use local verify endpoint first, fall back to external API
          const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
          const apiUrl = process.env.NEXT_PUBLIC_API_URL
          const verifyUrl = apiUrl
            ? `${apiUrl}/api/auth/verify`
            : `${baseUrl}/api/auth/verify`
          const res = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!res.ok) return null

          const user = await res.json()
          return user
        } catch {
          // If API not available, allow null (unauthenticated browsing)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role as string
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        ;(session.user as any).id = token.id as string
        ;(session.user as any).role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
