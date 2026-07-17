'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════
   THE BUY BOX — Chiarelle · Phase 4, the commerce engine.

   LAW applied here:
   · 45-day cadence. NEVER called "monthly". The interval is explained,
     never buried — it is a positioning statement, not a shipping detail.
   · Subscriber price first and larger. One-time second, smaller, a quiet
     text link with no button. Never punished, never shamed.
   · Savings as a DOLLAR AMOUNT. Never a percentage. Never a struck price.
   · FOMO is EXCLUSIVITY, never pressure. Founding allocation, the Circle,
     what opens over time. No countdown timers. Ever.
   · Value framed as one considered ritual — never as thrift.
   · TTW™ stated as a standard the house is measured by, not a policy.
   ═══════════════════════════════════════════════════════════════════════ */

type Mode = 'ritual' | 'season' | 'once'

interface BuyBoxProps {
  product: {
    id: string
    name: string
    price: number
    currency: string
    sku: string
    variants: Array<{ id: string; name: string; price: number; compareAtPrice?: number }>
  }
  selectedVariant?: string | null
  buyBullets?: string[]
}

const SUB_RATE = 0.8

const CIRCLE = [
  { at: 'With your first delivery', gift: 'The house ritual card, and your protocol, printed' },
  { at: 'At your second',           gift: 'The Chiarelle travel vessel, in champagne' },
  { at: 'At your fourth',           gift: 'Early access to each release, before it opens' },
  { at: 'At your sixth',            gift: 'The Founder\u2019s Circle — allocation held in your name' },
]

