'use client'

import { useState } from 'react'
import { Check, CreditCard, Truck, Shield, Loader2 } from 'lucide-react'
import { Button } from '@aurabiosphere/ui'

interface BuyBoxProps {
  product: {
    id: string
    name: string
    price: number
    currency: string
    sku: string
    variants: Array<{
      id: string
      name: string
      price: number
      compareAtPrice?: number
    }>
  }
  selectedVariant?: string | null
  buyBullets: string[]
}

export function BuyBox({ product, selectedVariant: initialVariant, buyBullets }: BuyBoxProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    initialVariant ?? product.variants[0]?.id ?? ''
  )
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('subscribe')
  const [customQty, setCustomQty] = useState(1)
  const [selectedBreakIndex, setSelectedBreakIndex] = useState(0)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  async function handleCheckout() {
    setCheckoutLoading(true)
    setCheckoutError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id:        product.id,
            name:      `${product.name}${currentVariant ? ` — ${currentVariant.name}` : ''}`,
            price:     totalPrice / effectiveQty,
            quantity:  effectiveQty,
            variantId: selectedVariantId,
          }],
          currency: 'usd',
        }),
      })

      // Guard against non-JSON responses (e.g. HTML 500 pages)
      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        setCheckoutError('Checkout is temporarily unavailable. Please try again.')
        return
      }

      const data: { url?: string; error?: string } = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        const msg = data.error ?? ''
        setCheckoutError(
          msg && !msg.startsWith('Unexpected')
            ? msg
            : 'Checkout is temporarily unavailable. Please try again.'
        )
      }
    } catch {
      setCheckoutError('Checkout is temporarily unavailable. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0]
  const basePrice = purchaseType === 'subscribe' ? currentVariant.price * 0.80 : currentVariant.price

  const quantityBreaks = [
    { quantity: 1, price: basePrice, label: '1 jar', perUnit: basePrice },
    { quantity: 2, price: basePrice * 1.8, label: '2 jars', perUnit: (basePrice * 1.8) / 2 },
    { quantity: 3, price: basePrice * 2.4, label: '3 jars', perUnit: (basePrice * 2.4) / 3 },
  ]

  const bestValueIndex = quantityBreaks.reduce((bestIndex, current, index, array) =>
    current.perUnit < array[bestIndex].perUnit ? index : bestIndex, 0
  )

  const formatPrice = (price: number) =>
    `$${price.toFixed(2)}`

  const activeBreak = quantityBreaks[selectedBreakIndex]
  const effectiveQty = selectedBreakIndex === -1 ? customQty : activeBreak.quantity
  const totalPrice = selectedBreakIndex === -1
    ? basePrice * customQty
    : activeBreak.price

  function handleDecrement() {
    setSelectedBreakIndex(-1)
    setCustomQty(q => Math.max(1, q - 1))
  }

  function handleIncrement() {
    setSelectedBreakIndex(-1)
    setCustomQty(q => Math.min(10, q + 1))
  }

  function handleQtyInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.min(10, Math.max(1, parseInt(e.target.value) || 1))
    setCustomQty(val)
    setSelectedBreakIndex(-1)
  }

  return (
    <section id="buy-box" className="py-12 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-iv-deep-green/30 rounded-2xl p-6 md:p-10 shadow-2xl border border-iv-gold/10 backdrop-blur-md">
            {/* Product Title and Rating */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-iv-white mb-1">
                {product.name}
              </h2>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-iv-gold' : 'text-iv-white/20'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-medium text-iv-cream/60 ml-2">
                  4.0 (127 reviews)
                </span>
              </div>
            </div>

            {/* Purchase Type Toggle — subscription first */}
            <div className="mb-6">
              <div className="flex rounded-xl border border-iv-gold/20 bg-iv-black overflow-hidden">
                {/* Subscribe — featured/default */}
                <button
                  onClick={() => setPurchaseType('subscribe')}
                  className={`flex-1 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-0.5 ${
                    purchaseType === 'subscribe'
                      ? 'bg-iv-gold text-iv-black shadow-lg'
                      : 'text-iv-cream/60 hover:text-iv-white'
                  }`}
                >
                  <span>Subscribe &amp; Save</span>
                  <span className={`text-[10px] font-black ${purchaseType === 'subscribe' ? 'text-iv-black/70' : 'text-iv-gold/60'}`}>
                    Save {formatPrice(currentVariant.price * 0.20)}/order
                  </span>
                </button>
                {/* One-time — secondary with penalty label */}
                <button
                  onClick={() => setPurchaseType('one-time')}
                  className={`flex-1 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-0.5 ${
                    purchaseType === 'one-time'
                      ? 'bg-iv-black text-white shadow-inner'
                      : 'text-iv-cream/40 hover:text-iv-white'
                  }`}
                >
                  <span>One-Time</span>
                  <span className={`text-[10px] font-black ${purchaseType === 'one-time' ? 'text-red-400' : 'text-red-400/50'}`}>
                    +{formatPrice(currentVariant.price * 0.20)} vs subscribers
                  </span>
                </button>
              </div>

              {/* Penalty banner when one-time is selected */}
              {purchaseType === 'one-time' && (
                <div className="mt-3 rounded-xl border border-red-500/30 px-4 py-3" style={{ background: 'rgba(192,57,43,0.08)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-400">⚠ You're paying more</span>
                    <span className="text-sm font-black text-red-400">+{formatPrice(currentVariant.price * 0.20)} this order</span>
                  </div>
                  <p className="text-[10px] text-iv-cream/40">
                    Subscribers pay {formatPrice(currentVariant.price * 0.80)}/mo · Save {formatPrice(currentVariant.price * 0.20 * 12)} a year.{' '}
                    <button onClick={() => setPurchaseType('subscribe')} className="text-iv-gold underline font-bold">Switch &amp; save now.</button>
                  </p>
                </div>
              )}

              {/* Savings confirmation when subscribed */}
              {purchaseType === 'subscribe' && (
                <div className="mt-3 rounded-xl border border-green-600/20 px-4 py-3" style={{ background: 'rgba(42,107,58,0.12)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-green-400">Subscription savings</span>
                    <span className="text-sm font-black text-green-400">{formatPrice(currentVariant.price * 0.20 * 12)}/year</span>
                  </div>
                  <p className="text-[10px] text-iv-cream/40 mt-0.5">Cancel anytime · Ships every 30 days · Free returns</p>
                </div>
              )}
            </div>

            {/* Quantity Breaks */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-iv-white mb-6 text-center uppercase tracking-widest">
                Choose Your Quantity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quantityBreaks.map((breakItem, index) => (
                  <button
                    key={index}
                    onClick={() => { setSelectedBreakIndex(index); setCustomQty(breakItem.quantity) }}
                    className={`relative p-6 rounded-xl border transition-all duration-300 text-left ${
                      selectedBreakIndex === index
                        ? 'border-iv-gold bg-iv-gold/10 shadow-[0_0_20px_rgba(184,151,47,0.15)]'
                        : 'border-iv-white/10 hover:border-iv-gold/40'
                    }`}
                  >
                    {index === bestValueIndex && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-iv-gold text-iv-black text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full">
                          Best Value
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-iv-white">
                        {formatPrice(breakItem.price)}
                      </div>
                      <div className="text-sm text-iv-cream/70 mt-1">
                        {breakItem.label}
                      </div>
                      <div className="text-xs text-iv-cream/40 mt-2 font-mono">
                        {formatPrice(breakItem.perUnit)}/jar
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Quantity Input */}
              <div className="mt-8 flex items-center justify-center space-x-6">
                <span className="text-xs font-bold uppercase tracking-widest text-iv-cream/60">Custom Quantity</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDecrement}
                    className="w-10 h-10 rounded-full border border-iv-gold/20 flex items-center justify-center bg-iv-black hover:border-iv-gold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <span className="text-iv-gold text-xl leading-none">-</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={selectedBreakIndex === -1 ? customQty : quantityBreaks[selectedBreakIndex].quantity}
                    onChange={handleQtyInput}
                    onFocus={() => setSelectedBreakIndex(-1)}
                    className="w-16 h-10 text-center border border-iv-gold/20 rounded-lg bg-iv-black text-iv-white font-bold"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-full border border-iv-gold/20 flex items-center justify-center bg-iv-black hover:border-iv-gold transition-colors"
                    aria-label="Increase quantity"
                  >
                    <span className="text-iv-gold text-xl leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="mb-10">
              <h3 className="text-xs font-bold text-iv-white mb-6 text-center uppercase tracking-widest">
                Select Variant
              </h3>
              <div className="flex justify-center space-x-4">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`px-8 py-3 rounded-lg border cursor-pointer transition-all ${
                      selectedVariantId === variant.id
                        ? 'border-iv-gold bg-iv-gold/10 text-iv-white font-bold'
                        : 'border-iv-white/10 text-iv-cream/60 hover:border-iv-gold/40'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6 p-4 rounded-xl bg-iv-black/40 border border-iv-gold/10">
              <div className="flex items-center justify-between">
                <div className="text-xs text-iv-cream/50 uppercase tracking-widest font-bold">
                  {effectiveQty} × {currentVariant.name}
                </div>
                <div className="text-right">
                  {purchaseType === 'subscribe' && (
                    <div className="text-[10px] text-iv-cream/30 line-through">{formatPrice(currentVariant.price * effectiveQty)}</div>
                  )}
                  <div className="text-xl font-bold text-iv-white">{formatPrice(totalPrice)}</div>
                  {purchaseType === 'subscribe' && (
                    <div className="text-[10px] font-black text-green-400">–{formatPrice(currentVariant.price * 0.20 * effectiveQty)} saved</div>
                  )}
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mb-10">
              <Button
                size="lg"
                disabled={checkoutLoading}
                onClick={handleCheckout}
                className="w-full py-6 text-lg font-bold uppercase tracking-widest bg-iv-gold text-iv-black hover:bg-iv-gold-light shadow-xl hover:shadow-iv-gold/20 border-none rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-3">
                  {checkoutLoading
                    ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Preparing Checkout…</span></>
                    : <span>Checkout — {formatPrice(totalPrice)}</span>
                  }
                </div>
              </Button>

              {checkoutError && (
                <div className="mt-3 text-center">
                  <p className="text-red-400 text-xs font-medium mb-1">{checkoutError}</p>
                  <p className="text-xs text-iv-cream/50">
                    Need help?{' '}
                    <a href="tel:+12147143597" className="text-iv-gold underline font-bold">
                      1-214-714-3597
                    </a>
                  </p>
                </div>
              )}

              <div className="flex justify-center space-x-4 mt-6">
                <Button variant="outline" size="lg" onClick={handleCheckout} className="flex-1 border-iv-white/10 text-iv-cream/60 bg-iv-black hover:border-iv-gold hover:text-iv-gold">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card / Apple Pay
                </Button>
              </div>
            </div>

            {/* Key Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b border-iv-white/5 pb-10">
              {buyBullets.map((bullet, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-iv-gold mt-1 flex-shrink-0" />
                  <span className="text-sm text-iv-cream/70 leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 pt-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-iv-cream/40">
                <Shield className="w-4 h-4 text-iv-gold/60" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-iv-cream/40">
                <Truck className="w-4 h-4 text-iv-gold/60" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-iv-cream/40">
                <Shield className="w-4 h-4 text-iv-gold/60" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
