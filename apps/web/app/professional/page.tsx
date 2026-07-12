'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Shield, Beaker, Users, TrendingUp, CheckCircle, ArrowRight, Star, Lock, Globe, Award } from 'lucide-react'
import { Button } from '@/components/ui-lib'

const TIERS = [
  {
    name: 'Clinical Partner',
    subtitle: 'Dermatology Clinics & Spas',
    minOrder: '$2,500',
    discount: '30%',
    features: [
      'Full Clinical A-Series access',
      'Dedicated account manager',
      'Clinical training portal',
      'Co-branded treatment menus',
      'Net-30 payment terms',
      'Priority stock allocation',
    ],
    cta: 'Apply Now',
    highlight: false,
  },
  {
    name: 'Wholesale Partner',
    subtitle: 'Retailers & Distributors',
    minOrder: '$5,000',
    discount: '40%',
    features: [
      'Full product catalog access',
      'Exclusive regional pricing',
      'Marketing asset library',
      'White-label consultation',
      'Net-60 payment terms',
      'Quarterly rebate program',
    ],
    cta: 'Apply Now',
    highlight: true,
  },
  {
    name: 'Medical Distributor',
    subtitle: 'Hospitals & Medical Groups',
    minOrder: 'Custom',
    discount: 'Custom',
    features: [
      'Formulary consultation',
      'Custom packaging & labeling',
      'IRB study partnership',
      'Medical liaison support',
      'Extended credit terms',
      'Regulatory filing support',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
]

const BENEFITS = [
  {
    icon: <Beaker className="w-6 h-6 text-iv-gold" />,
    title: 'Clinical-Grade Access',
    desc: 'Full access to the A-Series clinical formulations unavailable on the consumer portal.',
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-iv-gold" />,
    title: 'Margin Architecture',
    desc: 'Industry-leading margins of 30–40% with volume-based rebates and quarterly performance bonuses.',
  },
  {
    icon: <Users className="w-6 h-6 text-iv-gold" />,
    title: 'Training & Certification',
    desc: 'Complimentary Liri Resilience Matrix™ Protocol Certification for your clinical or retail team.',
  },
  {
    icon: <Globe className="w-6 h-6 text-iv-gold" />,
    title: 'Exclusive Territories',
    desc: 'Regional exclusivity agreements available for qualified partners in key markets.',
  },
  {
    icon: <Shield className="w-6 h-6 text-iv-gold" />,
    title: 'Regulatory Support',
    desc: 'Full dossier support including SDS, CoAs, INCI lists, and EU/FDA compliance documentation.',
  },
  {
    icon: <Award className="w-6 h-6 text-iv-gold" />,
    title: 'Co-Marketing Funds',
    desc: 'Annual co-op marketing budget for qualified partners — digital, print, and in-clinic.',
  },
]

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Clinical Partner tier starts at $2,500 per order. Wholesale and Medical Distributor tiers are negotiated based on territory and volume commitment.',
  },
  {
    q: 'How long does the application review take?',
    a: 'Applications are reviewed within 5 business days. Approved partners receive their portal credentials and onboarding pack within 48 hours of approval.',
  },
  {
    q: 'Are Clinical A-Series products available to all B2B partners?',
    a: 'Clinical A-Series is available exclusively to verified clinical partners (dermatology, aesthetics, medical spas). Retail/wholesale partners access the Consumer B-Series and Hero SKUs.',
  },
  {
    q: 'Do you offer private-label or white-label formulations?',
    a: 'Yes — through our Medical Distributor tier. Minimum annual commitment applies. Contact our commercial team for a private consultation.',
  },
]

