'use client'

import { useState } from 'react'
import { Button } from '@aurabiosphere/ui'
import { Mail, Phone, MapPin } from 'lucide-react'

const INQUIRY_TYPES = [
  'ACQUISITION INQUIRY',
  'B2B PROFESSIONAL PORTAL',
  'METABOLIC CONSULTATION',
  'PRESS & MEDIA',
] as const

type InquiryType = typeof INQUIRY_TYPES[number]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiryType: INQUIRY_TYPES[0] as InquiryType,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const next: Partial<typeof form> = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'A valid email is required.'
    if (!form.message.trim()) next.message = 'Please provide a message.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setErrors({})
    // Simulate submission — wire up to actual endpoint when ready
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      setErrors(errs => { const next = { ...errs }; delete next[field]; return next })
    }
  }

  const inputClass = (field: keyof typeof form) =>
    `w-full bg-iv-black/40 border rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500/60 focus:border-red-400' : 'border-iv-gold/20 focus:border-iv-gold'
    }`

  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            Concierge Services
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">
            Contact <span className="text-iv-gold italic">The House</span>
          </h1>
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
              <h2 className="text-3xl font-bold text-iv-white mb-8 uppercase tracking-tight italic">
                Inquiry Form
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center space-y-6 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-iv-gold/10 border border-iv-gold/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-iv-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-iv-white font-bold text-xl uppercase tracking-widest">Inquiry Transmitted</p>
                  <p className="text-iv-cream/50 text-sm leading-relaxed max-w-xs">
                    Our concierge team will respond within 24 hours. We look forward to assisting you.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update('name')}
                        className={inputClass('name')}
                        placeholder="ANTONIO ROSSI"
                        disabled={loading}
                      />
                      {errors.name && <p className="text-red-400 text-[10px] font-bold">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className={inputClass('email')}
                        placeholder="ROSSI@CLINIC.IT"
                        disabled={loading}
                      />
                      {errors.email && <p className="text-red-400 text-[10px] font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Inquiry Type</label>
                    <select
                      value={form.inquiryType}
                      onChange={update('inquiryType')}
                      className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-6 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors appearance-none"
                      disabled={loading}
                    >
                      {INQUIRY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Message</label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={update('message')}
                      className={inputClass('message')}
                      placeholder="YOUR MESSAGE TO THE HOUSE..."
                      disabled={loading}
                    />
                    {errors.message && <p className="text-red-400 text-[10px] font-bold">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-iv-gold hover:bg-iv-gold-light disabled:opacity-60 text-iv-black font-black text-xs uppercase tracking-widest py-8 rounded-none transition-all shadow-xl"
                  >
                    {loading ? 'Transmitting…' : 'Transmit Inquiry'}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-iv-white mb-10 uppercase tracking-tight italic">Direct Channels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-iv-black border border-iv-white/5 rounded-2xl group hover:border-iv-gold/20 transition-all">
                    <Mail className="w-6 h-6 text-iv-gold mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Digital Correspondence</p>
                    <p className="text-sm text-iv-white font-bold tracking-tight">concierge@isolavitale.com</p>
                  </div>
                  <div className="p-8 bg-iv-black border border-iv-white/5 rounded-2xl group hover:border-iv-gold/20 transition-all">
                    <Phone className="w-6 h-6 text-iv-gold mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-2">Voice Assistance</p>
                    <p className="text-sm text-iv-white font-bold tracking-tight">+1 (214) 714-3597</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-iv-white mb-10 uppercase tracking-tight italic">Global Presence</h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-iv-deep-green/20 border border-iv-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-iv-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-1">Corporate HQ</p>
                      <p className="text-sm text-iv-white font-bold tracking-tight mb-2">1314 Waterdown Dr.</p>
                      <p className="text-xs text-iv-cream/65 uppercase tracking-widest">Allen, Texas 75013, USA</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-iv-deep-green/20 border border-iv-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-iv-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-iv-gold uppercase tracking-widest mb-1">Laboratory & Manufacturing</p>
                      <p className="text-sm text-iv-white font-bold tracking-tight mb-2">Natural You Srl</p>
                      <p className="text-xs text-iv-cream/65 uppercase tracking-widest">Isola del Liri (FR), Italy</p>
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
