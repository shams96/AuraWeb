'use client'

export default function ShippingPage() {
  const regions = [
    { name: 'North America', delivery: '3 - 5 Business Days', cost: 'Complimentary for Acquisitions > $150' },
    { name: 'Europe (EMEA)', delivery: '2 - 4 Business Days', cost: 'Complimentary for Acquisitions > €140' },
    { name: 'Rest of World', delivery: '5 - 10 Business Days', cost: 'Calculated at Secure Transmission' }
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Logistics </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none text-iv-white">Global <span className="text-iv-gold italic serif">Acquisition</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light"> High-precision logistics for high-precision skincare. We ensure your metabolic protocols are delivered with clinical integrity. </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-4xl">
        <div className="space-y-16">
          {regions.map((region) => (
            <div key={region.name} className="p-10 bg-iv-deep-green/10 border border-iv-white/5 rounded-3xl hover:border-iv-gold/20 transition-all group">
              <h2 className="text-2xl font-bold text-iv-white mb-6 uppercase tracking-widest italic serif">{region.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Delivery Window</p>
                  <p className="text-iv-white font-bold tracking-tight">{region.delivery}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Acquisition Cost</p>
                  <p className="text-iv-white font-bold tracking-tight">{region.cost}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-16 border-t border-iv-white/5 space-y-8">
             <h2 className="text-3xl font-bold text-iv-white tracking-tighter uppercase tracking-widest italic serif">Clinical Integrity Policy</h2>
             <p className="text-iv-cream/60 leading-relaxed font-light"> All Isola Vitale products are stabilized and temperature-monitored during transit from our laboratories in Isola del Liri. We utilize premium, low-impact packaging to ensure 100% molecular stability upon arrival. </p>
          </div>
        </div>
      </section>
    </div>
  )
}
