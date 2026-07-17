
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to the most common questions about Chiarelle\'s four adaptive protocols, the science of skin vitality, shipping, returns, and the 90-day ritual guarantee.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'The System',
      items: [
        {
          q: 'What is Metabolic Skincare?',
          a: 'Metabolic skincare targets the cellular processes that govern skin health, volume, and repair. Unlike traditional skincare which focuses on topical symptoms, Chiarelle formulations provide metabolic signals that optimize the cellular engine itself.'
        },
        {
          q: 'How do the 4 Protocols work?',
          a: 'Our Skin Intelligence Protocols™ are divided into four cellular stage tiers — Foundation, Correction, Regeneration, and Longevity — that align formulation potency with your skin\'s specific metabolic performance needs. No age categories. Protocol selection is based on cellular stage, not chronological age.'
        },
        {
          q: 'What are Cellular Renewal Complexs?',
          a: 'Cellular Renewal peptides are molecules that target "zombie" cells (senescent cells) that remain in the skin and emit inflammatory markers. Our Cellular Renewal Complex technology helps clear these cells to restore barrier function.'
        }
      ]
    },
    {
      category: 'Shipping & Acquisition',
      items: [
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we provide global shipping from our centers in Texas, USA and Isola del Liri, Italy. Clinical A-Series products may have specific regional restrictions for professional use.'
        },
        {
          q: 'What is the return policy?',
          a: 'We offer a 90-day ritual guarantee. If after three months of consistent use you do not experience a measurable improvement in skin resilience and vitality, our concierge team will arrange a full refund — no explanation required.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md">
            Information Center
          </div>
          <h1 className="iv-type-display font-semibold mb-6 uppercase">Frequently <span className="text-iv-gold italic">Asked</span></h1>
          <p className="text-lg text-iv-cream/70 max-w-2xl leading-relaxed font-light">
            Everything you need to know about our metabolic technology, acquisition process, and the 2026 Hero SKU launch.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-20">
            {faqs.map((category, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-12 border-b border-iv-gold/20 pb-4">{category.category}</h2>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="bg-iv-deep-green/10 border border-iv-white/5 p-8 rounded-2xl hover:border-iv-gold/20 transition-all group">
                      <h3 className="text-lg font-bold text-iv-white mb-4 tracking-tight group-hover:text-iv-gold transition-colors italic">{item.q}</h3>
                      <p className="text-iv-cream/60 text-sm font-light leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Support CTA */}
      <section className="mt-20 container mx-auto px-4 max-w-4xl">
        <div className="p-12 bg-iv-gold/10 border border-iv-gold/20 rounded-3xl text-center backdrop-blur-md">
          <h3 className="text-xl font-bold text-iv-white mb-4 uppercase tracking-widest">Still Have Inquiries?</h3>
          <p className="text-iv-cream/60 mb-8 font-light text-sm max-w-md mx-auto">Our professional concierge team is available for real-time metabolic consultations and acquisition assistance.</p>
          <a href="/contact" className="inline-block bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-xs uppercase tracking-widest px-12 py-5 rounded-none transition-all shadow-xl">
            Contact Concierge
          </a>
        </div>
      </section>
    </div>
  )
}
