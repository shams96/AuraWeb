'use client'

import { useState } from 'react'
import { Crown, Star, Zap, Gift, Truck, Shield, CheckCircle2, ChevronDown } from 'lucide-react'

const TIERS = [
  {
    name: 'iv Bronze',
    threshold: '0 – 499 pts',
    color: 'text-amber-600',
    border: 'border-amber-600/30',
    bg: 'bg-amber-600/5',
    icon: <Star className="w-6 h-6 text-amber-600" />,
    perks: [
      'Earn 1 point per $1 spent',
      'Early access to new launches',
      'Birthday double-point day',
      'Member-only Journal content',
    ],
  },
  {
    name: 'iv Gold',
    threshold: '500 – 1,999 pts',
    color: 'text-iv-gold',
    border: 'border-iv-gold/50',
    bg: 'bg-iv-gold/10',
    icon: <Crown className="w-6 h-6 text-iv-gold" />,
    highlight: true,
    perks: [
      'Earn 1.5 points per $1 spent',
      'Complimentary deluxe samples with every order',
      'Free express shipping on all orders',
      'Quarterly Skin Intelligence Report',
      'Priority access to limited editions',
      'Annual gift: full-size hero product',
    ],
  },
  {
    name: 'iv Obsidian',
    threshold: '2,000+ pts',
    color: 'text-iv-white',
    border: 'border-iv-white/30',
    bg: 'bg-iv-white/5',
    icon: <Zap className="w-6 h-6 text-iv-white" />,
    perks: [
      'Earn 2 points per $1 spent',
      'Dedicated Skin Concierge (WhatsApp)',
      'Complimentary 30-min virtual skin consultation',
      'Invitation to Lab Days at Natural You Srl',
      'First access to unreleased formulas',
      'Annual curated Obsidian Welcome Box',
      'Co-creation input on new products',
    ],
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Account', body: 'Register for free. Your point balance starts immediately on your first order.' },
  { step: '02', title: 'Earn Points', body: 'Every purchase, review, and referral earns points. Subscriptions earn 25% bonus points automatically.' },
  { step: '03', title: 'Unlock Tiers', body: 'Progress through Bronze → Gold → Obsidian as your balance grows. Tier benefits activate instantly.' },
  { step: '04', title: 'Redeem Rewards', body: 'Use points at checkout — 100 points = $1.00 off. Or save for exclusive milestone gifts.' },
]

const EARN_ACTIONS = [
  { action: 'Purchase', points: '1–2 pts / $1', note: 'Based on your tier' },
  { action: 'Write a Verified Review', points: '50 pts', note: 'With photo: +25 pts' },
  { action: 'Refer a Friend', points: '200 pts', note: 'After their first purchase' },
  { action: 'Subscribe to Routine', points: '+25% bonus', note: 'On every subscription order' },
  { action: 'Complete Bio-Adaptive Scan', points: '75 pts', note: 'One-time' },
  { action: 'Birthday Month Purchase', points: '2× points', note: 'All of your birthday month' },
  { action: 'Share on Social', points: '25 pts', note: 'Per verified share' },
]

export default function LoyaltyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: 'Do points expire?', a: 'Points remain active as long as you make at least one purchase every 18 months. iv Obsidian members never have points expire.' },
    { q: 'Can I gift my points to someone else?', a: 'iv Gold and Obsidian members can transfer up to 500 points per calendar year to another Isola Vitale account.' },
    { q: 'What happens if I drop a tier?', a: 'Tier status is reviewed annually. If your points fall below the threshold, you retain your current tier benefits for a 90-day grace period.' },
    { q: 'How do subscription orders work with points?', a: 'Active subscriptions automatically earn 25% bonus points on every renewal order, in addition to your base tier rate.' },
  ]

  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-black text-iv-white py-32 border-b border-iv-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-iv-gold/[0.04] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            The Loyalty Programme
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">
            The <span className="text-iv-gold italic iv-serif">iv Circle</span>
          </h1>
          <p className="text-xl text-iv-cream/70 leading-relaxed font-light max-w-2xl mx-auto">
            Every purchase, review, and referral builds toward exclusive privileges — from Obsidian concierge access to Lab Days at our Natural You Srl facility in Isola del Liri.
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-24 bg-iv-deep-green/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Three Tiers of Privilege</h2>
            <p className="iv-type-h3 font-semibold text-iv-white italic iv-serif">Progress unlocks access no purchase can buy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-10 border ${tier.border} ${tier.bg} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${tier.highlight ? 'shadow-[0_0_60px_rgba(184,151,47,0.12)]' : ''}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-iv-gold text-iv-black text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8 p-3 bg-iv-black/40 rounded-xl inline-block border border-iv-white/5">
                  {tier.icon}
                </div>
                <h3 className={`text-2xl font-black uppercase tracking-widest mb-1 ${tier.color}`}>{tier.name}</h3>
                <p className="text-[10px] font-black text-iv-cream/30 uppercase tracking-widest mb-8">{tier.threshold}</p>
                <ul className="space-y-4">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.color}`} />
                      <span className="text-sm text-iv-cream/70 font-light leading-snug">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-iv-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">How It Works</h2>
            <h3 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">Four Simple Steps</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} className="text-center group">
                <div className="text-5xl font-black text-iv-gold/20 mb-4 group-hover:text-iv-gold/40 transition-colors">{step}</div>
                <h4 className="text-sm font-black text-iv-white uppercase tracking-widest mb-3">{title}</h4>
                <p className="text-xs text-iv-cream/50 leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earn Points Table */}
      <section className="py-24 bg-iv-deep-green/10 border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Earning Points</h2>
            <h3 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">Every Interaction Counts</h3>
          </div>
          <div className="border border-iv-white/5 rounded-2xl overflow-hidden bg-iv-black/40 backdrop-blur-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-iv-white/10 bg-iv-black/60">
                  <th className="py-5 px-8 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Action</th>
                  <th className="py-5 px-8 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Points</th>
                  <th className="py-5 px-8 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-iv-white/5">
                {EARN_ACTIONS.map(({ action, points, note }) => (
                  <tr key={action} className="hover:bg-iv-gold/[0.03] transition-colors">
                    <td className="py-5 px-8 text-sm font-bold text-iv-gold uppercase tracking-wider">{action}</td>
                    <td className="py-5 px-8 text-sm text-iv-white font-black">{points}</td>
                    <td className="py-5 px-8 text-xs text-iv-cream/40 italic">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-iv-cream/30 mt-6 font-light">100 points = $1.00 at checkout. Minimum redemption: 200 points.</p>
        </div>
      </section>

      {/* Milestone Gifts */}
      <section className="py-24 bg-iv-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Milestone Gifts</h2>
            <h3 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">Unlock as You Grow</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { pts: '500 pts', gift: 'Deluxe Discovery Set', desc: '4 × 5ml hero actives' },
              { pts: '1,000 pts', gift: 'Full-Size Product', desc: 'Your choice from T1–T2' },
              { pts: '2,000 pts', gift: 'Obsidian Welcome Box', desc: 'Curated 6-piece ritual kit' },
              { pts: '5,000 pts', gift: 'Lab Day Invitation', desc: 'Isola del Liri, Italy' },
            ].map(({ pts, gift, desc }) => (
              <div key={pts} className="bg-iv-deep-green/10 border border-iv-gold/10 rounded-2xl p-8 text-center hover:border-iv-gold/30 transition-all">
                <Gift className="w-6 h-6 text-iv-gold mx-auto mb-4" />
                <div className="text-2xl font-black text-iv-gold mb-2">{pts}</div>
                <h4 className="text-xs font-black text-iv-white uppercase tracking-widest mb-2">{gift}</h4>
                <p className="text-[10px] text-iv-cream/40 font-light italic">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-iv-deep-green/10 border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-16">Programme FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-iv-white/5 rounded-2xl overflow-hidden bg-iv-black/40">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-bold text-iv-white uppercase tracking-wider group-hover:text-iv-gold transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-iv-gold flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-sm text-iv-cream/60 font-light leading-relaxed border-t border-iv-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-iv-black text-center border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-2xl">
          <Crown className="w-10 h-10 text-iv-gold mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-iv-white tracking-tighter uppercase mb-6">Join the iv Circle</h2>
          <p className="text-iv-cream/60 mb-10 font-light text-lg leading-relaxed">
            Create a free account today. Your first order earns your first points — and the journey to Obsidian begins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="inline-flex items-center justify-center gap-2 bg-iv-gold text-iv-black text-xs font-black uppercase tracking-widest px-10 py-4 rounded-full hover:bg-iv-gold/90 transition-colors">
              Create Account
            </a>
            <a href="/login" className="inline-flex items-center justify-center gap-2 border border-iv-gold/30 text-iv-gold text-xs font-black uppercase tracking-widest px-10 py-4 rounded-full hover:border-iv-gold transition-colors">
              Sign In to Existing Account
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
