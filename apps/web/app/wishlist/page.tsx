'use client'

import { useWishlist } from '@/lib/wishlist-context'
import { ProductCard } from '@/components/product-card'
import { ALL_PRODUCTS } from '@/lib/products'
import Link from 'next/link'
import { Button } from '@/components/ui-lib'

export default function WishlistPage() {
  const { state: { items } } = useWishlist()
  
  // Find full product details for each item in wishlist
  const wishlistProducts = items.map(item => 
    ALL_PRODUCTS.find(p => p.id === item.id)
  ).filter(Boolean) as any[]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Header */}
      <div className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            Your Private Collection
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">The <span className="text-iv-gold italic">Wishlist</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light">
            Formulations curated for your metabolic profile. Waiting until you're ready to begin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-7xl">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-iv-gold/10 rounded-3xl bg-iv-deep-green/5 backdrop-blur-sm">
            <div className="mb-8 opacity-20">
              <svg className="w-24 h-24 mx-auto text-iv-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-iv-white mb-4 uppercase tracking-widest">Nothing Saved Yet</h3>
            <p className="text-iv-cream/65 mb-12 font-light max-w-md mx-auto">
              Your wishlist is currently empty. Explore our scientific formulations and build your ideal routine.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-xs uppercase tracking-widest px-12 py-8 rounded-none">
                Explore Formulations
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
