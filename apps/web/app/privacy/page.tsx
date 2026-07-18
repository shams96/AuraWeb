'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-iv-black pb-32">
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h1 className="iv-type-display font-semibold mb-8 uppercase text-iv-white">Privacy <span className="text-iv-gold italic">Protocols</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light"> Your digital integrity is as critical as your biological integrity. </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-iv-white uppercase tracking-widest italic">Data Acquisition</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> At Chiarel (A 1HubSolutions LLC Company), we collect information to tailor your ritual and your recommendations. This includes skin assessment responses, order history, and how you use our site.</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-iv-white uppercase tracking-widest italic">Clinical Security</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> We utilize enterprise-grade encryption to shield your sensitive skin profiles and payment credentials. Your data is never sold to third-party marketing entities. </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-iv-white uppercase tracking-widest italic">GDPR & Global Compliance</h2>
            <p className="text-iv-cream/60 leading-relaxed font-light"> We adhere to all EU and US privacy standards, ensuring your right to access, rectify, or erase your digital footprint from the House. </p>
          </div>

          <div className="pt-16 border-t border-iv-white/5">
             <p className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest italic"> Last Updated: May 2026 </p>
          </div>
        </div>
      </section>
    </div>
  )
}
