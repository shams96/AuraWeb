import { Button } from '@/components/ui-lib'
import { Beaker, Shield, Zap, Sparkles, Activity, Globe } from 'lucide-react'
import { HouseStandard } from '@/components/sections/house-standard'
import Link from 'next/link'

export const metadata = {
  title: 'The Science',
  description: 'The published research behind the formulations, and the standard the house holds itself to. Formulated at Isola del Liri, Lazio.',
}


export default function SciencePage() {
  const breakthroughs = [
    {
      name: 'Cellular Renewal Complex',
      concentration: '0.30%',
      icon: <Zap className="w-6 h-6 text-iv-gold" />,
      description: 'A peptide system formulated at Isola del Liri to support the skin\'s own renewal pathways, restoring the conditions in which resilience is built.',
      benefit: 'Formulated on published senescence biology and proven in the house\'s own testing. All claims rest on Chiarel evidence.'
    },
    {
      name: 'DWAT Restoration Science',
      concentration: '0.75%',
      icon: <Activity className="w-6 h-6 text-iv-gold" />,
      description: 'Dermal White Adipose Tissue (DWAT) complex supports healthy adipocyte signalling and collagen remodelling to gradually restore natural facial volume.',
      benefit: 'dWAT content correlates with facial volume loss — targeting adipocyte regeneration addresses the mechanism at source. Kruglikov & Scherer, Aging 2016 (DOI 10.18632/aging.100999).'
    },
    {
      name: 'Structural Support Complex',
      concentration: '1.25%',
      icon: <Shield className="w-6 h-6 text-iv-gold" />,
      description: 'A peptide complex that supports skin elasticity and structural integrity through periods of metabolic change, helping the face hold its firmness.',
      benefit: 'Periods of rapid metabolic change are associated with facial volume change and barrier stress. This complex is formulated to support structure through them.'
    },
    {
      name: 'L-Ornithine Volume Enhancement',
      concentration: '1.50%',
      icon: <Sparkles className="w-6 h-6 text-iv-gold" />,
      description: 'An encapsulated amino acid that supports collagen synthesis and dermal density, targeting deep-set wrinkles in mature skin.',
      benefit: 'L-ornithine increases collagen-constituting amino acids (L-proline, glycine) and polyamines in skin — Kitakaze et al., Biochemical and Biophysical Research Communications 2019 (DOI 10.1016/j.bbrc.2019.03.064).'
    },
    {
      name: 'Bifida Ferment Lysate',
      concentration: '0.50%',
      icon: <Beaker className="w-6 h-6 text-iv-gold" />,
      description: 'A clinical-grade postbiotic that reinforces the skin microbiome and reduces inflammatory signalling, supporting long-term barrier resilience.',
      benefit: 'Microbiome-conscious postbiotic formulation. Reinforces barrier function and supports the skin\'s natural defences — included at a concentration designed to complement and support.'
    },
    {
      name: 'Ectoin Environmental Shield',
      concentration: '1.00%',
      icon: <Globe className="w-6 h-6 text-iv-gold" />,
      description: 'An extremolyte from halophilic bacteria that forms a hydration shell around skin cells, protecting them from urban pollution and UV-induced stress.',
      benefit: '18% TEWL reduction and 35% hydration increase vs control — Dermscan Group, Lyon & Milan, 4 wks, n=96.'
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero Section */}
      <section className="bg-iv-black text-iv-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/science-bg.png')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iv-black/80 to-iv-black pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-10 bg-iv-black/40 backdrop-blur-md">
            Research-Confirmed Formulations
          </div>
          <h1 className="iv-type-display font-bold mb-6 tracking-tighter uppercase leading-none">The Science of <br /><span className="text-iv-gold italic serif">Resilience</span></h1>
          <p className="text-lg text-iv-cream/70 max-w-3xl mx-auto leading-relaxed font-light">
            Formulated at <strong className="text-iv-white">Natural You Srl</strong>, Isola del Liri, Italy. Every active selected because independent research already confirmed it. Every concentration held to the level the science used.
          </p>
        </div>
      </section>

      {/* Breakthroughs Grid */}
      <section className="py-24 bg-iv-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-iv-gold mb-4 uppercase tracking-[0.4em]">Proprietary Technologies</h2>
            <p className="text-3xl font-bold text-iv-white tracking-tighter italic iv-serif">
              "Every formulation is a clinical precision instrument."
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/70 mt-4">— Dr. S. Islam</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breakthroughs.map((tech) => (
              <div key={tech.name} className="bg-iv-deep-green/20 p-10 rounded-2xl border border-iv-gold/10 hover:border-iv-gold/30 transition-all group backdrop-blur-sm shadow-2xl">
                <div className="mb-8 p-4 bg-iv-black/40 rounded-lg inline-block border border-iv-gold/10 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-bold text-iv-white uppercase tracking-widest leading-tight">{tech.name}</h3>
                  <span className="bg-iv-gold/10 text-iv-gold text-[10px] font-black px-3 py-1 rounded-full border border-iv-gold/20 uppercase tracking-widest">
                    {tech.concentration}
                  </span>
                </div>
                <p className="text-iv-cream/60 mb-8 text-sm leading-relaxed font-light">
                  {tech.description}
                </p>
                <div className="pt-6 border-t border-iv-white/5">
                  <p className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest mb-2">Clinical Result</p>
                  <p className="text-iv-gold font-bold text-sm">{tech.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory Heritage */}
      <section className="py-32 bg-iv-deep-green/10 border-t border-iv-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-iv-gold/[0.03] rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter uppercase">Italian Laboratory Precision</h2>
              <p className="text-iv-cream/60 leading-relaxed font-light text-lg">
                Our partnership with <strong className="text-iv-white">Natural You Srl</strong> in Isola del Liri, Italy, grants Chiarel exclusive access to pharmaceutical-grade raw materials and proprietary encapsulation technologies. Each formulation undergoes rigorous pH validation and stability testing to ensure 100% regulatory compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-iv-gold hover:bg-iv-gold-light text-iv-black rounded-none px-12 py-8 text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-iv-gold/20 transition-all">
                  View INCI Dossier
                </Button>
                <Link href="/clinical-results" className="inline-flex items-center justify-center border border-iv-gold/30 text-iv-gold text-xs font-black uppercase tracking-[0.2em] px-10 py-4 hover:border-iv-gold transition-colors">
                  Clinical Results →
                </Link>
              </div>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl aspect-video bg-iv-black border border-iv-gold/10 relative group">
              <div className="absolute inset-0 bg-iv-gold/5 group-hover:bg-transparent transition-all duration-1000"></div>
              <div className="w-full h-full flex items-center justify-center text-iv-gold/20 italic iv-serif text-sm">
                Natural You Srl Laboratory, Italy
              </div>
            </div>
          </div>
        </div>
      </section>
      <HouseStandard />
    </div>
  )
}
