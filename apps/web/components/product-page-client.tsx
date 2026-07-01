'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { Button } from '@/components/ui-lib'
import { Heart, ShoppingCart } from 'lucide-react'
import { ErrorBoundary } from '@/components/error-boundary'
import { ProductHeroSkeleton, BuyBoxSkeleton, StickyFooterCTASkeleton } from '@/components/skeletons/product-skeleton'
import { ProductHero } from '@/components/sections/product-hero'
import { BuyBox } from '@/components/sections/buy-box'
import { ProblemEducationBlock } from '@/components/sections/problem-education'
import { HowItWorks } from '@/components/sections/how-it-works'
import { ScienceIngredients } from '@/components/sections/science-ingredients'
import { UGCSection } from '@/components/sections/ugc'
import { FAQSection } from '@/components/sections/faq'
import { StickyFooterCTA } from '@/components/sections/sticky-footer-cta'

// API Response Types
interface ProductVariant {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  sku: string
  quantity: number
  options?: Record<string, string>
}

interface ProductImage {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
  position: number
}

interface ProductReview {
  id: string
  title: string
  comment: string
  rating: number
  verified: boolean
  approved: boolean
  helpful: number
  createdAt: string
  user?: {
    id: string
    name: string
  }
}

interface ProductTag {
  id: string
  name: string
  slug: string
  color?: string
}

interface ProductCategory {
  id: string
  name: string
  slug: string
}

interface APIProduct {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  currency: string
  sku: string
  barcode?: string
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED'
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  metaKeywords?: string
  metaTitle?: string
  
  // Relations
  variants: ProductVariant[]
  categories: ProductCategory[]
  tags: ProductTag[]
  images: ProductImage[]
  reviews: ProductReview[]
  
  // Custom fields for our PDP
  primaryProblem?: string
  desiredOutcome?: string
  format?: string
  audience?: string
  scienceMechanism?: string
  useCases?: string[]
  
  // Timestamps
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// Transform API response to our component interface
interface Product {
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
  sku: string
  variants: Array<{
    id: string
    name: string
    price: number
    compareAtPrice?: number
  }>
  images: ProductImage[]
}

function transformProduct(apiProduct: APIProduct): Product {
  // Calculate rating from reviews
  const totalRating = apiProduct.reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = apiProduct.reviews.length > 0 ? totalRating / apiProduct.reviews.length : 0
  
  // Get primary image
  const primaryImage = apiProduct.images.find(img => img.position === 0) || apiProduct.images[0]
  
  // Generate badges from tags
  const badges = apiProduct.tags.map(tag => tag.name)
  
  // Use custom fields or fallback to defaults
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    tagline: apiProduct.shortDescription || apiProduct.name,
    description: apiProduct.description,
    price: Number(apiProduct.price),
    currency: apiProduct.currency || 'USD',
    image: primaryImage?.url || '/images/product-placeholder.jpg',
    videoUrl: '', // Would need to be stored separately in the API
    primaryProblem: apiProduct.primaryProblem || 'skin concerns',
    desiredOutcome: apiProduct.desiredOutcome || 'healthier skin',
    format: apiProduct.format || 'standard size',
    audience: apiProduct.audience || 'all skin types',
    scienceMechanism: apiProduct.scienceMechanism || 'advanced formula',
    useCases: apiProduct.useCases || [
      'Improves skin appearance',
      'Enhances skin health',
      'Provides visible results'
    ],
    rating: parseFloat(averageRating.toFixed(1)),
    reviewCount: apiProduct.reviews.length,
    badges,
    sku: apiProduct.sku,
    variants: apiProduct.variants.map(variant => ({
      id: variant.id,
      name: variant.name,
      price: Number(variant.price),
      compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice) : undefined
    })),
    images: apiProduct.images
  }
}

interface ProductPageClientProps {
  productId: string
}

import { ALL_PRODUCTS } from '@/lib/products'

