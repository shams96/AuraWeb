
import type { Metadata } from 'next'
import { Leaf, Recycle, Wind, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sustainability',
  description: 'Our commitment to the planet: refillable packaging, carbon-neutral manufacturing at Natural You Srl, cruelty-free formulations, and responsible ingredient sourcing.',
  openGraph: {
    title: 'Sustainability | Chiarelle',
    description: 'Luxury without compromise. Our environmental commitments explained.',
  },
}

export default function SustainabilityPage() {
  const pillars = [
    {
      name: 'Refillable rPET Systems',
      icon: <Recycle className="w-8 h-8 text-iv-gold" />,
      description: 'Our 2026 Hero SKUs utilize an advanced rPET cartridge system. This reduces plastic waste by 85% after the initial acquisition of the premium outer glass vessel.',
      detail: 'Infinite reuse of the obsidian and emerald outer housing.'
    },
    {
      name: 'Sustainable Sourcing',
      icon: <Leaf className="w-8 h-8 text-iv-gold" />,
      description: 'In partnership with Natural You Srl, we prioritize botanical ingredients sourced from regenerative farms in the Lazio region of Italy, minimizing the carbon footprint of raw materials.',
      detail: 'Isola del Liri manufacturing limits trans-continental transit of intermediates.'
    },
    {
      name: 'Circular Logistics',
      icon: <Wind className="w-8 h-8 text-iv-gold" />,
      description: 'We utilize carbon-neutral shipping partners and 100% recyclable secondary packaging (FSC-certified paper with vegetable-based inks).',
      detail: 'Zero-plastic secondary boxing policy.'
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            The Circular Authority
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">Vital <span className="text-iv-gold italic">Ecology</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed font-light">
            Luxury is not a license for waste. We believe in the longevity of the planet as much as the longevity of the skin.
          </p>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="p-12 bg-iv-deep-green/10 border border-iv-gold/10 rounded-3xl hover:border-iv-gold/30 transition-all group backdrop-blur-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-iv-gold/[0.03] rounded-full blur-2xl pointer-events-none"></div>
                <div className="mb-10 p-4 bg-iv-black/40 rounded-xl inline-block border border-iv-gold/10 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h2 className="text-2xl font-bold text-iv-white mb-6 uppercase tracking-tight italic leading-tight">
                  {pillar.name}
                </h2>
                <p className="text-iv-cream/60 mb-10 text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
                <div className="pt-6 border-t border-iv-white/5">
                  <p className="text-iv-gold font-bold text-xs uppercase tracking-widest">{pillar.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-32 container mx-auto px-4 max-w-5xl text-center">
        <h3 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-12">Our Commitment</h3>
        <p className="text-3xl md:text-5xl text-iv-cream/80 italic iv-serif leading-[1.2] tracking-tight mb-16">
          "By 2027, 100% of our retail catalog will transition to the refillable cartridge system, eliminating 24 tons of virgin plastic from the luxury skincare cycle."
        </p>
        <div className="w-24 h-px bg-iv-gold/30 mx-auto" />
      </section>
    </div>
  )
}
