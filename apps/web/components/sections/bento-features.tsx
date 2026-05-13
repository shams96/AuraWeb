'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const GOLD = 'rgba(145,56,50,'

export function BentoFeatures() {
  return (
    <section className="py-24 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section label */}
        <div className="text-center mb-14 iv-scroll-reveal">
          <div
            className="inline-block rounded-full px-6 py-2 text-[11px] font-black uppercase tracking-[0.3em] mb-5"
            style={{ color: 'var(--iv-gold)', border: `1px solid ${GOLD}0.20)`, background: `${GOLD}0.05)` }}
          >
            Why Isola Vitale
          </div>
          <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter">
            A System, Not a <span className="italic text-iv-gold">Product</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* ── [A] Clinical evidence — full width ─────────────── */}
          <div
            className="iv-scroll-card md:col-span-12 rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--iv-deep-green) 0%, rgba(31,81,41,0.40) 100%)`,
              border: `1px solid ${GOLD}0.16)`,
              minHeight: 260,
            }}
          >
            <span
              className="absolute right-6 md:right-12 bottom-0 font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(5rem, 18vw, 13rem)', color: `${GOLD}0.06)`, fontFamily: "'Playfair Display', serif" }}
              aria-hidden
            >4</span>

            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--iv-gold)' }}>
                Clinical Evidence
              </p>
              <h3 className="iv-type-h3 font-bold text-iv-white leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                4 Independent RCTs. Zero marketing claims.
              </h3>
              <p className="text-sm text-iv-cream/50 font-light max-w-lg leading-relaxed">
                Every efficacy statement is attributable to a registered clinical trial with published methodology, sample size, and a control arm.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8 relative z-10">
              {['Trial IV-2024-01', 'Trial IV-2024-02', 'Trial IV-2024-03', 'Trial IV-2024-04'].map(t => (
                <span
                  key={t}
                  className="text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{ background: `${GOLD}0.10)`, color: 'var(--iv-gold)', border: `1px solid ${GOLD}0.18)` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── [B] 4-Tier system — 7 cols on md ──────────────── */}
          <div
            className="iv-scroll-card md:col-span-7 rounded-3xl p-8 flex flex-col justify-between"
            style={{
              background: 'var(--iv-deep-green)',
              border: `1px solid ${GOLD}0.14)`,
              minHeight: 240,
            }}
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--iv-gold)' }}>4-Tier Protocol</p>
              <h3 className="iv-type-h3 font-bold text-iv-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Matched to your skin's biological age
              </h3>
              <p className="text-sm text-iv-cream/50 font-light leading-relaxed">
                T1 Foundation → T2 Correction → T3 Regeneration → T4 Longevity. No generic one-size routine.
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              {['T1', 'T2', 'T3', 'T4'].map((tier) => (
                <div key={tier} className="flex-1 rounded-xl p-3 text-center" style={{ background: `${GOLD}0.08)`, border: `1px solid ${GOLD}0.14)` }}>
                  <div className="text-[11px] font-black text-iv-gold uppercase tracking-widest">{tier}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── [C] Consultation CTA — 5 cols on md ───────────── */}
          <div
            className="iv-scroll-card md:col-span-5 rounded-3xl p-8 flex flex-col justify-between"
            style={{ background: 'var(--iv-gold)', minHeight: 240 }}
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-3 text-white/60">Start Here</p>
              <h3 className="iv-type-h3 font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Find your protocol in 2 minutes
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                8 Baumann-validated questions. Instant tier assignment with full AM + PM routine.
              </p>
            </div>
            <Link
              href="#skin-scan"
              className="inline-flex items-center gap-2 mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-white group"
              onClick={e => {
                e.preventDefault()
                document.getElementById('skin-scan')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Take the consultation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ── [D] Italian lab — 5 cols on md ─────────────────── */}
          <div
            className="iv-scroll-card md:col-span-5 rounded-3xl p-8 flex flex-col justify-between"
            style={{
              background: `linear-gradient(140deg, ${GOLD}0.08) 0%, var(--iv-deep-green) 100%)`,
              border: `1px solid ${GOLD}0.14)`,
              minHeight: 220,
            }}
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--iv-gold)' }}>Manufacturing</p>
              <h3 className="text-lg font-bold text-iv-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Natural You Srl — Isola del Liri
              </h3>
              <p className="text-sm text-iv-cream/50 font-light leading-relaxed">
                EU GMP certified. ICH Q1A 24-month stability. Every active at declared pharmaceutical-grade concentration.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {['EU GMP', 'ISO 17025', '99.8% Purity', 'Vegan'].map(b => (
                <span key={b} className="text-[11px] font-black uppercase tracking-widest text-iv-cream/40 border-b pb-0.5" style={{ borderColor: `${GOLD}0.25)` }}>{b}</span>
              ))}
            </div>
          </div>

          {/* ── [E] Three stat cells — 7 cols split 3 ways on md ─ */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: '97%', label: 'Smoother Skin', sub: 'Week 4 · n=2,450' },
              { value: '18', label: 'Formulations', sub: 'All protocols' },
              { value: '4.8★', label: 'Avg Rating', sub: '2,450+ reviews' },
            ].map((stat, i) => (
              <div
                key={stat.value}
                className="iv-scroll-stat rounded-2xl p-6 flex flex-col justify-center text-center"
                style={{
                  background: 'var(--iv-deep-green)',
                  border: `1px solid ${GOLD}0.12)`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div className="font-black text-iv-gold mb-1" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold text-iv-white uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-[11px] text-iv-cream/35 font-light">{stat.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
