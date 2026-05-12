import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'consultations.json')

interface ConsultationRecord {
  id: string
  sessionId: string
  userId?: string
  email?: string
  tier: string
  baumannLabel: string
  scores: { doScore: number; srScore: number; wScore: number; pScore: number }
  answers: Record<string, unknown>
  recommendedProducts: { id: string; name: string; price: number }[]
  addedToCart: boolean
  purchased: boolean
  createdAt: string
  updatedAt: string
}

async function readAll(): Promise<ConsultationRecord[]> {
  try { return JSON.parse(await fs.readFile(DB_PATH, 'utf8')) } catch { return [] }
}
async function writeAll(data: ConsultationRecord[]) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  const record: ConsultationRecord = {
    id: crypto.randomUUID(),
    sessionId: body.sessionId ?? crypto.randomUUID(),
    userId: (session?.user as { id?: string })?.id,
    email: session?.user?.email ?? body.email,
    tier: body.tier,
    baumannLabel: body.baumannLabel,
    scores: body.scores,
    answers: body.answers,
    recommendedProducts: body.recommendedProducts ?? [],
    addedToCart: body.addedToCart ?? false,
    purchased: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const all = await readAll()
  // Upsert by sessionId
  const idx = all.findIndex(r => r.sessionId === body.sessionId)
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...record, id: all[idx].id, createdAt: all[idx].createdAt, updatedAt: new Date().toISOString() }
  } else {
    all.unshift(record)
  }
  await writeAll(all)

  return NextResponse.json({ id: record.id })
}

export async function PATCH(req: NextRequest) {
  const { sessionId, addedToCart, purchased } = await req.json()
  const all = await readAll()
  const idx = all.findIndex(r => r.sessionId === sessionId)
  if (idx < 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (addedToCart !== undefined) all[idx].addedToCart = addedToCart
  if (purchased !== undefined) all[idx].purchased = purchased
  all[idx].updatedAt = new Date().toISOString()
  await writeAll(all)
  return NextResponse.json({ ok: true })
}
