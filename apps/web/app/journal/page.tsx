import { Button } from '@aurabiosphere/ui'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function JournalPage() {
  const articles = [
    {
      id: 'metabolic-skincare',
      title: 'The Rise of Metabolic Skincare: Why Acids Are Only the Beginning',
      excerpt: 'Traditional skincare treats the surface. Metabolic skincare treats the engine. Discover why aligning formulations with your cellular age is the only way to achieve true longevity.',
      date: 'May 1, 2026',
      author: 'Dr. Shams Islam',
      category: 'Research'
    },
    {
      id: 'glp1-face',
      title: 'Defending Against Facial Deflation in the GLP-1 Era',
      excerpt: 'As metabolic medications redefine weight management, a new skin concern has emerged: "Ozempic Face." Learn how Isola Vitale’s GLP-1 Protective Complex shields your dermal adipose tissue.',
      date: 'April 15, 2026',
      author: 'Clinical Team',
      category: 'Innovation'
    },
    {
      id: 'senomorphic-peptides',
      title: 'Senomorphic Peptides: The New Frontier of Longevity Science',
      excerpt: 'By targeting "zombie cells" that refuse to die but stop functioning, senomorphic peptides like OS-01 are rewriting the rules of aging. Here is the data behind the 70% barrier improvement.',
      date: 'March 28, 2026',
      author: 'Natural You Srl',
      category: 'Science'
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            Scientific Intelligence
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">The <span className="text-iv-gold italic">Journal</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light">
            Insights from the intersection of cellular biology, Italian heritage, and clinical performance. 
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {articles.map((post) => (
              <article key={post.id} className="group bg-iv-deep-green/10 border border-iv-gold/10 rounded-2xl overflow-hidden hover:border-iv-gold/30 transition-all duration-500 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-iv-gold/[0.03] to-transparent pointer-events-none" />
                <div className="aspect-[16/10] bg-iv-black/40 relative overflow-hidden">
                   <div className="absolute inset-0 bg-iv-gold/5 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="p-8 relative z-10">
                  <div className="flex items-center gap-4 text-[10px] font-black text-iv-gold uppercase tracking-[0.2em] mb-6">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-iv-gold/30 rounded-full" />
                    <span className="text-iv-cream/40">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-iv-white mb-6 group-hover:text-iv-gold transition-colors line-clamp-2 italic serif leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-iv-cream/60 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-iv-white/5">
                    <div className="flex items-center gap-3 text-[10px] font-black text-iv-cream/30 uppercase tracking-widest">
                      <User className="w-3 h-3 text-iv-gold/40" />
                      {post.author}
                    </div>
                    <Link href={`/journal/${post.id}`} className="text-iv-gold flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                      Read Dossier <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-iv-deep-green/30 border-y border-iv-gold/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-iv-gold/[0.03] rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
          <h2 className="iv-type-h2 font-semibold mb-6 uppercase tracking-tight text-iv-white">Clinical Updates</h2>
          <p className="text-iv-cream/60 mb-12 text-sm leading-relaxed font-light">Join our B2B professional network for the latest peer-reviewed dossiers and early access to Clinical A-Series enhancements.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="professional@email.com" 
              className="flex-1 bg-iv-black/40 border border-iv-gold/20 rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors"
            />
            <Button className="bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-xs uppercase tracking-widest px-10 py-4 rounded-none transition-all">
              Join Authority
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
