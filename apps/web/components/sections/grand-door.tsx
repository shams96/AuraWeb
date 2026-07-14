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
      {/* ── THE STAGE — soft overhead light, purely decorative ── */}
      <div className="gd-spotlight" aria-hidden="true" />

      {/* ── THE INTERIOR — always in the DOM. SEO + a11y safe.
             Editorial two-column composition: words on the left,
             the photograph on the right. ───────────────────────── */}
      <div
        className="gd-interior"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'none' : 'translateY(12px)',
          transition: reduced ? 'none' : 'opacity 1600ms cubic-bezier(.16,1,.3,1) 700ms, transform 1600ms cubic-bezier(.16,1,.3,1) 700ms',
          // Invisible while closed, but still in normal layout flow — without
          // this it silently intercepts clicks meant for the ENTER button,
          // since opacity:0 does not remove an element from hit-testing.
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="gd-interior-text">
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
            fontSize: 'clamp(1.8rem, 8vmin, 4.5rem)',
            lineHeight: 1.06,
            color: 'var(--iv-cloud-dancer, #F0F2EB)',
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
            fontSize: 'clamp(0.82rem, 1.8vmin, 1.0rem)',
            lineHeight: 1.75,
            color: 'rgba(240,242,235,0.72)',
            maxWidth: '46ch',
            margin: '1.8rem 0 0',
          }}
        >
          A house built where the waters fall. Matched to your biology,
          proven on your own skin within forty-eight hours.
        </p>

        {/* ── ONE PRIMARY, ONE SECONDARY ────────────────────────────── */}
        <div
          className="gd-cta-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginTop: 'clamp(2.2rem, 4.5vh, 3.4rem)',
            opacity: open ? 1 : 0,
            transition: reduced ? 'none' : 'opacity 1000ms ease 1500ms',
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
              color: 'var(--iv-cloud-dancer, #F0F2EB)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--iv-champagne-gold, #D6C5A0)',
              paddingBottom: '3px',
            }}
          >
            View the collection
          </Link>
        </div>
        </div>

        {/* ── THE PHOTOGRAPH — the signature serum, melted into the room ── */}
        <div
          className="gd-hero-photo"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'none' : 'translateY(18px) scale(0.985)',
            transition: reduced ? 'none' : `opacity 1400ms ${ease} 1100ms, transform 1400ms ${ease} 1100ms`,
          }}
        >
          <Image
            src="/images/products/isola_serum.png"
            alt="Liri Essence — the signature serum"
            fill
            sizes="(max-width: 900px) 88vw, 44vw"
            priority
            style={{ objectFit: 'cover' }}
          />
          <p className="gd-hero-caption">
            Liri Essence™ <span aria-hidden>·</span> The Signature Serum
          </p>
        </div>
      </div>

      {/* ── THE DOORS ─────────────────────────────────────────────────
          Two lacquered Red Ochre leaves with recessed panels, brass pulls,
          and interior light escaping through the seam and beneath —
          the house is lit, and someone is expected.
          Not rendered at all under reduced motion. */}
      {!reduced && (
        <>
          {(['left', 'right'] as const).map((side) => (
            <div
              key={side}
              aria-hidden="true"
              className={`gd-door gd-door--${side}`}
              style={{
                transform: open
                  ? `translateX(${side === 'left' ? '-101%' : '101%'})`
                  : 'translateX(0)',
                transition: 'transform 1900ms cubic-bezier(.62,.02,.16,1)',
                willChange: 'transform',
                pointerEvents: open ? 'none' : 'auto',
              }}
            >
              {/* two recessed panels, as on a real double door */}
              <span aria-hidden className="gd-door-panel gd-door-panel--upper" />
              <span aria-hidden className="gd-door-panel gd-door-panel--lower" />
              {/* brass pull at the meeting rail */}
              <span aria-hidden className="gd-door-pull" />
            </div>
          ))}

          {/* interior light escaping at the seam and under the doors */}
          <div aria-hidden className="gd-door-seam" style={{ opacity: open ? 0 : 1, transition: 'opacity 900ms ease' }} />
          <div aria-hidden className="gd-door-underlight" style={{ opacity: open ? 0 : 1, transition: 'opacity 900ms ease' }} />

          {/* The mark on the meeting rail — and the way in. */}
          <button
            type="button"
            onClick={openDoor}
            onFocus={openDoor}
            aria-label="Enter LIRI ROMA"
            aria-expanded={open}
            style={{
              position: 'absolute',
              top: '36%',
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
            {/* RL — the house monogram */}
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
              RL
            </span>
            <span
              className="gd-enter-pulse"
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
