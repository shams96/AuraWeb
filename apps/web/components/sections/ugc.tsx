import { ReactNode } from 'react'

interface Testimonial {
  name: string
  role: string
  content: string
  image: string
  beforeImage: string
  afterImage: string
  timeframe: string
}

interface UGCSectionProps {
  testimonials: Testimonial[]
}

export function UGCSection({ testimonials }: UGCSectionProps) {
  return (
    <section className="py-16 bg-iv-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-iv-white mb-4" style={{ fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic' }}>
            The Ritual in Practice
          </h2>
          <p className="text-lg text-iv-cream/70 max-w-3xl mx-auto font-light">
            How a renewed sense of vitality has changed the relationship between real people and their skin
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-iv-deep-green/30 rounded-xl shadow-2xl overflow-hidden border border-iv-gold/10 backdrop-blur-sm">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-iv-gold/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-iv-gold rounded-full flex items-center justify-center border-2 border-iv-black">
                      <svg className="w-3 h-3 text-iv-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-iv-white">{testimonial.name}</h3>
                    <p className="text-xs text-iv-cream/65 uppercase tracking-widest">{testimonial.role}</p>
                    <p className="text-xs text-iv-gold font-black mt-1">{testimonial.timeframe}</p>
                  </div>
                </div>
                
                <blockquote className="text-iv-cream/80 mb-8 italic leading-relaxed text-lg iv-serif">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tighter text-iv-cream/65 mb-3 ml-1">Baseline</p>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-iv-black shadow-inner border border-iv-white/5 group">
                      <img 
                        src={testimonial.beforeImage} 
                        alt="Before"
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-iv-black/60 backdrop-blur-md rounded text-[8px] font-black text-iv-white uppercase tracking-widest">
                        Before
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tighter text-iv-gold/40 mb-3 ml-1">Transformation</p>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-iv-black shadow-inner border border-iv-gold/20 group">
                      <img 
                        src={testimonial.afterImage} 
                        alt="After"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-iv-gold/80 backdrop-blur-md rounded text-[8px] font-black text-iv-black uppercase tracking-widest">
                        After
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-iv-gold/10 text-iv-gold px-8 py-4 rounded-full border border-iv-gold/20 shadow-lg">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-widest">Results typically appear within 2-8 weeks of consistent use</span>
          </div>
        </div>
        
        {/* Additional Social Proof */}
        <div className="mt-20 bg-gradient-to-br from-iv-deep-green/40 to-iv-black/40 rounded-3xl p-12 border border-iv-gold/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-iv-gold/[0.02] pointer-events-none"></div>
          <div className="text-center mb-12 relative z-10">
            <h3 className="text-2xl font-bold text-iv-white mb-2 uppercase tracking-[0.2em]">Trusted by Thousands</h3>
            <p className="text-iv-cream/65 text-sm">Join our global community of skin health advocates</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
            <div>
              <div className="text-4xl font-black text-iv-gold mb-2">4.8</div>
              <div className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest">Average Rating</div>
              <div className="flex justify-center mt-3 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-iv-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-4xl font-black text-iv-gold mb-2">2,500+</div>
              <div className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest">Global Reviews</div>
            </div>
            
            <div>
              <div className="text-4xl font-black text-iv-gold mb-2">95%</div>
              <div className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest">Member Retention</div>
            </div>
            
            <div>
              <div className="text-4xl font-black text-iv-gold mb-2">50+</div>
              <div className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest">Active Markets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
