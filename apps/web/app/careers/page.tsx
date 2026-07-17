'use client'

import { Briefcase, Users, Star, ArrowRight } from 'lucide-react'

export default function CareersPage() {
  const openings = [
    {
      title: 'Clinical Formulation Scientist',
      location: 'Isola del Liri, Italy',
      type: 'Full-time'
    },
    {
      title: 'Luxury Retail Concierge',
      location: 'Remote / Global',
      type: 'Full-time'
    },
    {
      title: 'Supply Chain Manager',
      location: 'Allen, Texas, USA',
      type: 'Full-time'
    }
  ]

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold"> Join The House </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase text-iv-white">The <span className="text-iv-gold italic">Aspiration</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl mx-auto leading-relaxed font-light">
            We are building the future of metabolic longevity. Join a global team of scientists, designers, and visionaries dedicated to redefining the luxury skincare cycle.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="text-center space-y-6">
             <div className="w-16 h-16 bg-iv-deep-green/20 border border-iv-gold/20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Users className="w-6 h-6 text-iv-gold" />
             </div>
             <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.3em]">Global Collaboration</h3>
             <p className="text-iv-cream/65 text-xs leading-relaxed font-light">Bridge the gap between Texas innovation and Italian heritage.</p>
          </div>
          <div className="text-center space-y-6">
             <div className="w-16 h-16 bg-iv-deep-green/20 border border-iv-gold/20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Star className="w-6 h-6 text-iv-gold" />
             </div>
             <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.3em]">Scientific Excellence</h3>
             <p className="text-iv-cream/65 text-xs leading-relaxed font-light">Work with peer-reviewed formulations and breakthrough technologies.</p>
          </div>
          <div className="text-center space-y-6">
             <div className="w-16 h-16 bg-iv-deep-green/20 border border-iv-gold/20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Briefcase className="w-6 h-6 text-iv-gold" />
             </div>
             <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.3em]">Growth Trajectory</h3>
             <p className="text-iv-cream/65 text-xs leading-relaxed font-light">Be part of 1HubSolutions' expansion into the global luxury market.</p>
          </div>
        </div>

        {/* Job List */}
        <div className="max-w-4xl mx-auto space-y-8">
           <h2 className="text-3xl font-bold text-iv-white mb-12 uppercase tracking-tight italic text-center">Open Positions</h2>
           {openings.map((job, idx) => (
             <div key={idx} className="group bg-iv-deep-green/10 border border-iv-white/5 p-8 flex flex-col md:flex-row justify-between items-center hover:border-iv-gold/30 transition-all rounded-2xl">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-iv-white mb-2 italic">{job.title}</h3>
                  <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest">{job.location} · {job.type}</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black text-iv-white uppercase tracking-[0.2em] group-hover:text-iv-gold transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
             </div>
           ))}
        </div>
      </section>

      {/* Footer Support CTA */}
      <section className="mt-20 container mx-auto px-4 max-w-4xl text-center">
        <p className="text-iv-cream/65 text-[10px] font-black uppercase tracking-[0.5em]">Spontaneous Application?</p>
        <p className="text-iv-cream/60 mt-4 text-sm font-light">Send your portfolio to careers@chiarelle.com</p>
      </section>
    </div>
  )
}
