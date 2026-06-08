'use client'

import Link from 'next/link'

const GOLD = 'rgba(145,56,50,'

const domains = [
  {
    roman: 'I',
    name: 'Cellular Energy Reserve™',
    short: 'Energy',
    headline: 'Skin cannot repair what it cannot power.',
    body: 'Mitochondrial efficiency, ATP production, and repair signalling. Before any ingredient can work, the cell must have the energy to respond. This is where resilience begins.',
    tags: ['Mitochondrial Support', 'ATP Optimisation', 'Repair Signalling'],
  },
  {
    roman: 'II',
    name: 'Barrier Intelligence Network™',
    short: 'Barrier',
    headline: 'Healthy skin adapts. Compromised skin reacts.',
    body: 'The skin\'s ability to continuously interpret and respond to environmental change — humidity shifts, temperature extremes, air conditioning, travel stress. Not barrier repair. Barrier intelligence.',
    tags: ['Lipid Bilayer', 'Microbiome Integrity', 'Adaptive Response'],
  },
  {
    roman: 'III',
    name: 'Oxidative Defense Architecture™',
    short: 'Defense',
    headline: 'Modern life creates invisible biological wear before visible aging appears.',
    body: 'Daily pollution, UV, blue light, and urban stress place cumulative oxidative burden on skin. The Vitale system addresses this systematically — as architecture, not afterthought.',
    tags: ['Pollution Defense', 'Free Radical Neutralisation', 'Environmental Shield'],
  },
  {
    roman: 'IV',
    name: 'Structural Vitality Framework™',
    short: 'Structure',
    headline: 'The goal is not younger skin. The goal is stronger skin.',
    body: 'Elasticity, firmness, and extracellular matrix integrity. Beauty is a visible consequence of structural health. When the architecture holds, everything above it follows.',
    tags: ['Collagen Ecosystem', 'Elasticity Support', 'Dermal Density'],
  },
]

export function VitaleResilienceMatrix() {
  return (
    <section className="iv-dark py-32 relative overflow-hidden" style={{ background: '#1A1614' }}>

      {/* Background texture */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${GOLD}0.04) 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 20% 80%, rgba(15,36,25,0.5) 0%, transparent 60%)`, pointerEvents: 'none' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Section header */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-3 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: 'var(--iv-gold)', border: `1px solid ${GOLD}0.20)`, background: `${GOLD}0.05)` }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--iv-gold)', display: 'inline-block' }} />
            Adaptive Skin Science™ · Proprietary System
          </div>
          <h2
            className="iv-type-h2 font-bold text-iv-white tracking-tighter mb-6"
            style={{ fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic' }}
          >
            The Vitale Resilience Matrix™
          </h2>
          <p className="text-iv-cream/75 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Four biological domains. One integrated system. The architecture behind every Isola Vitale formulation.
          </p>
          <div style={{ width: 48, height: 1, background: `${GOLD}0.30)`, margin: '32px auto 0' }} />
        </div>

        {/* Domains grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {domains.map((d, idx) => (
            <div
              key={d.roman}
              data-reveal="iv-reveal-up"
              style={{
                opacity: 0,
                animationDelay: `${idx * 0.1}s`,
                background: 'var(--iv-deep-green)',
                border: `1px solid ${GOLD}0.14)`,
                borderRadius: 24,
                padding: '40px 44px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}0.32)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}0.14)`}
            >
              {/* Ghost numeral */}
              <span
                aria-hidden
                style={{
                  position: 'absolute', right: 24, bottom: -8,
                  fontSize: '9rem', fontWeight: 900, lineHeight: 1,
                  color: `${GOLD}0.05)`, fontFamily: 'var(--iv-font-serif)',
                  userSelect: 'none', pointerEvents: 'none',
                }}
              >{d.roman}</span>

              {/* Domain badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${GOLD}0.10)`, border: `1px solid ${GOLD}0.22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--iv-gold)', fontWeight: 700 }}>{d.roman}</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--iv-gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  Domain {d.roman} · {d.short}
                </span>
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--iv-font-serif)', fontSize: '1.25rem', fontWeight: 700,
                color: 'var(--iv-white)', marginBottom: 12, lineHeight: 1.2,
              }}>
                {d.name}
              </h3>

              {/* Principle */}
              <p style={{
                fontSize: '0.78rem', fontWeight: 700, fontStyle: 'italic',
                color: `${GOLD}0.85)`, marginBottom: 14, letterSpacing: '0.01em',
                lineHeight: 1.4,
              }}>
                "{d.headline}"
              </p>

              {/* Body */}
              <p style={{ fontSize: '0.82rem', color: 'rgba(253,250,245,0.75)', lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
                {d.body}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {d.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: 'rgba(253,250,245,0.35)',
                      border: `1px solid ${GOLD}0.12)`, borderRadius: 100,
                      padding: '4px 12px', background: `${GOLD}0.04)`,
                    }}
                  >{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          style={{
            textAlign: 'center',
            padding: '48px 40px',
            background: `linear-gradient(135deg, ${GOLD}0.06) 0%, rgba(15,36,25,0.30) 100%)`,
            border: `1px solid ${GOLD}0.14)`,
            borderRadius: 24,
          }}
        >
          <p style={{
            fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'rgba(253,250,245,0.80)',
            lineHeight: 1.5, marginBottom: 24, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto',
          }}>
            "The Vitale Resilience Matrix™ is not a formula. It is a framework — the foundation from which every Isola Vitale formulation is derived."
          </p>
          <Link
            href="/system"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--iv-gold)', textDecoration: 'none',
            }}
          >
            Explore the full system →
          </Link>
        </div>

      </div>
    </section>
  )
}
