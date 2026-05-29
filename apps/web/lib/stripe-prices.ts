/**
 * Stripe Price ID registry.
 * Maps product SKUs to Stripe one-time and recurring monthly Price IDs.
 *
 * In development with no Price IDs set, checkout falls back to ad-hoc
 * price_data — no pre-creation required. In production, set real Price IDs
 * from the Stripe dashboard to enable proper recurring billing and webhooks.
 *
 * To create prices in Stripe dashboard:
 *   Products → [product] → Add price → Recurring, monthly
 */

export interface StripePriceEntry {
  oneTimeId?: string        // Stripe Price ID for one-time purchase
  subscriptionId?: string   // Stripe Price ID for recurring monthly
}

// Populated from env vars so they never appear in source
const priceRegistry: Record<string, StripePriceEntry> = {}

// Consumer tier products
const KNOWN_SKUS = [
  't1-01', 't1-02', 't1-03',
  't2-01', 't2-02', 't2-03',
  't3-01', 't3-02', 't3-03',
  't4-01', 't4-02', 't4-03',
  '1b', 'gentle-cellular-cleanser', 'terra-radiance-cream',
  'obsidian-vitale-cream', 'chrono-lift-serum',
]

// Load Price IDs from env vars (format: STRIPE_PRICE_[SKU_UPPER]_ONETIME / _SUB)
for (const sku of KNOWN_SKUS) {
  const key = sku.toUpperCase().replace(/-/g, '_')
  const oneTimeId      = process.env[`STRIPE_PRICE_${key}_ONETIME`]
  const subscriptionId = process.env[`STRIPE_PRICE_${key}_SUB`]
  if (oneTimeId || subscriptionId) {
    priceRegistry[sku] = { oneTimeId, subscriptionId }
  }
}

/**
 * Returns Stripe Price ID for a SKU + purchase type, or null if not registered.
 * When null, callers should fall back to inline price_data.
 */
export function getStripePriceId(sku: string, type: 'one-time' | 'subscription'): string | null {
  const entry = priceRegistry[sku]
  if (!entry) return null
  return type === 'subscription' ? (entry.subscriptionId ?? null) : (entry.oneTimeId ?? null)
}
