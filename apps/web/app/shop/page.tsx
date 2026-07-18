import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ProductCard } from '@/components/product-card'
import { FilterSidebar } from '@/components/shop/filter-sidebar'
import { SortDropdown } from '@/components/shop/sort-dropdown'
import { getProducts } from '@/lib/product-store'
import Link from 'next/link'
import { FlaskConical } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Collections — Chiarel',
  description: "Eighteen formulations. Four protocols. One Skin Intelligence™ system. Each formulation is assigned to a biological stage — not an age.",
  openGraph: {
    title: 'The Collections | Chiarel',
    description: 'Eighteen formulations matched to your biology, not your birthdate. Find your protocol.',
  },
}

const COLLECTION_TITLES: Record<string, string> = {
  laboratory: 'Laboratory Series',
  daily:      'Daily Protocol',
  chronos:    'Chronos Collection',
}

const B2B_ROLES = new Set(['PROFESSIONAL', 'ADMIN', 'OWNER'])

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session      = await getServerSession(authOptions)
  const userRole     = (session?.user as { role?: string })?.role ?? 'GUEST'
  const canSeeClinical = B2B_ROLES.has(userRole)

  const tierFilter   = typeof searchParams.tier       === 'string' ? searchParams.tier       : null
  const collFilter   = typeof searchParams.collection === 'string' ? searchParams.collection : null
  const formatFilter = typeof searchParams.format     === 'string' ? searchParams.format     : null

  const allProducts = getProducts()

  // Clinical tier products: always include in list so we can show teasers,
  // but flag them so the card renders gated for non-professional users
  const products = allProducts.filter(p => {
    const matchesTier = !tierFilter || (
      tierFilter === 'best-seller' ? p.isBestSeller === true :
      tierFilter === 'consumer'   ? p.collection === 'daily' && !p.isBestSeller :
      p.tier === tierFilter
    )
    const matchesColl   = !collFilter   || p.collection === collFilter
    const matchesFormat = !formatFilter || p.format     === formatFilter
    // Hide clinical products from filter results unless user can see them
    if (p.tier === 'clinical' && !canSeeClinical) return false
    return matchesTier && matchesColl && matchesFormat
  })

  // Include clinical teasers separately when no tier filter or clinical filter
  const clinicalProducts = (!tierFilter || tierFilter === 'clinical') && !canSeeClinical
    ? allProducts.filter(p => p.tier === 'clinical').slice(0, 3)
    : []

  const pageTitle = collFilter
    ? (COLLECTION_TITLES[collFilter] ?? 'The Collections')
    : 'The Collections'

  const titleWords = pageTitle.split(' ')
  const titleHead  = titleWords.slice(0, -1).join(' ')
  const titleTail  = titleWords[titleWords.length - 1]

  return (
    <div className="min-h-screen pb-32" style={{ background: '#FDFAF5' }}>

      {/* Hero header */}
      <div className="iv-dark border-b pt-32 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #004B37 0%, #1A1614 100%)', borderColor: 'rgba(184,151,47,0.10)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(184,151,47,0.04) 0%, transparent 60%)' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" style={{ background: 'rgba(184,151,47,0.05)' }} />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            Skin Intelligence™
          </div>
          <h1 className="iv-type-display font-bold mb-6 tracking-tighter uppercase leading-none text-iv-white">
            {titleHead && <span>{titleHead} </span>}
            <span className="text-iv-gold italic serif">{titleTail}</span>
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed font-light mb-4" style={{ color: 'rgba(250,247,240,0.90)' }}>
            Eighteen formulations. Four protocols. One Skin Intelligence™ system.
          </p>
          <p className="text-sm max-w-xl leading-relaxed font-light mb-10 italic" style={{ color: 'rgba(250,247,240,0.75)' }}>
            Each formulation is assigned to a biological stage — not an age. Find yours.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Collection pills */}
            {Object.entries(COLLECTION_TITLES).map(([key, label]) => (
              <a
                key={key}
                href={collFilter === key ? '/shop' : `/shop?collection=${key}`}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  collFilter === key
                    ? 'bg-iv-gold text-iv-black'
                    : 'border border-iv-gold/30 hover:border-iv-gold/60 hover:text-iv-cream'
                }`}
                style={collFilter !== key ? { color: 'rgba(250,247,240,0.82)' } : {}}
              >
                {label}
              </a>
            ))}
            {/* Skin consultation CTA */}
            <Link
              href="/#skin-scan"
              className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-iv-gold/40 text-iv-gold hover:bg-iv-gold hover:text-iv-black transition-all"
            >
              Discover your protocol →
            </Link>
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
              <p className="text-[10px] font-black text-iv-cream/70 uppercase tracking-[0.2em]">
                <span className="text-iv-gold">{products.length}</span> formulation{products.length !== 1 ? 's' : ''} in this protocol
              </p>
              <SortDropdown />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 border border-iv-gold/10 rounded-3xl bg-iv-deep-green/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-iv-white mb-4 uppercase tracking-widest italic serif">
                  No formulations match this selection
                </h3>
                <p className="text-iv-cream/65 mb-12 font-light max-w-md mx-auto">
                  Explore all collections or discover your protocol through our skin consultation.
                </p>
                <div className="flex items-center justify-center gap-6">
                  <a href="/shop" className="text-[10px] font-black uppercase tracking-widest text-iv-gold hover:underline">
                    View All Formulations
                  </a>
                  <span className="text-iv-gold/20">·</span>
                  <Link href="/#skin-scan" className="text-[10px] font-black uppercase tracking-widest text-iv-cream/70 hover:text-iv-gold transition-colors">
                    Discover Your Protocol
                  </Link>
                </div>
              </div>
            )}

            {/* Clinical A-Series teaser for non-professional users */}
            {clinicalProducts.length > 0 && (
              <div className="mt-24 rounded-3xl border border-iv-gold/10 overflow-hidden">
                <div className="bg-iv-deep-green/40 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-5 h-5 text-iv-gold" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-iv-gold">Clinical A-Series</p>
                      <p className="text-sm text-iv-cream/65 font-light mt-0.5">Available exclusively to verified practitioners</p>
                    </div>
                  </div>
                  <Link
                    href="/register/professional"
                    className="flex-shrink-0 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-iv-gold/30 text-iv-gold hover:bg-iv-gold hover:text-iv-black transition-all"
                  >
                    Apply for Professional Access →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-iv-gold/5">
                  {clinicalProducts.map(product => (
                    <div key={product.id} className="p-6 relative">
                      {/* Blurred product preview */}
                      <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative bg-iv-deep-green/20">
                        <div className="absolute inset-0 backdrop-blur-md z-10 flex items-center justify-center">
                          <div className="text-center">
                            <FlaskConical className="w-6 h-6 text-iv-gold/60 mx-auto mb-2" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-iv-cream/65">Practitioner Only</p>
                          </div>
                        </div>
                        {product.image && (
                          <img src={product.image} alt="" className="w-full h-full object-cover opacity-30" aria-hidden />
                        )}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-iv-gold mb-1">A-Series Clinical</p>
                      <p className="text-sm font-semibold text-iv-white/60 italic">{product.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
