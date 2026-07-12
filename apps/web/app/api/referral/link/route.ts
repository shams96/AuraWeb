import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  getOrCreateReferral,
  getReferralsByReferrer,
} from '@/lib/referral-store'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const user = session.user as { email: string; name?: string; id?: string }
  // Use email as referrerId when no UUID available in JWT (graceful)
  const referrerId = (user as { id?: string }).id ?? user.email

  const referral = getOrCreateReferral(referrerId, user.email)
  const all      = getReferralsByReferrer(referrerId)

  const stats = {
    invited:   all.filter(r => r.refereeEmail !== null).length,
    converted: all.filter(r => r.status === 'REWARDED').length,
    rewards:   all.filter(r => r.rewardCode !== null).map(r => r.rewardCode!),
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? 'https://liriroma.com'

  return NextResponse.json({
    code:  referral.code,
    url:   `${baseUrl}/?ref=${referral.code}`,
    stats,
    referrals: all.map(r => ({
      refereeEmail: r.refereeEmail ? r.refereeEmail.replace(/(.{2}).*(@.*)/, '$1…$2') : null,
      status:       r.status,
      rewardCode:   r.rewardCode,
      convertedAt:  r.convertedAt,
    })),
  })
}
