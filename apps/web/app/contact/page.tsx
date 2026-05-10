'use client'

import { Button } from '@aurabiosphere/ui'
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            Concierge Services
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter uppercase tracking-widest leading-none">Contact <span className="text-iv-gold italic serif">The House</span></h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light">
            Whether you are a retail client or a B2B clinical partner, our concierge team is available to assist with metabolic consultations, acquisition inquiries, and professional onboarding.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div className="bg-iv-deep-green/10 p-12 rounded-3xl border border-iv-gold/10 backdrop-blur-sm relative overflow-hidden">
              <h2 className="text-3xl font-bold text-iv-white mb-8 tracking-tighter uppercase tracking-widest italic serif">Inquiry Form</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="ANTONIO ROSSI" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="ROSSI@CLINIC.IT" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Inquiry Type</label>
                  <select className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors appearance-none">
                    <option>ACQUISITION INQUIRY</option>
                    <option>B2B PROFESSIONAL PORTAL</option>
                    <option>METABOLIC CONSULTATION</option>
                    <option>PRESS & MEDIA</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Message</label>
                  <textarea rows={6} className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="YOUR MESSAGE TO THE HOUSE..."></textarea>
                </div>
                <Button className="w-full bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-xs uppercase tracking-widest py-8 rounded-none transition-all shadow-xl">
                  Transmit Inquiry
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-iv-white mb-10 tracking-tighter uppercase tracking-widest italic serif">Direct Channels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-iv-black border border-iv-white/5 rounded-2xl group hover:border-iv-gold/20 transition-all">
                    <Mail className="w-6 h-6 text-iv-gold mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Digital Correspondence</p>
                    <p className="text-sm text-iv-white font-bold tracking-tight">shams@1hubsolutions.com</p>
                  </div>
                  <div className="p-8 bg-iv-black border border-iv-white/5 rounded-2xl group hover:border-iv-gold/20 transition-all">
                    <Phone className="w-6 h-6 text-iv-gold mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Voice Assistance</p>
                    <p className="text-sm text-iv-white font-bold tracking-tight">+1 (214) 1HubSolutions</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-iv-white mb-10 tracking-tighter uppercase tracking-widest italic serif">Global Presence</h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-iv-deep-green/20 border border-iv-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-iv-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-1">Corporate HQ</p>
                      <p className="text-sm text-iv-white font-bold tracking-tight mb-2">1314 Waterdown Dr.</p>
                      <p className="text-xs text-iv-cream/40 uppercase tracking-widest">Allen, Texas 75013, USA</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-iv-deep-green/20 border border-iv-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-iv-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-1">Laboratory & Manufacturing</p>
                      <p className="text-sm text-iv-white font-bold tracking-tight mb-2">Natural You Srl</p>
                      <p className="text-xs text-iv-cream/40 uppercase tracking-widest">Isola del Liri (FR), Italy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
