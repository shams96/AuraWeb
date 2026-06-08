import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

interface ResetToken {
  email: string
  token: string
  expiresAt: number
}

interface StoredUser {
  id: string
  email: string
  passwordHash: string
  [key: string]: unknown
}

const TOKENS_PATH = path.join(process.cwd(), 'data', 'reset-tokens.json')
const USERS_PATH  = path.join(process.cwd(), 'data', 'users.json')

function loadTokens(): ResetToken[] {
  try { return JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8')) } catch { return [] }
}

function saveTokens(tokens: ResetToken[]): void {
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2))
}

function loadUsers(): StoredUser[] {
  try {
    const raw    = JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'))
    return Array.isArray(raw) ? raw : (raw.users ?? [])
  } catch { return [] }
}

function saveUsers(users: StoredUser[]): void {
  fs.writeFileSync(USERS_PATH, JSON.stringify({ users }, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token)                 return NextResponse.json({ error: 'Missing token.'              }, { status: 400 })
    if (!password || password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const tokenHash = createHash('sha256').update(token).digest('hex')
    const tokens    = loadTokens()
    const entry     = tokens.find(t => t.token === tokenHash)

    if (!entry)                       return NextResponse.json({ error: 'Invalid or expired link.' }, { status: 400 })
    if (Date.now() > entry.expiresAt) return NextResponse.json({ error: 'This link has expired. Please request a new one.' }, { status: 400 })

    const users   = loadUsers()
    const userIdx = users.findIndex(u => u.email.toLowerCase() === entry.email.toLowerCase())
    if (userIdx === -1)               return NextResponse.json({ error: 'Account not found.' }, { status: 404 })

    users[userIdx] = { ...users[userIdx], passwordHash: await bcrypt.hash(password, 12) }
    saveUsers(users)

    // Invalidate this token
    saveTokens(tokens.filter(t => t.token !== tokenHash))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[reset-password]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