export function ProductPageClient({ productId }: ProductPageClientProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to find in local library first for immediate high-fidelity data
        const localProduct = ALL_PRODUCTS.find(p => p.id === productId)
        
        if (localProduct) {
          // Transform local product to match the component's Product interface
          const transformed: Product = {
            id: localProduct.id,
            name: localProduct.name,
            tagline: localProduct.tagline || localProduct.name,
            description: localProduct.description,
            price: localProduct.price,
            currency: 'EUR',
            image: localProduct.image,
            primaryProblem: localProduct.primaryProblem || 'Cellular Senescence',
            desiredOutcome: localProduct.desiredOutcome || 'Metabolic Alignment',
            format: localProduct.format || 'Standard Volume',
            audience: localProduct.audience || 'Research-Driven Consumers',
            scienceMechanism: localProduct.scienceMechanism || 'Skin Intelligence™',
            useCases: localProduct.useCases || ['Morning Protocol', 'Evening Protocol'],
            rating: localProduct.rating,
            reviewCount: localProduct.reviewCount,
            badges: localProduct.tags,
            sku: localProduct.id,
            variants: localProduct.variants || [{ id: localProduct.id, name: 'Standard', price: localProduct.price }],
            images: [{ id: '1', url: localProduct.image, position: 0 }]
          }
          setProduct(transformed)
          setSelectedVariant(transformed.variants[0]?.id || null)
          setLoading(false)
          return
        }

        // Fallback to API if not found in local library
        const response = await fetch(`/api/products/${productId}`)
        if (!response.ok) throw new Error('Product not found')
        const apiProduct: APIProduct = await response.json()
        const transformedProduct = transformProduct(apiProduct)
        setProduct(transformedProduct)
        if (transformedProduct.variants.length > 0) {
          setSelectedVariant(transformedProduct.variants[0].id)
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [productId])

  const handleAddToCart = (quantity: number = 1) => {
    if (!product || !selectedVariant) return
    
    const variant = product.variants.find(v => v.id === selectedVariant)
    if (!variant) return
    
    addItem({
      name: `${product.name} - ${variant.name}`,
      price: variant.price,
      basePrice: variant.price,
      currency: product.currency,
      quantity,
      image: product.image,
      sku: variant.id,
    })
  }

  const handleWishlistToggle = () => {
    if (!product) return
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        sku: product.sku
      })
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-iv-black">
        <ProductHeroSkeleton />
        <BuyBoxSkeleton />
        <StickyFooterCTASkeleton />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-iv-black p-8 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-iv-white mb-6 uppercase tracking-widest italic serif">Product Not Found</h1>
          <p className="text-iv-cream/65 mb-10 font-light">The formulation you are seeking has either been archived or is undergoing clinical re-stabilization.</p>
          <Button 
            className="bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-xs uppercase tracking-widest px-12 py-6 rounded-none"
            onClick={() => window.history.back()}
          >
            Return to Collection
          </Button>
        </div>
      </div>
    )
  }

  const buyBullets = [
    'Stabilized in Isola del Liri, Italy',
    'Clinically-validated 2026 formulations',
    '85% reduced plastic rPET system',
    '30-day clinical satisfaction guarantee'
  ]

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', backgroundColor: '#060C09' }}>
        <main style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>
          {/* Hero Section */}
          <ProductHero product={product} />
          
          {/* Buy Box */}
          <div id="buy-box">
            <BuyBox 
              product={product}
              selectedVariant={selectedVariant}
              buyBullets={buyBullets}
            />
          </div>
          
          {/* Problem/Education Block */}
          <ProblemEducationBlock 
            problem={product.primaryProblem}
            context={[
              'Modern lifestyles expose skin to unprecedented stress',
              'Environmental factors trigger sensitivity',
              'Traditional solutions often over-treat',
              'Skin needs adaptive, intelligent care'
            ]}
          />
          
          {/* How It Works */}
          <HowItWorks 
            steps={[
              {
                title: 'Adapt',
                description: 'Serum instantly responds to your skin\'s current state',
                icon: '🔄'
              },
              {
                title: 'Balance',
                description: 'Calms irritation and strengthens natural defenses',
                icon: '⚖️'
              },
              {
                title: 'Protect',
                description: 'Creates adaptive shield against environmental stressors',
                icon: '🛡️'
              }
            ]}
            timeline={[
              { week: 'Week 1-2', result: 'Immediate calming effect' },
              { week: 'Week 3-4', result: 'Reduced sensitivity' },
              { week: 'Week 5-8', result: 'Stronger, more resilient skin' }
            ]}
          />
          
          {/* Science/Ingredients */}
          <ScienceIngredients 
            keyIngredients={[
              {
                name: 'Vitale Resilience Complex™',
                description: 'Proprietary complex tending to all four sources of skin vitality — the energy to renew, the living barrier, the power to protect, and firmness and structure.',
                benefits: ['Living barrier support', 'Oxidative defence', 'Structural vitality'],
                concentration: '5%'
              },
              {
                name: 'Squalane',
                description: 'Nourishing lipid that mimics skin\'s natural oils',
                benefits: ['Deep hydration', 'Non-comedogenic', 'Suitable for sensitive skin'],
                concentration: '3%'
              },
              {
                name: 'Bisabolol',
                description: 'Natural anti-inflammatory from chamomile',
                benefits: ['Soothes irritation', 'Reduces redness', 'Calms sensitive skin'],
                concentration: '2%'
              }
            ]}
            mechanism={product.scienceMechanism}
          />
          
          {/* UGC + Before/After */}
          <UGCSection 
            testimonials={[
              {
                name: 'Valentina R.',
                role: 'Milan',
                content: 'My skin has not felt this resilient in years. The texture change after week four was remarkable — everything else I was using finally started working the way it should.',
                image: '/images/testimonial-sarah.jpg',
                beforeImage: '/images/before-sarah.jpg',
                afterImage: '/images/after-sarah.jpg',
                timeframe: '8 weeks'
              },
              {
                name: 'James T.',
                role: 'London',
                content: 'I travel constantly between time zones. My skin used to show every flight. Now it recovers in a day. I did not expect a skincare product to change that.',
                image: '/images/testimonial-james.jpg',
                beforeImage: '/images/before-james.jpg',
                afterImage: '/images/after-james.jpg',
                timeframe: '6 weeks'
              }
            ]}
          />
          
          {/* FAQ Section */}
          <FAQSection 
            faqs={[
              {
                question: 'How long does it take to see results?',
                answer: 'Most users see visible improvement in redness and sensitivity within 2-4 weeks. Optimal results are achieved after 8 weeks of consistent use.'
              },
              {
                question: 'Is this suitable for all skin types?',
                answer: 'Yes. Our formulations work with the four sources of vitality that govern skin health, whatever your skin type — including sensitive and reactive skin.'
              },
              {
                question: 'Can I use this with other skincare products?',
                answer: 'Absolutely. It works well with other products in your routine. Apply after cleansing and before moisturizing.'
              },
              {
                question: 'Is it tested on animals?',
                answer: 'No, we are proudly cruelty-free and certified by Leaping Bunny. We never test on animals.'
              }
            ]}
          />
        </main>
        
        {/* Sticky Footer CTA */}
        <StickyFooterCTA 
          product={product}
          selectedVariant={selectedVariant}
          onAddToCart={handleAddToCart}
          offerText='Free shipping on orders over $50'
        />
      </div>
    </ErrorBoundary>
  )
}
