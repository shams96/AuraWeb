import { AlertCircle, Shield, Zap, Activity, Globe, Smartphone, Thermometer, Briefcase } from 'lucide-react'

interface ProblemEducationBlockProps {
  problem: string
  context: string[]
}

export function ProblemEducationBlock({ problem, context }: ProblemEducationBlockProps) {
  const stressors = [
    { icon: <Globe className="w-5 h-5" />, title: 'Urban Pollution', desc: 'Particulate matter and free radical exposure.', color: 'text-blue-400' },
    { icon: <Smartphone className="w-5 h-5" />, title: 'Blue Light', desc: 'High-energy visible light oxidative stress.', color: 'text-iv-gold' },
    { icon: <Thermometer className="w-5 h-5" />, title: 'Climate Flux', desc: 'Extreme temperature disruption of barrier lipids.', color: 'text-red-400' },
    { icon: <Briefcase className="w-5 h-5" />, title: 'Cortisol Stress', desc: 'Modern lifestyle impact on cellular repair.', color: 'text-emerald-400' },
  ]

  return (
    <section className="py-24 bg-iv-black relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-iv-gold/[0.02] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Clinical Context </div>
          <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6 tracking-tighter uppercase">
            The Rise of <span className="text-iv-gold italic serif lowercase">{problem}</span>
          </h2>
          <p className="text-lg text-iv-cream/65 max-w-2xl mx-auto font-light leading-relaxed">
            Metabolic skincare addresses the root causes of dermal degradation triggered by 21st-century environmental stressors.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-8">
              {context.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-iv-gold/5 rounded-lg flex items-center justify-center border border-iv-gold/10 group-hover:border-iv-gold/40 transition-colors">
                      <Shield className="w-4 h-4 text-iv-gold" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="text-iv-cream/80 text-lg font-light leading-relaxed group-hover:text-iv-white transition-colors">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-iv-gold/5 rounded-[32px] blur-2xl opacity-50"></div>
            <div className="relative bg-iv-deep-green/10 p-10 md:p-12 rounded-[32px] shadow-2xl border border-iv-gold/10 backdrop-blur-xl">
              <h3 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-10 border-b border-iv-gold/10 pb-6">Metabolic Stress Vectors</h3>
              <div className="grid sm:grid-cols-2 gap-10">
                {stressors.map((s, i) => (
                  <div key={i} className="space-y-4">
                    <div className={`w-12 h-12 bg-iv-black/40 rounded-xl flex items-center justify-center border border-iv-white/5 ${s.color}`}>
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-iv-white text-sm uppercase tracking-widest">{s.title}</h4>
                      <p className="text-xs text-iv-cream/65 leading-relaxed font-light mt-2">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center bg-iv-gold/5 text-iv-gold/60 px-8 py-4 rounded-2xl border border-iv-gold/10 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 mr-4 text-iv-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">Traditional formulations often over-treat, inducing cellular fatigue.</span>
          </div>
        </div>
      </div>
    </section>
  )
 }
