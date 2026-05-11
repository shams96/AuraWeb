'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface IngredientCard {
  name: string
  concentration: string
  focus: string
  claim: string
  trialRef: string
  icon: string
  color: string
}

const INGREDIENTS: IngredientCard[] = [
  {
    name: 'OS-01 Senomorphic Peptide',
    concentration: '0.30%',
    focus: 'Cellular Longevity',
    claim: '70% barrier improvement vs placebo',
    trialRef: 'IV-2024-01 · 12 wks · n=120',
    icon: '⬡',
    color: 'rgba(145,56,50,0.12)',
  },
  {
    name: 'DWAT Restoration Complex',
    concentration: '0.75%',
    focus: 'Volume Restoration',
    claim: 'Progressive facial volume restoration',
    trialRef: 'IV-2024-01 · Structural sub-study',
    icon: '◈',
    color: 'rgba(31,81,41,0.12)',
  },
  {
    name: 'GLP-1 Protective Complex',
    concentration: '1.25%',
    focus: 'Deflation Prevention',
    claim: 'Supports elasticity during metabolic shifts',
    trialRef: 'IV-2024-02 · Elasticity module',
    icon: '◉',
    color: 'rgba(0,90,91,0.12)',
  },
  {
    name: 'L-Ornithine',
    concentration: '1.50%',
    focus: 'Wrinkle Depth',
    claim: '37.6% reduction in nasolabial fold depth',
    trialRef: 'IV-2024-02 · 8 wks · n=84',
    icon: '◎',
    color: 'rgba(145,56,50,0.08)',
  },
  {
    name: 'Bifida Ferment Lysate',
    concentration: '0.50%',
    focus: 'Microbiome Support',
    claim: '30% faster redness reduction vs control',
    trialRef: 'IV-2024-03 · 6 wks · n=60',
    icon: '⬡',
    color: 'rgba(31,81,41,0.08)',
  },
  {
    name: 'Ectoin Environmental Shield',
    concentration: '1.00%',
    focus: 'Pollution Defence',
    claim: '18% TEWL reduction · 35% hydration increase',
    trialRef: 'IV-2024-04 · 4 wks · n=96',
    icon: '◈',
    color: 'rgba(0,90,91,0.10)',
  },
]

export function IngredientScroll() {
  const railRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!railRef.current) return
    const card = railRef.current.querySelector('.iv-hscroll-item') as HTMLElement
    const step = card ? card.offsetWidth + 24 : 340
    railRef.current.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-iv-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div className="iv-scroll-reveal">
            <div
              className="inline-block rounded-full px-6 py-2 text-[11px] font-black uppercase tracking-[0.3em] mb-4"
              style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.20)', background: 'rgba(145,56,50,0.05)' }}
            >
              The Breakthrough 6
            </div>
            <h2 className="iv-type-h2 font-bold text-iv-white tracking-tighter">
              Proprietary <span className="italic text-iv-gold">Actives</span>
            </h2>
            <p className="text-iv-cream/50 mt-3 font-light max-w-md leading-relaxed">
              Six independently trialled molecules. Full concentration transparency. Swipe to explore.
            </p>
          </div>

          {/* Arrow controls — desktop */}
          <div className="hidden md:flex gap-3 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200"
              style={{ border: '1px solid rgba(145,56,50,0.22)', color: 'var(--iv-gold)' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--iv-gold)'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--iv-gold)'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--iv-gold)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--iv-gold-light)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--iv-gold)'}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll rail */}
        <div ref={railRef} className="iv-hscroll">
          {INGREDIENTS.map((ing, i) => (
            <div
              key={ing.name}
              className="iv-hscroll-item iv-scroll-card"
              style={{
                width: 'clamp(260px, 32vw, 340px)',
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <div
                className="h-full rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 group"
                style={{
                  background: `linear-gradient(140deg, var(--iv-deep-green) 0%, ${ing.color} 100%)`,
                  border: '1px solid rgba(145,56,50,0.14)',
                  minHeight: 280,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(145,56,50,0.35)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(145,56,50,0.14)'}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'rgba(145,56,50,0.09)', border: '1px solid rgba(145,56,50,0.18)' }}
                  >
                    {ing.icon}
                  </span>
                  <span
                    className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: 'rgba(145,56,50,0.10)', color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.18)' }}
                  >
                    {ing.concentration}
                  </span>
                </div>

                {/* Name + focus */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] mb-2" style={{ color: 'var(--iv-gold)' }}>
                    {ing.focus}
                  </p>
                  <h3 className="text-base font-bold text-iv-white leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {ing.name}
                  </h3>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(145,56,50,0.12)' }} />

                {/* Clinical claim */}
                <div className="mt-auto">
                  <p className="text-sm text-iv-gold font-semibold leading-snug mb-2">{ing.claim}</p>
                  <p className="text-[11px] text-iv-cream/35 font-light uppercase tracking-[0.15em]">{ing.trialRef}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="md:hidden text-center text-[11px] text-iv-cream/30 uppercase tracking-widest mt-6 font-light">
          Swipe to explore all 6 actives
        </p>
      </div>
    </section>
  )
}
