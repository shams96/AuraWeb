'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ═══════════════════════════════════════════════════════════════════════
   GRAND DOOR — LIRI ROMA
   The visitor does not open a website. They arrive at a house.

   A Red Ochre (#9B4722) door stands closed. It opens on scroll, click,
   or pointer approach — revealing the collection, shelved, in warm light.

   Accessibility & SEO contract:
   · The H1 and all copy exist in the DOM at all times (never JS-injected).
   · prefers-reduced-motion → doors are open on load. No animation. Ever.
   · Keyboard: the door is a real button, focusable, Enter/Space opens.
   · Mobile: no pointer-proximity; tap or scroll opens. Shorter travel.
   ═══════════════════════════════════════════════════════════════════════ */

const SHELF = [
  { name: 'Cellular Cleanser™',    role: 'Cleanse',              img: '/images/products/isola_collection.png' },
  { name: 'Liri Essence™',          role: 'The Signature Serum',  img: '/images/products/isola_serum.png', hero: true },
  { name: 'Terra Radiance Crème™',  role: 'Day',                  img: '/images/products/isola_collection.png' },
  { name: 'Liri Eye Concentrate™',  role: 'Eye',                  img: '/images/products/isola_serum.png' },
]

export function GrandDoor() {
  const [open, setOpen] = useState(false)
  const [reduced, setReduced] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  /* Reduced motion → open immediately, permanently. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) { setReduced(true); setOpen(true) }
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) { setReduced(true); setOpen(true) }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const openDoor = useCallback(() => setOpen(true), [])

  /* Scroll opens the door. Passive listener, unbinds once open. */
  useEffect(() => {
    if (open || reduced) return
    const onScroll = () => { if (window.scrollY > 40) setOpen(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open, reduced])

  /* Pointer approach opens the door — desktop only, fine pointers only. */
  useEffect(() => {
    if (open || reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist < Math.min(r.width, r.height) * 0.28) setOpen(true)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [open, reduced])

  // Hero sits at the true visual center; the trio is arranged symmetrically
  // around it (left / right / back), not left-to-right in array order.
  const hero = SHELF.find(p => p.hero) ?? SHELF[0]
  const rest = SHELF.filter(p => p !== hero)
  const ease = 'cubic-bezier(.16,1,.3,1)'

  return (
    <section
      ref={sectionRef}
      aria-label="LIRI ROMA — enter the house"
      className="gd-stage"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── THE STAGE — spotlight + red carpet, always present, purely decorative ── */}
      <div className="gd-spotlight" aria-hidden="true" />
      <div className="gd-carpet" aria-hidden="true" />

      {/* ── THE INTERIOR — always in the DOM. SEO + a11y safe. ───────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6vh 5vw',
          textAlign: 'center',
          opacity: open ? 1 : 0,
          transform: open ? 'none' : 'translateY(12px)',
          transition: reduced ? 'none' : 'opacity 1600ms cubic-bezier(.16,1,.3,1) 700ms, transform 1600ms cubic-bezier(.16,1,.3,1) 700ms',
          // Invisible while closed, but still in normal layout flow — without
          // this it silently intercepts clicks meant for the ENTER button,
          // since opacity:0 does not remove an element from hit-testing.
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--iv-font-body)',
            fontSize: 'clamp(9px, 1vw, 11px)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--iv-champagne-gold, #D6C5A0)',
            marginBottom: '1.6rem',
          }}
        >
          Isola del Liri · Lazio · Italia
        </p>

        <h1
          style={{
            fontFamily: 'var(--iv-font-serif)',
            fontWeight: 300,
            fontSize: 'clamp(2.1rem, 5.4vw, 4.5rem)',
            lineHeight: 1.06,
            color: '#F7EFE2',
            margin: 0,
            maxWidth: '18ch',
          }}
        >
          Your skin is a story
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--iv-ochre-light, #C26039)' }}>worth honoring</em>
        </h1>

        <p
          style={{
            fontFamily: 'var(--iv-font-body)',
            fontSize: 'clamp(0.9rem, 1.15vw, 1.0rem)',
            lineHeight: 1.75,
            color: 'rgba(247,239,226,0.72)',
            maxWidth: '46ch',
            margin: '1.8rem 0 0',
          }}
        >
          A house built where the waters fall. Matched to your biology,
          proven on your own skin within forty-eight hours.
        </p>

        {/* ── THE STAGE — hero centered on its pedestal, the trio arranged ──
               symmetrically around it. ────────────────────────────────── */}
        <div className="gd-product-stage">
          <div className="gd-footlight" aria-hidden="true" />

          {rest.map((p, i) => {
            const slotClass = ['gd-shelf-slot--left', 'gd-shelf-slot--back', 'gd-shelf-slot--right'][i]
            const isBack = slotClass === 'gd-shelf-slot--back'
            const delay = 1600 + i * 160
            return (
              <div
                key={p.name}
                className={`gd-shelf-slot ${slotClass}`}
                style={{
                  opacity: open ? (isBack ? 0.8 : 1) : 0,
                  transition: reduced ? 'none' : `opacity 800ms ${ease} ${delay}ms`,
                }}
              >
                <div style={{ position: 'relative', width: 'clamp(50px, 6vw, 78px)', height: 'clamp(76px, 9vw, 118px)' }}>
                  <Image
                    src={p.img}
                    alt={`${p.name} — ${p.role}`}
                    fill
                    sizes="(max-width: 768px) 20vw, 8vw"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* the back item peeks above the pedestal only as a hint of
                    what's waiting — its own visible name/role would collide
                    with the hero's labels below, so the label stays in the
                    DOM (SEO/a11y) but visually hidden here. */}
                {isBack ? (
                  <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                    {p.name} — {p.role}
                  </span>
                ) : (
                  <>
                    <span aria-hidden style={{ display: 'block', width: 'clamp(52px, 6.5vw, 84px)', height: 1, background: 'var(--iv-champagne-gold, #D6C5A0)', marginTop: '0.6rem' }} />
                    <span style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(0.62rem, 0.8vw, 0.78rem)', color: '#F7EFE2', marginTop: '0.6rem' }}>{p.name}</span>
                    <span style={{ fontFamily: 'var(--iv-font-body)', fontSize: 'clamp(7px, 0.6vw, 9px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(214,197,160,0.7)', marginTop: '0.25rem' }}>{p.role}</span>
                  </>
                )}
              </div>
            )
          })}

          <div
            className="gd-hero-slot"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(22px)',
              transition: reduced ? 'none' : `opacity 1100ms ${ease} 1000ms, transform 1100ms ${ease} 1000ms`,
            }}
          >
            <div className="gd-pedestal-group">
              <div className="gd-plinth" aria-hidden="true" />
              <div className="gd-plaque">
                <div className="gd-plaque-inner" style={{ position: 'relative', width: 'clamp(64px, 7.6vw, 100px)', height: 'clamp(64px, 7.6vw, 100px)' }}>
                  <Image src={hero.img} alt={`${hero.name} — ${hero.role}`} fill sizes="(max-width: 768px) 22vw, 9vw" style={{ objectFit: 'cover' }} priority />
                </div>
              </div>
              <div className="gd-plaque-foot" aria-hidden="true" />
            </div>
            <div className="gd-plinth-shadow" aria-hidden="true" />
            <span aria-hidden style={{ display: 'block', width: 'clamp(66px, 8.5vw, 112px)', height: 1, background: 'var(--iv-champagne-gold, #D6C5A0)', margin: '0.7rem auto 0' }} />
            <span style={{ display: 'block', fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)', color: '#F7EFE2', marginTop: '0.85rem' }}>{hero.name}</span>
            <span style={{ display: 'block', fontFamily: 'var(--iv-font-body)', fontSize: 'clamp(8px, 0.72vw, 10px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(214,197,160,0.7)', marginTop: '0.3rem' }}>{hero.role}</span>
          </div>
        </div>

        {/* ── ONE PRIMARY, ONE SECONDARY ────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 'clamp(2.2rem, 4.5vh, 3.4rem)',
            opacity: open ? 1 : 0,
            transition: reduced ? 'none' : 'opacity 1000ms ease 1700ms',
          }}
        >
          <Link
            href="/assessment"
            style={{
              fontFamily: 'var(--iv-font-body)',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--iv-cloud-dancer, #F0F2EB)',
              background: 'var(--iv-ochre, #9B4722)',
              padding: '1.05rem 2.6rem',
              textDecoration: 'none',
              transition: 'background 420ms ease',
            }}
          >
            Begin your ritual
          </Link>

          <Link
            href="/shop"
            style={{
              fontFamily: 'var(--iv-font-body)',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F7EFE2',
              textDecoration: 'none',
              borderBottom: '1px solid var(--iv-champagne-gold, #D6C5A0)',
              paddingBottom: '3px',
            }}
          >
            View the collection
          </Link>
        </div>
      </div>

      {/* ── THE DOORS ─────────────────────────────────────────────────
          Two Red Ochre leaves. Not rendered at all under reduced motion. */}
      {!reduced && (
        <>
          {(['left', 'right'] as const).map((side) => (
            <div
              key={side}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                [side]: 0,
                width: '50.5%',
                background: 'var(--iv-ochre, #9B4722)',
                transform: open
                  ? `translateX(${side === 'left' ? '-101%' : '101%'})`
                  : 'translateX(0)',
                transition: 'transform 1900ms cubic-bezier(.62,.02,.16,1)',
                willChange: 'transform',
                pointerEvents: open ? 'none' : 'auto',
                /* the inner edge catches light, like a real leaf */
                boxShadow:
                  side === 'left'
                    ? 'inset -1px 0 0 rgba(214,197,160,.5)'
                    : 'inset 1px 0 0 rgba(214,197,160,.5)',
              }}
            >
              {/* a single recessed panel — restraint, not ornament */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '11%',
                  bottom: '11%',
                  [side === 'left' ? 'left' : 'right']: '13%',
                  [side === 'left' ? 'right' : 'left']: '8%',
                  border: '1px solid rgba(214,197,160,.24)',
                }}
              />
            </div>
          ))}

          {/* The mark on the meeting rail — and the way in. */}
          <button
            type="button"
            onClick={openDoor}
            onFocus={openDoor}
            aria-label="Enter LIRI ROMA"
            aria-expanded={open}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.6rem',
              background: 'transparent',
              border: 0,
              cursor: open ? 'default' : 'pointer',
              opacity: open ? 0 : 1,
              transition: 'opacity 620ms ease',
              pointerEvents: open ? 'none' : 'auto',
              padding: '2rem',
            }}
          >
            {/* LR — the house mark */}
            <span
              style={{
                fontFamily: 'var(--iv-font-serif)',
                fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                color: 'var(--iv-champagne-gold, #D6C5A0)',
                lineHeight: 1,
              }}
            >
              LR
            </span>
            <span
              style={{
                fontFamily: 'var(--iv-font-body)',
                fontSize: 'clamp(8px, 0.8vw, 10px)',
                letterSpacing: '0.44em',
                textTransform: 'uppercase',
                color: 'rgba(214,197,160,.72)',
              }}
            >
              Enter
            </span>
          </button>
        </>
      )}
    </section>
  )
}
