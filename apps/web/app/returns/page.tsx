'use client'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-iv-black pb-32">
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Satisfaction </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none text-iv-white">Returns <span className="text-iv-gold italic serif">Policy</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light"> We stand behind the scientific efficacy of every formulation. If your metabolic results do not align with our clinical benchmarks, we facilitate a seamless resolution. </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-3xl">
        <div className="prose prose-invert max-w-none space-y-12">
          <div className="p-10 bg-iv-deep-green/10 border border-iv-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-iv-white mb-6 uppercase tracking-widest italic serif">30-Day Clinical Guarantee</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> You have 30 days from the point of acquisition to evaluate the compatibility of the Isola Vitale system with your skin metabolism. If you experience unexpected reactive markers or are dissatisfied with the chronological performance, you may initiate a return. </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-iv-white uppercase tracking-widest italic serif">The Procedure</h3>
            <ul className="space-y-4 text-iv-cream/60 font-light">
              <li className="flex gap-4 items-start"><span className="text-iv-gold font-bold">01.</span> Transmit a request to shams@1hubsolutions.com with your acquisition ID.</li>
              <li className="flex gap-4 items-start"><span className="text-iv-gold font-bold">02.</span> Receive a pre-authorized logistics label for molecular review.</li>
              <li className="flex gap-4 items-start"><span className="text-iv-gold font-bold">03.</span> Upon laboratory verification of the product integrity, your refund or tier-adjustment will be processed within 5-7 days.</li>
            </ul>
          </div>
          
          <div className="pt-16 border-t border-iv-white/5">
             <p className="text-[10px] font-black text-iv-cream/30 uppercase tracking-widest italic"> Note: Clinical A-Series professional products are subject to different terms specified in the B2B portal agreement. </p>
          </div>
        </div>
      </section>
    </div>
  )
}
