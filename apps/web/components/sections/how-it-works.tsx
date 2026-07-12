'use client'

import { CheckCircle2, ArrowRight, Zap, Shield, Sparkles, Clock } from 'lucide-react'

interface Step {
  title: string
  description: string
  icon: string
}

interface TimelineItem {
  week: string
  result: string
}

interface HowItWorksProps {
  steps: Step[]
  timeline: TimelineItem[]
}

export function HowItWorks({ steps, timeline }: HowItWorksProps) {
  return (
    <section className="py-24 bg-iv-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold">La Bella Figura</div>
          <h2 className="iv-type-h2 font-bold text-iv-white mb-6 tracking-tighter uppercase">
            How the <span className="text-iv-gold italic serif lowercase">Ritual</span> Works
          </h2>
          <p className="iv-type-lead text-iv-cream/65 max-w-2xl mx-auto font-light leading-relaxed">
            Italian beauty was never optimised. It was practised — morning and night, season after season. Three steps that make that practice yours.
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-iv-deep-green/10 rounded-[32px] p-10 h-full border border-iv-gold/10 backdrop-blur-sm group-hover:border-iv-gold/30 transition-all duration-500">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-iv-gold/10 rounded-2xl flex items-center justify-center border border-iv-gold/20 mb-6 group-hover:scale-110 transition-transform">
                    {index === 0 ? <Zap className="w-8 h-8 text-iv-gold" /> : index === 1 ? <Shield className="w-8 h-8 text-iv-gold" /> : <Sparkles className="w-8 h-8 text-iv-gold" />}
                  </div>
                  <h3 className="text-xl font-bold text-iv-white uppercase tracking-tight">{step.title}</h3>
                </div>
                <p className="leading-relaxed font-light" style={{ color: 'rgba(250,247,240,0.80)' }}>{step.description}</p>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 items-center gap-2">
                  <div className="w-1 h-1 bg-iv-gold/40 rounded-full animate-ping"></div>
                  <div className="w-8 h-px bg-iv-gold/20"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Timeline */}
        <div className="relative">
          <div className="absolute inset-0 bg-iv-gold/[0.02] rounded-[40px] blur-3xl pointer-events-none" />
          <div className="relative bg-iv-black/40 border border-iv-gold/10 rounded-[40px] p-10 md:p-16 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-iv-white uppercase tracking-tighter italic serif mb-2">Results Timeline</h3>
                <p className="text-sm text-iv-cream/65 font-light">First noticeable difference within 48 hours.</p>
              </div>
              <div className="flex items-center gap-3 bg-iv-gold/10 px-6 py-2 rounded-full border border-iv-gold/20">
                <Clock className="w-4 h-4 text-iv-gold" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-iv-gold">48-Hour TTW Guarantee</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {timeline.map((item, index) => {
                const isWow = index === 0
                return (
                  <div key={index} className="relative group">
                    <div
                      className="border rounded-3xl p-8 transition-all duration-500"
                      style={{
                        background: isWow ? 'linear-gradient(135deg, rgba(155, 71, 34,0.14) 0%, var(--iv-deep-green)/10% 100%)' : 'rgba(15,36,25,0.10)',
                        borderColor: isWow ? 'rgba(155, 71, 34,0.40)' : 'rgba(255,255,255,0.05)',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isWow ? 'linear-gradient(135deg, rgba(155, 71, 34,0.20) 0%, rgba(15,36,25,0.20) 100%)' : 'rgba(15,36,25,0.20)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = isWow ? 'linear-gradient(135deg, rgba(155, 71, 34,0.14) 0%, rgba(15,36,25,0.10) 100%)' : 'rgba(15,36,25,0.10)'}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span
                            className="text-[11px] font-black uppercase tracking-[0.4em]"
                            style={{ color: 'var(--iv-gold)' }}
                          >
                            {item.week}
                          </span>
                          {isWow && (
                            <span
                              className="ml-3 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(155, 71, 34,0.15)', color: 'var(--iv-gold)', border: '1px solid rgba(155, 71, 34,0.30)' }}
                            >
                              TTW
                            </span>
                          )}
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-iv-gold opacity-20 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-iv-white font-bold text-lg leading-tight mb-4 tracking-tight">{item.result}</p>
                      <div className="h-1 w-full bg-iv-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-iv-gold transition-all duration-1000"
                          style={{ width: `${isWow ? 18 : (index + 1) * 33}%`, opacity: isWow ? 0.7 : 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-16 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-iv-cream/65">
                TTW = Time To Wow — first perceptible sensory improvement. Structural results from Week 4.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
