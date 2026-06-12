'use client'

import Link from 'next/link'

// Dark-theme gold (#B8972F) — used throughout this always-dark section
const G = 'rgba(184,151,47,'
const GOLD_HEX = '#B8972F'
const CREAM = 'rgba(253,250,245,'
const CARD_BG = '#0F2419'
const SECTION_BG = '#1A1614'

const domains = [
  {
    roman: 'I',
    name: 'The Energy to Renew',
    short: 'Energy',
    headline: 'Skin cannot repair what it cannot power.',
    body: 'Mitochondrial efficiency, ATP production, and repair signalling. Before any ingredient can work, the cell must have the energy to respond. This is where resilience begins.',
    tags: ['Mitochondrial Support', 'ATP Optimisation', 'Repair Signalling'],
  },
  {
    roman: 'II',
    name: 'The Living Barrier',
    short: 'Barrier',
    headline: 'Healthy skin adapts. Compromised skin reacts.',
    body: 'The skin\'s ability to continuously interpret and respond to environmental change — humidity shifts, temperature extremes, air conditioning, travel stress. Not barrier repair. Barrier intelligence.',
    tags: ['Lipid Bilayer', 'Microbiome Integrity', 'Adaptive Response'],
  },
  {
    roman: 'III',
    name: 'The Power to Protect',
    short: 'Defence',
    headline: 'Modern life creates invisible biological wear before visible aging appears.',
    body: 'Daily pollution, UV, blue light, and urban stress place cumulative oxidative burden on skin. Isola Vitale addresses this systematically — as a biological priority, not an afterthought.',
    tags: ['Pollution Defence', 'Free Radical Neutralisation', 'Environmental Shield'],
  },
  {
    roman: 'IV',
    name: 'Firmness & Structure',
    short: 'Structure',
    headline: 'The goal is not younger skin. The goal is stronger skin.',
    body: 'Elasticity, firmness, and extracellular matrix integrity. Beauty is a visible consequence of structural health. When the architecture holds, everything above it follows.',
    tags: ['Collagen Ecosystem', 'Elasticity Support', 'Dermal Density'],
  },
]

export function VitaleResilienceMatrix() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: SECTION_BG }}>

      {/* Background texture */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${G}0.06) 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 80%, rgba(15,36,25,0.5) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Section header */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-3 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: GOLD_HEX, border: `1px solid ${G}0.25)`, background: `${G}0.08)` }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD_HEX, display: 'inline-block' }} />
            Adaptive Skin Science™ · Proprietary System
          </div>
          <h2
            className="iv-type-h2 font-bold tracking-tighter mb-6"
            style={{ fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic', color: '#FDFAF5' }}
          >
            Vitality, Made Visible
          </h2>
          <p className="text-lg font-light max-w-2xl mx-auto leading-relaxed" style={{ color: `${CREAM}0.75)` }}>
            Four ways your skin stays alive. One serum that tends to all of them — the thinking behind every Isola Vitale formulation.
          </p>
          <div style={{ width: 48, height: 1, background: `${G}0.35)`, margin: '32px auto 0' }} />
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
                background: CARD_BG,
                border: `1px solid ${G}0.18)`,
                borderRadius: 24,
                padding: '40px 44px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${G}0.40)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = `${G}0.18)`}
            >
              {/* Ghost numeral */}
              <span
                aria-hidden
                style={{
                  position: 'absolute', right: 24, bottom: -8,
                  fontSize: '9rem', fontWeight: 900, lineHeight: 1,
                  color: `${G}0.06)`, fontFamily: 'var(--iv-font-serif)',
                  userSelect: 'none', pointerEvents: 'none',
                }}
              >{d.roman}</span>

              {/* Domain badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${G}0.12)`, border: `1px solid ${G}0.28)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic', fontSize: '0.85rem', color: GOLD_HEX, fontWeight: 700 }}>{d.roman}</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: GOLD_HEX, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  Domain {d.roman} · {d.short}
                </span>
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--iv-font-serif)', fontSize: '1.25rem', fontWeight: 700,
                color: '#FDFAF5', marginBottom: 12, lineHeight: 1.2,
              }}>
                {d.name}
              </h3>

              {/* Principle */}
              <p style={{
                fontSize: '0.82rem', fontWeight: 600, fontStyle: 'italic',
                color: GOLD_HEX, marginBottom: 14, letterSpacing: '0.01em',
                lineHeight: 1.5,
              }}>
                &ldquo;{d.headline}&rdquo;
              </p>

              {/* Body */}
              <p style={{ fontSize: '0.85rem', color: `${CREAM}0.80)`, lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
                {d.body}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {d.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: `${CREAM}0.70)`,
                      border: `1px solid ${G}0.20)`, borderRadius: 100,
                      padding: '5px 14px', background: `${G}0.06)`,
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
            background: `linear-gradient(135deg, ${G}0.08) 0%, rgba(15,36,25,0.35) 100%)`,
            border: `1px solid ${G}0.18)`,
            borderRadius: 24,
          }}
        >
          <p style={{
            fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: `${CREAM}0.85)`,
            lineHeight: 1.5, marginBottom: 24, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto',
          }}>
            &ldquo;This is not a formula. It is a philosophy — the quiet foundation from which every Isola Vitale formulation is born.&rdquo;
          </p>
          <Link
            href="/system"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: GOLD_HEX, textDecoration: 'none',
            }}
          >
            Explore the full system →
          </Link>
        </div>

      </div>
    </section>
  )
}
