import { Beaker, Shield, Zap, Sparkles, Activity, Globe, CheckCircle2 } from 'lucide-react'

export default function IngredientsPage() {
  const breakthroughs = [
    { name: 'OS-01 Senomorphic Peptide', focus: 'Cellular Senescence', description: 'Targets the accumulation of aging cells to restore barrier function.' },
    { name: 'DWAT Restoration Complex', focus: 'Volume Restoration', description: 'Restores dermal white adipose tissue for natural facial sculpting.' },
    { name: 'GLP-1 Protective Complex', focus: 'Deflation Prevention', description: 'Shields skin against volume loss during metabolic shifts.' },
    { name: 'L-Ornithine', focus: 'Wrinkle Depth', description: 'Encapsulated amino acid mimicking lipofilling effects.' },
    { name: 'Bifida Ferment Lysate', focus: 'Microbiome Support', description: 'Postbiotic standardized for rapid inflammation reduction.' },
    { name: 'Ectoin', focus: 'Environmental Defense', description: 'Extremolyte providing 18% TEWL improvement and pollution shield.' }
  ]

  const inciList = [
    { name: 'Mandelic Acid', function: 'Gentle AHA Exfoliation', foundIn: 'T1, T2, T3, T4' },
    { name: 'Glycolic Acid USP', function: 'Photoaging Reversal', foundIn: 'T2, T3, T4' },
    { name: 'Lactobionic Acid (PHA)', function: 'Hydration + Exfoliation', foundIn: 'T3, T4' },
    { name: 'Salicylic Acid USP', function: 'Pore Refinement (BHA)', foundIn: 'All Tiers' },
    { name: 'Palmitoyl Tripeptide-1', function: 'Collagen Synthesis', foundIn: 'T3, T4, 1A, 4A' },
    { name: 'Bakuchiol', function: 'Retinol Alternative', foundIn: 'T3, T4' },
    { name: 'Niacinamide USP', function: 'Barrier & DNA Repair', foundIn: 'All Formulations' },
    { name: 'Copper Tripeptide-1', function: 'Regeneration Catalyst', foundIn: 'T4, 4A' },
    { name: 'Ceramide NP', function: 'Lipid Barrier Restoration', foundIn: '2A, 4A' },
    { name: 'Zinc Gluconate', function: 'Anti-inflammatory', foundIn: 'T1, 6A' }
  ]

  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-black text-iv-white py-32 border-b border-iv-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            The Dossier
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none">The <span className="text-iv-gold italic serif">Ingredients</span></h1>
          <p className="text-xl text-iv-cream/70 leading-relaxed font-light">
            Uncompromising transparency. Discover the clinical-grade actives and proprietary breakthroughs that power the Isola Vitale system.
          </p>
        </div>
      </section>

      {/* Breakthrough 6 Deep Dive */}
      <section className="py-24 bg-iv-deep-green/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-black text-iv-gold mb-4 uppercase tracking-[0.4em]">The Breakthrough 6</h2>
            <p className="text-2xl font-bold text-iv-white tracking-tighter italic font-serif">
              Proprietary technologies granting a 12-18 month lead.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {breakthroughs.map((tech) => (
              <div key={tech.name} className="flex gap-8 group">
                <div className="w-14 h-14 bg-iv-black border border-iv-gold/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-iv-gold transition-all duration-500 shadow-2xl">
                  <Zap className="w-6 h-6 text-iv-gold" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-iv-white uppercase tracking-widest leading-tight">{tech.name}</h3>
                  <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest">{tech.focus}</p>
                  <p className="text-sm text-iv-cream/50 leading-relaxed font-light">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master INCI List */}
      <section className="py-32 bg-iv-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-iv-gold mb-4 uppercase tracking-[0.4em]">Master Inventory</h2>
            <h3 className="text-4xl font-bold text-iv-white tracking-tighter uppercase tracking-[0.1em]">Comprehensive INCI Directory</h3>
          </div>
          <div className="overflow-x-auto border border-iv-white/5 rounded-2xl bg-iv-deep-green/5 backdrop-blur-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-iv-white/10 bg-iv-black/40">
                  <th className="py-6 px-8 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Ingredient (INCI)</th>
                  <th className="py-6 px-8 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Function</th>
                  <th className="py-6 px-8 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-iv-white/5">
                {inciList.map((item) => (
                  <tr key={item.name} className="hover:bg-iv-gold/[0.03] transition-colors group">
                    <td className="py-8 px-8 text-sm font-bold text-iv-gold uppercase tracking-widest">{item.name}</td>
                    <td className="py-8 px-8 text-sm text-iv-cream/60 font-light">{item.function}</td>
                    <td className="py-8 px-8 text-[10px] text-iv-cream/30 italic font-black uppercase tracking-widest">{item.foundIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-24 p-12 bg-gradient-to-br from-iv-deep-green/40 to-iv-black border border-iv-gold/10 rounded-3xl text-iv-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-iv-gold/[0.03] rounded-full blur-3xl -mr-32 -mt-32"></div>
            <p className="text-[10px] font-black text-iv-gold mb-6 uppercase tracking-[0.4em]">100% REGULATORY COMPLIANCE</p>
            <h3 className="text-3xl font-bold mb-6 tracking-tighter">EU/FDA Validated Formulations</h3>
            <p className="text-iv-cream/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Our lab, <strong className="text-iv-white">Natural You Srl</strong>, ensures that every ingredient is sourced at pharmaceutical grade and validated for 24-month stability and peak biological activity.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
