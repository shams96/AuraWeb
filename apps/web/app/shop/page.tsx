import { ProductCard } from '@/components/product-card'
import { FilterSidebar } from '@/components/shop/filter-sidebar'
import { SortDropdown } from '@/components/shop/sort-dropdown'

import { ALL_PRODUCTS } from '@/lib/products'


export default function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tierFilter = typeof searchParams.tier === 'string' ? searchParams.tier : null
  const collection = typeof searchParams.collection === 'string' ? searchParams.collection : null
  
  const products = ALL_PRODUCTS.filter(p => {
    const matchesTier = !tierFilter || p.tier === tierFilter
    const matchesCollection = !collection || 
      (collection === 'new-arrivals' && p.isNew) ||
      (collection === 'bundles' && p.category === 'Bundles') ||
      (collection === 'best-sellers' && p.isBestSeller)
    return matchesTier && matchesCollection
  })

  const getTitle = () => {
    if (collection === 'new-arrivals') return 'New Arrivals'
    if (collection === 'bundles') return 'Clinical Bundles'
    if (collection === 'best-sellers') return 'Best Sellers'
    return 'Shop All'
  }

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Header */}
      <div className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-iv-gold/[0.03] rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none animate-pulse" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Acquisition Portal </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none text-iv-white">
            {getTitle().split(' ').slice(0, -1).join(' ')} <span className="text-iv-gold italic serif">{getTitle().split(' ').pop()}</span>
          </h1>
          <p className="text-xl text-iv-cream/60 max-w-2xl leading-relaxed font-light font-serif italic">
            Discover our collection of clinical-grade formulations, stabilized for maximum biological efficacy.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="flex items-center gap-6">
                <p className="text-[10px] font-black text-iv-cream/40 uppercase tracking-[0.2em]">
                  Showing <span className="text-iv-gold">{products.length}</span> of <span className="text-iv-gold">{ALL_PRODUCTS.length}</span> formulations
                </p>
              </div>
              <SortDropdown />
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 border border-iv-gold/10 rounded-3xl bg-iv-deep-green/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-iv-white mb-4 uppercase tracking-widest italic serif">No Formulations Found</h3>
                <p className="text-iv-cream/40 mb-12 font-light max-w-md mx-auto">Try adjusting your filters or exploration parameters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
