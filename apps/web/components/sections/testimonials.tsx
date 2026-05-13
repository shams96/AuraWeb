'use client'

import { useState } from 'react'
import { Star, CheckCircle, Play, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  content: string
  image: string
  beforeImage: string
  afterImage: string
  timeframe: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

const RATING_BREAKDOWN = [
  { stars: 5, pct: 84 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]

const TRUST_BADGES = [
  { label: 'Verified Reviews', sub: 'Every review is authenticated to a confirmed purchase' },
  { label: 'Dermatologist Tested', sub: 'Independent clinical assessment on all skin types' },
  { label: 'Cruelty-Free', sub: 'PETA certified — no animal testing, ever' },
  { label: 'GMP Certified', sub: 'Manufactured at Natural You Srl under EU GMP standards' },
]

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [beforeAfterIdx, setBeforeAfterIdx] = useState(0)

  const prev = () => setActiveIndex(i => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setActiveIndex(i => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section className="py-20 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold">
              Verified Results
            </div>
            <h2 className="iv-type-h2 font-bold text-iv-white mb-6 uppercase tracking-widest">
              Real People. Real Results.
            </h2>
            <p className="iv-type-lead text-iv-cream/70 max-w-3xl mx-auto leading-relaxed">
              Every review is tied to a confirmed purchase. Every result is documented.
            </p>
          </div>

          {/* Overall Rating + Breakdown */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20 bg-iv-deep-green/20 rounded-3xl p-10 border border-iv-gold/10">
            <div className="text-center md:text-left">
              <div className="text-7xl font-black text-iv-gold mb-2">4.8</div>
              <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 5 ? 'text-iv-gold fill-current' : 'text-iv-gold/20'}`} />
                ))}
              </div>
              <p className="text-iv-cream/50 text-sm uppercase tracking-widest font-bold">Based on 2,450+ verified reviews</p>
              <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                <CheckCircle className="w-4 h-4 text-iv-gold" />
                <span className="text-[11px] text-iv-cream/60 font-bold uppercase tracking-widest">Authenticated Purchases Only</span>
              </div>
            </div>
            <div className="space-y-3">
              {RATING_BREAKDOWN.map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-xs text-iv-cream/50 w-10 text-right font-bold">{stars}★</span>
                  <div className="flex-1 h-2 bg-iv-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-iv-gold rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-iv-cream/40 w-8 font-mono">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Testimonial Carousel */}
          <div className="relative mb-20">
            <div className="bg-iv-deep-green/30 rounded-3xl overflow-hidden border border-iv-gold/10 backdrop-blur-sm">
              <div className="grid md:grid-cols-2">
                {/* Before / After */}
                <div className="relative min-h-[320px] bg-iv-black flex">
                  <div className="w-1/2 flex flex-col items-center justify-center p-8 border-r border-iv-white/5">
                    <div className="w-20 h-20 rounded-full bg-iv-white/5 border border-iv-white/10 mb-3 flex items-center justify-center">
                      <span className="text-iv-cream/20 text-xs font-bold uppercase tracking-widest">Before</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/30">Baseline</span>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-iv-deep-green/20">
                    <div className="w-20 h-20 rounded-full bg-iv-gold/10 border border-iv-gold/30 mb-3 flex items-center justify-center shadow-[0_0_20px_rgba(184,151,47,0.15)]">
                      <span className="text-iv-gold/60 text-xs font-bold uppercase tracking-widest">After</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-iv-gold/60">Optimized</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-iv-gold text-iv-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter">
                    {testimonials[activeIndex]?.timeframe}
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black text-iv-cream/20 uppercase tracking-widest">
                    Actual customer — results vary
                  </div>
                </div>

                {/* Quote */}
                <div className="p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-iv-gold fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-iv-cream/80 leading-relaxed italic iv-serif text-xl mb-8">
                      &ldquo;{testimonials[activeIndex]?.content}&rdquo;
                    </blockquote>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 border-t border-iv-white/5 pt-6 mb-4">
                      <div className="w-12 h-12 bg-iv-gold/10 rounded-full flex items-center justify-center border border-iv-gold/20">
                        <span className="text-sm font-bold text-iv-gold">
                          {testimonials[activeIndex]?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-iv-white">{testimonials[activeIndex]?.name}</h4>
                        <p className="text-xs text-iv-cream/40 uppercase tracking-widest">{testimonials[activeIndex]?.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-iv-gold" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-iv-gold/60">Verified Purchase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav buttons */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-3 mt-6">
                <button onClick={prev} className="w-10 h-10 rounded-full border border-iv-gold/20 flex items-center justify-center text-iv-gold hover:border-iv-gold transition-colors bg-iv-black">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-iv-gold w-6' : 'bg-iv-white/20'}`}
                  />
                ))}
                <button onClick={next} className="w-10 h-10 rounded-full border border-iv-gold/20 flex items-center justify-center text-iv-gold hover:border-iv-gold transition-colors bg-iv-black">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Video Testimonial Placeholder */}
          <div className="mb-20">
            <h3 className="text-center text-xs font-black text-iv-gold uppercase tracking-[0.3em] mb-8">Video Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Elena M.', timeframe: '12 weeks', topic: 'Barrier Restoration' },
                { name: 'James K.', timeframe: '8 weeks', topic: 'Luminosity Protocol' },
                { name: 'Priya S.', timeframe: '16 weeks', topic: 'Anti-Ageing System' },
              ].map((v, i) => (
                <div key={i} className="relative aspect-video rounded-2xl bg-iv-deep-green/20 border border-iv-gold/10 overflow-hidden group cursor-pointer hover:border-iv-gold/30 transition-all">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-iv-gold/10 border border-iv-gold/30 flex items-center justify-center mb-3 group-hover:bg-iv-gold group-hover:border-iv-gold transition-all">
                      <Play className="w-5 h-5 text-iv-gold group-hover:text-iv-black fill-current transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-iv-white uppercase tracking-widest">{v.name}</p>
                    <p className="text-[10px] text-iv-cream/40 uppercase tracking-widest mt-1">{v.topic}</p>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-iv-gold text-iv-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tight">
                    {v.timeframe}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {TRUST_BADGES.map(({ label, sub }) => (
              <div key={label} className="bg-iv-deep-green/10 border border-iv-gold/10 rounded-2xl p-6 text-center hover:border-iv-gold/30 transition-all">
                <CheckCircle className="w-6 h-6 text-iv-gold mx-auto mb-3" />
                <p className="text-xs font-black text-iv-white uppercase tracking-widest mb-2">{label}</p>
                <p className="text-[10px] text-iv-cream/40 leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="bg-gradient-to-br from-iv-deep-green/40 to-iv-black/40 rounded-3xl p-12 border border-iv-gold/10 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { value: '4.8', label: 'Average Rating' },
                { value: '2,450+', label: 'Verified Reviews' },
                { value: '98%', label: 'Would Recommend' },
                { value: '30-Day', label: 'Satisfaction Guarantee' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-4xl font-black text-iv-gold mb-2">{value}</div>
                  <div className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
