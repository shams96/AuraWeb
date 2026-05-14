import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, verifyPassword } from '@/lib/user-store'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials.' }, { status: 400 })
    }

    const user = findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const valid = await verifyPassword(user, password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
  } catch {
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 })
  }
}
