import type { Metadata } from 'next'
import { MapPin, Award, Heart, Beaker } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Isola Vitale — La Bella Figura',
  description: 'In Italy, beauty has never been a product. It has been a philosophy. Isola Vitale was born from La Bella Figura — the Italian practice of living beautifully. Formulated at Isola del Liri.',
  openGraph: {
    title: 'About Isola Vitale — La Bella Figura',
    description: 'The Italian practice of living beautifully. Formulated at Isola del Liri.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-iv-black">

      {/* Hero */}
      <section className="bg-iv-black text-iv-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            La Bella Figura
          </div>
          <h1 className="iv-type-display font-bold mb-8 tracking-tighter italic serif text-iv-gold">Isola Vitale</h1>
          <h2 className="iv-type-h3 font-light text-iv-cream/70 mb-12 leading-relaxed">
            In Italy, beauty has never been a product.<br />
            <span className="text-iv-white font-semibold italic">It has been a philosophy.</span>
          </h2>
          <div className="w-24 h-px bg-iv-gold/30 mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-iv-black border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-iv-gold font-black uppercase tracking-[0.3em] text-[10px] block">The Origin</span>
              <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter leading-none">Born from<br /><em className="text-iv-gold">La Bella Figura</em></h2>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                <em>La Bella Figura</em> is Italy's unwritten code — the art of presenting yourself to the world with grace, dignity, and care. Not vanity. Not perfection. The quiet confidence of someone who lives beautifully from within.
              </p>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Isola Vitale was born from that philosophy. Formulated in partnership with <strong className="text-iv-white">Natural You Srl</strong> at <strong className="text-iv-white">Isola del Liri, Italy</strong> — where Italian precision meets centuries of craft — our formulations exist not to fight aging, but to cultivate the kind of skin that reflects how well you live.
              </p>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Italy gave the world Gucci, Prada, Armani, Santa Maria Novella. Not because Italians invented luxury — but because they lived it first. That is the inheritance Isola Vitale draws from.
              </p>
            </div>
            <div className="bg-iv-deep-green/20 border border-iv-gold/10 rounded-3xl aspect-[4/5] flex items-center justify-center text-iv-gold/20 italic iv-serif text-sm backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-iv-gold/5 to-transparent" />
              <p className="text-center px-8 leading-relaxed" style={{ color: 'rgba(145,56,50,0.35)', fontFamily: 'var(--iv-font-serif)', fontSize: '1rem' }}>
                The Cascata Grande<br />Isola del Liri, Lazio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="py-24 bg-iv-deep-green/40 text-iv-white border-y border-iv-gold/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-iv-black/20 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--iv-gold)' }}>The Philosophy in Practice</p>
            <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter uppercase">Four Pillars of<br /><em className="text-iv-gold">La Bella Figura</em></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Beaker className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                title: 'Italian Precision',
                body: 'Every formulation made at pharmaceutical-grade standards in Isola del Liri. No marketing percentages. No filler.',
              },
              {
                icon: <Award className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                title: 'Validated by Science',
                body: 'Four independent clinical trials. Science is our proof — not our pitch.',
              },
              {
                icon: <MapPin className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                title: 'Made in Italy',
                body: 'The most trusted provenance in luxury. Formulated where craftsmanship is not a claim — it is a culture.',
              },
              {
                icon: <Heart className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                title: 'Beauty as Practice',
                body: 'Designed to be used slowly, intentionally, daily. The opposite of a quick fix. A lifetime ritual.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="p-10 bg-iv-black/40 border border-iv-gold/10 rounded-2xl backdrop-blur-md hover:border-iv-gold/30 transition-all group">
                {icon}
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-iv-white">{title}</h3>
                <p className="text-xs text-iv-cream/50 leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 bg-iv-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-12 h-px bg-iv-gold/40 mx-auto mb-16" />
          <h2 className="text-xs font-black text-iv-gold mb-10 uppercase tracking-[0.4em]">The Belief</h2>
          <p className="text-3xl md:text-5xl text-iv-cream/80 italic iv-serif leading-[1.2] tracking-tight">
            "Wellness should feel beautiful. Beauty should feel effortless. That is La Bella Figura — and it has always been the Italian way."
          </p>
          <div className="mt-16 flex items-center justify-center space-x-4">
            <div className="w-8 h-px bg-iv-white/10" />
            <p className="font-bold text-iv-white uppercase tracking-widest text-[10px]">Shams Islam, Founder · Isola Vitale</p>
            <div className="w-8 h-px bg-iv-white/10" />
          </div>
        </div>
      </section>

    </div>
  )
}
