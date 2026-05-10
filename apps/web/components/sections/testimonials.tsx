import { Star, CheckCircle } from 'lucide-react'

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

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6 uppercase tracking-widest">
              Real Results, Real People
            </h2>
            <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. See what our customers have to say about their transformative journey with Bio-Adaptive Serum.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-iv-deep-green/30 rounded-2xl shadow-2xl overflow-hidden border border-iv-gold/10 hover:border-iv-gold/30 transition-all duration-300 backdrop-blur-sm">
                {/* Before/After Images Preview */}
                <div className="relative h-64 bg-iv-black border-b border-iv-gold/10">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-iv-black flex items-center justify-center border-r border-iv-white/5">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-iv-white/5 rounded-full mx-auto mb-2 border border-iv-white/10 shadow-inner"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/30">Baseline</p>
                      </div>
                    </div>
                    <div className="w-1/2 bg-iv-deep-green/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-iv-gold/10 rounded-full mx-auto mb-2 border border-iv-gold/20 shadow-[0_0_15px_rgba(184,151,47,0.1)]"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-iv-gold/60">Optimized</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-iv-gold text-iv-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter">
                    {testimonial.timeframe}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="p-8">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-iv-gold fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-iv-cream/80 leading-relaxed mb-8 italic font-serif text-lg">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 border-t border-iv-white/5 pt-6">
                    <div className="w-12 h-12 bg-iv-gold/10 rounded-full flex items-center justify-center border border-iv-gold/20">
                      <span className="text-sm font-bold text-iv-gold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-iv-white">{testimonial.name}</h4>
                      <p className="text-xs text-iv-cream/40 uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="mt-6 flex items-center space-x-2 text-iv-gold/60">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Purchase</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-iv-deep-green/40 to-iv-black/40 rounded-3xl p-12 border border-iv-gold/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-iv-gold/[0.03] rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-2xl font-bold text-iv-white mb-10 uppercase tracking-[0.2em] relative z-10">
                Trusted by Thousands
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                <div className="text-center">
                  <div className="text-4xl font-black text-iv-gold mb-2">4.8</div>
                  <div className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-iv-gold mb-2">2,450+</div>
                  <div className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Member Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-iv-gold mb-2">98%</div>
                  <div className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-iv-gold mb-2">30</div>
                  <div className="text-[10px] font-black text-iv-cream/40 uppercase tracking-widest">Day Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
