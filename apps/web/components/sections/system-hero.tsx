'use client'

import Image from 'next/image'
import Link from 'next/link'

export function SystemHero() {
  return (
    <section className="iv-hero relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, var(--iv-black) 0%, var(--iv-deep-green) 45%, var(--iv-champagne) 100%)',
      display: 'flex',
      alignItems: 'center',
    }}>

      {/* Peach Dust atmospheric bloom — top right */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '55%', height: '80%',
        background: 'radial-gradient(ellipse at top right, rgba(250,214,201,0.50) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Formal Garden depth shadow — bottom left */}
      <div style={{
        position: 'absolute', bottom: '-8%', left: '-4%',
        width: '45%', height: '60%',
        background: 'radial-gradient(ellipse at bottom left, rgba(31,81,41,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Product image — right side, parallax on scroll */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none">
        <Image
          src="/images/products/isola_collection.png"
          alt="Isola Vitale Hero Collection"
          fill
          className="object-cover object-center iv-parallax"
          style={{ opacity: 0.88, mixBlendMode: 'multiply' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--iv-black) 0%, transparent 35%)' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* py uses clamp so it scales with viewport height, never pushing buttons off-screen */}
        <div className="max-w-xl lg:max-w-2xl" style={{ padding: 'clamp(1.5rem, 8vh, 5rem) 0' }}>

          {/* Provenance badge */}
          <div
            data-reveal="iv-reveal-fade"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1px solid rgba(145,56,50,0.18)', borderRadius: 100,
              padding: '6px 18px', marginBottom: 'clamp(1rem, 3vh, 2.25rem)',
              background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)',
              opacity: 0,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--iv-gold)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--iv-gold)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              La Bella Figura · Isola del Liri, Italy
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--iv-font-serif)', fontWeight: 700,
            lineHeight: 1.0, letterSpacing: '-0.02em',
            color: 'var(--iv-white)', marginBottom: 'clamp(0.75rem, 2vh, 1.75rem)',
          }}>
            <span data-reveal="iv-word-in" style={{ display: 'block', fontSize: 'clamp(2.25rem, min(7vw, 11vh), 5.5rem)', textTransform: 'uppercase', opacity: 0, animationDelay: '0.1s' }}>In Italy,</span>
            <span data-reveal="iv-word-in" style={{ display: 'block', fontSize: 'clamp(2.25rem, min(7vw, 11vh), 5.5rem)', textTransform: 'uppercase', fontStyle: 'italic', color: 'var(--iv-gold)', opacity: 0, animationDelay: '0.22s' }}>beauty is</span>
            <span data-reveal="iv-word-in" style={{ display: 'block', fontSize: 'clamp(2.25rem, min(7vw, 11vh), 5.5rem)', textTransform: 'uppercase', opacity: 0, animationDelay: '0.34s' }}>a way of life</span>
          </h1>

          {/* Descriptor */}
          <p
            data-reveal="iv-reveal-up"
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', color: 'var(--iv-cream)', fontWeight: 300,
              lineHeight: 1.75, maxWidth: 460, marginBottom: 'clamp(0.5rem, 2vh, 1.25rem)', letterSpacing: '0.01em',
              opacity: 0, animationDelay: '0.45s',
            }}
          >
            La Bella Figura — Italy's unwritten code of living beautifully. Not a goal to reach. A practice to inhabit. Formulated at Isola del Liri, where Italian precision and centuries of craft converge.
          </p>

          {/* Resilience layer */}
          <p
            data-reveal="iv-reveal-up"
            style={{
              fontSize: 'clamp(0.78rem, 1.1vw, 0.92rem)', color: 'var(--iv-gold)', fontWeight: 500,
              lineHeight: 1.7, maxWidth: 440, marginBottom: 'clamp(1rem, 3.5vh, 2.5rem)', letterSpacing: '0.02em',
              fontStyle: 'italic', opacity: 0, animationDelay: '0.50s',
              borderLeft: '2px solid rgba(145,56,50,0.35)', paddingLeft: 14,
            }}
          >
            The world's first Adaptive Skin Science™ house — built for the biological reality of modern life.
          </p>

          {/* CTAs */}
          <div data-reveal="iv-reveal-up" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 'clamp(1.5rem, 5vh, 3.5rem)', opacity: 0, animationDelay: '0.55s' }}>
            <button
              className="btn-luxury"
              style={{ padding: '16px 36px' }}
              onClick={() => document.getElementById('skin-scan')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Begin Your Ritual
            </button>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--iv-white)', padding: '16px 28px',
                border: '1px solid rgba(26,22,20,0.22)', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--iv-gold)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--iv-gold)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,22,20,0.22)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--iv-white)'
              }}
            >
              Shop Collection <span style={{ fontSize: '1rem' }}>→</span>
            </Link>
          </div>

          {/* Social proof bar */}
          <div data-reveal="iv-reveal-up iv-stagger" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', opacity: 0, animationDelay: '0.65s' }}>
            {[
              { value: '48hrs', label: 'Felt on First Use' },
              { value: '97%',  label: 'Visibly Transformed' },
              { value: '4.8★', label: '2,450+ Reviews' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--iv-gold)', fontFamily: 'var(--iv-font-serif)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--iv-cream)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4, opacity: 0.70 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product colour swatches — SKU identity */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center', zIndex: 10 }}>
        {[
          { color: 'var(--iv-red-ochre)',      label: 'Day' },
          { color: 'var(--iv-formal-garden)',  label: 'Night' },
          { color: 'var(--iv-peach-dust)',     label: 'Serum', border: true },
          { color: 'var(--iv-deep-peacock)',   label: 'Men' },
        ].map(({ color, label, border }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', background: color,
              border: border ? '2px solid rgba(145,56,50,0.30)' : 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }} />
            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--iv-cream)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.50 }}>{label}</span>
          </div>
        ))}
        <div style={{ width: 60, height: 1, background: 'rgba(145,56,50,0.20)', marginLeft: 4 }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--iv-gold)', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85 }}>2026 Collection</span>
      </div>

      {/* Vertical Milano mark */}
      <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10 }} className="hidden lg:flex">
        <div style={{ width: 1, height: 80, background: 'linear-gradient(to bottom, transparent, rgba(145,56,50,0.30))' }} />
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--iv-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-lr', opacity: 0.50 }}>Isola del Liri</span>
        <div style={{ width: 1, height: 80, background: 'linear-gradient(to top, transparent, rgba(145,56,50,0.30))' }} />
      </div>
    </section>
  )
}
