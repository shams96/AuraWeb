import { Mail, Check, Star, Shield } from 'lucide-react'

export function Newsletter() {
  return (
    <section className="py-20 bg-iv-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-iv-gold/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6 uppercase tracking-widest">
              Join the Isola Vitale Society
            </h2>
            <p className="text-xl text-iv-cream/70 leading-relaxed max-w-2xl mx-auto">
              Subscribe for exclusive access to advanced formulations, 
              private events, and the latest in metabolic skincare science.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-iv-deep-green/30 rounded-2xl shadow-2xl p-10 max-w-2xl mx-auto border border-iv-gold/10 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-iv-black border border-iv-gold/20 rounded-md focus:outline-none focus:border-iv-gold text-iv-white placeholder-iv-white/20 transition-all font-medium"
                required
              />
              <button className="bg-iv-gold hover:bg-iv-gold-light text-iv-black px-10 py-4 rounded-md font-bold transition-all flex items-center justify-center space-x-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-iv-gold/20">
                <Mail className="w-4 h-4" />
                <span>Join Now</span>
              </button>
            </div>
            
            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/50">Exclusive access</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Star className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/50">Science reports</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/50">Early releases</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            <div className="flex items-center space-x-3 text-iv-cream/30">
              <Shield className="w-5 h-5 text-iv-gold/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Privacy Secured</span>
            </div>
            <div className="flex items-center space-x-3 text-iv-cream/30">
              <Mail className="w-5 h-5 text-iv-gold/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Curated Weekly</span>
            </div>
            <div className="flex items-center space-x-3 text-iv-cream/30">
              <Star className="w-5 h-5 text-iv-gold/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Expert Validated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
