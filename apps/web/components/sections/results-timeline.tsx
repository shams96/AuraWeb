import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface TimelineItem {
  period: string
  title: string
  description: string
  icon: string
}

interface ResultsTimelineProps {
  timeline: TimelineItem[]
}

export function ResultsTimeline({ timeline }: ResultsTimelineProps) {
  return (
    <section className="py-20 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--iv-gold)', background: 'rgba(145,56,50,0.05)' }}>
              Clinical Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              See Real <span className="text-iv-gold italic">Results</span>
            </h2>
            <p className="text-lg text-iv-cream/70 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the transformation journey with our Bio-Adaptive System.
              Watch your skin evolve week by week.
            </p>
          </div>

          {/* Timeline — explicit grid so connector line always spans full height */}
          <div className="relative">

            {/* Vertical connector line — positioned behind dots */}
            <div
              className="absolute hidden md:block"
              style={{
                left: '50%',
                top: 0,
                bottom: 0,
                width: 2,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, transparent 0%, var(--iv-gold) 15%, var(--iv-gold) 85%, transparent 100%)',
                opacity: 0.35,
              }}
            />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div key={index} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-0">

                    {/* Left slot */}
                    <div className={`${isLeft ? 'md:pr-10 md:text-right' : 'md:order-3 md:pl-10'}`}>
                      {isLeft && (
                        <div
                          className={`rounded-2xl p-7 shadow-lg border transition-all duration-300 hover:shadow-xl ${isLeft ? 'ml-auto' : ''}`}
                          style={{
                            background: 'var(--iv-deep-green)',
                            border: '1px solid rgba(145,56,50,0.14)',
                            maxWidth: 340,
                            marginLeft: isLeft ? 'auto' : undefined,
                          }}
                        >
                          <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(145,56,50,0.08)', border: '1px solid rgba(145,56,50,0.18)' }}
                            >
                              <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div className={isLeft ? 'md:text-right' : ''}>
                              <h3 className="text-lg font-bold text-iv-white" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--iv-gold)' }}>{item.period}</p>
                            </div>
                          </div>
                          <p className={`text-sm text-iv-cream/70 leading-relaxed font-light ${isLeft ? 'md:text-right' : ''}`}>
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="hidden md:flex items-center justify-center w-12 flex-shrink-0 md:order-2">
                      <div
                        className="w-5 h-5 rounded-full z-10 relative"
                        style={{
                          background: 'var(--iv-gold)',
                          boxShadow: '0 0 0 4px rgba(145,56,50,0.15), 0 0 16px rgba(145,56,50,0.30)',
                        }}
                      />
                    </div>

                    {/* Right slot — empty on left cards, content on right cards */}
                    <div className={`${isLeft ? 'md:order-3 hidden md:block' : 'md:order-1 md:pr-10 md:text-right'}`}>
                      {!isLeft && (
                        <div
                          className="rounded-2xl p-7 shadow-lg border transition-all duration-300 hover:shadow-xl ml-auto"
                          style={{
                            background: 'var(--iv-deep-green)',
                            border: '1px solid rgba(145,56,50,0.14)',
                            maxWidth: 340,
                          }}
                        >
                          <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(145,56,50,0.08)', border: '1px solid rgba(145,56,50,0.18)' }}
                            >
                              <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div className="md:text-right">
                              <h3 className="text-lg font-bold text-iv-white" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--iv-gold)' }}>{item.period}</p>
                            </div>
                          </div>
                          <p className="text-sm text-iv-cream/70 leading-relaxed font-light md:text-right">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mobile: dot + card stacked */}
                    <div className="md:hidden flex items-start gap-4 mt-2">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                        style={{
                          background: 'var(--iv-gold)',
                          boxShadow: '0 0 0 3px rgba(145,56,50,0.15)',
                        }}
                      />
                      <div
                        className="flex-1 rounded-2xl p-6 border"
                        style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <h3 className="text-base font-bold text-iv-white">{item.title}</h3>
                            <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--iv-gold)' }}>{item.period}</p>
                          </div>
                        </div>
                        <p className="text-sm text-iv-cream/70 leading-relaxed font-light">{item.description}</p>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <div
              className="rounded-3xl p-10 max-w-2xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, var(--iv-formal-garden) 0%, #0D3A1E 100%)',
                border: '1px solid rgba(145,56,50,0.20)',
              }}
            >
              <h3 className="text-2xl font-bold mb-3 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready for Transformed Skin?
              </h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(253,250,245,0.65)' }}>
                Join thousands who have already experienced the power of Bio-Adaptive Technology.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/shop"
                  className="btn-luxury"
                  style={{ padding: '14px 32px', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Shop Now <ArrowRight size={14} />
                </Link>
                <Link
                  href="/science"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px', border: '1px solid rgba(253,250,245,0.25)',
                    color: 'rgba(253,250,245,0.80)', fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'all 0.2s',
                    borderRadius: 4,
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
