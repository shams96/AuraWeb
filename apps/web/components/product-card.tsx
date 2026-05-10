"use client"

import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@aurabiosphere/ui'

interface Product {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  image: string
  badge?: string
  rating: number
  reviewCount: number
  tags: string[]
  tier?: string
}

import { useCart } from '@/lib/cart-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setCartOpen } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const isClinical = product.tier === 'clinical'
  const isLockedB2B = isClinical && !session

  const handleOneTimeAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      name: product.name,
      price: product.price,
      currency: 'EUR',
      quantity: 1,
      image: product.image,
      sku: product.id,
      isSubscription: false
    })
    setCartOpen(true)
  }

  const handleSubscribeAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      name: product.name,
      price: Math.round(product.price * 0.8),
      currency: 'EUR',
      quantity: 1,
      image: product.image,
      sku: `${product.id}-sub`,
      isSubscription: true
    })
    setCartOpen(true)
  }

  return (
    <div className="product-card group bg-iv-deep-green/10 rounded-2xl border border-iv-gold/10 overflow-hidden hover:border-iv-gold/30 transition-all duration-500 shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-iv-gold/[0.03] to-transparent pointer-events-none" />
      
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-iv-black/40">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-iv-gold/90 text-iv-black text-[10px] font-black uppercase tracking-[0.2em] rounded-sm backdrop-blur-md">
            {product.badge}
          </div>
        )}

        {/* Grade Label */}
        <div className="absolute top-4 right-4 z-10 px-2 py-0.5 border border-iv-white/20 rounded-sm backdrop-blur-md">
          <p className="text-[7px] font-black text-iv-white/60 uppercase tracking-[0.2em]">Laboratory Grade</p>
        </div>

        {/* Quick Add Button Overlay */}
        <div className="absolute inset-0 bg-iv-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8 backdrop-blur-md">
          {isLockedB2B ? (
            <Button 
              size="lg" 
              className="w-full bg-iv-gold text-iv-black hover:bg-iv-gold-light rounded-none text-[10px] font-black uppercase tracking-[0.3em] py-8 shadow-2xl transition-all duration-500"
              onClick={(e) => { e.preventDefault(); router.push('/login'); }}
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

      {/* Product Info */}
      <div className="p-8">
        {/* Collection / Tags */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em]">{product.tier === 'clinical' ? 'Clinical Series' : product.tier === 'best-seller' ? 'Best Seller' : 'Essential Collection'}</span>
          <div className="flex gap-2">
            {product.tags.slice(0, 1).map((tag, index) => (
              <span key={index} className="text-[9px] font-black text-iv-cream/30 uppercase tracking-widest border border-iv-white/5 px-2 py-0.5 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-iv-white mb-4 tracking-tighter leading-tight line-clamp-2 h-14">
          <Link 
            href={`/products/${product.id}`}
            className="hover:text-iv-gold transition-colors italic serif"
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-iv-gold fill-current' 
                    : 'text-iv-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-black text-iv-cream/30 uppercase tracking-widest">
             {product.reviewCount} Verified
          </span>
        </div>

        {/* Price & Subscribe / B2B Gating */}
        <div className="space-y-4">
          {isLockedB2B ? (
            <div className="p-4 bg-iv-gold/5 rounded-lg border border-iv-gold/10 text-center">
              <span className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Professional Tier</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Acquisition</span>
                <span className="text-lg font-bold text-iv-white tracking-tighter">${product.price}</span>
              </div>
              
              <button 
                className="w-full flex justify-between items-center p-4 bg-iv-gold/10 rounded-lg border border-iv-gold/20 hover:bg-iv-gold/20 transition-all group/sub"
                onClick={handleSubscribeAdd}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-iv-gold flex items-center justify-center text-iv-black text-xs font-black group-hover/sub:scale-110 transition-transform">
                    ∞
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Subscribe</p>
                    <p className="text-[9px] text-iv-gold/60 uppercase tracking-widest font-black">Save 20%</p>
                  </div>
                </div>
                <span className="text-sm font-black text-iv-gold tracking-tighter">${Math.round(product.price * 0.8)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
