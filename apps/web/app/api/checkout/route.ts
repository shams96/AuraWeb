import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export interface CheckoutItem {
  id: string
  name: string
  price: number       // in major currency units (e.g. 295.00)
  quantity: number
  image?: string
  variantId?: string
}

export async function POST(req: NextRequest) {
  try {
    const { items, currency = 'usd' }: { items: CheckoutItem[]; currency?: string } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session?.user?.email ?? undefined,
      line_items: items.map(item => ({
        price_data: {
          currency,
          unit_amount: Math.round(item.price * 100), // convert to pence/cents
          product_data: {
            name: item.name,
            images: item.image ? [`${baseUrl}${item.image}`] : [],
            metadata: { productId: item.id, variantId: item.variantId ?? '' },
          },
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId: (session?.user as { id?: string })?.id ?? 'guest',
        itemCount: items.length.toString(),
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: ['GB', 'US', 'IE', 'FR', 'DE', 'IT'] },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (err: unknown) {
    console.error('[checkout]', err)
    const raw = err instanceof Error ? err.message : 'Checkout failed'
    // Never leak internal error details to the client
    const message = raw.includes('STRIPE_SECRET_KEY') || raw.includes('not configured')
      ? 'Payment processing is not yet configured. Please contact support.'
      : raw.startsWith('No such') || raw.includes('Invalid API Key')
        ? 'Payment service error. Please try again or contact support.'
        : 'Checkout failed. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
