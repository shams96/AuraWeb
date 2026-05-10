'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-iv-black pb-32">
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none text-iv-white">Terms of <span className="text-iv-gold italic serif">Agreement</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light"> The legal framework governing your relationship with the House of Isola Vitale. </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-iv-white uppercase tracking-widest italic serif">1. Acceptance</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> By accessing isolavitale.com, you agree to comply with these terms. The platform is operated by 1HubSolutions LLC. </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-iv-white uppercase tracking-widest italic serif">2. Clinical Disclaimer</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> Our products are intended for cosmetic and anti-aging metabolic support. They do not constitute medical advice. Consult with a qualified professional for chronic dermatological conditions. </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-iv-white uppercase tracking-widest italic serif">3. Intellectual Authority</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> All formulations, trademarks, and scientific dossiers are the exclusive property of 1HubSolutions LLC and Natural You Srl. </p>
          </div>

          <div className="pt-16 border-t border-iv-white/5">
             <p className="text-[10px] font-black text-iv-cream/30 uppercase tracking-widest italic"> Last Updated: May 2026 </p>
          </div>
        </div>
      </section>
    </div>
  )
}
