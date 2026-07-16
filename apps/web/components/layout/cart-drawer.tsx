'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import {
  X, Minus, Plus, Loader2, ArrowRight,
  RefreshCcw, ShieldCheck, Award, FlaskConical,
  Truck, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

// ─── Config ───────────────────────────────────────────────────────────────────
const FREE_SHIPPING = 200
const SUB_PCT       = 20      // displayed discount %
const SUPPORT_TEL   = '+12147143597'
const SUPPORT_LABEL = '1-214-714-3597'

// ─── Cross-sell map ───────────────────────────────────────────────────────────
const CROSS_SELL: Record<string, { id: string; name: string; price: number; role: string; image: string }> = {
  'gentle-cellular-cleanser': { id: 'terra-radiance-cream',     name: 'Terra Radiance Cream',     price: 245, role: 'Pairs as your moisture step',       image: '/images/products/terra_radiance.png' },
  'terra-radiance-cream':     { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', price: 95,  role: 'Complete with a cleanser first',    image: '/images/products/gentle_cleanser.png' },
  'obsidian-vitale-cream':    { id: 'chrono-lift-serum',        name: 'Chrono-Lift Serum',        price: 345, role: 'Layer beneath for structural lift', image: '/images/products/chrono_lift.png' },
  'chrono-lift-serum':        { id: 'obsidian-vitale-cream',    name: 'Obsidian Crème',    price: 295, role: 'Seal with the night crème',       image: '/images/products/obsidian_cream.png' },
  '1b':                       { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', price: 95,  role: 'Start your routine clean',          image: '/images/products/gentle_cleanser.png' },
  't3-03':                    { id: 'obsidian-vitale-cream',    name: 'Obsidian Crème',    price: 295, role: 'Intensive night complement',         image: '/images/products/obsidian_cream.png' },
  't4-04':                    { id: 'chrono-lift-serum',        name: 'Chrono-Lift Serum',        price: 345, role: 'Targeted lift for max potency',     image: '/images/products/chrono_lift.png' },
}

// Welcome kit items — real product thumbnails
const WELCOME_KIT = [
  { label: 'Signature Applicator',  image: '/images/products/isola_serum.png' },
  { label: 'Deluxe Travel Pouch',   image: '/images/products/isola_collection.png' },
  { label: '3× Hero Sample Set',    image: '/images/products/gentle_cleanser.png' },
  { label: 'Skin Intelligence Card', image: '/images/products/terra_radiance.png' },
]

// ─── Shipping bar ─────────────────────────────────────────────────────────────
function ShippingBar({ subtotal }: { subtotal: number }) {
  const pct       = Math.min(100, (subtotal / FREE_SHIPPING) * 100)
  const remaining = FREE_SHIPPING - subtotal
  const unlocked  = subtotal >= FREE_SHIPPING
  return (
    <div className="px-5 py-3 border-b border-[#EDE8E0]" style={{ background: '#F7F4EF' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Truck size={11} className={unlocked ? 'text-[#2A6B3A]' : 'text-[#9B4722]'} />
          <span className="text-[11px] font-bold text-iv-charcoal">
            {unlocked ? '🎉 Free shipping unlocked!' : `Add $${remaining.toFixed(0)} for FREE shipping`}
          </span>
        </div>
        <span className="text-[10px] font-black text-[#9B4722]">${FREE_SHIPPING}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E8E2D9] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: unlocked ? 'linear-gradient(90deg,#2A6B3A,#4CAF72)' : 'linear-gradient(90deg,#9B4722,#C9685F)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Global subscribe toggle (subscription-first — IM8 pattern) ──────────────
function SubscribeToggle({
  allSubscribed,
  onSwitch,
  subTotal,
  retailTotal,
  dailyCost,
}: {
  allSubscribed: boolean
  onSwitch: (v: boolean) => void
  subTotal: number
  retailTotal: number
  dailyCost: string
}) {
  const penalty = retailTotal - subTotal  // how much more you pay without subscribing
  const annualSavings = penalty * 12

  return (
    <div className="mx-4 mt-4 rounded-2xl overflow-hidden border-2" style={{ borderColor: allSubscribed ? '#9B4722' : '#EDE8E0' }}>
      {/* Toggle pills — Subscribe first (featured), One-Time second (penalty) */}
      <div className="flex">
        <button
          onClick={() => onSwitch(true)}
          className={`flex-1 py-3 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
            allSubscribed ? 'bg-[#9B4722] text-white' : 'bg-white text-iv-text-muted'
          }`}
        >
          <RefreshCcw size={10} />
          Subscribe &amp; Save {SUB_PCT}%
        </button>
        <button
          onClick={() => onSwitch(false)}
          className={`flex-1 py-3 text-[11px] font-black uppercase tracking-wider transition-all ${
            !allSubscribed ? 'bg-[#1A1614] text-white' : 'bg-white text-iv-text-muted'
          }`}
        >
          One-Time
        </button>
      </div>

      {/* Pricing comparison panel */}
      {allSubscribed ? (
        <div className="bg-[#FDF5F4] px-4 py-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-iv-text-muted">Without ritual membership</span>
            <span className="text-[11px] text-iv-text-muted line-through">${retailTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-[#9B4722]">Your ritual price</span>
            <span className="text-[15px] font-black text-[#9B4722]">${subTotal.toFixed(2)}<span className="text-[10px] font-normal text-iv-text-muted ml-1">/mo</span></span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#F0E8E5]">
            <span className="text-[10px] text-[#9B4722] font-bold">Your saving</span>
            <span className="text-[13px] font-black text-[#2A6B3A]">${annualSavings.toFixed(0)}/year</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#555]">That's just</span>
            <span className="text-[12px] font-black text-[#2A6B3A]">${dailyCost} / day</span>
          </div>
          <p className="text-[9px] text-[#AAA] pt-0.5">Pause anytime · Arrives every 45 days · Free returns</p>
        </div>
      ) : (
        <div className="px-4 py-3 space-y-2" style={{ background: '#F7F4EF' }}>
          <p className="text-[11px] text-[#555] leading-relaxed font-light italic">
            Ritual members receive this for <span className="font-black text-[#9B4722] not-italic">${penalty.toFixed(2)} less</span> each month — and their formulation arrives before they run out.
          </p>
          <button
            onClick={() => onSwitch(true)}
            className="w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all"
            style={{ background: '#9B4722' }}
          >
            Begin your ritual
          </button>
          <p className="text-[9px] text-[#AAA] text-center">Cancel anytime · No commitment</p>
        </div>
      )}
    </div>
  )
}

// ─── Individual cart item (simplified — no per-item toggle, global controls it) ─
function CartItem({
  item,
  onRemove,
  onQty,
}: {
  item: ReturnType<typeof useCart>['state']['items'][number]
  onRemove: () => void
  onQty: (q: number) => void
}) {
  const perDay = (item.price / 30).toFixed(2)
  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3.5 border border-[#EDE8E0] shadow-sm">
      {/* Thumb */}
      <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex-shrink-0 bg-iv-blush">
        <img
          src={item.image ?? '/images/products/isola_collection.png'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="text-[12px] font-semibold text-iv-charcoal leading-snug line-clamp-2">{item.name}</p>
          <button onClick={onRemove} className="text-[#BDBDBD] hover:text-[#9B4722] p-0.5 flex-shrink-0" aria-label="Remove">
            <X size={12} />
          </button>
        </div>

        {item.isSubscription && (
          <div className="flex items-center gap-1 mt-0.5">
            <RefreshCcw size={8} className="text-[#9B4722]" />
            <span className="text-[9px] font-bold text-[#9B4722] uppercase tracking-wider">Every 45 days</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Qty */}
          <div className="flex items-center rounded-lg border border-[#EDE8E0] overflow-hidden">
            <button
              onClick={() => onQty(Math.max(0, item.quantity - 1))}
              className="px-2 py-1.5 text-iv-text-muted hover:bg-iv-blush transition-colors"
            >
              <Minus size={10} />
            </button>
            <span className="px-2.5 text-xs font-bold text-iv-charcoal">{item.quantity}</span>
            <button
              onClick={() => onQty(item.quantity + 1)}
              className="px-2 py-1.5 text-iv-text-muted hover:bg-iv-blush transition-colors"
            >
              <Plus size={10} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-black text-iv-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
            {item.isSubscription && (
              <p className="text-[9px] text-[#2A6B3A] font-bold">${perDay}/day</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Cross-sell block ─────────────────────────────────────────────────────────
function CrossSell({ s, onAdd }: { s: typeof CROSS_SELL[string]; onAdd: () => void }) {
  return (
    <div className="rounded-2xl border border-[#EDE8E0] bg-[#FFFDF9] p-3.5">
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#9B4722] mb-2.5">Complete Your Ritual</p>
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-iv-blush">
          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-iv-charcoal leading-snug">{s.name}</p>
          <p className="text-[10px] text-iv-text-muted mt-0.5">{s.role}</p>
          <p className="text-xs font-black text-iv-charcoal mt-1">
            ${s.price} <span className="text-[10px] text-iv-text-muted font-normal">or</span>{' '}
            <span className="text-[#9B4722]">${Math.round(s.price * 0.8)}/mo</span>
          </p>
        </div>
        <button
          onClick={onAdd}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow"
          style={{ background: '#9B4722' }}
          aria-label="Add"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  )
}

// ─── Welcome kit (real product images) ───────────────────────────────────────
function WelcomeKit() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#9B4722]/25" style={{ background: 'linear-gradient(135deg,#FDF5F4 0%,#FFFDF9 100%)' }}>
      <div className="flex items-center gap-2 px-4 pt-3 pb-2.5 border-b border-[#F0E8E5]">
        <span className="text-base">🎁</span>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9B4722] flex-1">Subscription Welcome Kit</p>
        <span className="text-[9px] font-black text-white bg-[#9B4722] px-2.5 py-0.5 rounded-full">FREE</span>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {WELCOME_KIT.map(g => (
          <div key={g.label} className="flex flex-col items-center gap-1.5">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-iv-blush border border-[#EDE8E0]">
              <img src={g.image} alt={g.label} className="w-full h-full object-cover" />
            </div>
            <p className="text-[8px] text-[#666] text-center leading-tight">{g.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Clinician endorsement (IM8 FrontrowMD equivalent) ───────────────────────
function ClinicianBlock() {
  return (
    <div className="rounded-2xl border border-[#EDE8E0] bg-white p-4">
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-iv-blush border-2 border-[#9B4722]/20 flex items-center justify-center">
          <Award size={18} className="text-[#9B4722]/60" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black text-iv-charcoal">Formulated at Isola del Liri</p>
          <p className="text-[9px] text-iv-text-muted mb-1.5">Natural You Srl · Lazio, Italy</p>
          <p className="text-[10px] text-[#555] leading-relaxed italic">
            "Every formulation is made in one laboratory, in one town, by a master pharmacist and cosmetic chemist — and nothing leaves it until it has earned its place."
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-[#EDE8E0]">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#9B4722] text-[10px]">★</span>
          ))}
        </div>
        <span className="text-[9px] text-iv-text-muted">Clinician-recommended protocol</span>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  const { addItem, setCartOpen } = useCart()
  const STACK = [
    { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', price: 95,  image: '/images/products/gentle_cleanser.png' },
    { id: 'terra-radiance-cream',     name: 'Terra Radiance Cream',     price: 245, image: '/images/products/terra_radiance.png' },
  ]
  const retailTotal = STACK.reduce((s, p) => s + p.price, 0)
  const subTotal    = Math.round(STACK.reduce((s, p) => s + p.price * 0.8, 0))

  function addStack() {
    STACK.forEach(p => addItem({ name: p.name, price: p.price, basePrice: p.price, currency: 'USD', quantity: 1, image: p.image, sku: p.id }))
  }

  return (
    <div className="flex-1 flex flex-col px-5 py-8">
      <p className="text-sm font-black text-iv-charcoal mb-1">Your cart is empty</p>
      <p className="text-xs text-iv-text-muted mb-6 font-light">Begin your skin-health protocol.</p>

      {/* Starter stack */}
      <div className="rounded-2xl border border-[#EDE8E0] bg-white overflow-hidden shadow-sm mb-5">
        <div className="px-4 py-3 border-b border-[#EDE8E0]">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#9B4722]">The Starter Stack</p>
        </div>
        <div className="divide-y divide-[#EDE8E0]">
          {STACK.map(p => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-iv-blush">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="flex-1 text-xs font-semibold text-iv-charcoal">{p.name}</p>
              <span className="text-xs font-black text-iv-charcoal">${p.price}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-iv-blush flex items-center justify-between">
          <div>
            <p className="text-[10px] text-iv-text-muted">Retail ${retailTotal} · Subscribe <span className="font-black text-[#9B4722]">${subTotal}/mo</span></p>
          </div>
          <button
            onClick={addStack}
            className="px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-white"
            style={{ background: '#9B4722' }}
          >
            Add Stack
          </button>
        </div>
      </div>

      <Link
        href="/shop"
        onClick={() => setCartOpen(false)}
        className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#9B4722] uppercase tracking-wider hover:underline"
      >
        Browse All Collections <ChevronRight size={12} />
      </Link>
    </div>
  )
}

// ─── Main cart drawer ─────────────────────────────────────────────────────────
export function CartDrawer() {
  const { state, updateQuantity, removeItem, setAllSubscription, addItem, setCartOpen } = useCart()
  const [checkingOut,   setCheckingOut]   = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  if (!state.isOpen) return null

  const items      = state.items
  const itemCount  = items.reduce((s, i) => s + i.quantity, 0)
  const subtotal   = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const retailTotal = items.reduce((s, i) => s + i.basePrice * i.quantity, 0)
  const allSubscribed = items.length > 0 && items.every(i => i.isSubscription)
  const totalSavings  = retailTotal - subtotal
  const dailyCost     = (subtotal / 30).toFixed(2)

  // Cross-sell: first cartItem with a suggestion not already in cart
  const cartIds   = new Set(items.map(i => i.sku ?? i.id))
  const crossSell = (() => {
    for (const item of items) {
      const key = item.sku ?? item.id
      const s   = CROSS_SELL[key]
      if (s && !cartIds.has(s.id)) return s
    }
    return null
  })()

  async function handleCheckout() {
    setCheckingOut(true)
    setCheckoutError('')
    try {
      const r = await fetch('/api/checkout', {
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
      const ct = r.headers.get('content-type') ?? ''
      if (!ct.includes('application/json')) throw new Error('service_unavailable')
      const data: { url?: string; error?: string } = await r.json()
      if (!r.ok || !data.url) throw new Error(data.error ?? 'service_unavailable')
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      setCheckoutError(
        msg && msg !== 'service_unavailable' && !msg.startsWith('Unexpected')
          ? msg
          : 'Checkout is temporarily unavailable. Please try again.'
      )
      setCheckingOut(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] flex flex-col shadow-2xl" style={{ background: '#FAF8F5' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#EDE8E0]">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-black uppercase tracking-[0.25em] text-iv-charcoal">Your Cart</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center" style={{ background: '#9B4722' }}>
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full bg-iv-blush flex items-center justify-center text-iv-text-muted hover:text-iv-charcoal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Shipping bar */}
        {items.length > 0 && <ShippingBar subtotal={subtotal} />}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="pb-4">

              {/* ── Global subscription toggle (IM8 pattern) ── */}
              <SubscribeToggle
                allSubscribed={allSubscribed}
                onSwitch={setAllSubscription}
                subTotal={subtotal}
                retailTotal={retailTotal}
                dailyCost={dailyCost}
              />

              {/* ── Cart items ── */}
              <div className="px-4 pt-4 space-y-3">
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(item.id)}
                    onQty={q => updateQuantity(item.id, q)}
                  />
                ))}

                {/* Add more */}
                <Link
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl py-3 text-[11px] font-black uppercase tracking-widest border-2 border-dashed border-[#EDE8E0] text-[#BDBDBD] hover:border-[#9B4722]/40 hover:text-[#9B4722] transition-colors"
                >
                  <Plus size={11} /> Add More
                </Link>
              </div>

              {/* ── Cross-sell ── */}
              {crossSell && (
                <div className="px-4 pt-3">
                  <CrossSell
                    s={crossSell}
                    onAdd={() =>
                      addItem({
                        name:           crossSell.name,
                        price:          allSubscribed ? Math.round(crossSell.price * 0.8) : crossSell.price,
                        basePrice:      crossSell.price,
                        currency:       'USD',
                        quantity:       1,
                        image:          crossSell.image,
                        sku:            crossSell.id,
                        isSubscription: allSubscribed,
                      })
                    }
                  />
                </div>
              )}

              {/* ── Welcome kit (subscription active) ── */}
              {allSubscribed && (
                <div className="px-4 pt-3">
                  <WelcomeKit />
                </div>
              )}

              {/* ── Clinician endorsement ── */}
              <div className="px-4 pt-3">
                <ClinicianBlock />
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky footer ── */}
        {items.length > 0 && (
          <div className="bg-white border-t border-[#EDE8E0] px-5 pt-4 pb-6">

            {/* Savings row */}
            {totalSavings > 0 && (
              <div className="flex items-center justify-between mb-3 rounded-xl px-4 py-2.5" style={{ background: '#EAF5EC' }}>
                <span className="text-xs font-semibold text-[#2A6B3A]">Subscription savings</span>
                <span className="text-sm font-black text-[#2A6B3A]">–${totalSavings.toFixed(2)}</span>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex items-baseline justify-between mb-0.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-iv-text-muted">Subtotal</span>
              <div className="text-right">
                {totalSavings > 0 && (
                  <span className="text-xs text-[#BDBDBD] line-through mr-2">${retailTotal.toFixed(2)}</span>
                )}
                <span className="text-xl font-black text-iv-charcoal">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            {allSubscribed && (
              <p className="text-[10px] text-[#2A6B3A] font-bold mb-1">Just ${dailyCost} per day</p>
            )}
            <p className="text-[10px] text-[#BDBDBD] mb-4">Shipping &amp; taxes calculated at checkout</p>

            {/* Error */}
            {checkoutError && (
              <div className="mb-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-xs text-red-600 mb-1">{checkoutError}</p>
                <p className="text-[11px] text-red-500 font-semibold">
                  Need help?{' '}
                  <a href={`tel:${SUPPORT_TEL}`} className="underline font-black">{SUPPORT_LABEL}</a>
                </p>
              </div>
            )}

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-[12px] font-black uppercase tracking-[0.2em] disabled:opacity-60 mb-3 shadow-lg"
              style={{ background: '#9B4722', color: '#fff' }}
            >
              {checkingOut
                ? <><Loader2 size={14} className="animate-spin" /> Preparing…</>
                : <>Checkout — ${subtotal.toFixed(2)} <ArrowRight size={13} /></>}
            </button>

            {/* Trust row */}
            <div className="flex items-center justify-around pt-1">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={15} className="text-[#9B4722]" />
                <span className="text-[8px] text-[#AAA] text-center leading-tight font-semibold">48-Hour<br/>TTW™ Standard</span>
              </div>
              <div className="w-px h-7 bg-[#EDE8E0]" />
              <div className="flex flex-col items-center gap-1">
                <Award size={15} className="text-[#9B4722]" />
                <span className="text-[8px] text-[#AAA] text-center leading-tight font-semibold">Derm<br/>Tested</span>
              </div>
              <div className="w-px h-7 bg-[#EDE8E0]" />
              <div className="flex flex-col items-center gap-1">
                <FlaskConical size={15} className="text-[#9B4722]" />
                <span className="text-[8px] text-[#AAA] text-center leading-tight font-semibold">Science<br/>Backed</span>
              </div>
              <div className="w-px h-7 bg-[#EDE8E0]" />
              <div className="flex flex-col items-center gap-1">
                <RefreshCcw size={15} className="text-[#9B4722]" />
                <span className="text-[8px] text-[#AAA] text-center leading-tight font-semibold">Cancel<br/>Anytime</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
