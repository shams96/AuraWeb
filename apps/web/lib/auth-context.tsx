'use client'

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
      return
    }

    if (session?.user) {
      // Generate a unique ID from email or use a fallback
      const generateId = (email: string, name: string) => {
        // Use email hash if available, otherwise use name hash
        if (email) {
          return `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`
        }
        if (name) {
          return `user_${name.replace(/[^a-zA-Z0-9]/g, '_')}`
        }
        return 'user_unknown'
      }

      setUser({
        id: generateId(session.user.email || '', session.user.name || ''),
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image,
      })
    } else {
      setUser(null)
    }

    setIsLoading(false)
  }, [session, status])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
