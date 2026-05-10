'use client'

import Image from 'next/image'
import Link from 'next/link'

export function SystemHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FDFAF5 0%, #F4EAE2 40%, #FAD6C9 100%)', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>

      {/* Peach Dust wash — top right atmospheric bloom */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '55%', height: '80%', background: 'radial-gradient(ellipse at top right, rgba(250,214,201,0.55) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Formal Garden deep shadow — bottom left */}
      <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: '45%', height: '60%', background: 'radial-gradient(ellipse at bottom left, rgba(31,81,41,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Product image — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none">
        <Image
          src="/images/products/isola_collection.png"
          alt="Isola Vitale Hero Collection"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.88, mixBlendMode: 'multiply' }}
          priority
        />
        {/* Soft gradient fade to left */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #FDFAF5 0%, transparent 30%)' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-xl lg:max-w-2xl py-24">

          {/* Provenance badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(145,56,50,0.18)', borderRadius: 100, padding: '6px 18px', marginBottom: 36, background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(12px)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#913832', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#913832', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Natural You Srl · Isola del Liri, Italy · Est. 2024</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#1A1614', marginBottom: 28 }}>
            <span style={{ display: 'block', fontSize: 'clamp(3rem, 7vw, 5.5rem)', textTransform: 'uppercase' }}>The Art of</span>
            <span style={{ display: 'block', fontSize: 'clamp(3rem, 7vw, 5.5rem)', textTransform: 'uppercase', fontStyle: 'italic', color: '#913832' }}>Longevity</span>
            <span style={{ display: 'block', fontSize: 'clamp(3rem, 7vw, 5.5rem)', textTransform: 'uppercase' }}>Skincare</span>
          </h1>

          {/* Descriptor */}
          <p style={{ fontSize: '1.05rem', color: '#7A5C4E', fontWeight: 300, lineHeight: 1.75, maxWidth: 440, marginBottom: 40, letterSpacing: '0.01em' }}>
            Metabolically aligned. Clinically proven. The world's first 4-tier system tuned to your skin's biological age — manufactured at pharmaceutical grade in Italy.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
            <button
              style={{ background: '#913832', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '16px 36px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 12px 40px rgba(145,56,50,0.28)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#6E2724'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(145,56,50,0.36)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#913832'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(145,56,50,0.28)'; }}
              onClick={() => document.getElementById('skin-scan')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Find My System
            </button>
            <Link
              href="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1A1614', padding: '16px 28px', border: '1px solid rgba(26,22,20,0.20)', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#913832'; (e.currentTarget as HTMLElement).style.color = '#913832'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,22,20,0.20)'; (e.currentTarget as HTMLElement).style.color = '#1A1614'; }}
            >
              Shop Collection <span style={{ fontSize: '1rem' }}>→</span>
            </Link>
          </div>

          {/* Social proof bar */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { value: '4.8★', label: '2,450+ Reviews' },
              { value: '97%', label: 'See Results in 4 Wks' },
              { value: '18', label: 'SKUs Certified' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#913832', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#7A5C4E', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product colour swatches — bottom accent */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center', zIndex: 10 }}>
        {[
          { color: '#913832', label: 'Day' },
          { color: '#1F5129', label: 'Night' },
          { color: '#FAD6C9', label: 'Serum', border: true },
          { color: '#005A5B', label: 'Men' },
        ].map(({ color, label, border }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: color, border: border ? '2px solid rgba(145,56,50,0.3)' : 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(61,43,32,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
          </div>
        ))}
        <div style={{ width: 60, height: 1, background: 'rgba(145,56,50,0.2)', marginLeft: 4 }} />
        <span style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(145,56,50,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>2026 Collection</span>
      </div>

      {/* Vertical Milano mark */}
      <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10 }} className="hidden lg:flex">
        <div style={{ width: 1, height: 80, background: 'linear-gradient(to bottom, transparent, rgba(145,56,50,0.35))' }} />
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(145,56,50,0.45)', letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>Milano Heritage</span>
        <div style={{ width: 1, height: 80, background: 'linear-gradient(to top, transparent, rgba(145,56,50,0.35))' }} />
      </div>
    </section>
  )
}
