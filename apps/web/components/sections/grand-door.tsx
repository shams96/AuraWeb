'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

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
  { name: 'Cellular Cleanser™',    role: 'Cleanse',              kind: 'tube' as const },
  { name: 'Liri Essence™',          role: 'The Signature Serum',  kind: 'bottle' as const, hero: true },
  { name: 'Terra Radiance Crème™',  role: 'Day',                  kind: 'jar' as const },
  { name: 'Liri Eye Concentrate™',  role: 'Eye',                  kind: 'small-bottle' as const },
]

/* The hero product as an actual standing bottle, not a framed photo —
   a stylized faceted Garden Green glass dropper bottle with a gold cap,
   matching the brand's real packaging colors — deepened glass tones,
   multi-angle facet highlights, and a mirrored reflection beneath it on
   the pedestal (both CSS/SVG-only; not a photo, but closer to the mood
   of a real product shot than a flat single-tone illustration). */
function HeroBottle() {
  const body = (
    <>
      {/* cap */}
      <rect x="44" y="4" width="32" height="36" rx="7" fill="url(#gd-bottle-cap)" />
      <rect x="44" y="4" width="32" height="8" rx="4" fill="#FBF0D6" opacity="0.55" />
      {/* neck */}
      <rect x="51" y="38" width="18" height="18" fill="url(#gd-bottle-glass)" />
      {/* shoulder + body */}
      <path
        d="M38 56 L82 56 L91 82 L91 200 Q91 214 77 214 L43 214 Q29 214 29 200 L29 82 Z"
        fill="url(#gd-bottle-glass)"
      />
      {/* facet division lines — suggest cut-glass panels meeting at angles */}
      <path d="M52 58 L50 212" stroke="#01110B" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M68 58 L70 212" stroke="#F7FFE9" strokeOpacity="0.14" strokeWidth="1" />
      {/* multi-angle specular highlights, catching light differently per facet */}
      <path d="M40 82 L36 206" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="6" strokeLinecap="round" />
      <path d="M58 70 L60 130" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
      <path d="M80 90 L78 170" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="5" strokeLinecap="round" />
    </>
  )
  return (
    <svg viewBox="0 0 120 300" width="100%" height="100%" role="presentation" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        {/* Garden Green glass — brand #004B37 at the lit center, falling to
            near-black green at the silhouette edges */}
        <linearGradient id="gd-bottle-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#01110B" />
          <stop offset="14%" stopColor="#023024" />
          <stop offset="30%" stopColor="#004B37" />
          <stop offset="46%" stopColor="#0E7255" />
          <stop offset="54%" stopColor="#0E7255" />
          <stop offset="70%" stopColor="#004B37" />
          <stop offset="86%" stopColor="#023024" />
          <stop offset="100%" stopColor="#01110B" />
        </linearGradient>
        <linearGradient id="gd-bottle-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6E6B8" />
          <stop offset="45%" stopColor="#D6B15C" />
          <stop offset="100%" stopColor="#93712E" />
        </linearGradient>
        <filter id="gd-bottle-shadow" x="-60%" y="-20%" width="220%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <linearGradient id="gd-bottle-reflect-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="gd-bottle-reflect-mask">
          <rect x="0" y="0" width="120" height="90" fill="url(#gd-bottle-reflect-fade)" />
        </mask>
      </defs>

      {/* mirrored reflection on the pedestal surface, anchored at the base and fading out */}
      <g transform="translate(0,428) scale(1,-1)" opacity="0.65" mask="url(#gd-bottle-reflect-mask)">
        {body}
      </g>

      <g filter="url(#gd-bottle-shadow)">
        {body}
        {/* small brand mark */}
        <text x="60" y="150" textAnchor="middle" fontFamily="var(--iv-font-serif)" fontSize="13" fill="#F6E6B8" opacity="0.75">LR</text>
      </g>
    </svg>
  )
}

/* Terra Radiance Crème™ — a squat ceramic jar with a gold lid, in the
   brand's warm terracotta tone. */
function ProductJar() {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" role="presentation" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="gd-jar-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A3319" />
          <stop offset="20%" stopColor="#A2502A" />
          <stop offset="50%" stopColor="#C2603C" />
          <stop offset="80%" stopColor="#A2502A" />
          <stop offset="100%" stopColor="#7A3319" />
        </linearGradient>
        <linearGradient id="gd-jar-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6E6B8" />
          <stop offset="50%" stopColor="#D6B15C" />
          <stop offset="100%" stopColor="#93712E" />
        </linearGradient>
        <filter id="gd-jar-shadow" x="-40%" y="-20%" width="180%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#gd-jar-shadow)">
        <rect x="12" y="34" width="96" height="58" rx="14" fill="url(#gd-jar-body)" />
        <rect x="8" y="10" width="104" height="30" rx="10" fill="url(#gd-jar-lid)" />
        <rect x="8" y="10" width="104" height="7" rx="3.5" fill="#FBF0D6" opacity="0.5" />
        <text x="60" y="68" textAnchor="middle" fontFamily="var(--iv-font-serif)" fontSize="12" fill="#F6E6B8" opacity="0.7">LR</text>
      </g>
    </svg>
  )
}

