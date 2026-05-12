'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { X, Minus, Plus, ShoppingBag, Loader2, ArrowRight, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export function CartDrawer() {
  const { state, updateQuantity, removeItem, setCartOpen } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  if (!state.isOpen) return null

  const subtotal    = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount   = state.items.reduce((s, i) => s + i.quantity, 0)
  const hasSubItems = state.items.some(i => i.isSubscription)

  async function handleCheckout() {
    setCheckingOut(true)
    setCheckoutError('')
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency: 'usd',
          items: state.items.map(item => ({
            id:       item.sku ?? item.id,
            name:     item.name,
            price:    item.price,
            quantity: item.quantity,
            image:    item.image,
          })),
        }),
      })
      const data = await r.json()
      if (!r.ok || !data.url) throw new Error(data.error ?? 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed. Try again.')
      setCheckingOut(false)
    }
  }

  const GOLD = 'var(--iv-gold)'
  const BG   = 'var(--iv-deep-green)'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col"
        style={{ background: 'var(--iv-black)', borderLeft: '1px solid rgba(145,56,50,0.20)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: GOLD }} />
            <span className="text-sm font-bold text-iv-white uppercase tracking-widest">Your Cart</span>
            {itemCount > 0 && (
              <span
                className="text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center"
                style={{ background: GOLD, color: 'var(--iv-white)' }}
              >
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="text-iv-cream/40 hover:text-iv-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(145,56,50,0.08)', border: '1px solid rgba(145,56,50,0.18)' }}
              >
                <ShoppingBag size={22} style={{ color: GOLD, opacity: 0.6 }} />
              </div>
              <p className="text-iv-cream/40 text-sm font-light">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="btn-luxury inline-flex items-center gap-2"
                style={{ padding: '11px 24px', fontSize: '0.65rem', letterSpacing: '0.2em' }}
              >
                Discover Your Protocol <ArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {state.items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl p-4"
                  style={{ background: BG, border: '1px solid rgba(145,56,50,0.12)' }}
                >
                  {/* Product image */}
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ background: 'rgba(145,56,50,0.08)' }}
                  >
                    <img
                      src={item.image ?? '/images/products/isola_collection.png'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-iv-white leading-snug">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-iv-cream/25 hover:text-red-400 transition-colors flex-shrink-0 p-0.5"
                        title="Remove"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    {item.isSubscription && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <RefreshCcw size={10} style={{ color: GOLD }} />
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GOLD }}>
                          Subscribe &amp; Save 20%
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty control */}
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: '1px solid rgba(145,56,50,0.20)' }}
                      >
                        <button
                          className="px-2.5 py-1.5 text-iv-cream/50 hover:text-iv-white hover:bg-iv-gold/10 transition-all"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-3 text-xs font-bold text-iv-white">{item.quantity}</span>
                        <button
                          className="px-2.5 py-1.5 text-iv-cream/50 hover:text-iv-white hover:bg-iv-gold/10 transition-all"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm font-bold" style={{ color: GOLD }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add more prompt */}
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-[10px] font-black uppercase tracking-widest transition-all"
                style={{ border: '1px dashed rgba(145,56,50,0.20)', color: 'rgba(253,250,245,0.30)' }}
              >
                <Plus size={11} /> Add More Products
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div
            className="px-6 py-6 border-t"
            style={{ borderColor: 'rgba(145,56,50,0.14)', background: BG }}
          >
            {/* Subtotal */}
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs uppercase tracking-widest font-black text-iv-cream/40">Subtotal</span>
              <span className="text-xl font-bold text-iv-white">${subtotal.toFixed(2)}</span>
            </div>
            {hasSubItems && (
              <p className="text-[10px] text-iv-cream/30 font-light mb-4">
                Subscription items renew monthly — cancel anytime.
              </p>
            )}
            <p className="text-[10px] text-iv-cream/25 font-light mb-5">
              Shipping &amp; taxes calculated at checkout.
            </p>

            {checkoutError && (
              <div
                className="mb-4 px-4 py-3 rounded-xl text-xs text-red-300"
                style={{ background: 'rgba(145,56,50,0.15)', border: '1px solid rgba(145,56,50,0.25)' }}
              >
                {checkoutError}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-widest disabled:opacity-60 transition-opacity"
              style={{ background: GOLD, color: 'var(--iv-white)' }}
            >
              {checkingOut ? (
                <><Loader2 size={14} className="animate-spin" /> Preparing Checkout…</>
              ) : (
                <>Proceed to Checkout <ArrowRight size={13} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
