import Link from 'next/link'
import { ArrowRight, Droplets, Shield, RefreshCcw, Sun, TrendingUp, Sparkles, type LucideIcon } from 'lucide-react'

interface TimelineItem {
  period: string
  title: string
  description: string
  icon: string
}

/* One iconography system sitewide: Lucide line icons at 1.5 stroke,
   Red Ochre ink. Emoji are never rendered. */
const TIMELINE_ICONS: Record<string, LucideIcon> = {
  hydration: Droplets,
  barrier: Shield,
  cycle: RefreshCcw,
  tone: Sun,
  structure: TrendingUp,
  transformation: Sparkles,
}

function TimelineIcon({ name, size = 18 }: { name: string; size?: number }) {
  const Icon = TIMELINE_ICONS[name] ?? Sparkles
  return <Icon size={size} strokeWidth={1.5} style={{ color: 'var(--iv-gold)' }} aria-hidden />
}

interface ResultsTimelineProps {
  timeline: TimelineItem[]
}

export function ResultsTimeline({ timeline }: ResultsTimelineProps) {
  return (
    <section className="py-20 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-block rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              style={{ color: 'var(--iv-gold)', border: '1px solid rgba(155, 71, 34,0.20)', background: 'rgba(155, 71, 34,0.05)' }}
            >
              Clinical Timeline
            </div>
            <h2 className="iv-type-h2 font-bold text-iv-white mb-4" style={{ fontFamily: 'var(--iv-font-serif)' }}>
              See Real <span className="italic" style={{ color: 'var(--iv-gold)' }}>Results</span>
            </h2>
            <p className="text-iv-cream/55 max-w-xl mx-auto leading-relaxed font-light">
              Week-by-week transformation driven by four independent clinical trials.
            </p>
          </div>

          {/* ── Desktop zigzag (md+) ───────────────────────────────────── */}
          <div className="hidden md:block relative">

            {/* Vertical connector */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: '50%',
                width: 2,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, transparent 0%, var(--iv-gold) 8%, var(--iv-gold) 92%, transparent 100%)',
                opacity: 0.25,
              }}
            />

            <div className="space-y-10">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div
                    key={index}
                    className="grid items-center"
                    style={{ gridTemplateColumns: '1fr 56px 1fr' }}
                  >
                    {/* Left cell */}
                    <div className={isLeft ? 'pr-8' : ''}>
                      {isLeft && (
                        <div
                          className="ml-auto rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]"
                          style={{
                            maxWidth: 380,
                            background: 'var(--iv-deep-green)',
                            border: '1px solid rgba(155, 71, 34,0.14)',
                          }}
                        >
                          <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                            <div
                              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(155, 71, 34,0.09)', border: '1px solid rgba(155, 71, 34,0.18)' }}
                            >
                              <TimelineIcon name={item.icon} />
                            </div>
                            <div className="text-right flex-1">
                              <p className="text-[9px] font-black uppercase tracking-[0.25em] mb-0.5" style={{ color: 'var(--iv-gold)' }}>{item.period}</p>
                              <h3 className="text-base font-bold text-iv-white leading-tight" style={{ fontFamily: 'var(--iv-font-serif)' }}>{item.title}</h3>
                            </div>
                          </div>
                          <p className="text-xs text-iv-cream/55 leading-relaxed font-light text-right">{item.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="flex items-center justify-center">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 z-10 relative"
                        style={{
                          background: 'var(--iv-gold)',
                          boxShadow: '0 0 0 5px rgba(155, 71, 34,0.12), 0 0 20px rgba(155, 71, 34,0.25)',
                        }}
                      />
                    </div>

                    {/* Right cell */}
                    <div className={!isLeft ? 'pl-8' : ''}>
                      {!isLeft && (
                        <div
                          className="rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]"
                          style={{
                            maxWidth: 380,
                            background: 'var(--iv-deep-green)',
                            border: '1px solid rgba(155, 71, 34,0.14)',
                          }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(155, 71, 34,0.09)', border: '1px solid rgba(155, 71, 34,0.18)' }}
                            >
                              <TimelineIcon name={item.icon} />
                            </div>
                            <div>
                              <p className="text-[9px] font-black uppercase tracking-[0.25em] mb-0.5" style={{ color: 'var(--iv-gold)' }}>{item.period}</p>
                              <h3 className="text-base font-bold text-iv-white leading-tight" style={{ fontFamily: 'var(--iv-font-serif)' }}>{item.title}</h3>
                            </div>
                          </div>
                          <p className="text-xs text-iv-cream/55 leading-relaxed font-light">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Mobile vertical list (< md) ────────────────────────────── */}
          <div className="md:hidden">
            <div className="relative pl-8">

              {/* Vertical line */}
              <div
                className="absolute left-[7px] top-2 bottom-2 w-[2px] rounded-full"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--iv-gold) 10%, var(--iv-gold) 90%, transparent)', opacity: 0.3 }}
              />

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex gap-5 items-start">

                    {/* Dot */}
                    <div
                      className="absolute -left-8 top-4 w-4 h-4 rounded-full flex-shrink-0"
                      style={{
                        background: 'var(--iv-gold)',
                        boxShadow: '0 0 0 4px rgba(155, 71, 34,0.12)',
                      }}
                    />

                    {/* Card */}
                    <div
                      className="flex-1 rounded-2xl p-5"
                      style={{
                        background: 'var(--iv-deep-green)',
                        border: '1px solid rgba(155, 71, 34,0.14)',
                      }}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <TimelineIcon name={item.icon} size={16} />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: 'var(--iv-gold)' }}>{item.period}</p>
                          <h3 className="text-sm font-bold text-iv-white leading-snug" style={{ fontFamily: 'var(--iv-font-serif)' }}>{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-iv-cream/55 leading-relaxed font-light">{item.description}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div
              className="rounded-3xl p-10 max-w-2xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, var(--iv-formal-garden) 0%, #0D3A1E 100%)',
                border: '1px solid rgba(155, 71, 34,0.18)',
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
                Ready for Transformed Skin?
              </h3>
              <p className="text-xs mb-7 font-light leading-relaxed" style={{ color: 'rgba(253,250,245,0.55)' }}>
                Join thousands who have begun their Liri ritual.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Link
                  href="/shop"
                  className="btn-luxury"
                  style={{ padding: '13px 30px', display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.75rem', letterSpacing: '0.18em' }}
                >
                  Shop Now <ArrowRight size={13} />
                </Link>
                <Link
                  href="/science"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '13px 26px', border: '1px solid rgba(253,250,245,0.22)',
                    color: 'rgba(253,250,245,0.70)', fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 4,
                    transition: 'all 0.2s',
                  }}
                >
                  View Clinical Data
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