export function BuyBox({ product, selectedVariant: initialVariant }: BuyBoxProps) {
  const [variantId, setVariantId] = useState(initialVariant ?? product.variants[0]?.id ?? '')
  const [mode, setMode] = useState<Mode>('ritual')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const list = variant?.price ?? product.price
  const isSub = mode !== 'once'
  const unit = isSub ? list * SUB_RATE : list

  const money = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency || 'USD',
      minimumFractionDigits: 0,
    }).format(n)

  async function checkout() {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id: product.id,
            name: `${product.name}${variant ? ` — ${variant.name}` : ''}`,
            price: unit,
            quantity: 1,
            variantId,
            isSubscription: isSub,
            intervalDays: mode === 'season' ? 90 : mode === 'ritual' ? 45 : null,
          }],
        }),
      })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else setError('We could not open checkout. Please try once more.')
    } catch {
      setError('We could not open checkout. Please try once more.')
    } finally { setLoading(false) }
  }

  const opt = (active: boolean): React.CSSProperties => ({
    width: '100%', textAlign: 'left', padding: '1.15rem 1.3rem',
    background: active ? 'rgba(155,71,34,.045)' : 'transparent',
    border: `1px solid ${active ? 'var(--iv-ochre, #9B4722)' : 'rgba(92,68,56,.22)'}`,
    cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
    alignItems: 'baseline', gap: '1rem',
    transition: 'border-color 300ms ease, background 300ms ease',
  })
  const label: React.CSSProperties = { fontFamily: 'var(--iv-font-serif)', fontSize: '1.05rem', color: 'var(--iv-charcoal, #1A1614)' }
  const meta: React.CSSProperties = { fontFamily: 'var(--iv-font-body)', fontSize: '0.74rem', lineHeight: 1.6, color: 'var(--iv-text-muted, #5C4438)', marginTop: '0.3rem', display: 'block' }
  const price: React.CSSProperties = { fontFamily: 'var(--iv-font-serif)', fontSize: '1.5rem', color: 'var(--iv-charcoal, #1A1614)', display: 'block' }

  return (
    <div style={{ maxWidth: '460px' }}>
      <p style={{ fontFamily: 'var(--iv-font-body)', fontSize: '9px', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--iv-ochre, #9B4722)', marginBottom: '1.1rem' }}>
        Founding allocation · first release
      </p>

      {product.variants.length > 1 && (
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.6rem', flexWrap: 'wrap' }}>
          {product.variants.map((v) => (
            <button key={v.id} onClick={() => setVariantId(v.id)}
              style={{ fontFamily: 'var(--iv-font-body)', fontSize: '0.76rem', letterSpacing: '0.08em', padding: '0.6rem 1.1rem', background: 'transparent',
                border: `1px solid ${v.id === variantId ? 'var(--iv-ochre, #9B4722)' : 'rgba(92,68,56,.22)'}`,
                color: v.id === variantId ? 'var(--iv-ochre, #9B4722)' : 'var(--iv-text, #3D2B20)', cursor: 'pointer' }}>
              {v.name}
            </button>
          ))}
        </div>
      )}

      <div role="radiogroup" aria-label="Choose your cadence" style={{ display: 'grid', gap: '0.7rem' }}>
        <button role="radio" aria-checked={mode === 'ritual'} onClick={() => setMode('ritual')} style={opt(mode === 'ritual')}>
          <span>
            <span style={label}>The Ritual</span>
            <span style={meta}>Arrives every 45 days — the interval a jar actually lasts, so nothing is wasted and nothing runs out.</span>
          </span>
          <span style={{ textAlign: 'right', flexShrink: 0 }}>
            <span style={price}>{money(list * SUB_RATE)}</span>
            <span style={{ ...meta, marginTop: '0.15rem' }}>{money(list - list * SUB_RATE)} saved</span>
          </span>
        </button>

        <button role="radio" aria-checked={mode === 'season'} onClick={() => setMode('season')} style={opt(mode === 'season')}>
          <span>
            <span style={label}>
              The Season
              <em style={{ fontFamily: 'var(--iv-font-body)', fontStyle: 'normal', fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--iv-ochre, #9B4722)', marginLeft: '0.5rem' }}>
                Held in the house
              </em>
            </span>
            <span style={meta}>A quarter at a time. The same standard, settled — and your allocation is held between deliveries.</span>
          </span>
          <span style={{ textAlign: 'right', flexShrink: 0 }}>
            <span style={price}>{money(list * SUB_RATE)}</span>
            <span style={{ ...meta, marginTop: '0.15rem' }}>{money(list - list * SUB_RATE)} saved</span>
          </span>
        </button>
      </div>

      <p style={{ margin: '1rem 0 0', textAlign: 'center' }}>
        <button onClick={() => setMode('once')} aria-pressed={mode === 'once'}
          style={{ fontFamily: 'var(--iv-font-body)', fontSize: '0.76rem', background: 'none', border: 0, padding: '0.3rem', cursor: 'pointer',
            color: mode === 'once' ? 'var(--iv-ochre, #9B4722)' : 'var(--iv-text-muted, #5C4438)',
            borderBottom: mode === 'once' ? '1px solid var(--iv-ochre, #9B4722)' : '1px solid transparent' }}>
          Or take it once — {money(list)}
        </button>
      </p>

      <button onClick={checkout} disabled={loading}
        style={{ width: '100%', marginTop: '1.6rem', padding: '1.15rem', fontFamily: 'var(--iv-font-body)', fontSize: '0.8rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--iv-cloud-dancer, #F0F2EB)', background: 'var(--iv-ochre, #9B4722)', border: 0,
          cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
        {isSub ? 'Begin your ritual' : 'Take it once'}
      </button>

      {error && (
        <p role="alert" style={{ fontFamily: 'var(--iv-font-body)', fontSize: '0.78rem', color: 'var(--iv-ochre, #9B4722)', marginTop: '0.8rem', textAlign: 'center' }}>{error}</p>
      )}

      <div style={{ marginTop: '2rem', paddingTop: '1.6rem', borderTop: '1px solid rgba(214,197,160,.55)' }}>
        <p style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--iv-charcoal, #1A1614)', margin: 0 }}>
          <em>Within forty-eight hours, you will feel the difference.</em>
        </p>
        <p style={{ fontFamily: 'var(--iv-font-body)', fontSize: '0.79rem', lineHeight: 1.75, color: 'var(--iv-text-muted, #5C4438)', margin: '0.7rem 0 0' }}>
          If it does not arrive, your next delivery is ours to send. One email to the house — no forms, and no review. This is the TTW™ standard, and it is the measure we hold ourselves to.
        </p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontFamily: 'var(--iv-font-body)', fontSize: '9px', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--iv-ochre, #9B4722)', marginBottom: '1rem' }}>
          What opens as you stay
        </p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.75rem' }}>
          {CIRCLE.map((c) => (
            <li key={c.at} style={{ display: 'flex', gap: '0.9rem', alignItems: 'baseline' }}>
              <span aria-hidden style={{ width: '14px', height: 1, background: 'var(--iv-champagne-gold, #D6C5A0)', flexShrink: 0, marginTop: '0.55rem' }} />
              <span style={{ fontFamily: 'var(--iv-font-body)', fontSize: '0.79rem', lineHeight: 1.7, color: 'var(--iv-text, #3D2B20)' }}>
                <strong style={{ fontWeight: 500 }}>{c.at}</strong> — {c.gift}
              </span>
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: 'var(--iv-font-body)', fontSize: '0.72rem', lineHeight: 1.7, color: 'var(--iv-text-muted, #5C4438)', marginTop: '1.1rem' }}>
          Pause or close your ritual whenever you wish. The house keeps no one.
        </p>
      </div>
    </div>
  )
}
