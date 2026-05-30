import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { orderConfirmationEmail, subscriptionReminderEmail } from '@/lib/email-templates'
import { addLoyaltyPoints } from '@/lib/user-store'
import Stripe from 'stripe'

export const runtime = 'nodejs'

function generateOrderNumber() {
  return `IV-${Date.now().toString(36).toUpperCase()}`
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const lineItems   = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
  const orderNumber = generateOrderNumber()
  const total       = (session.amount_total ?? 0) / 100
  const currency    = (session.currency ?? 'usd').toUpperCase()
  const isSubscription = session.mode === 'subscription'

  // Persist to DB if available
  if (prisma) {
    try {
      await prisma.order.create({
        data: {
          orderNumber,
          stripeSessionId: session.id,
          status:        'CONFIRMED',
          paymentStatus: 'PAID',
          currency,
          subtotal:      (session.amount_subtotal ?? 0) / 100,
          total,
          userId: session.metadata?.userId !== 'guest' ? session.metadata?.userId : undefined,
          // Store subscription ID in notes field until schema migration adds dedicated column
          notes: isSubscription && session.subscription
            ? JSON.stringify({ stripeSubscriptionId: session.subscription.toString() })
            : undefined,
        },
      })
    } catch (dbErr) {
      console.error('[webhook] DB order creation failed:', dbErr)
    }
  } else {
    console.info(`[webhook] no DB — order ${orderNumber} logged only`)
  }

  // Send order confirmation email
  const customerEmail = session.customer_details?.email
  const customerName  = session.customer_details?.name ?? 'Valued Customer'

  if (customerEmail && resend) {
    try {
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      customerEmail,
        subject: isSubscription
          ? `Your ritual membership is confirmed — #${orderNumber} | Isola Vitale`
          : `Your ritual is on its way — #${orderNumber} | Isola Vitale`,
        html: orderConfirmationEmail({
          orderNumber,
          customerName,
          items: lineItems.data.map(li => ({
            name:     li.description ?? 'Product',
            quantity: li.quantity ?? 1,
            price:    (li.amount_total ?? 0) / 100 / (li.quantity ?? 1),
          })),
          total,
          currency: currency === 'GBP' ? '£' : '$',
          isSubscription,
        }),
      })
      console.info(`[webhook] confirmation email sent to ${customerEmail}`)
    } catch (emailErr) {
      console.error('[webhook] confirmation email failed:', emailErr)
    }
  }

  // Accrue loyalty points: 1 pt per $1 spent (subscriptions +25% bonus)
  if (customerEmail) {
    try {
      const basePoints    = Math.floor(total)
      const earnedPoints  = isSubscription ? Math.floor(basePoints * 1.25) : basePoints
      addLoyaltyPoints(customerEmail, earnedPoints)
      console.info(`[webhook] loyalty: +${earnedPoints} pts to ${customerEmail}`)
    } catch (ptErr) {
      console.error('[webhook] loyalty points accrual failed:', ptErr)
    }
  }

  console.info(`[webhook] checkout.session.completed — order ${orderNumber}, subscription: ${isSubscription}`)
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id

  console.info(`[webhook] invoice.paid — subscription ${subscriptionId}, amount ${(invoice.amount_paid ?? 0) / 100}`)

  // Update subscription status in DB if available
  if (prisma && subscriptionId) {
    try {
      // Find orders where notes contains this subscriptionId
      const orders = await prisma.order.findMany({
        where: { notes: { contains: subscriptionId } },
        select: { id: true },
      })
      if (orders.length) {
        await prisma.order.updateMany({
          where: { id: { in: orders.map(o => o.id) } },
          data:  { paymentStatus: 'PAID' },
        })
      }
    } catch (dbErr) {
      console.error('[webhook] invoice.paid DB update failed:', dbErr)
    }
  }

  // Renewal confirmation email via customer
  const customerEmail = typeof invoice.customer_email === 'string' ? invoice.customer_email : null
  if (customerEmail && resend) {
    try {
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      customerEmail,
        subject: 'Your ritual is on its way again | Isola Vitale',
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#1A1614;color:#FDFAF5;padding:48px 40px;border-radius:16px;">
            <p style="color:#913832;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;margin:0 0 16px;">La Bella Figura</p>
            <h1 style="font-size:28px;margin:0 0 16px;font-style:italic;">Your ritual is on its way again.</h1>
            <p style="color:rgba(253,250,245,0.6);line-height:1.8;margin:0 0 24px;">
              Your monthly formulation has been despatched from Isola del Liri.
              It will arrive as it always has — before you run out.
            </p>
            <p style="color:rgba(253,250,245,0.35);font-size:11px;">
              To manage your ritual membership, visit your account at isolavitale.com/account
            </p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('[webhook] renewal email failed:', emailErr)
    }
  }
}

async function handleInvoiceUpcoming(invoice: Stripe.Invoice) {
  const customerEmail = typeof invoice.customer_email === 'string' ? invoice.customer_email : null
  if (!customerEmail || !resend) return

  const renewalDate = invoice.period_end
    ? new Date(invoice.period_end * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'soon'

  const total    = (invoice.amount_due ?? 0) / 100
  const currency = (invoice.currency ?? 'usd').toUpperCase() === 'GBP' ? '£' : '$'
  const name     = (invoice.customer_name as string | null) ?? 'Valued Customer'

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      customerEmail,
      subject: `Your ritual renews in 3 days | Isola Vitale`,
      html: subscriptionReminderEmail({ customerName: name, renewalDate, total, currency }),
    })
    console.info(`[webhook] renewal reminder sent to ${customerEmail}`)
  } catch (err) {
    console.error('[webhook] renewal reminder email failed:', err)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.info(`[webhook] subscription.deleted — ${subscription.id}`)

  if (prisma) {
    try {
      const orders = await prisma.order.findMany({
        where: { notes: { contains: subscription.id } },
        select: { id: true },
      })
      if (orders.length) {
        await prisma.order.updateMany({
          where: { id: { in: orders.map(o => o.id) } },
          data:  { status: 'CANCELLED' },
        })
      }
    } catch (dbErr) {
      console.error('[webhook] subscription.deleted DB update failed:', dbErr)
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') ?? ''
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  // If no webhook secret set (local dev), accept all events
  let event: Stripe.Event
  if (webhookSecret && sig) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
      console.error('[webhook] signature verification failed', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  } else {
    try {
      event = JSON.parse(body) as Stripe.Event
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break
      case 'invoice.upcoming':
        await handleInvoiceUpcoming(event.data.object as Stripe.Invoice)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      default:
        // Unhandled event type — acknowledged but not processed
        break
    }
  } catch (err) {
    console.error(`[webhook] error handling ${event.type}:`, err)
    // Return 200 so Stripe doesn't retry — errors are logged for manual review
  }

  return NextResponse.json({ received: true })
}
