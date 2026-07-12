import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProduct } from '@/lib/product-store'
import Stripe from 'stripe'

const ALLOWED_CURRENCIES = new Set(['usd', 'gbp', 'eur', 'cad', 'aud'])

export interface CheckoutItem {
  id: string
  name: string
  price: number       // major currency units (e.g. 295.00)
  quantity: number
  image?: string
  variantId?: string
  isSubscription?: boolean
  /** 45 = The Ritual (default) · 90 = The Season. The house never bills monthly. */
  intervalDays?: 45 | 90
}

const ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ['GB', 'US', 'IE', 'FR', 'DE', 'IT']

export async function POST(req: NextRequest) {
  try {
    const { items, currency = 'usd' }: { items: CheckoutItem[]; currency?: string } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Validate currency
    const safeCurrency = (typeof currency === 'string' && ALLOWED_CURRENCIES.has(currency.toLowerCase()))
      ? currency.toLowerCase() : 'usd'

    // Look up server-side prices — reject client-supplied amounts
    const verifiedItems = items.map(item => {
      const product = getProduct(item.id)
      if (!product) throw new Error(`Product not found: ${item.id}`)
      const serverPrice = item.isSubscription
        ? Math.round(product.price * 0.80)  // 20% subscription discount
        : product.price
      // Cadence is validated server-side. Only 45 (Ritual) or 90 (Season).
      const intervalDays: 45 | 90 = item.intervalDays === 90 ? 90 : 45
      return { ...item, price: serverPrice, intervalDays }
    })

    const session  = await getServerSession(authOptions)
    const baseUrl  = process.env.NEXTAUTH_URL ?? 'http://localhost:5000'
    const userId   = (session?.user as { id?: string })?.id ?? 'guest'
    const allSubscribed = verifiedItems.every(i => i.isSubscription)

    if (allSubscribed) {
      // Subscription mode — 45-day ritual (default) or 90-day season.
      // The house NEVER bills monthly. Cadence comes from the client.
      const stripeSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer_email: session?.user?.email ?? undefined,
        line_items: verifiedItems.map(item => ({
          price_data: {
            currency: safeCurrency,
            unit_amount: Math.round(item.price * 100),
            recurring: {
              interval: 'day',
              interval_count: item.intervalDays === 90 ? 90 : 45,
            },
            product_data: {
              name: item.name,
              images: item.image ? [`${baseUrl}${item.image}`] : [],
              metadata: { productId: item.id, variantId: item.variantId ?? '' },
            },
          },
          quantity: item.quantity,
        })),
        subscription_data: {
          metadata: { userId, itemCount: items.length.toString() },
        },
        metadata: { userId, itemCount: items.length.toString(), mode: 'subscription' },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:  `${baseUrl}/shop`,
        shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
        allow_promotion_codes: true,
        billing_address_collection: 'required',
      })
      return NextResponse.json({ url: stripeSession.url })
    }

    // One-time payment mode
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session?.user?.email ?? undefined,
      line_items: verifiedItems.map(item => ({
        price_data: {
          currency: safeCurrency,
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            images: item.image ? [`${baseUrl}${item.image}`] : [],
            metadata: { productId: item.id, variantId: item.variantId ?? '' },
          },
        },
        quantity: item.quantity,
      })),
      metadata: { userId, itemCount: items.length.toString(), mode: 'payment' },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/shop`,
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })
    return NextResponse.json({ url: stripeSession.url })

  } catch (err: unknown) {
    console.error('[checkout]', err)
    const raw = err instanceof Error ? err.message : ''
    const message = raw.includes('STRIPE_SECRET_KEY') || raw.includes('not configured')
      ? 'Payment processing is not yet configured. Please contact support.'
      : raw.startsWith('No such') || raw.includes('Invalid API Key')
        ? 'Payment service error. Please try again or contact support.'
        : 'Checkout is unavailable at the moment. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
