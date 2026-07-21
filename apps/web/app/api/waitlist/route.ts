import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'waitlist.json')
const FOUNDING_CAP = 100

interface WaitlistEntry {
  id: string
  email: string
  phone: string
  createdAt: string
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeWaitlist(data: WaitlistEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9\s\-().]{7,20}$/

export async function GET() {
  const waitlist = await readWaitlist()
  return NextResponse.json({ count: waitlist.length, foundingCap: FOUNDING_CAP })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
  }

  const waitlist = await readWaitlist()
  const existingIndex = waitlist.findIndex(e => e.email.toLowerCase() === email.toLowerCase())

  if (existingIndex !== -1) {
    return NextResponse.json({
      alreadyJoined: true,
      position: existingIndex + 1,
      isFounding: existingIndex < FOUNDING_CAP,
    })
  }

  const entry: WaitlistEntry = { id: crypto.randomUUID(), email, phone, createdAt: new Date().toISOString() }
  waitlist.push(entry)
  await writeWaitlist(waitlist)

  return NextResponse.json({
    success: true,
    position: waitlist.length,
    isFounding: waitlist.length <= FOUNDING_CAP,
  })
}
