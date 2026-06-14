import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  saveAssessment,
  getAssessmentHistory,
  getLatestAssessment,
  type BaumannProfile,
  type Protocol,
} from '@/lib/assessment-store'

// GET /api/assessment — fetch history + latest for current user/guest
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? null
  const guestId = req.cookies.get('iv_skin_session')?.value ?? null

  const history = getAssessmentHistory(userId, guestId)
  const latest = history[0] ?? null

  const weeksSinceLast = latest
    ? (Date.now() - new Date(latest.completedAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
    : null

  const nextMode =
    !latest ? 'discovery' :
    weeksSinceLast! < 3 ? 'too-soon' :
    weeksSinceLast! < 6 ? 'check-in' : 'evolution'

  return NextResponse.json({ history, latest, nextMode })
}

// POST /api/assessment — save a completed assessment
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as { id?: string })?.id ?? null
    const guestId = req.cookies.get('iv_skin_session')?.value ?? null

    const body = await req.json()
    const { answers, profile, protocol, concerns } = body as {
      answers: Record<string, unknown>
      profile: BaumannProfile
      protocol: Protocol
      concerns: string[]
    }

    if (!profile || !protocol) {
      return NextResponse.json({ error: 'Missing profile or protocol' }, { status: 400 })
    }

    const assessment = saveAssessment({ userId, guestId, answers, profile, protocol, concerns })

    const res = NextResponse.json({ success: true, assessment })

    // Set guest session cookie if not authenticated
    if (!userId && !guestId) {
      const { randomUUID } = await import('crypto')
      res.cookies.set('iv_skin_session', randomUUID(), {
        maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
      })
    }

    return res
  } catch (err) {
    console.error('[assessment POST]', err)
    return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 })
  }
}
