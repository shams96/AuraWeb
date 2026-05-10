import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: string
  accountType: string
}

const DATA_PATH = join(process.cwd(), 'data', 'users.json')

function loadUsers(): StoredUser[] {
  if (!existsSync(DATA_PATH)) return []
  const raw = readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw).users as StoredUser[]
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    const users = loadUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
