import { NextRequest, NextResponse } from 'next/server'
import { attributeReferral, incrementClickCount } from '@/lib/referral-store'

export async function POST(req: NextRequest) {
  try {
    const { code, refereeEmail } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Missing referral code.' }, { status: 400 })
    }
    if (!refereeEmail || !refereeEmail.includes('@')) {
      return NextResponse.json({ error: 'Missing referee email.' }, { status: 400 })
    }

    const attributed = attributeReferral(code, refereeEmail.toLowerCase())
    // Increment click count regardless (first touch)
    if (!attributed) incrementClickCount(code)

    // Always return 200 — no info leak about attribution result
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[referral/track]', err)
    return NextResponse.json({ ok: true }) // silent fail
  }
}
