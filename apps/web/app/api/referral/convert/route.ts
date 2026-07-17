import { NextRequest, NextResponse } from 'next/server'
import { findReferralByReferee, rewardReferral, getReferralsByReferrer } from '@/lib/referral-store'
import { findUserByEmail } from '@/lib/user-store'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { referralRewardEmail } from '@/lib/email-templates'
import Stripe from 'stripe'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  // Internal-only: called from the Stripe webhook handler
  const secret = req.headers.get('x-internal-secret')
  if (!process.env.INTERNAL_API_SECRET || secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  try {
    const { refereeEmail } = await req.json()
    if (!refereeEmail) return NextResponse.json({ ok: true })

    const referral = findReferralByReferee(refereeEmail.toLowerCase())
    if (!referral || referral.status === 'REWARDED') {
      return NextResponse.json({ ok: true }) // already rewarded or not referred
    }

    // Check this is their first purchase (no previous reward on this referral)
    const existing = getReferralsByReferrer(referral.referrerId)
    const alreadyRewarded = existing.filter(r => r.refereeEmail?.toLowerCase() === refereeEmail.toLowerCase() && r.status === 'REWARDED')
    if (alreadyRewarded.length > 0) return NextResponse.json({ ok: true })

    // Generate a human-readable reward code
    const rewardCode = `IVA-${randomBytes(3).toString('hex').toUpperCase()}-10`

    // Create Stripe promo code if stripe secret key is available
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)
        // Create a one-time 10% coupon
        const coupon  = await stripe.coupons.create({
          percent_off:  10,
          duration:     'once',
          name:         'iv Ambassador Reward — 10% Off',
          max_redemptions: 1,
        })
        // Create promotion code with our custom string
        await stripe.promotionCodes.create({
          coupon:          coupon.id,
          code:            rewardCode,
          max_redemptions: 1,
        })
      } catch (stripeErr) {
        console.error('[referral/convert] Stripe promo creation failed:', stripeErr)
        // Continue — still store reward code for manual use
      }
    } else {
      console.info(`[referral/convert] dev mode — reward code: ${rewardCode}`)
    }

    rewardReferral(referral.code, rewardCode)

    // Notify referrer
    const referrerUser = findUserByEmail(referral.referrerEmail)
    if (referrerUser && resend) {
      try {
        await resend.emails.send({
          from:    FROM_EMAIL,
          to:      referral.referrerEmail,
          subject: 'Your invitation worked — your Ambassador reward is ready | Chiarelle',
          html:    referralRewardEmail({
            referrerName: referrerUser.name.split(' ')[0],
            rewardCode,
            refereeEmail: referral.refereeEmail ?? refereeEmail,
          }),
        })
      } catch (emailErr) {
        console.error('[referral/convert] reward email failed:', emailErr)
      }
    }

    return NextResponse.json({ ok: true, rewardCode })
  } catch (err) {
    console.error('[referral/convert]', err)
    return NextResponse.json({ ok: true })
  }
}
