import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { orderConfirmationEmail } from '@/lib/email-templates'
import Stripe from 'stripe'

/* Stripe requires the raw body for signature verification */
export const runtime = 'nodejs'

function generateOrderNumber() {
  return `IV-${Date.now().toString(36).toUpperCase()}`
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] signature failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      /* Fetch full line items from Stripe */
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })

      const orderNumber = generateOrderNumber()
      const total       = (session.amount_total ?? 0) / 100
      const currency    = (session.currency ?? 'gbp').toUpperCase()

      /* Persist order to DB */
      const order = await prisma.order.create({
        data: {
          orderNumber,
          stripeSessionId: session.id,
          status:          'CONFIRMED',
          paymentStatus:   'PAID',
          currency,
          subtotal:        (session.amount_subtotal ?? 0) / 100,
          total,
          userId:          session.metadata?.userId !== 'guest' ? session.metadata?.userId : undefined,
          items: {
            create: lineItems.data.map(li => ({
              name:      li.description ?? 'Product',
              sku:       li.price?.product?.toString() ?? '',
              price:     (li.amount_total ?? 0) / 100 / (li.quantity ?? 1),
              quantity:  li.quantity ?? 1,
              productId: li.price?.metadata?.productId ?? li.price?.product?.toString() ?? '',
              variantId: li.price?.metadata?.variantId ?? li.price?.product?.toString() ?? '',
            })),
          },
        },
        include: { items: true },
      })

      /* Send order confirmation email */
      const customerEmail  = session.customer_details?.email
      const customerName   = session.customer_details?.name ?? 'Valued Customer'

      if (customerEmail) {
        await resend.emails.send({
          from:    FROM_EMAIL,
          to:      customerEmail,
          subject: `Order Confirmed — #${orderNumber} | Isola Vitale`,
          html:    orderConfirmationEmail({
            orderNumber,
            customerName,
            items: order.items.map(i => ({
              name:     i.name,
              quantity: i.quantity,
              price:    Number(i.price),
            })),
            total,
            currency: currency === 'GBP' ? '£' : '$',
          }),
        })
      }

      console.info(`[webhook] order ${orderNumber} created, email sent to ${customerEmail}`)
    } catch (err) {
      console.error('[webhook] order creation failed', err)
      /* Return 200 so Stripe doesn't retry — log the error for manual fix */
    }
  }

  return NextResponse.json({ received: true })
}
