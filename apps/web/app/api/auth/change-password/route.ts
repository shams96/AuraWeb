import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findUserByEmail } from '@/lib/user-store'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json')

interface StoredUser { email: string; passwordHash: string; [key: string]: unknown }

function loadUsers(): StoredUser[] {
  try {
    const raw = JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'))
    return Array.isArray(raw) ? raw : (raw.users ?? [])
  } catch { return [] }
}

function saveUsers(users: StoredUser[]): void {
  fs.writeFileSync(USERS_PATH, JSON.stringify({ users }, null, 2))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await req.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Both current and new password are required.' }, { status: 400 })
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 })
    }

    const emailLower = session.user.email.toLowerCase()
    const user       = findUserByEmail(emailLower)
    if (!user) return NextResponse.json({ error: 'Account not found.' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })

    const users   = loadUsers()
    const idx     = users.findIndex(u => u.email.toLowerCase() === emailLower)
    if (idx === -1) return NextResponse.json({ error: 'Account not found.' }, { status: 404 })

    users[idx] = { ...users[idx], passwordHash: await bcrypt.hash(newPassword, 12) }
    saveUsers(users)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[change-password]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