export default function ProfessionalPage() {
  const [form, setForm] = useState({ name: '', business: '', email: '', type: 'Clinical Partner', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-iv-black">

      {/* Hero */}
      <section className="bg-iv-deep-green/20 border-b border-iv-gold/10 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-iv-gold/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-iv-gold/[0.03] rounded-full blur-[140px] -mr-64 -mt-64 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="inline-flex items-center gap-3 border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            <Lock className="w-3 h-3" />
            Professional Portal
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">
            Partner <span className="text-iv-gold italic serif">With Us</span>
          </h1>
          <p className="text-xl text-iv-cream/70 max-w-3xl leading-relaxed font-light mb-12">
            Join the LIRI ROMA professional network. Access clinical-grade formulations, industry-leading margins, and the science behind the world's first 4-tier metabolic skincare system.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 text-iv-cream/60">
              <CheckCircle className="w-4 h-4 text-iv-gold" />
              <span className="text-xs font-bold uppercase tracking-widest">Clinical A-Series Access</span>
            </div>
            <div className="flex items-center gap-3 text-iv-cream/60">
              <CheckCircle className="w-4 h-4 text-iv-gold" />
              <span className="text-xs font-bold uppercase tracking-widest">Up to 40% Margin</span>
            </div>
            <div className="flex items-center gap-3 text-iv-cream/60">
              <CheckCircle className="w-4 h-4 text-iv-gold" />
              <span className="text-xs font-bold uppercase tracking-widest">Dedicated Account Manager</span>
            </div>
            <div className="flex items-center gap-3 text-iv-cream/60">
              <CheckCircle className="w-4 h-4 text-iv-gold" />
              <span className="text-xs font-bold uppercase tracking-widest">Territory Exclusivity Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Why Partner</p>
            <h2 className="text-4xl font-bold text-iv-white tracking-tighter uppercase">The Partner Advantage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map(({ icon, title, desc }) => (
              <div key={title} className="bg-iv-deep-green/10 border border-iv-gold/10 rounded-2xl p-8 hover:border-iv-gold/30 transition-all group">
                <div className="w-12 h-12 bg-iv-black border border-iv-gold/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="text-base font-black text-iv-white uppercase tracking-widest mb-3">{title}</h3>
                <p className="text-sm text-iv-cream/60 leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-24 bg-iv-deep-green/10 border-y border-iv-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Partnership Tiers</p>
            <h2 className="text-4xl font-bold text-iv-white tracking-tighter uppercase">Choose Your <span className="text-iv-gold italic serif">Structure</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map(({ name, subtitle, minOrder, discount, features, cta, highlight }) => (
              <div key={name} className={`relative rounded-3xl p-8 border transition-all duration-300 ${highlight ? 'border-iv-gold bg-iv-gold/5 shadow-[0_0_40px_rgba(184,151,47,0.1)]' : 'border-iv-gold/10 bg-iv-black hover:border-iv-gold/30'}`}>
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-iv-gold text-iv-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-black text-iv-white uppercase tracking-widest mb-1">{name}</h3>
                <p className="text-xs text-iv-cream/65 uppercase tracking-widest mb-8">{subtitle}</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black text-iv-gold">{discount}</span>
                  {discount !== 'Custom' && <span className="text-sm text-iv-cream/50 uppercase tracking-widest">off MSRP</span>}
                </div>
                <p className="text-xs text-iv-cream/65 uppercase tracking-widest mb-8">Min. order: {minOrder}</p>
                <div className="space-y-4 mb-10">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-iv-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-iv-cream/70">{f}</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full font-black text-xs uppercase tracking-widest py-6 rounded-xl ${highlight ? 'bg-iv-gold text-iv-black hover:bg-iv-gold-light' : 'bg-iv-deep-green/30 text-iv-white border border-iv-gold/20 hover:border-iv-gold'}`}>
                  {cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form + FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Application Form */}
            <div>
              <p className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Apply</p>
              <h2 className="text-4xl font-bold text-iv-white tracking-tighter uppercase mb-10">Start Your <span className="text-iv-gold italic serif">Application</span></h2>
              <div className="bg-iv-deep-green/10 border border-iv-gold/10 rounded-3xl p-10">
                {submitted ? (
                  <div className="flex flex-col items-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-iv-gold/10 border border-iv-gold/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-iv-gold" />
                    </div>
                    <p className="text-iv-white font-black text-xl uppercase tracking-widest">Application Received</p>
                    <p className="text-iv-cream/50 text-sm max-w-xs leading-relaxed">Our commercial team will review your application and respond within 5 business days.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Full Name</label>
                        <input value={form.name} onChange={update('name')} type="text" required className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-5 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="Dr. ANTONIO ROSSI" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Business Name</label>
                        <input value={form.business} onChange={update('business')} type="text" required className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-5 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="MILANO AESTHETICS SRL" disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Email Address</label>
                      <input value={form.email} onChange={update('email')} type="email" required className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-5 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="DR.ROSSI@CLINIC.IT" disabled={loading} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Partnership Type</label>
                      <select value={form.type} onChange={update('type')} className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-5 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors appearance-none" disabled={loading}>
                        <option>Clinical Partner</option>
                        <option>Wholesale Partner</option>
                        <option>Medical Distributor</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-iv-gold uppercase tracking-widest">Tell Us About Your Business</label>
                      <textarea value={form.message} onChange={update('message')} rows={4} className="w-full bg-iv-black/40 border border-iv-gold/20 rounded-none px-5 py-4 text-xs font-black uppercase tracking-widest text-iv-cream focus:outline-none focus:border-iv-gold transition-colors" placeholder="CLINIC TYPE, MONTHLY VOLUME, TERRITORY..." disabled={loading} />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-iv-gold hover:bg-iv-gold-light disabled:opacity-60 text-iv-black font-black text-xs uppercase tracking-widest py-8 rounded-none transition-all shadow-xl">
                      {loading ? 'Submitting…' : 'Submit Application'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Questions</p>
              <h2 className="text-4xl font-bold text-iv-white tracking-tighter uppercase mb-10">Partner <span className="text-iv-gold italic serif">FAQ</span></h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-iv-gold/10 rounded-2xl overflow-hidden bg-iv-deep-green/10">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-black text-iv-white uppercase tracking-widest pr-4">{faq.q}</span>
                      <span className={`flex-shrink-0 text-iv-gold transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6">
                        <p className="text-sm text-iv-cream/60 leading-relaxed font-light">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-12 p-8 bg-iv-black border border-iv-gold/10 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-iv-gold fill-current" />)}
                </div>
                <blockquote className="text-iv-cream/70 italic iv-serif text-lg leading-relaxed mb-6">
                  "LIRI ROMA has transformed our clinic's retail performance. The clinical documentation gave our dermatologists confidence, and our clients see measurable results within 6 weeks."
                </blockquote>
                <p className="text-xs font-black text-iv-white uppercase tracking-widest">Dr. K. Marchetti</p>
                <p className="text-[10px] text-iv-cream/65 uppercase tracking-widest">Dermatology Clinic Milano — Clinical Partner since 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
