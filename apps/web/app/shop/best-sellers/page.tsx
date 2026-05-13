import { ProductCard } from '@/components/product-card'
import { HERO_SKUS } from '@/lib/products'

export default function BestSellersPage() {
  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero Header */}
      <div className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            The Pinnacle of Performance
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">Best <span className="text-iv-gold italic">Sellers</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light">
            Discover our initial launch phase Hero SKUs. These five essential formulations represent the core of the Isola Vitale system—engineered for metabolic precision and luxury performance.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {HERO_SKUS.map((product) => (
            <div key={product.id} className="space-y-6">
              <ProductCard product={product} />
              <div className="px-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-iv-gold/60 border border-iv-gold/20 px-3 py-1 rounded-full">
                    {product.collection}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/30 border border-iv-white/5 px-3 py-1 rounded-full">
                    {product.volume}
                  </span>
                </div>
                <div className="p-4 bg-iv-deep-green/10 rounded-lg border border-iv-white/5">
                  <p className="text-[10px] font-black text-iv-white/40 uppercase tracking-widest mb-1">Hardware / Finish</p>
                  <p className="text-xs text-iv-cream/60 font-light">{product.finish} • {product.hardware}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Project Brief Info */}
        <div className="mt-32 p-12 bg-iv-deep-green/30 border border-iv-gold/10 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-iv-gold/[0.03] rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-black text-iv-gold mb-6 uppercase tracking-[0.4em]">IV-PKG-RFQ-001 · April 2026</p>
              <h3 className="text-4xl font-bold mb-6 text-iv-white tracking-tighter uppercase tracking-[0.1em]">The Hero SKU <br />Packaging Project</h3>
              <p className="text-iv-cream/60 leading-relaxed font-light text-lg mb-8">
                Isola Vitale expresses quiet, confident luxury. Every surface is intentional, tactile, and premium. Our 2026 Hero SKUs feature airless systems, rPET cartridges, and real Champagne Gold metal components.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-iv-deep-emerald shadow-[0_0_10px_rgba(0,75,73,0.5)]" />
                  <span className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Deep Emerald</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-iv-smoky-charcoal shadow-[0_0_10px_rgba(54,54,54,0.5)]" />
                  <span className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Smoky Charcoal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-iv-cloud-dancer shadow-[0_0_10px_rgba(240,238,233,0.5)]" />
                  <span className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Cloud Dancer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-iv-peach-dust shadow-[0_0_10px_rgba(243,200,182,0.5)]" />
                  <span className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Peach Dust</span>
                </div>
              </div>
            </div>
            <div className="bg-iv-black/40 p-8 rounded-2xl border border-iv-gold/10 backdrop-blur-md">
              <h4 className="text-xs font-black text-iv-white mb-6 uppercase tracking-widest">Commercial Parameters</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-4 h-px bg-iv-gold mt-2.5"></span>
                  <p className="text-sm text-iv-cream/60 font-light"><strong className="text-iv-white">MOQ Target:</strong> 1,000 units per SKU</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-4 h-px bg-iv-gold mt-2.5"></span>
                  <p className="text-sm text-iv-cream/60 font-light"><strong className="text-iv-white">Launch Phase:</strong> Hero SKUs Only (5 SKUs)</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-4 h-px bg-iv-gold mt-2.5"></span>
                  <p className="text-sm text-iv-cream/60 font-light"><strong className="text-iv-white">Timeline:</strong> Samples Q3 2026 · Production Q4 2026</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-4 h-px bg-iv-gold mt-2.5"></span>
                  <p className="text-sm text-iv-cream/60 font-light"><strong className="text-iv-white">Compliance:</strong> EU Cosmetics Regulation compatible</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
