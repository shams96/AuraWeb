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
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Engineering </div>
          <h2 className="iv-type-h2 font-bold text-iv-white mb-6 tracking-tighter uppercase">
            Bio-Adaptive <span className="text-iv-gold italic serif lowercase">Dynamics</span>
          </h2>
          <p className="iv-type-lead text-iv-cream/50 max-w-2xl mx-auto font-light leading-relaxed">
            Our system operates in three distinct phases to ensure continuous metabolic synchronization with your skin environment.
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
                <p className="text-iv-cream/60 leading-relaxed font-light">{step.description}</p>
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
              <h3 className="text-3xl font-bold text-iv-white uppercase tracking-tighter italic serif">Results Timeline</h3>
              <div className="flex items-center gap-3 bg-iv-gold/10 px-6 py-2 rounded-full border border-iv-gold/20">
                <Clock className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-iv-gold">Standard Verification Window</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-iv-deep-green/10 border border-iv-white/5 rounded-3xl p-8 hover:bg-iv-deep-green/20 transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em]">{item.week}</span>
                      <CheckCircle2 className="w-5 h-5 text-iv-gold opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-iv-white font-bold text-lg leading-tight mb-4 tracking-tight">{item.result}</p>
                    <div className="h-1 w-full bg-iv-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-iv-gold opacity-40 transition-all duration-1000" style={{ width: `${(index + 1) * 33}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-iv-cream/30">
                Clinical assessment required for final protocol validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
