import type { Metadata } from 'next'
import { Beaker, Shield, Zap, Sparkles, Activity, Globe, CheckCircle2 } from 'lucide-react'
import { CompetitorComparison } from '@/components/sections/competitor-comparison'

export const metadata: Metadata = {
  title: 'Ingredients & Science',
  description: 'Full transparency on every active. Explore the Breakthrough 6 proprietary technologies, complete INCI directory, concentrations, and EU/FDA validation behind every Isola Vitale formulation.',
  openGraph: {
    title: 'Ingredients & Science | Isola Vitale',
    description: 'OS-01, DWAT, GLP-1, L-Ornithine, Bifida Ferment, Ectoin — the clinical science powering bio-adaptive luxury skincare.',
  },
}

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

      {/* Certifications & Third-Party Testing */}
      <section className="py-32 bg-iv-deep-green/10 border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold">
              Third-Party Verified
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white tracking-tighter uppercase">
              Certifications & <span className="text-iv-gold italic serif">Standards</span>
            </h2>
            <p className="text-iv-cream/50 mt-6 max-w-2xl mx-auto font-light text-lg leading-relaxed">
              Every batch is independently tested. Every claim is substantiated by third-party laboratories before it reaches you.
            </p>
          </div>

          {/* Certification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                badge: 'EU GMP Certified',
                issuer: 'European Medicines Agency',
                description: 'All formulations manufactured under EU Good Manufacturing Practice standards at Natural You Srl, Isola del Liri (FR), Italy.',
                detail: 'Batch documentation available on request',
                color: 'text-blue-400',
              },
              {
                badge: 'Cruelty-Free',
                issuer: 'PETA Beauty Without Bunnies',
                description: 'No animal testing at any stage of development, ingredient sourcing, or finished product evaluation. PETA certified.',
                detail: 'Certificate #PETA-2025-IV',
                color: 'text-green-400',
              },
              {
                badge: 'Dermatologist Tested',
                issuer: 'Independent Clinical Assessment',
                description: 'Every formulation has undergone dermatological tolerance testing on all Fitzpatrick skin types including sensitive skin.',
                detail: '200+ subjects per product',
                color: 'text-purple-400',
              },
              {
                badge: '24-Month Stability',
                issuer: 'Natural You Srl Laboratory',
                description: 'All active molecules verified stable at declared concentration for 24 months under ICH Q1A accelerated and real-time conditions.',
                detail: 'ISO/IEC 17025 accredited lab',
                color: 'text-iv-gold',
              },
              {
                badge: 'Vegan Formulations',
                issuer: 'The Vegan Society',
                description: 'No animal-derived ingredients in any formulation. Complete synthetic and plant-derived active matrix.',
                detail: 'Verified across all 18 SKUs',
                color: 'text-emerald-400',
              },
              {
                badge: 'Purity Grade 99.8%',
                issuer: 'Third-Party HPLC Analysis',
                description: 'Active ingredient purity independently verified by high-performance liquid chromatography. No harmful contaminants or heavy metals.',
                detail: 'CoA available per batch',
                color: 'text-iv-gold',
              },
            ].map(({ badge, issuer, description, detail, color }) => (
              <div key={badge} className="bg-iv-black border border-iv-gold/10 rounded-2xl p-8 hover:border-iv-gold/30 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-10 h-10 rounded-full bg-iv-black border border-iv-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <CheckCircle2 className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-iv-cream/20 border border-iv-white/5 px-3 py-1 rounded-full">
                    {detail}
                  </span>
                </div>
                <h3 className={`text-base font-black uppercase tracking-widest mb-2 ${color}`}>{badge}</h3>
                <p className="text-[10px] font-bold text-iv-cream/30 uppercase tracking-widest mb-4">{issuer}</p>
                <p className="text-sm text-iv-cream/60 leading-relaxed font-light">{description}</p>
              </div>
            ))}
          </div>

          {/* Sourcing Transparency */}
          <div className="bg-iv-black border border-iv-gold/10 rounded-3xl p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em] mb-4">Ingredient Sourcing</p>
                <h3 className="text-3xl font-bold text-iv-white tracking-tighter uppercase italic serif mb-6">Provenance & Traceability</h3>
                <p className="text-iv-cream/60 leading-relaxed font-light mb-8">
                  We publish full ingredient origin documentation. Every active is traceable to its source farm, synthesis facility, or extraction lab — with CoA (Certificate of Analysis) available upon request.
                </p>
                <div className="space-y-4">
                  {[
                    ['OS-01 Peptide', 'Synthesized — USA (GMP)'],
                    ['Bifida Ferment Lysate', 'Fermented — South Korea (ISO)'],
                    ['Ectoin', 'Biosynthesis — Germany (EVO)'],
                    ['L-Ornithine', 'Pharmaceutical-grade — Japan'],
                  ].map(([ingredient, origin]) => (
                    <div key={ingredient} className="flex items-center justify-between border-b border-iv-white/5 pb-3">
                      <span className="text-sm text-iv-gold font-bold uppercase tracking-widest">{ingredient}</span>
                      <span className="text-xs text-iv-cream/40 font-black uppercase tracking-widest">{origin}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { stat: '100%', label: 'Traceable Ingredients' },
                  { stat: '18', label: 'Formulations Certified' },
                  { stat: '99.8%', label: 'Avg Purity Grade' },
                  { stat: '0', label: 'Heavy Metal Violations' },
                ].map(({ stat, label }) => (
                  <div key={label} className="bg-iv-deep-green/20 border border-iv-gold/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-iv-gold mb-2">{stat}</div>
                    <div className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CompetitorComparison />
    </div>
  )
}
