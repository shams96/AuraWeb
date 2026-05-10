'use client'

import { Newspaper, Radio, Award, Share2 } from 'lucide-react'

export default function PressPage() {
  const news = [
    {
      outlet: 'Vogue Business',
      title: 'Isola Vitale: The New Frontier of Italian Haute Cosmeceuticals',
      date: 'April 2026'
    },
    {
      outlet: 'WWD',
      title: '1HubSolutions Unveils 2026 Hero SKU Collection for Isola Vitale',
      date: 'March 2026'
    },
    {
      outlet: 'Luxury Daily',
      title: 'Why Metabolic Alignment is the Next Big Trend in Anti-Aging',
      date: 'February 2026'
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Media Room </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none text-iv-white">Press & <span className="text-iv-gold italic serif">Authority</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light"> Global recognition for our breakthroughs in metabolic longevity and Italian luxury heritage. </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           {/* Recent Coverage */}
           <div className="space-y-12">
             <h2 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-12">Recent Coverage</h2>
             {news.map((item, idx) => (
               <div key={idx} className="group cursor-pointer border-b border-iv-white/5 pb-8 hover:border-iv-gold/30 transition-colors">
                 <div className="flex justify-between items-center mb-4">
                   <p className="text-iv-gold font-black uppercase tracking-widest text-[10px]">{item.outlet}</p>
                   <p className="text-iv-cream/30 text-[10px] uppercase tracking-widest font-black">{item.date}</p>
                 </div>
                 <h3 className="text-2xl font-bold text-iv-white group-hover:text-iv-gold transition-colors italic serif leading-tight">{item.title}</h3>
               </div>
             ))}
           </div>

           {/* Media Assets */}
           <div className="bg-iv-deep-green/10 p-12 rounded-3xl border border-iv-gold/10 backdrop-blur-sm relative overflow-hidden">
             <h2 className="text-3xl font-bold text-iv-white mb-8 tracking-tighter uppercase tracking-widest italic serif">Media Inquiries</h2>
             <p className="text-iv-cream/60 mb-10 text-sm leading-relaxed font-light">
               For interview requests with founder Shams Islam, high-resolution product assets, or laboratory backgrounders from Natural You Srl, please contact our media relations department.
             </p>
             <div className="space-y-6">
                <div className="p-6 bg-iv-black border border-iv-white/5 rounded-xl flex items-center justify-between group hover:border-iv-gold/20 transition-all">
                  <div className="flex items-center gap-4">
                    <Newspaper className="w-5 h-5 text-iv-gold" />
                    <span className="text-[10px] font-black text-iv-white uppercase tracking-widest">Press Kit 2026 (PDF)</span>
                  </div>
                  <Share2 className="w-4 h-4 text-iv-gold opacity-40" />
                </div>
                <div className="p-6 bg-iv-black border border-iv-white/5 rounded-xl flex items-center justify-between group hover:border-iv-gold/20 transition-all">
                  <div className="flex items-center gap-4">
                    <Radio className="w-5 h-5 text-iv-gold" />
                    <span className="text-[10px] font-black text-iv-white uppercase tracking-widest">Brand Guidelines</span>
                  </div>
                  <Share2 className="w-4 h-4 text-iv-gold opacity-40" />
                </div>
             </div>
             <div className="mt-12 pt-12 border-t border-iv-white/5">
                <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Media Contact</p>
                <p className="text-sm text-iv-white font-bold tracking-tight">press@1hubsolutions.com</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  )
}
