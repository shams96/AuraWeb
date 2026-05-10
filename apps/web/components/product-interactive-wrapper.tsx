'use client'

import { ProductHero } from './sections/product-hero'
import { StickyFooterCTA } from './sections/sticky-footer-cta'

interface ProductInteractiveWrapperProps {
  product: {
    id: string
    name: string
    tagline: string
    description: string
    price: number
    currency: string
    image: string
    videoUrl?: string
    primaryProblem: string
    desiredOutcome: string
    format: string
    audience: string
    scienceMechanism: string
    useCases: string[]
    rating: number
    reviewCount: number
    badges: string[]
    images?: Array<{
      id: string
      url: string
      alt?: string
      width?: number
      height?: number
      position: number
    }>
  }
  selectedVariant?: string | null
  onAddToCart?: (quantity: number) => void
  offerText: string
}

export function ProductInteractiveWrapper({ 
  product, 
  selectedVariant, 
  onAddToCart, 
  offerText 
}: ProductInteractiveWrapperProps) {
  return (
    <>
      <ProductHero product={product} />
      <StickyFooterCTA 
        product={product}
        selectedVariant={selectedVariant}
        onAddToCart={onAddToCart}
        offerText={offerText}
      />
    </>
  )
}
