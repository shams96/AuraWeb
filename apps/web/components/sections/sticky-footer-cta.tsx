'use client'

import { useState, useEffect } from 'react'
import { Button } from '@isolavitale/ui'


interface Product {
  id: string
  name: string
  price: number
  currency: string
  image: string
  variants?: Array<{
    id: string
    name: string
    price: number
    compareAtPrice?: number
  }>
}

interface StickyFooterCTAProps {
  product: Product
  selectedVariant?: string | null
  onAddToCart?: (quantity: number) => void
  offerText: string
}

export function StickyFooterCTA({ product, selectedVariant, onAddToCart, offerText }: StickyFooterCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setIsVisible(scrollRatio > 0.60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentVariant = product.variants?.find(v => v.id === selectedVariant) || product.variants?.[0] || { price: product.price }
  const displayPrice = currentVariant.price

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-in slide-in-from-bottom duration-500">
      <div className="bg-iv-black/95 border-t border-iv-gold/30 backdrop-blur-xl shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Product info */}
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-lg border border-iv-gold/20 flex-shrink-0 bg-iv-deep-green/30 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-iv-gold/5 group-hover:bg-iv-gold/10 transition-colors" />
              <span className="text-xl text-iv-gold relative z-10 iv-serif italic">iv</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.2em] mb-1">Acquiring Now</p>
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-iv-white tracking-tight">{product.name}</p>
                <span className="w-1 h-1 rounded-full bg-iv-gold/30" />
                <p className="text-sm font-black text-iv-gold tracking-tighter">${displayPrice}</p>
              </div>
            </div>
          </div>

          {/* CTA + Dismiss */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-[10px] font-black text-iv-cream/65 uppercase tracking-widest">{offerText}</p>
            <Button
              size="lg"
              className="bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-[10px] uppercase tracking-[0.2em] px-10 py-6 rounded-none shadow-xl transition-all"
              onClick={() => { if (onAddToCart) onAddToCart(1) }}
            >
              Add to Cart
            </Button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 text-iv-cream/65 hover:text-iv-gold transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
