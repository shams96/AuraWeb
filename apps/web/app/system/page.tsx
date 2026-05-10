'use client'

import type { Metadata } from 'next'
import { Shield, Zap, Sparkles, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The System — 4-Tier Age Protocol',
  description: 'The world\'s first 4-tier skincare system aligned to skin metabolism. Genesis (13-19), Foundation (20-29), Regeneration (30-49), Longevity (50+). Precision skincare for every biological stage.',
  openGraph: {
    title: 'The System | Isola Vitale',
    description: 'Four tiers. One lifetime of optimal skin metabolism.',
  },
}

export default function SystemPage() {
  const tiers = [
    {
      id: 'genesis',
      name: 'Tier 1: Genesis',
      age: '13 - 19',
      focus: 'Microbiome Homeostasis & Protection',
      description: 'Adolescent skin requires protection from emerging environmental stress and inflammatory triggers. Genesis focuses on stabilizing the skin barrier and optimizing microbiome balance.',
      tech: ['Bifida 0.30%', 'Ectoin Shield', 'Microbiome Defense'],
      icon: <Shield className="w-8 h-8 text-iv-gold" />
    },
    {
      id: 'foundation',
      name: 'Tier 2: Foundation',
      age: '20 - 29',
      focus: 'Metabolic Support & Prevention',
      description: 'Foundation targets the first signs of cellular slowing. By introducing GLP-1 protective complexes, we prevent early volume loss and maintain long-term structural integrity.',
      tech: ['GLP-1 Protection', 'Bio-Adaptive Elixirs', 'Oxidative Shield'],
      icon: <Zap className="w-8 h-8 text-iv-gold" />
    },
    {
      id: 'regeneration',
      name: 'Tier 3: Regeneration',
      age: '30 - 49',
      focus: 'Cellular Restoration & DWAT',
      description: 'Regeneration is our intervention tier. We utilize DWAT Restoration Science to address volume deflation and OS-01 peptides to clear senescent "zombie" cells.',
      tech: ['DWAT Restoration', 'OS-01 Peptides', 'NMN Support'],
      icon: <Activity className="w-8 h-8 text-iv-gold" />
    },
    {
      id: 'longevity',
      name: 'Tier 4: Longevity',
      age: '50+',
      focus: 'Advanced Mature Structural Renewal',
      description: 'Longevity is the pinnacle of our system. It delivers maximum potency L-Ornithine and peptide complexes to mimic lipofilling and target deep-set chronological wrinkles.',
      tech: ['L-Ornithine 1.50%', 'Deep Collagen Remodeling', 'Intensive Lipid Support'],
      icon: <Sparkles className="w-8 h-8 text-iv-gold" />
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            The World's First 4-Tier Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none">The <span className="text-iv-gold italic serif">System</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed font-light">
            Aligning formulation potency with cellular age. Our tiered approach ensures your skin receives exactly what its metabolism requires at every stage of life.
          </p>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-12">
            {tiers.map((tier, idx) => (
              <div key={tier.id} className="group bg-iv-deep-green/10 border border-iv-gold/10 rounded-3xl overflow-hidden hover:border-iv-gold/30 transition-all duration-700 relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-iv-gold/[0.03] to-transparent pointer-events-none" />
                <div className="p-12 md:p-20 flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-32 h-32 bg-iv-black border border-iv-gold/20 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                    {tier.icon}
                  </div>
                  <div className="flex-1 space-y-8">
                    <div className="flex flex-wrap items-center gap-6">
                      <h2 className="text-4xl md:text-5xl font-bold text-iv-white uppercase tracking-tighter italic serif">{tier.name}</h2>
                      <span className="bg-iv-gold text-iv-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{tier.age} ANNI</span>
                    </div>
                    <p className="text-iv-gold font-black uppercase tracking-[0.3em] text-[10px]">{tier.focus}</p>
                    <p className="text-iv-cream/60 text-lg leading-relaxed font-light max-w-3xl">
                      {tier.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      {tier.tech.map((t, i) => (
                        <span key={i} className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest border border-iv-white/5 px-4 py-2 rounded-full bg-iv-black/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:block text-iv-gold/10 text-[10rem] font-bold absolute right-12 top-1/2 -translate-y-1/2 select-none font-serif italic">
                    0{idx + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progression Section */}
      <section className="py-32 container mx-auto px-4 max-w-5xl text-center">
        <h3 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-12">The Principle of Progression</h3>
        <p className="text-3xl md:text-5xl text-iv-cream/80 italic font-serif leading-[1.2] tracking-tight mb-16">
          "Effective skincare is not about maximum potency; it is about optimal alignment. We treat the skin as a maturing metabolic engine, moving from protection to precision renewal."
        </p>
        <div className="w-24 h-px bg-iv-gold/30 mx-auto" />
      </section>
    </div>
  )
}
