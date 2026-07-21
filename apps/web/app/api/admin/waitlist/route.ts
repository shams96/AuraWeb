import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

function isAdmin(session: { user?: unknown } | null) {
  return ['ADMIN', 'OWNER'].includes((session?.user as { role?: string })?.role ?? '')
}

function toCsv(entries: WaitlistEntry[]): string {
  const header = ['Position', 'Email', 'Phone', 'Founding Member', 'Joined At']
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`
  const rows = entries.map((e, i) => [
    String(i + 1),
    escape(e.email),
    escape(e.phone),
    i < FOUNDING_CAP ? 'Yes' : 'No',
    e.createdAt,
  ].join(','))
  return [header.join(','), ...rows].join('\n')
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const waitlist = await readWaitlist()
  const format = req.nextUrl.searchParams.get('format')

  if (format === 'csv') {
    return new NextResponse(toCsv(waitlist), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="waitlist.csv"',
      },
    })
  }

  return NextResponse.json({
    entries: waitlist.map((e, i) => ({ ...e, position: i + 1, isFounding: i < FOUNDING_CAP })),
    foundingCap: FOUNDING_CAP,
  })
}
