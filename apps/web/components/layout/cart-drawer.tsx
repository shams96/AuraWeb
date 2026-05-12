'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import {
  X, Minus, Plus, Loader2, ArrowRight,
  RefreshCcw, ShieldCheck, Award, FlaskConical,
  Gift, Truck, Star,
} from 'lucide-react'
import Link from 'next/link'

// ─── Constants ────────────────────────────────────────────────────────────────
const FREE_SHIPPING_THRESHOLD = 200
const SUB_LABEL = 'Subscribe & Save 20%'

// ─── Cross-sell map: cartItemId → suggestion ─────────────────────────────────
const CROSS_SELL: Record<string, { id: string; name: string; price: number; role: string; image: string }> = {
  'gentle-cellular-cleanser': { id: 'terra-radiance-cream',  name: 'Terra Radiance Cream',    price: 245, role: 'Pairs as your moisture step',       image: '/images/products/terra_radiance.png' },
  'terra-radiance-cream':     { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', price: 95, role: 'Complete with a cleanser',         image: '/images/products/gentle_cleanser.png' },
  'obsidian-vitale-cream':    { id: 'chrono-lift-serum',     name: 'Chrono-Lift Serum',        price: 345, role: 'Layer beneath for maximum lift',    image: '/images/products/chrono_lift.png' },
  'chrono-lift-serum':        { id: 'obsidian-vitale-cream', name: 'Obsidian Vitale Cream',     price: 295, role: 'Seal with age-defying cream',       image: '/images/products/obsidian_cream.png' },
  '1b':                       { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', price: 95, role: 'Start your routine clean',         image: '/images/products/gentle_cleanser.png' },
  't3-03':                    { id: 'obsidian-vitale-cream', name: 'Obsidian Vitale Cream',     price: 295, role: 'Intensive night complement',        image: '/images/products/obsidian_cream.png' },
  't4-04':                    { id: 'chrono-lift-serum',     name: 'Chrono-Lift Serum',        price: 345, role: 'Targeted lift for maximum potency', image: '/images/products/chrono_lift.png' },
}

// Welcome kit gifts unlocked with any subscription
const WELCOME_GIFTS = [
  { icon: '🧴', label: 'Signature Ritual Applicator' },
  { icon: '🎁', label: 'Deluxe Travel Pouch' },
  { icon: '✨', label: '3× Hero Sample Set' },
  { icon: '📋', label: 'Skin Intelligence Card' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ShippingBar({ subtotal }: { subtotal: number }) {
  const pct     = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const unlocked  = subtotal >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="px-5 py-3 bg-[#F7F4EF] border-b border-[#EDE8E0]">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Truck size={12} className={unlocked ? 'text-[#2A6B3A]' : 'text-[#913832]'} />
          <span className="text-[11px] font-bold tracking-wide text-[#1A1614]">
            {unlocked
              ? '🎉 Free shipping unlocked!'
              : `Add $${remaining.toFixed(0)} more for FREE shipping`}
          </span>
        </div>
        <span className="text-[10px] font-black text-[#913832] uppercase tracking-widest">
          ${FREE_SHIPPING_THRESHOLD}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E8E2D9] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: unlocked
              ? 'linear-gradient(90deg, #2A6B3A, #4CAF72)'
              : 'linear-gradient(90deg, #913832, #C9685F)',
          }}
        />
      </div>
    </div>
  )
}

