import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'returns.json')

interface ReturnRequest {
  id: string
  orderNumber: string
  email: string
  reason: string
  details: string
  status: string
  createdAt: string
}

async function readReturns(): Promise<ReturnRequest[]> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeReturns(data: ReturnRequest[]): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

function isAdmin(session: { user?: unknown } | null) {
  return ['ADMIN', 'OWNER'].includes((session?.user as { role?: string })?.role ?? '')
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const returns = await readReturns()
  return NextResponse.json(returns)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id, status } = await req.json()
  const returns = await readReturns()
  const idx = returns.findIndex(r => r.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  returns[idx] = { ...returns[idx], status }
  await writeReturns(returns)
  return NextResponse.json(returns[idx])
}
