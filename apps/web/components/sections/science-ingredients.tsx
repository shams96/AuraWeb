import { Beaker, CheckCircle2, FlaskConical, Microchip, Microscope, Thermometer } from 'lucide-react'

interface Ingredient {
  name: string
  description: string
  benefits: string[]
  concentration: string
}

interface ScienceIngredientsProps {
  keyIngredients: Ingredient[]
  mechanism: string
}

export function ScienceIngredients({ keyIngredients, mechanism }: ScienceIngredientsProps) {
  const icons = [<FlaskConical className="w-6 h-6" />, <Microchip className="w-6 h-6" />, <Microscope className="w-6 h-6" />]

  return (
    <section className="py-24 bg-iv-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-iv-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Laboratory Standards </div>
            <h2 className="iv-type-h2 font-bold text-iv-white mb-6 tracking-tighter uppercase">
              Precision <span className="text-iv-gold italic serif lowercase">Formulation</span>
            </h2>
            <p className="iv-type-lead text-iv-cream/50 max-w-2xl mx-auto font-light leading-relaxed">
              Every ingredient is selected for biological compatibility and stabilized through advanced pharmaceutical encapsulation.
            </p>
          </div>

          {/* Ingredients Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
            {keyIngredients.map((ingredient, index) => (
              <div key={index} className="bg-iv-deep-green/10 rounded-[32px] p-10 border border-iv-gold/10 hover:border-iv-gold/30 transition-all duration-500 group backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-iv-black/40 rounded-xl flex items-center justify-center border border-iv-white/5 text-iv-gold group-hover:scale-110 transition-transform">
                    {icons[index % icons.length]}
                  </div>
                  <span className="bg-iv-gold/10 text-iv-gold px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-iv-gold/20">
                    {ingredient.concentration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-iv-white mb-6 tracking-tight group-hover:text-iv-gold transition-colors">{ingredient.name}</h3>
                <p className="text-iv-cream/60 mb-8 text-sm leading-relaxed font-light">{ingredient.description}</p>

                <div className="space-y-4 pt-6 border-t border-iv-white/5">
                  {ingredient.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-iv-gold/40 flex-shrink-0" />
                      <span className="text-iv-cream/80 text-xs font-light">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Transparency Module */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-iv-gold/10 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-iv-black/60 border border-iv-gold/10 rounded-[40px] p-10 md:p-16 backdrop-blur-xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-iv-white tracking-tighter uppercase italic serif">Dose Transparency</h3>
                  <p className="text-lg text-iv-cream/60 font-light leading-relaxed">
                    Our formulations prioritize transparency. We disclose exact concentrations of active molecules, ensuring therapeutic efficacy without the risk of cellular fatigue.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-iv-gold/5 border border-iv-gold/10 p-6 rounded-2xl">
                      <p className="text-[2rem] font-bold text-iv-gold leading-none mb-2">99.8%</p>
                      <p className="text-[10px] font-black text-iv-white/40 uppercase tracking-widest">Purity Grade</p>
                    </div>
                    <div className="bg-iv-gold/5 border border-iv-gold/10 p-6 rounded-2xl">
                      <p className="text-[2rem] font-bold text-iv-gold leading-none mb-2">5.5</p>
                      <p className="text-[10px] font-black text-iv-white/40 uppercase tracking-widest">Stabilized pH</p>
                    </div>
                  </div>
                </div>
                <div className="bg-iv-black/40 rounded-3xl p-10 border border-iv-white/5 space-y-6">
                  <div className="flex items-center gap-4 text-iv-gold">
                    <Beaker className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Mechanism of Action</span>
                  </div>
                  <p className="text-iv-cream/80 text-sm leading-relaxed font-light italic">
                    "{mechanism}"
                  </p>
                  <div className="pt-6 border-t border-iv-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-iv-gold animate-pulse" />
                      <span className="text-[10px] font-black text-iv-white/40 uppercase tracking-widest">Active Verification</span>
                    </div>
                    <span className="text-[10px] font-black text-iv-gold uppercase tracking-[0.2em]">Verified 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
