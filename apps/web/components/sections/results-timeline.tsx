import { ArrowRight } from 'lucide-react'

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
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6">
              See Real Results
            </h2>
            <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed">
              Experience the transformation journey with our Bio-Adaptive Serum. 
              Watch your skin evolve from sensitive to strong.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-iv-gold/0 via-iv-gold/40 to-iv-gold/0"></div>
            
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-iv-deep-green/30 rounded-2xl p-8 shadow-2xl border border-iv-gold/10 backdrop-blur-md">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-iv-black border border-iv-gold/20 rounded-full flex items-center justify-center shadow-inner">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-iv-white">{item.title}</h3>
                          <p className="text-iv-gold font-bold uppercase tracking-widest text-xs">{item.period}</p>
                        </div>
                      </div>
                      <p className="text-iv-cream/80 leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-iv-black border-2 border-iv-gold rounded-full z-10 shadow-[0_0_15px_rgba(184,151,47,0.4)]"></div>

                  {/* Spacer */}
                  <div className="w-2/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Result CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-iv-deep-green to-iv-black border border-iv-gold/20 rounded-2xl p-10 text-iv-white max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-iv-gold/5 rounded-full blur-2xl"></div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">
                Ready for Transformed Skin?
              </h3>
              <p className="text-lg mb-8 text-iv-cream/70 relative z-10">
                Join thousands who have already experienced the power of Bio-Adaptive Technology.
              </p>
              <div className="flex justify-center space-x-4 relative z-10">
                <button className="bg-iv-gold text-iv-black px-10 py-4 rounded-md font-bold hover:bg-iv-gold-light transition-all shadow-lg hover:shadow-iv-gold/20 tracking-widest uppercase text-xs">
                  Shop Now
                </button>
                <button className="bg-transparent border border-iv-gold text-iv-gold px-10 py-4 rounded-md font-bold hover:bg-iv-gold/10 transition-all tracking-widest uppercase text-xs">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
