import type { Metadata } from 'next'
import { Button } from '@aurabiosphere/ui'
import { MapPin, Award, Heart, Beaker } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Isola Vitale',
  description: 'Born at the intersection of clinical science and Italian luxury. Isola Vitale is the world\'s first 4-tier, metabolically-aligned skincare system, formulated at Natural You Srl, Isola del Liri.',
  openGraph: {
    title: 'About Isola Vitale — The House',
    description: 'The story behind the world\'s first bio-adaptive, age-tiered skincare protocol.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-black text-iv-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 bg-iv-black/40 backdrop-blur-md">
            Since 2024
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter italic serif text-iv-gold">Isola Vitale</h1>
          <h2 className="text-2xl md:text-3xl font-light text-iv-cream/70 mb-12 leading-relaxed">
            The Vital Island: A New Paradigm in <br /><span className="text-iv-white font-bold italic">Metabolic Longevity</span>.
          </h2>
          <div className="w-24 h-px bg-iv-gold/30 mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-iv-black border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-iv-gold font-black uppercase tracking-[0.3em] text-[10px] block">Our Origin</span>
              <h2 className="text-5xl font-bold text-iv-white tracking-tighter leading-none">Born in <br />Isola del Liri</h2>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Isola Vitale was founded in the heart of Italy, in the historic town of <strong className="text-iv-white">Isola del Liri</strong>. Surrounded by cascading waterfalls and a heritage of industrial precision, we partnered with <strong className="text-iv-white">Natural You Srl</strong> to bridge the gap between ancient botanical wisdom and cutting-edge pharmaceutical science.
              </p>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Our name translates to "Vital Island," representing our philosophy that the skin is its own self-sustaining ecosystem. We don't just provide topical solutions; we provide the metabolic signals needed for the skin to heal itself from within.
              </p>
            </div>
            <div className="bg-iv-deep-green/20 border border-iv-gold/10 rounded-3xl aspect-[4/5] flex items-center justify-center text-iv-gold/20 italic font-serif text-sm backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-iv-gold/5 to-transparent"></div>
              [Image: The Cascata Grande, Isola del Liri]
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-iv-deep-green/40 text-iv-white border-y border-iv-gold/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-iv-black/20 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 tracking-tighter uppercase tracking-[0.1em]">The Clinical Commitment</h2>
            <p className="text-iv-cream/40 font-black uppercase tracking-[0.2em] text-[10px]">Four pillars that define the 18-month technology lead.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-10 bg-iv-black/40 border border-iv-gold/10 rounded-2xl backdrop-blur-md hover:border-iv-gold/30 transition-all group">
              <Beaker className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Scientific Integrity</h3>
              <p className="text-xs text-iv-cream/50 leading-relaxed font-light">No marketing fillers. Every ingredient is listed by its precise clinical percentage.</p>
            </div>
            <div className="p-10 bg-iv-black/40 border border-iv-gold/10 rounded-2xl backdrop-blur-md hover:border-iv-gold/30 transition-all group">
              <Award className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">EU/FDA Standard</h3>
              <p className="text-xs text-iv-cream/50 leading-relaxed font-light">100% regulatory compliance with the most stringent global safety boards.</p>
            </div>
            <div className="p-10 bg-iv-black/40 border border-iv-gold/10 rounded-2xl backdrop-blur-md hover:border-iv-gold/30 transition-all group">
              <MapPin className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Italian Heritage</h3>
              <p className="text-xs text-iv-cream/50 leading-relaxed font-light">Formulated and stabilized in Natural You Srl’s state-of-the-art Italian lab.</p>
            </div>
            <div className="p-10 bg-iv-black/40 border border-iv-gold/10 rounded-2xl backdrop-blur-md hover:border-iv-gold/30 transition-all group">
              <Heart className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Metabolic Balance</h3>
              <p className="text-xs text-iv-cream/50 leading-relaxed font-light">Designed to work with your cellular age, not against it. Zero inflammatory stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 bg-iv-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-12 h-px bg-iv-gold/40 mx-auto mb-16"></div>
          <h2 className="text-xs font-black text-iv-gold mb-10 uppercase tracking-[0.4em]">Our Mission</h2>
          <p className="text-3xl md:text-5xl text-iv-cream/80 italic font-serif leading-[1.2] tracking-tight">
            "To eradicate cellular senescence and redefine what it means to age with vitality. We believe the future of luxury is not in the bottle, but in the biology."
          </p>
          <div className="mt-16 flex items-center justify-center space-x-4">
            <div className="w-8 h-px bg-iv-white/10"></div>
            <p className="font-bold text-iv-white uppercase tracking-widest text-[10px]">Shams Islam, Founder</p>
            <div className="w-8 h-px bg-iv-white/10"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
