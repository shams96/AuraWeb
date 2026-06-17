'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui-lib'
import { useCart } from '@/lib/cart-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PackagingVisual } from '@/components/packaging-visual'
import type { Product } from '@/lib/products'

// The card accepts the full Product type so PackagingVisual has what it needs,
// but also works with a legacy partial shape for backwards compatibility.
interface ProductCardProps {
  product: Product & { compareAtPrice?: number }
}

const PLACEHOLDER_IMAGES = new Set([
  '/images/products/isola_collection.png',
  '/images/products/isola_serum.png',
])

const COLLECTION_LABEL: Record<string, string> = {
  laboratory: 'Laboratory Series',
  daily:      'Daily Protocol',
  chronos:    'Chronos Collection',
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setCartOpen } = useCart()
  const { data: session } = useSession()
  const router = useRouter()

  const isClinical  = product.tier === 'clinical'
  const isLockedB2B = isClinical && !session
  const useCSSVisual = PLACEHOLDER_IMAGES.has(product.image)

  const discountPct = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  function handleOneTimeAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      name: product.name,
      price: product.price,
      basePrice: product.price,
      currency: 'USD',
      quantity: 1,
      image: product.image,
      sku: product.id,
      isSubscription: false,
    })
    setCartOpen(true)
  }

  function handleSubscribeAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      name: product.name,
      price: Math.round(product.price * 0.8),
      basePrice: product.price,
      currency: 'USD',
      quantity: 1,
      image: product.image,
      sku: `${product.id}-sub`,
      isSubscription: true,
    })
    setCartOpen(true)
  }

  const collectionLabel = product.collection
    ? (COLLECTION_LABEL[product.collection] ?? 'Essential Collection')
    : (isClinical ? 'Laboratory Series' : 'Essential Collection')

  return (
    <div
      className="product-card iv-hover-lift group rounded-2xl overflow-hidden transition-all duration-500 relative"
      style={{ background: '#F4EAE2', border: '1px solid rgba(145,56,50,0.12)' }}
      data-reveal="iv-scale-in"
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(145,56,50,0.30)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(145,56,50,0.12)')}
    >
      {/* Product visual */}
      <div className="relative aspect-[4/5] overflow-hidden" style={{ background: '#EDE8E0' }}>
        {useCSSVisual ? (
          <PackagingVisual product={product} className="absolute inset-0" />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-iv-gold/90 text-iv-black text-[10px] font-black uppercase tracking-[0.2em] rounded-sm backdrop-blur-md z-10">
            {product.badge}
          </div>
        )}

        {/* Grade label */}
        <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded-sm backdrop-blur-md" style={{ border: '1px solid rgba(145,56,50,0.25)', background: 'rgba(253,250,245,0.85)' }}>
          <p className="text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: '#7A5C4E' }}>
            {isClinical ? 'Clinical Grade' : 'Laboratory Grade'}
          </p>
        </div>

        {/* Quick-add overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8 backdrop-blur-md z-20" style={{ background: 'rgba(26,22,20,0.55)' }}>
          {isLockedB2B ? (
            <Button
              size="lg"
              className="w-full bg-iv-gold text-iv-black hover:bg-iv-gold-light rounded-none text-[10px] font-black uppercase tracking-[0.3em] py-8 shadow-2xl transition-all duration-500"
              onClick={(e) => { e.preventDefault(); router.push('/login') }}
            >
              Access Required
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full bg-iv-gold text-iv-black hover:bg-iv-gold-light rounded-none text-[10px] font-black uppercase tracking-[0.3em] py-8 shadow-2xl transition-all duration-500 scale-90 group-hover:scale-100"
              onClick={handleOneTimeAdd}
            >
              Acquire Now
            </Button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#913832', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
            {collectionLabel}
          </span>
          <div className="flex gap-2">
            {product.tags.slice(0, 1).map((tag) => (
              <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 700, color: '#7A5C4E', textTransform: 'uppercase', letterSpacing: '0.14em', border: '1px solid rgba(145,56,50,0.14)', padding: '1px 8px', borderRadius: 4 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 tracking-tighter leading-tight line-clamp-2" style={{ color: '#1A1614', height: '3.5rem' }}>
          <Link href={`/products/${product.id}`} className="hover:text-iv-gold transition-colors italic" style={{ fontFamily: 'var(--iv-font-serif)' }}>
            {product.name}
          </Link>
        </h3>

        {product.volume && (
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#7A5C4E', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>{product.volume}</p>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3"
                style={{ color: i < Math.floor(product.rating) ? '#913832' : 'rgba(145,56,50,0.18)', fill: i < Math.floor(product.rating) ? '#913832' : 'none' }}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#7A5C4E', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
            {product.reviewCount} Verified
          </span>
        </div>

        <div>
          {isLockedB2B ? (
            <div style={{ padding: '12px', background: 'rgba(145,56,50,0.06)', borderRadius: 8, border: '1px solid rgba(145,56,50,0.12)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#913832', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Professional Tier</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: discountPct > 0 ? '#913832' : '#7A5C4E', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                  {discountPct > 0 ? `${discountPct}% off` : 'One-Time'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {product.compareAtPrice && (
                    <span style={{ fontSize: '0.85rem', color: '#7A5C4E', textDecoration: 'line-through' }}>${product.compareAtPrice}</span>
                  )}
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1614' }}>${product.price}</span>
                </div>
              </div>

              <button
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 14px', background: 'rgba(145,56,50,0.07)', borderRadius: 8,
                  border: '1px solid rgba(145,56,50,0.18)', cursor: 'pointer', transition: 'all 0.15s',
                }}
                onClick={handleSubscribeAdd}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(145,56,50,0.13)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(145,56,50,0.07)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#913832', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 900 }}>
                    ∞
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#913832', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Subscribe</p>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#7A5C4E', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Save 20%</p>
                  </div>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#913832' }}>${Math.round(product.price * 0.8)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
