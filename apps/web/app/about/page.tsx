import { Wordmark } from '@/components/brand/wordmark'
import type { Metadata } from 'next'
import { MapPin, Award, Heart, Beaker } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Chiarel — The House of Clarity',
  description: 'Chiarel is a Skin Intelligence™ company — formulation guided by biology, not birthdate. Formulated at Isola del Liri.',
  openGraph: {
    title: 'About Chiarel — The House of Clarity',
    description: 'Matched to your biology, not your birthdate. Formulated at Isola del Liri.',
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
            Skin Intelligence™
          </div>
          <h1 className="iv-type-display mb-8"><Wordmark size="1em" color="var(--iv-white)" /></h1>
          <h2 className="iv-type-h3 font-light text-iv-cream/70 mb-12 leading-relaxed">
            Chiarel is not a skincare brand.<br />
            <span className="text-iv-white font-semibold italic">It is a Skin Intelligence™ company.</span>
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
              <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter leading-none">Born from<br /><em className="text-iv-gold">Skin Intelligence™</em></h2>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                <em>Skin Intelligence™</em> is Chiarel's unwritten code — formulation guided by biology, not birthdate. Not an age bracket. Not a deficiency to fix. The quiet confidence of skin that is understood.
              </p>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Chiarel was born from that philosophy. Formulated in partnership with <strong className="text-iv-white">Natural You Srl</strong> at <strong className="text-iv-white">Isola del Liri, Italy</strong> — where Italian precision meets centuries of craft — our formulations exist not to fight aging, but to be matched to your biology, not your birthdate.
              </p>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Italy gave the world precision instruments and centuries of formulation craft — not because Italians invented skincare, but because they mastered the discipline first. That is the inheritance Chiarel draws from.
              </p>
            </div>
            <div className="bg-iv-deep-green/20 border border-iv-gold/10 rounded-3xl aspect-[4/5] flex items-center justify-center text-iv-gold/20 italic iv-serif text-sm backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-iv-gold/5 to-transparent" />
              <p className="text-center px-8 leading-relaxed" style={{ color: 'rgba(155, 71, 34,0.35)', fontFamily: 'var(--iv-font-serif)', fontSize: '1rem' }}>
                The Cascata Grande<br />Isola del Liri, Lazio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto — The Modern Skin Reality */}
      <section className="py-28 bg-iv-black border-b border-iv-gold/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <span className="text-iv-gold font-black uppercase tracking-[0.3em] text-[10px] block mb-6">The Founding Question</span>
              <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter leading-none mb-8">
                Why does some skin remain<br /><em className="text-iv-gold">vital</em> — and other skin<br />progressively lose its way?
              </h2>
              <p className="text-iv-cream/60 text-lg leading-relaxed font-light">
                Most brands ask: how do we make skin look younger? We asked a different question — and it changed everything.
              </p>
            </div>
            <div className="space-y-6 pt-4">
              {[
                { stress: 'Climate control', truth: 'Air conditioning strips more barrier moisture in four hours than natural air removes in a day.' },
                { stress: 'Blue light exposure', truth: 'Screen-generated blue light now rivals UV radiation as a source of cumulative oxidative burden.' },
                { stress: 'Chronic cortisol', truth: 'Sustained stress suppresses collagen synthesis and impairs the barrier\'s adaptive response directly.' },
                { stress: 'Urban pollution', truth: 'Particulate matter smaller than 2.5μm penetrates the stratum corneum and generates free radical cascades.' },
              ].map(({ stress, truth }) => (
                <div key={stress} className="border-l-2 pl-5" style={{ borderColor: 'rgba(155, 71, 34,0.25)' }}>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-iv-gold mb-1">{stress}</p>
                  <p className="text-sm text-iv-cream/65 leading-relaxed font-light">{truth}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 p-12 rounded-3xl text-center" style={{ background: 'rgba(155, 71, 34,0.04)', border: '1px solid rgba(155, 71, 34,0.12)' }}>
            <p className="text-2xl md:text-3xl text-iv-cream/80 italic iv-serif leading-relaxed max-w-3xl mx-auto">
              "Skin was not designed for modern life. Resilience is no longer inherited. It must be cultivated."
            </p>
            <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em] mt-8">The Chiarel Principle™</p>
          </div>
        </div>
      </section>

      {/* Four pillars — now aligned with VRM */}
      <section className="py-24 bg-iv-deep-green/40 text-iv-white border-y border-iv-gold/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-iv-black/20 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--iv-gold)' }}>Adaptive Skin Science™ · The System</p>
            <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter uppercase">The Science of<br /><em className="text-iv-gold">Skin Vitality</em></h2>
            <p className="text-iv-cream/65 text-sm font-light mt-6 max-w-xl mx-auto leading-relaxed">
              Four biological systems. Every Chiarel formulation tends to all four — in sequence, with clinical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Beaker className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                roman: 'I',
                title: 'The Energy to Renew',
                body: 'Skin cannot repair what it cannot power. Mitochondrial support and ATP production come before any correction.',
              },
              {
                icon: <Award className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                roman: 'II',
                title: 'The Living Barrier',
                body: 'Healthy skin adapts to its environment. We rebuild the capacity to respond — not just the surface that shows it.',
              },
              {
                icon: <MapPin className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                roman: 'III',
                title: 'The Power to Protect',
                body: 'Pollution, UV, and blue light create invisible wear before visible aging. We address this systematically — not as an afterthought.',
              },
              {
                icon: <Heart className="w-8 h-8 text-iv-gold mx-auto mb-8 group-hover:scale-110 transition-transform" />,
                roman: 'IV',
                title: 'Firmness & Structure',
                body: 'The goal is not younger skin. The goal is stronger skin. Beauty is a visible consequence of structural integrity.',
              },
            ].map(({ icon, roman, title, body }) => (
              <div key={title} className="p-10 bg-iv-black/40 border border-iv-gold/10 rounded-2xl backdrop-blur-md hover:border-iv-gold/30 transition-all group relative overflow-hidden">
                <span className="absolute right-3 bottom-2 text-7xl font-black text-iv-gold/5 font-serif select-none">{roman}</span>
                {icon}
                <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.2em] mb-3">Domain {roman}</p>
                <h3 className="font-bold mb-4 text-xs text-iv-white leading-tight" style={{ fontFamily: 'var(--iv-font-serif)' }}>{title}</h3>
                <p className="text-xs text-iv-cream/75 leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding belief */}
      <section className="py-32 bg-iv-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-12 h-px bg-iv-gold/40 mx-auto mb-16" />
          <h2 className="text-xs font-black text-iv-gold mb-10 uppercase tracking-[0.4em]">The Belief</h2>
          <p className="text-3xl md:text-5xl text-iv-cream/80 italic iv-serif leading-[1.2] tracking-tight">
            "Skin that has been cared for carries a quality all its own — a living resilience the Italians have always understood. That is the ultimate luxury."
          </p>
          <div className="mt-16 flex items-center justify-center space-x-4">
            <div className="w-8 h-px bg-iv-white/10" />
            <p className="font-bold text-iv-white uppercase tracking-widest text-[10px]">Shams Islam, Founder · Chiarel</p>
            <div className="w-8 h-px bg-iv-white/10" />
          </div>
        </div>
      </section>

    </div>
  )
}