/* Cellular Cleanser™ — a squeeze tube, ivory body with a gold cap. */
function ProductTube() {
  return (
    <svg viewBox="0 0 90 200" width="100%" height="100%" role="presentation" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="gd-tube-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9B892" />
          <stop offset="18%" stopColor="#E7DBC0" />
          <stop offset="50%" stopColor="#F8F1E3" />
          <stop offset="82%" stopColor="#E7DBC0" />
          <stop offset="100%" stopColor="#C9B892" />
        </linearGradient>
        <linearGradient id="gd-tube-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6E6B8" />
          <stop offset="45%" stopColor="#D6B15C" />
          <stop offset="100%" stopColor="#93712E" />
        </linearGradient>
        <filter id="gd-tube-shadow" x="-60%" y="-20%" width="220%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#gd-tube-shadow)">
        <path d="M32 8 L58 8 L58 26 L32 26 Z" fill="url(#gd-tube-cap)" />
        <path d="M26 26 L64 26 L60 46 L30 46 Z" fill="url(#gd-tube-body)" />
        <path d="M30 46 L60 46 L66 170 Q66 182 45 182 Q24 182 24 170 Z" fill="url(#gd-tube-body)" />
        <rect x="35" y="60" width="5" height="100" rx="2.5" fill="#7A3319" opacity="0.14" />
        <text x="45" y="120" textAnchor="middle" fontFamily="var(--iv-font-serif)" fontSize="11" fill="#7A3319" opacity="0.55">LR</text>
      </g>
    </svg>
  )
}

/* Liri Eye Concentrate™ — a smaller dropper bottle, deep peacock glass. */
function ProductSmallBottle() {
  return (
    <svg viewBox="0 0 90 170" width="100%" height="100%" role="presentation" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="gd-small-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#04191D" />
          <stop offset="18%" stopColor="#0C2D38" />
          <stop offset="45%" stopColor="#1D5560" />
          <stop offset="55%" stopColor="#1D5560" />
          <stop offset="82%" stopColor="#0C2D38" />
          <stop offset="100%" stopColor="#04191D" />
        </linearGradient>
        <filter id="gd-small-shadow" x="-60%" y="-20%" width="220%" height="160%">
          <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#000" floodOpacity="0.42" />
        </filter>
      </defs>
      <g filter="url(#gd-small-shadow)">
        <rect x="33" y="4" width="24" height="26" rx="5" fill="url(#gd-bottle-cap)" />
        <rect x="38" y="28" width="14" height="12" fill="url(#gd-small-glass)" />
        <path d="M28 40 L62 40 L68 60 L68 142 Q68 152 57 152 L33 152 Q22 152 22 142 L22 60 Z" fill="url(#gd-small-glass)" />
        <rect x="34" y="56" width="5" height="90" rx="2.5" fill="#FFFFFF" opacity="0.2" />
        <text x="45" y="105" textAnchor="middle" fontFamily="var(--iv-font-serif)" fontSize="10" fill="#F6E6B8" opacity="0.7">LR</text>
      </g>
    </svg>
  )
}

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
          // In normal flow (not absolute) so a short viewport makes the
          // section grow and scroll rather than letting the absolutely
          // positioned stage children overlap the headline.
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
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
                <div style={{ position: 'relative', width: 'clamp(38px, 4.6vw, 60px)', height: 'clamp(72px, 8.6vw, 112px)' }}>
                  {p.kind === 'jar' && <ProductJar />}
                  {p.kind === 'tube' && <ProductTube />}
                  {p.kind === 'small-bottle' && <ProductSmallBottle />}
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
                    <span style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(0.62rem, 0.8vw, 0.78rem)', color: 'var(--iv-cloud-dancer, #F0F2EB)', marginTop: '0.6rem' }}>{p.name}</span>
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
              <div className="gd-hero-glow" aria-hidden="true" />
              <div className="gd-hero-bottle">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    transformOrigin: 'bottom center',
                    // "walking towards it" — once the reveal has settled, the
                    // bottle keeps slowly growing closer, as though approached
                    animation: open && !reduced ? 'gd-approach 3200ms ease-out 2100ms forwards' : 'none',
                  }}
                >
                  <HeroBottle />
                </div>
              </div>
            </div>
            <div className="gd-plinth-shadow" aria-hidden="true" />
            <span aria-hidden style={{ display: 'block', width: 'clamp(66px, 8.5vw, 112px)', height: 1, background: 'var(--iv-champagne-gold, #D6C5A0)', margin: '0.7rem auto 0' }} />
            <span style={{ display: 'block', fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)', color: 'var(--iv-cloud-dancer, #F0F2EB)', marginTop: '0.85rem' }}>{hero.name}</span>
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
