'use client'

import { Wordmark } from '@/components/brand/wordmark'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Shield, Loader2, RefreshCcw,
  ShieldCheck, Award, FlaskConical, RotateCcw, Truck,
} from 'lucide-react'

// Light-theme palette — matches /login and /register
const C = {
  page:      'var(--iv-black)',   // warm ivory
  parchment: 'var(--iv-deep-green)',   // warm parchment — card bg
  card:      'var(--iv-green)',   // card surface
  charcoal:  'var(--iv-charcoal)',   // primary text
  espresso:  'var(--iv-text)',   // body text
  muted:     'var(--iv-text-muted)',   // muted text
  gold:      'var(--iv-gold)',   // brand accent / CTA
  goldLight: 'var(--iv-gold-light)',   // hover
  border:    'rgba(155, 71, 34,0.14)',
  borderFocus:'rgba(155, 71, 34,0.5)',
}

const INPUT: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px 0',
  background: 'transparent',
  border: 'none', borderBottom: `1px solid ${C.border}`,
  fontSize: '0.875rem', color: C.charcoal,
  outline: 'none', transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em',
  textTransform: 'uppercase', color: C.muted, marginBottom: 4,
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const { data: session }    = useSession()
  const router               = useRouter()

  const [processing, setProcessing] = useState(false)
  const [error, setError]           = useState('')
  const [email, setEmail]           = useState('')
  const [name, setName]             = useState('')
  const [guestMode, setGuestMode]   = useState(true)

  useEffect(() => {
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email)
      if (session.user.name)  setName(session.user.name)
      setGuestMode(false)
    }
  }, [session])

  useEffect(() => {
    if (state.items.length === 0) router.replace('/shop')
  }, [state.items, router])

  const items         = state.items
  const subtotal      = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const retailTotal   = items.reduce((s, i) => s + i.basePrice * i.quantity, 0)
  const savings       = retailTotal - subtotal
  const shipping      = subtotal >= 200 ? 0 : 12.99
  const total         = subtotal + shipping
  const allSubscribed = items.length > 0 && items.every(i => i.isSubscription)
  const annualSavings = savings * 12

  async function handleComplete() {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address so we can reach you.')
      return
    }
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    setProcessing(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency: 'usd',
          items: items.map(i => ({
            id:             i.sku ?? i.id,
            name:           i.name,
            price:          i.price,
            quantity:       i.quantity,
            image:          i.image,
            isSubscription: i.isSubscription ?? false,
          })),
        }),
      })
      const data: { url?: string; error?: string } = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'checkout_failed')
      clearCart()
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      setError(
        msg && msg !== 'checkout_failed'
          ? msg
          : 'We couldn\'t process your order. Please try again or call +1 214-714-3597.'
      )
      setProcessing(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div style={{ minHeight: '100vh', background: C.page }}>

      {/* Minimal nav bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.page }}>
        <Link href="/shop" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Back to Collections
        </Link>
        <Wordmark size="1.1rem" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 700, color: C.muted, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <Shield size={11} style={{ color: C.gold }} /> Secure
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }} className="checkout-grid">
          <style>{`@media(min-width:1024px){.checkout-grid{grid-template-columns:3fr 2fr!important}}`}</style>

          {/* ── LEFT: Form ──────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* Heading */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>La Bella Figura</p>
              <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 600, color: 'var(--iv-garden)', letterSpacing: '-0.02em', margin: 0 }}>
                Complete Your Ritual
              </h1>
            </div>

            {/* Ritual membership badge */}
            {allSubscribed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 16, border: `1px solid ${C.border}`, padding: '14px 20px', background: C.parchment }}>
                <RefreshCcw size={15} style={{ color: C.gold, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: '0 0 2px' }}>Ritual Membership Active</p>
                  <p style={{ fontSize: '0.75rem', color: C.muted, margin: 0, fontWeight: 400 }}>
                    Arrives every 45 days · Pause anytime · You save ${annualSavings.toFixed(0)}
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, padding: '14px 18px', background: C.parchment }}>
                <p style={{ fontSize: '0.8rem', color: C.espresso, margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Contact section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.charcoal, margin: 0 }}>Contact</h2>
                {guestMode && (
                  <Link href="/login?redirect=/checkout" style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none' }}>
                    Sign in →
                  </Link>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={LABEL}>We will reach you at</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="your@email.com"
                    style={INPUT}
                    autoComplete="email"
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.borderFocus)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = C.border)}
                  />
                </div>
                <div>
                  <label style={LABEL}>Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setError('') }}
                    placeholder="First and last name"
                    style={INPUT}
                    autoComplete="name"
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.borderFocus)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = C.border)}
                  />
                </div>
                {guestMode && (
                  <p style={{ fontSize: '0.75rem', color: C.muted, fontWeight: 300, margin: 0 }}>
                    Continuing without an account — you can save your details after your first order.
                  </p>
                )}
              </div>
            </div>

            {/* Delivery note */}
            <div>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.charcoal, margin: '0 0 10px' }}>Where your ritual will arrive</h2>
              <p style={{ fontSize: '0.7rem', color: C.muted, margin: 0, fontWeight: 300, lineHeight: 1.7 }}>
                Delivery address and shipping method are collected on the next step via Stripe's secure checkout — shipped worldwide from Isola del Liri, Italy.
              </p>
            </div>

            {/* Payment note */}
            <div>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.charcoal, margin: '0 0 14px' }}>Payment</h2>
              <div style={{ borderRadius: 14, border: `1px solid ${C.border}`, padding: '18px 20px', background: C.parchment }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <ShieldCheck size={15} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: '0.7rem', color: C.espresso, margin: 0, lineHeight: 1.7, fontWeight: 300 }}>
                    Your payment details are tokenised by Stripe and never touch our servers.
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                  {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map(m => (
                    <span key={m} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 7px', background: C.page }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleComplete}
              disabled={processing}
              style={{
                width: '100%', padding: '18px 24px',
                background: processing ? C.muted : C.gold,
                color: '#FDFAF5', border: 'none', borderRadius: 16,
                fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.25em',
                textTransform: 'uppercase', cursor: processing ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'background 0.2s', boxShadow: '0 8px 32px rgba(155, 71, 34,0.22)',
              }}
              onMouseEnter={e => { if (!processing) e.currentTarget.style.background = C.goldLight }}
              onMouseLeave={e => { if (!processing) e.currentTarget.style.background = C.gold }}
            >
              {processing
                ? <><Loader2 size={14} className="animate-spin" /> Preparing your ritual…</>
                : <>Complete My Ritual — ${total.toFixed(2)}</>
              }
            </button>

            {/* Trust strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, paddingTop: 8 }}>
              {[
                { icon: ShieldCheck, label: '90-Day\nGuarantee' },
                { icon: RotateCcw,   label: 'Free\nReturns' },
                { icon: FlaskConical, label: 'EU GMP\nCertified' },
                { icon: Truck,        label: 'Free Shipping\n£200+' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
                  <Icon size={14} style={{ color: C.gold, opacity: 0.7 }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order summary (sticky) ──────────────────────── */}
          <div>
            <div style={{ position: 'sticky', top: 32, borderRadius: 24, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden' }}>

              {/* Header */}
              <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Your Order</p>
              </div>

              {/* Items */}
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: C.card, border: `1px solid ${C.border}` }}>
                      <img
                        src={item.image ?? '/images/products/isola_collection.png'}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: C.charcoal, margin: '0 0 2px', lineHeight: 1.3 }}>{item.name}</p>
                      {item.isSubscription && (
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>Your ritual · every 45 days</p>
                      )}
                      <p style={{ fontSize: '0.7rem', color: C.muted, margin: 0 }}>× {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {item.isSubscription && item.price < item.basePrice && (
                        <p style={{ fontSize: '0.75rem', color: C.muted, textDecoration: 'line-through', margin: '0 0 2px' }}>
                          ${(item.basePrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                      <p style={{ fontSize: '0.875rem', fontWeight: 800, color: C.charcoal, margin: 0 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {savings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, padding: '8px 14px', background: 'rgba(155, 71, 34,0.07)', border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.gold }}>Ritual savings</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: C.gold }}>−${savings.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: C.muted }}>
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: C.muted }}>
                  <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.charcoal }}>Total</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: C.charcoal }}>${total.toFixed(2)}</span>
                    {allSubscribed && <p style={{ fontSize: '0.75rem', color: C.gold, fontWeight: 700, margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.15em' }}>/month</p>}
                  </div>
                </div>
                {allSubscribed && annualSavings > 0 && (
                  <p style={{ fontSize: '0.75rem', color: C.muted, textAlign: 'center', fontStyle: 'italic', marginTop: 4 }}>
                    You save ${annualSavings.toFixed(0)} over the year with your ritual membership.
                  </p>
                )}
              </div>

              {/* Clinician endorsement */}
              <div style={{ padding: '16px 24px 20px', borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.card, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Award size={13} style={{ color: C.gold }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, color: C.charcoal, margin: '0 0 3px' }}>Formulated at Isola del Liri</p>
                    <p style={{ fontSize: '0.75rem', color: C.muted, fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                      "The most clinically rigorous non-prescription protocol I have reviewed."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
