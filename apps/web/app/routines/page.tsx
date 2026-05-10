import { Sun, Moon, CheckCircle2 } from 'lucide-react'

export default function RoutinesPage() {
  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-black text-iv-white py-32 border-b border-iv-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            The Methodology
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none">The <span className="text-iv-gold italic serif">Protocols</span></h1>
          <p className="text-xl text-iv-cream/70 leading-relaxed font-light">
            Metabolic skincare requires precision. Follow our laboratory-validated protocols to maximize the efficacy of your Genesis-Longevity system and Clinical series.
          </p>
        </div>
      </section>

      {/* Routine Tabs/Sections */}
      <section className="py-24 bg-iv-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* AM Routine */}
            <div id="morning" className="bg-iv-deep-green/10 p-12 rounded-3xl border border-iv-gold/10 backdrop-blur-sm relative overflow-hidden group scroll-mt-24">
              <div className="absolute top-0 right-0 w-32 h-32 bg-iv-gold/[0.03] rounded-full blur-2xl group-hover:bg-iv-gold/10 transition-all duration-1000"></div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-iv-black border border-iv-gold/20 rounded-full flex items-center justify-center shadow-2xl">
                  <Sun className="w-6 h-6 text-iv-gold" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-iv-white tracking-tighter uppercase tracking-widest">Morning</h2>
                  <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em]">Protect & Shield</p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 1: Cleanse</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Use <strong className="text-iv-white">Gentle Cellular Cleanser</strong> to remove overnight metabolic waste.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 2: Tone</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Prep with <strong className="text-iv-white">5A Clinical Hydrating Mist</strong> for Ectoin-powered protection.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 3: Target</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Apply <strong className="text-iv-white">Terra Radiance Cream</strong> for daily metabolic alignment.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 4: Shield</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Finish with <strong className="text-iv-white">3A SPF 50+</strong> to prevent UV-induced cellular aging.</p>
                </div>
              </div>
            </div>

            {/* PM Routine */}
            <div id="evening" className="bg-iv-black p-12 rounded-3xl border border-iv-gold/20 shadow-2xl relative overflow-hidden group scroll-mt-24">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-iv-gold/[0.03] rounded-full blur-2xl group-hover:bg-iv-gold/10 transition-all duration-1000"></div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-iv-deep-green/20 border border-iv-gold/40 rounded-full flex items-center justify-center shadow-2xl">
                  <Moon className="w-6 h-6 text-iv-gold" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-iv-white tracking-tighter uppercase tracking-widest">Evening</h2>
                  <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em]">Repair & Restore</p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 1: Cleanse</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Double cleanse to ensure total urban pollution and SPF removal.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 2: Regenerate</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Apply <strong className="text-iv-white">1A Clinical Peptide Essence</strong> to target cellular senescence.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 3: Intensive</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Apply <strong className="text-iv-white">Obsidian Vitale Cream</strong> for deep chronological repair.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.5)]" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Step 4: Eyes</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Finish with <strong className="text-iv-white">Eye Contour Complex</strong> for targeted hydration.</p>
                </div>
              </div>
            </div>

            {/* Sensitive Skin Routine */}
            <div id="sensitive" className="bg-iv-black p-12 rounded-3xl border border-iv-white/10 shadow-2xl relative overflow-hidden group scroll-mt-24">
              <div className="absolute top-0 left-0 w-32 h-32 bg-iv-gold/[0.02] rounded-full blur-2xl"></div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-iv-deep-green/10 border border-iv-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-iv-gold/60" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-iv-white tracking-tighter uppercase tracking-widest">Sensitive</h2>
                  <p className="text-[10px] font-black text-iv-gold/60 uppercase tracking-[0.3em]">Calm & Fortify</p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-white/20" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Protocol 1: Bifida Support</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Focus on microbiome homeostasis using high-concentration Bifida Ferments.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-white/20" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Protocol 2: Ectoin Barrier</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Utilize extremolyte technology to prevent transepidermal water loss.</p>
                </div>
              </div>
            </div>

            {/* Acne Routine */}
            <div id="acne" className="bg-iv-black p-12 rounded-3xl border border-iv-white/10 shadow-2xl relative overflow-hidden group scroll-mt-24">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-iv-gold/[0.02] rounded-full blur-2xl"></div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-iv-deep-green/10 border border-iv-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-iv-gold/60" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-iv-white tracking-tighter uppercase tracking-widest">Reactive</h2>
                  <p className="text-[10px] font-black text-iv-gold/60 uppercase tracking-[0.3em]">Clarify & Balance</p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-white/20" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Protocol 1: Sebum Control</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Targeted metabolic signals to normalize oil production without stripping.</p>
                </div>
                <div className="relative pl-12 border-l border-iv-white/5">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-iv-white/20" />
                  <h3 className="text-xs font-black text-iv-white mb-3 uppercase tracking-widest">Protocol 2: Postbiotic Healing</h3>
                  <p className="text-iv-cream/60 text-sm font-light leading-relaxed">Reduce inflammation markers using standardized clinical postbiotics.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-32 bg-iv-black border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-xs font-black text-iv-gold mb-12 uppercase tracking-[0.4em]">Clinical Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="flex gap-6 p-6 bg-iv-deep-green/10 rounded-xl border border-iv-white/5">
              <CheckCircle2 className="w-5 h-5 text-iv-gold flex-shrink-0" />
              <p className="text-iv-cream/70 text-sm font-light leading-relaxed">Always apply onto damp skin to improve the penetration of large peptide molecules.</p>
            </div>
            <div className="flex gap-6 p-6 bg-iv-deep-green/10 rounded-xl border border-iv-white/5">
              <CheckCircle2 className="w-5 h-5 text-iv-gold flex-shrink-0" />
              <p className="text-iv-cream/70 text-sm font-light leading-relaxed">Do not skip the tier progression; your skin needs time to build metabolic tolerance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
