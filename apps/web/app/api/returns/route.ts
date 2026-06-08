import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'returns.json')

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

interface ReturnRequest {
  id: string
  orderNumber: string
  email: string
  reason: string
  details: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
  createdAt: string
  userId?: string
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { orderNumber, reason, details } = await req.json()

  if (!orderNumber || !reason) {
    return NextResponse.json({ error: 'Order number and reason are required' }, { status: 400 })
  }

  const email = session.user.email ?? ''

  const returnReq: ReturnRequest = {
    id: crypto.randomUUID(),
    orderNumber,
    email,
    reason,
    details: details ?? '',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    userId: (session?.user as { id?: string })?.id,
  }

  const existing = await readReturns()
  await writeReturns([returnReq, ...existing])

  return NextResponse.json({ id: returnReq.id, message: 'Return request submitted' }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const returns = await readReturns()
  const userId = (session.user as { id?: string })?.id
  const userReturns = returns.filter(r => r.userId === userId || r.email === session.user?.email)

  return NextResponse.json(userReturns)
}
