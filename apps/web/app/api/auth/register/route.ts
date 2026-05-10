import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: 'CUSTOMER' | 'PROFESSIONAL'
  accountType: 'personal' | 'business'
  createdAt: string
}

const DATA_PATH = join(process.cwd(), 'data', 'users.json')

function loadUsers(): StoredUser[] {
  const dir = join(process.cwd(), 'data')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  if (!existsSync(DATA_PATH)) writeFileSync(DATA_PATH, JSON.stringify({ users: [] }))
  const raw = readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw).users as StoredUser[]
}

function saveUsers(users: StoredUser[]): void {
  writeFileSync(DATA_PATH, JSON.stringify({ users }, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, password, accountType = 'personal' } = body

    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const users = loadUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const newUser: StoredUser = {
      id: randomUUID(),
      email: email.toLowerCase(),
      name,
      passwordHash,
      role: accountType === 'business' ? 'PROFESSIONAL' : 'CUSTOMER',
      accountType,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    saveUsers(users)

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