function CartItemRow({
  item,
  onRemove,
  onQtyChange,
  onToggleSub,
}: {
  item: ReturnType<typeof useCart>['state']['items'][number]
  onRemove: () => void
  onQtyChange: (q: number) => void
  onToggleSub: () => void
}) {
  const oneTimePrice = item.basePrice
  const subPrice     = Math.round(item.basePrice * 0.8)
  const saving       = (oneTimePrice - subPrice) * item.quantity
  const perDay       = (item.price / 30).toFixed(2)

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden shadow-sm">
      {/* Item header */}
      <div className="flex gap-3 p-4">
        {/* Thumbnail */}
        <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-[#F7F4EF]">
          <img
            src={item.image ?? '/images/products/isola_collection.png'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] font-semibold text-[#1A1614] leading-snug">{item.name}</p>
            <button
              onClick={onRemove}
              className="text-[#BDBDBD] hover:text-[#913832] transition-colors flex-shrink-0 p-0.5"
              aria-label="Remove"
            >
              <X size={13} />
            </button>
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base font-bold text-[#1A1614]">${item.price}</span>
            {item.isSubscription && (
              <span className="text-xs text-[#888] line-through">${oneTimePrice}</span>
            )}
            <span className="text-[10px] text-[#888] font-light">· ${perDay}/day</span>
          </div>

          {/* Qty control */}
          <div className="flex items-center gap-3 mt-2.5">
            <div className="flex items-center rounded-lg border border-[#EDE8E0] overflow-hidden">
              <button
                className="px-2.5 py-1.5 text-[#888] hover:text-[#1A1614] hover:bg-[#F7F4EF] transition-all"
                onClick={() => onQtyChange(Math.max(0, item.quantity - 1))}
                aria-label="Decrease"
              >
                <Minus size={11} />
              </button>
              <span className="px-3 text-xs font-bold text-[#1A1614]">{item.quantity}</span>
              <button
                className="px-2.5 py-1.5 text-[#888] hover:text-[#1A1614] hover:bg-[#F7F4EF] transition-all"
                onClick={() => onQtyChange(item.quantity + 1)}
                aria-label="Increase"
              >
                <Plus size={11} />
              </button>
            </div>
            <span className="text-xs font-bold text-[#1A1614]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Subscription toggle */}
      <div
        className="mx-3 mb-3 rounded-xl overflow-hidden border"
        style={{ borderColor: item.isSubscription ? '#913832' : '#EDE8E0' }}
      >
        <div className="flex">
          {/* One-time */}
          <button
            onClick={() => item.isSubscription && onToggleSub()}
            className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
              !item.isSubscription
                ? 'bg-[#1A1614] text-white'
                : 'bg-white text-[#888] hover:bg-[#F7F4EF]'
            }`}
          >
            One-Time
          </button>
          {/* Subscribe */}
          <button
            onClick={() => !item.isSubscription && onToggleSub()}
            className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
              item.isSubscription
                ? 'bg-[#913832] text-white'
                : 'bg-white text-[#888] hover:bg-[#F7F4EF]'
            }`}
          >
            <RefreshCcw size={9} className="inline mr-1" />
            Subscribe – Save 20%
          </button>
        </div>
        {item.isSubscription && (
          <div className="bg-[#FDF5F4] px-3 py-1.5 flex items-center justify-between">
            <span className="text-[10px] text-[#913832] font-medium">
              Cancel anytime · Ships monthly
            </span>
            {saving > 0 && (
              <span className="text-[10px] font-black text-[#2A6B3A] bg-[#EAF5EC] px-2 py-0.5 rounded-full">
                You save ${saving.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function CrossSellBlock({
  suggestion,
  onAdd,
}: {
  suggestion: typeof CROSS_SELL[string]
  onAdd: () => void
}) {
  const subPrice = Math.round(suggestion.price * 0.8)
  return (
    <div className="rounded-2xl border border-[#EDE8E0] bg-[#FFFDF9] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#913832] mb-3">
        Complete Your Ritual
      </p>
      <div className="flex gap-3 items-center">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F7F4EF]">
          <img src={suggestion.image} alt={suggestion.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#1A1614] leading-snug">{suggestion.name}</p>
          <p className="text-[10px] text-[#888] mt-0.5">{suggestion.role}</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-sm font-bold text-[#1A1614]">${suggestion.price}</span>
            <span className="text-[10px] text-[#888]">or</span>
            <span className="text-xs font-bold text-[#913832]">${subPrice} / mo</span>
            <span className="text-[9px] font-black text-white bg-[#2A6B3A] px-1.5 py-0.5 rounded-full ml-1">
              –20%
            </span>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[#913832] text-white flex items-center justify-center hover:bg-[#7A2F2B] transition-colors shadow-sm"
          aria-label="Add to cart"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}

function WelcomeKitBanner() {
  return (
    <div className="rounded-2xl border border-[#913832]/30 bg-gradient-to-br from-[#FDF5F4] to-[#FFFDF9] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Gift size={14} className="text-[#913832]" />
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#913832]">
          Subscription Welcome Kit
        </p>
        <span className="ml-auto text-[9px] font-black text-white bg-[#913832] px-2 py-0.5 rounded-full">
          FREE
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {WELCOME_GIFTS.map(g => (
          <div key={g.label} className="flex items-center gap-2">
            <span className="text-base leading-none">{g.icon}</span>
            <span className="text-[10px] text-[#555] leading-tight">{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState({ onClose }: { onClose: () => void }) {
  const STARTER_STACK = [
    { name: 'Gentle Cellular Cleanser', price: 95, image: '/images/products/gentle_cleanser.png', id: 'gentle-cellular-cleanser' },
    { name: 'Terra Radiance Cream',     price: 245, image: '/images/products/terra_radiance.png', id: 'terra-radiance-cream' },
  ]
  const { addItem, setCartOpen } = useCart()

  function addStack() {
    STARTER_STACK.forEach(p =>
      addItem({ name: p.name, price: p.price, basePrice: p.price, currency: 'USD', quantity: 1, image: p.image, sku: p.id })
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#F7F4EF] flex items-center justify-center mb-5">
        <Star size={22} className="text-[#913832]/60" />
      </div>
      <p className="text-base font-bold text-[#1A1614] mb-1">Your cart is empty</p>
      <p className="text-xs text-[#888] mb-8 font-light leading-relaxed max-w-xs">
        Start your skin-health journey with our science-backed protocols.
      </p>

      {/* Starter Stack suggestion */}
      <div className="w-full rounded-2xl border border-[#EDE8E0] bg-white p-4 text-left mb-4 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#913832] mb-3">
          The Isola Vitale Starter Stack
        </p>
        <div className="space-y-3 mb-4">
          {STARTER_STACK.map(p => (
            <div key={p.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#F7F4EF]">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1A1614]">{p.name}</p>
              </div>
              <span className="text-xs font-bold text-[#1A1614]">${p.price}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-[#EDE8E0] pt-3">
          <div>
            <p className="text-xs text-[#888]">Bundle total</p>
            <p className="text-sm font-bold text-[#1A1614]">
              ${STARTER_STACK.reduce((s, p) => s + p.price, 0)}
              <span className="text-[10px] font-normal text-[#888] ml-1">
                or ${Math.round(STARTER_STACK.reduce((s, p) => s + p.price * 0.8, 0))}/mo
              </span>
            </p>
          </div>
          <button
            onClick={addStack}
            className="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-colors"
            style={{ background: '#913832' }}
          >
            Add Stack
          </button>
        </div>
      </div>

      <Link
        href="/shop"
        onClick={() => { onClose(); setCartOpen(false) }}
        className="text-[11px] font-bold uppercase tracking-widest text-[#913832] hover:underline flex items-center gap-1"
      >
        Browse All Collections <ArrowRight size={11} />
      </Link>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function CartDrawer() {
  const { state, updateQuantity, removeItem, toggleSubscription, addItem, setCartOpen } = useCart()
  const [checkingOut,   setCheckingOut]   = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  if (!state.isOpen) return null

  const items     = state.items
  const subtotal  = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)
  const hasSub    = items.some(i => i.isSubscription)

  // Determine cross-sell: find first cart item that has a cross-sell not already in cart
  const cartIds = new Set(items.map(i => i.id))
  const crossSell = (() => {
    for (const item of items) {
      const s = CROSS_SELL[item.id]
      if (s && !cartIds.has(s.id)) return s
    }
    return null
  })()

  // Savings vs all one-time
  const oneTimeTotal = items.reduce((s, i) => s + i.basePrice * i.quantity, 0)
  const totalSavings = oneTimeTotal - subtotal

  async function handleCheckout() {
    setCheckingOut(true)
    setCheckoutError('')
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency: 'usd',
          items: items.map(item => ({
            id:       item.sku ?? item.id,
            name:     item.name,
            price:    item.price,
            quantity: item.quantity,
            image:    item.image,
          })),
        }),
      })
      const contentType = r.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) throw new Error('service_unavailable')
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
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] flex flex-col bg-[#FAF8F5] shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#EDE8E0]">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-black uppercase tracking-[0.25em] text-[#1A1614]">
              YOUR CART
            </span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#913832] text-white text-[10px] font-black flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#888] hover:text-[#1A1614] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Shipping bar ── */}
        {items.length > 0 && <ShippingBar subtotal={subtotal} />}

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyState onClose={() => setCartOpen(false)} />
          ) : (
            <div className="p-4 space-y-3">

              {/* Cart items */}
              {items.map(item => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onQtyChange={q => updateQuantity(item.id, q)}
                  onToggleSub={() => toggleSubscription(item.id)}
                />
              ))}

              {/* Add more */}
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl py-3 text-[11px] font-black uppercase tracking-widest transition-all border-2 border-dashed border-[#EDE8E0] text-[#BDBDBD] hover:border-[#913832]/40 hover:text-[#913832]"
              >
                <Plus size={11} /> Add More Products
              </Link>

              {/* Cross-sell */}
              {crossSell && (
                <CrossSellBlock
                  suggestion={crossSell}
                  onAdd={() =>
                    addItem({
                      name:          crossSell.name,
                      price:         crossSell.price,
                      basePrice:     crossSell.price,
                      currency:      'USD',
                      quantity:      1,
                      image:         crossSell.image,
                      sku:           crossSell.id,
                      isSubscription: false,
                    })
                  }
                />
              )}

              {/* Welcome Kit */}
              {hasSub && <WelcomeKitBanner />}
            </div>
          )}
        </div>

        {/* ── Sticky Footer ── */}
        {items.length > 0 && (
          <div className="bg-white border-t border-[#EDE8E0] px-5 pt-4 pb-5">

            {/* Savings summary */}
            {totalSavings > 0 && (
              <div className="flex items-center justify-between mb-3 bg-[#EAF5EC] rounded-xl px-4 py-2.5">
                <span className="text-xs font-semibold text-[#2A6B3A]">Total savings</span>
                <span className="text-sm font-black text-[#2A6B3A]">–${totalSavings.toFixed(2)}</span>
              </div>
            )}

            {/* Subtotal row */}
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#888]">Subtotal</span>
              <span className="text-xl font-black text-[#1A1614]">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-[#BDBDBD] mb-4">Shipping &amp; taxes calculated at checkout</p>

            {/* Error */}
            {checkoutError && (
              <div className="mb-3 px-4 py-3 rounded-xl text-xs text-red-600 bg-red-50 border border-red-100">
                {checkoutError}
              </div>
            )}

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-[11px] font-black uppercase tracking-[0.2em] disabled:opacity-60 transition-opacity mb-4 shadow-lg"
              style={{ background: '#913832', color: '#fff' }}
            >
              {checkingOut ? (
                <><Loader2 size={14} className="animate-spin" /> Preparing Checkout…</>
              ) : (
                <>Checkout — ${subtotal.toFixed(2)} <ArrowRight size={13} /></>
              )}
            </button>

            {/* Expert badge */}
            <p className="text-center text-[10px] text-[#888] mb-3">
              <Award size={10} className="inline mr-1 text-[#913832]" />
              Dermatologist Approved · Expert Formulated
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-around">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-[#913832]" />
                <span className="text-[9px] text-[#888] text-center leading-tight font-medium">90-Day<br/>Guarantee</span>
              </div>
              <div className="w-px h-8 bg-[#EDE8E0]" />
              <div className="flex flex-col items-center gap-1">
                <Award size={16} className="text-[#913832]" />
                <span className="text-[9px] text-[#888] text-center leading-tight font-medium">Dermatologist<br/>Tested</span>
              </div>
              <div className="w-px h-8 bg-[#EDE8E0]" />
              <div className="flex flex-col items-center gap-1">
                <FlaskConical size={16} className="text-[#913832]" />
                <span className="text-[9px] text-[#888] text-center leading-tight font-medium">Science<br/>Backed</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
