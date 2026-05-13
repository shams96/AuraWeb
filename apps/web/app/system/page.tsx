
import type { Metadata } from 'next'
import { Shield, Zap, Sparkles, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The System — Precision Biological Protocols',
  description: 'Four protocols engineered to match your skin\'s biological stage. Preservation · Refinement · Restoration · Longevity. Assigned by skin analysis, not by birthdate.',
  openGraph: {
    title: 'The System | Isola Vitale',
    description: 'Four protocols. One lifetime of precision skin metabolism.',
  },
}

export default function SystemPage() {
  const tiers = [
    {
      id: 'preservation',
      name: 'Preservation Protocol',
      focus: 'Barrier Integrity & Microbiome Defence',
      description: 'The Preservation Protocol\'s mission is protection. It fortifies the microbiome barrier, establishes the daily metabolic ritual, and intercepts the environmental damage that accumulates invisibly — before it ever becomes visible on the surface.',
      tech: ['Bifida 0.30%', 'Ectoin Shield', 'Microbiome Defense'],
      icon: <Shield className="w-8 h-8 text-iv-gold" />,
    },
    {
      id: 'refinement',
      name: 'Refinement Protocol',
      focus: 'Metabolic Support & Early Intervention',
      description: 'The Refinement Protocol introduces clinically active compounds at the precise moment when cellular turnover begins to slow. GLP-1 protective complexes prevent early volume loss and maintain long-term structural integrity while the intervention window is widest.',
      tech: ['GLP-1 Protection', 'Bio-Adaptive Elixirs', 'Oxidative Shield'],
      icon: <Zap className="w-8 h-8 text-iv-gold" />,
    },
    {
      id: 'restoration',
      name: 'Restoration Protocol',
      focus: 'Cellular Restoration & Structural Renewal',
      description: 'The Restoration Protocol is active biological intervention. DWAT Restoration Science addresses volume deflation at the cellular source. OS-01 Senomorphic Peptides clear senescent cells shown to impair the skin\'s regenerative signalling — restoring what cumulative biology has diminished.',
      tech: ['DWAT Restoration', 'OS-01 Peptides', 'NMN Support'],
      icon: <Activity className="w-8 h-8 text-iv-gold" />,
    },
    {
      id: 'longevity',
      name: 'Longevity Protocol',
      focus: 'Maximum-Potency Cellular Longevity',
      description: 'The Longevity Protocol is the pinnacle of the Isola Vitale system. Maximum-potency L-Ornithine and peptide complexes mimic the structural effect of lipofilling, targeting deep-set chronological loss at the dermal matrix level. Clinical-grade results. No clinic appointment required.',
      tech: ['L-Ornithine 1.50%', 'Deep Collagen Remodeling', 'Intensive Lipid Support'],
      icon: <Sparkles className="w-8 h-8 text-iv-gold" />,
    },
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            Precision Biological Protocols
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase text-iv-white">The <em className="text-iv-gold not-italic" style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>System</em></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed font-light">
            Formulation potency matched to cellular biology. Your protocol is assigned by skin analysis — not by birthdate.
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
                      <h2 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">{tier.name}</h2>
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
