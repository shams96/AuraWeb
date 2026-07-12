
import type { Metadata } from 'next'
import { Shield, Zap, Sparkles, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Ritual — Four Formulations. One Living Philosophy.',
  description: 'LIRI ROMA\'s four rituals are not defined by age — they are defined by what your skin needs now. Preservation · Refinement · Regeneration · Longevity. Beauty as a way of life.',
  openGraph: {
    title: 'The Ritual | LIRI ROMA',
    description: 'Four formulations born from the Italian philosophy that beauty is a way of life, not a clinical outcome.',
  },
}

export default function SystemPage() {
  const tiers = [
    {
      id: 'preservation',
      name: 'Preservation Protocol',
      focus: 'Cellular Energy · Barrier Intelligence',
      description: 'Resilience begins before symptoms appear. The Preservation Protocol establishes cellular energy reserves, fortifies the microbiome barrier, and intercepts the environmental stressors — pollution, climate control, blue light — that accumulate invisibly long before they become visible on the surface. This is where adaptive skin science begins.',
      tech: ['Bifida 0.30%', 'Ectoin Environmental Shield', 'Cellular Energy Support'],
      icon: <Shield className="w-8 h-8 text-iv-gold" />,
    },
    {
      id: 'refinement',
      name: 'Refinement Protocol',
      focus: 'Barrier Intelligence · Oxidative Defense',
      description: 'The Refinement Protocol meets your skin at its critical inflection — when the living barrier begins to soften and stress accumulates faster than the skin can neutralise it. metabolic change protective complexes support firmness and structure while the window for intervention remains widest.',
      tech: ['metabolic change Protection', 'Oxidative Defense Complex', 'Barrier Adaptive Support'],
      icon: <Zap className="w-8 h-8 text-iv-gold" />,
    },
    {
      id: 'regeneration',
      name: 'Regeneration Protocol',
      focus: 'Oxidative Defense · Structural Vitality',
      description: 'Active biological regeneration. DWAT Restoration Science addresses volume deflation at the cellular source. Cellular Renewal Complexs reduce the accumulated senescent burden that impairs the skin\'s regenerative signalling — restoring resilience capacity, beyond merely correcting its visible consequences.',
      tech: ['DWAT Restoration Science', 'Cellular Renewal Complexs', 'NMN Cellular Support'],
      icon: <Activity className="w-8 h-8 text-iv-gold" />,
    },
    {
      id: 'longevity',
      name: 'Longevity Protocol',
      focus: 'Structural Vitality · Maximum Resilience',
      description: 'The summit of the ritual. When all four sources of vitality call for their fullest support, the Longevity Protocol works at the deepest layer — L-Ornithine and advanced peptide complexes tending the structure from which all visible vitality ultimately rises.',
      tech: ['L-Ornithine 1.50%', 'Deep Collagen Architecture', 'Structural Vitality Complex'],
      icon: <Sparkles className="w-8 h-8 text-iv-gold" />,
    },
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-flex items-center gap-3 border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--iv-gold)', display: 'inline-block' }} />
            Adaptive Skin Science™ · LIRI ROMA
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase text-iv-white">The <em className="text-iv-gold" style={{ fontStyle: 'italic', fontFamily: 'var(--iv-font-serif)' }}>Ritual</em></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed font-light mb-6">
            Italy has always known something the modern world forgot — beauty is not corrected. It is cultivated. Four protocols. One Italian philosophy. The practice of biological resilience as a way of life.
          </p>
          <p className="text-sm text-iv-gold/70 max-w-xl mx-auto font-light italic">
            Each protocol is assigned to your biological stage — not your age. Find yours in two minutes.
          </p>
        </div>
      </section>

      {/* VRM Framework intro */}
      <section className="py-20 border-b border-iv-gold/10 bg-iv-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-iv-gold mb-4">The Foundation</p>
            <h2 className="iv-type-h3 font-bold text-iv-white tracking-tighter mb-4" style={{ fontFamily: 'var(--iv-font-serif)' }}>
              Every protocol is built on<br /><em className="text-iv-gold">The Science of Skin Vitality</em>
            </h2>
            <p className="text-iv-cream/65 font-light max-w-2xl mx-auto leading-relaxed text-sm">
              Rather than chasing individual symptoms, our science tends to the four sources of vitality that determine whether skin stays alive, adaptive, and strong — whatever your age or environment.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { roman: 'I', label: 'The Energy to Renew', short: 'Energy' },
              { roman: 'II', label: 'The Living Barrier', short: 'Barrier' },
              { roman: 'III', label: 'The Power to Protect', short: 'Defence' },
              { roman: 'IV', label: 'Firmness & Structure', short: 'Structure' },
            ].map(d => (
              <div key={d.roman} className="text-center p-6 rounded-2xl border border-iv-gold/10 bg-iv-deep-green/20 hover:border-iv-gold/30 transition-all">
                <p className="text-iv-gold font-serif italic text-xl font-bold mb-2">{d.roman}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-iv-white mb-1">{d.short}</p>
                <p className="text-[10px] text-iv-cream/65 font-light leading-tight">{d.label}</p>
              </div>
            ))}
          </div>
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
                        <span key={i} className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest border border-iv-white/5 px-4 py-2 rounded-full bg-iv-black/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:block text-iv-gold/10 text-[10rem] font-bold absolute right-12 top-1/2 -translate-y-1/2 select-none iv-serif italic">
                    0{idx + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptation Curve */}
      <section className="py-24 bg-iv-black border-t border-iv-gold/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-4">The Liri Principle™</p>
            <h3 className="iv-type-h3 font-bold text-iv-white tracking-tighter" style={{ fontFamily: 'var(--iv-font-serif)' }}>
              Your Skin's <em className="text-iv-gold">Biological Stage</em>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { phase: '01', name: 'Adaptive', state: 'Skin responds normally. Barrier intact. Recovery efficient.', color: 'rgba(155, 71, 34,0.80)' },
              { phase: '02', name: 'Compensating', state: 'Recovery slows. Sensitivity appears. Barrier begins to struggle.', color: 'rgba(155, 71, 34,0.55)' },
              { phase: '03', name: 'Fatigued', state: 'Barrier weakness. Dullness. Texture changes. Energy reserves depleted.', color: 'rgba(155, 71, 34,0.35)' },
              { phase: '04', name: 'Depleted', state: 'Visible structural decline. Resilience capacity exhausted.', color: 'rgba(155, 71, 34,0.18)' },
            ].map(p => (
              <div key={p.phase} className="p-6 rounded-2xl border border-iv-gold/10 bg-iv-deep-green/20 text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-4" style={{ background: p.color }} />
                <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.2em] mb-2">Phase {p.phase}</p>
                <p className="text-sm font-bold text-iv-white mb-2" style={{ fontFamily: 'var(--iv-font-serif)' }}>{p.name}</p>
                <p className="text-[11px] text-iv-cream/70 leading-relaxed font-light">{p.state}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-iv-cream/70 mb-16">
              Visible aging begins when adaptation capacity is exhausted — LIRI ROMA exists to prevent that transition.
            </p>
            <div className="w-24 h-px bg-iv-gold/30 mx-auto mb-16" />
            <p className="text-3xl md:text-4xl text-iv-cream/80 italic iv-serif leading-[1.3] tracking-tight max-w-3xl mx-auto">
              "Effective skincare is not about maximum potency. It is about optimal alignment — building skin that adapts, rather than skin that is perpetually corrected."
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
