import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByEmail } from '@/lib/user-store'

export async function POST(req: NextRequest) {
  try {
    const { email, name, password, accountType = 'personal' } = await req.json()

    if (!email?.trim() || !name?.trim() || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }
    if (findUserByEmail(email)) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    const user = createUser({ name, email, password, accountType })

    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      { status: 201 },
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : ''
    if (msg === 'EMAIL_EXISTS') {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
