import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { accountWelcomeEmail } from '@/lib/email-templates'

interface User {
  id: string
  email: string
  name: string
  passwordHash: string
  role: string
  accountType: string
  createdAt: string
}

function getStorePath() {
  return path.join(process.cwd(), 'data', 'users.json')
}

function loadUsers(): User[] {
  const p = getStorePath()
  if (!fs.existsSync(p)) return []
  try {
    const raw = fs.readFileSync(p, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : (parsed.users ?? [])
  } catch {
    return []
  }
}

function saveUsers(users: User[]): void {
  const p = getStorePath()
  const dir = path.dirname(p)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(p, JSON.stringify({ users }, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, password, accountType = 'personal' } = body
    const ivRef = req.cookies.get('iv_ref')?.value

    if (!email?.trim() || !name?.trim() || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const users = loadUsers()
    const emailLower = email.toLowerCase().trim()

    if (users.find(u => u.email.toLowerCase() === emailLower)) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const newUser: User = {
      id: randomUUID(),
      email: emailLower,
      name: name.trim(),
      passwordHash,
      role: accountType === 'business' ? 'PENDING_PROFESSIONAL' : 'CUSTOMER',
      accountType,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    saveUsers(users)

    console.log('[register] user created')

    // Track referral server-side from httpOnly cookie (fire-and-forget)
    if (ivRef && /^[a-f0-9]{8}$/.test(ivRef)) {
      const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:5000'
      fetch(`${baseUrl}/api/referral/track`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ code: ivRef, refereeEmail: emailLower }),
      }).catch(() => {})
    }

    // Send welcome email (non-blocking — failure doesn't affect registration)
    if (resend) {
      const aType = accountType === 'business' ? 'business' : 'personal'
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      emailLower,
        subject: accountType === 'business'
          ? 'Your Isola Vitale professional application | Welcome'
          : 'Welcome to Isola Vitale — your ritual awaits',
        html: accountWelcomeEmail({ name: name.trim(), accountType: aType }),
      }).catch(err => console.error('[register] welcome email failed:', err))
    }

    return NextResponse.json(
      { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      { status: 201 }
    )
  } catch (e) {
    console.error('[register] error:', e)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
