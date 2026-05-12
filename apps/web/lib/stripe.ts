import Stripe from 'stripe'

let _stripe: Stripe | null = null

/**
 * Returns the Stripe client, creating it on first call.
 * Throws inside route-handler try/catch so errors become proper JSON responses,
 * not HTML 500 pages.
 */
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('Stripe is not configured. Please add STRIPE_SECRET_KEY to .env.local.')
    _stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' })
  }
  return _stripe
}

/**
 * Proxy so legacy `import { stripe }` calls keep working without change.
 * All property accesses are forwarded to the lazily-initialised client.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_t, prop: string) {
    return (getStripe() as unknown as Record<string, unknown>)[prop]
  },
})
