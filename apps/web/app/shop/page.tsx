import type { Metadata } from 'next'
import { ProductCard } from '@/components/product-card'
import { FilterSidebar } from '@/components/shop/filter-sidebar'
import { SortDropdown } from '@/components/shop/sort-dropdown'
import { ALL_PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop All Formulations',
  description: "Discover Isola Vitale's complete collection of clinical-grade, bio-adaptive skincare formulations. Three collections: Laboratory Series, Daily Protocol, and Chronos.",
  openGraph: {
    title: 'Shop All Formulations | Isola Vitale',
    description: 'Clinical-grade bio-adaptive skincare. Three collections engineered for metabolic precision.',
  },
}

const COLLECTION_TITLES: Record<string, string> = {
  laboratory: 'Laboratory Series',
  daily:      'Daily Protocol',
  chronos:    'Chronos Collection',
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tierFilter   = typeof searchParams.tier       === 'string' ? searchParams.tier       : null
  const collFilter   = typeof searchParams.collection === 'string' ? searchParams.collection : null
  const formatFilter = typeof searchParams.format     === 'string' ? searchParams.format     : null

  const products = ALL_PRODUCTS.filter(p => {
    const matchesTier   = !tierFilter   || p.tier       === tierFilter
    const matchesColl   = !collFilter   || p.collection === collFilter
    const matchesFormat = !formatFilter || p.format     === formatFilter
    return matchesTier && matchesColl && matchesFormat
  })

  const pageTitle = collFilter
    ? (COLLECTION_TITLES[collFilter] ?? 'Shop All')
    : 'Shop All'

  const titleWords = pageTitle.split(' ')
  const titleHead  = titleWords.slice(0, -1).join(' ')
  const titleTail  = titleWords[titleWords.length - 1]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Header */}
      <div className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-iv-gold/[0.03] rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none animate-pulse" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            Acquisition Portal
          </div>
          <h1 className="iv-type-display font-bold mb-8 tracking-tighter uppercase leading-none text-iv-white">
            {titleHead && <span>{titleHead} </span>}
            <span className="text-iv-gold italic serif">{titleTail}</span>
          </h1>
          <p className="text-xl text-iv-cream/60 max-w-2xl leading-relaxed font-light font-serif italic">
            Three collections. Eighteen formulations. All engineered for metabolic precision.
          </p>

          {/* Collection pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {Object.entries(COLLECTION_TITLES).map(([key, label]) => (
              <a
                key={key}
                href={collFilter === key ? '/shop' : `/shop?collection=${key}`}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  collFilter === key
                    ? 'bg-iv-gold text-iv-black'
                    : 'border border-iv-gold/20 text-iv-cream/50 hover:border-iv-gold/50 hover:text-iv-cream'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <p className="text-[10px] font-black text-iv-cream/40 uppercase tracking-[0.2em]">
                Showing <span className="text-iv-gold">{products.length}</span> of <span className="text-iv-gold">{ALL_PRODUCTS.length}</span> formulations
              </p>
              <SortDropdown />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 border border-iv-gold/10 rounded-3xl bg-iv-deep-green/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-iv-white mb-4 uppercase tracking-widest italic serif">
                  No Formulations Found
                </h3>
                <p className="text-iv-cream/40 mb-12 font-light max-w-md mx-auto">
                  Try adjusting your filters or exploration parameters.
                </p>
                <a href="/shop" className="text-[10px] font-black uppercase tracking-widest text-iv-gold hover:underline">
                  Clear All Filters
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
