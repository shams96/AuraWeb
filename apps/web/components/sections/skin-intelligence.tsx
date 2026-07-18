'use client'

/* ═══════════════════════════════════════════════════════════════════════
   WHAT YOUR SKIN IS ASKING FOR — Chiarel
   Replaces: problem-education · problem-solution · competitor-comparison

   Brand law applied:
   · No deficiency framing. Skin is never a problem to be solved.
   · No "X-not-Y" contrast constructions.
   · No competitor names, ever.
   · Affirming, outcome-led, sensory. Speaks to her, not about us.
   · Mechanism language stays out — that lives in clinical materials.
   ═══════════════════════════════════════════════════════════════════════ */

const ASKS = [
  {
    label: 'Air',
    body: 'City air carries particulates and light that ask more of the barrier each day. Your skin answers them constantly — the house simply gives it more to answer with.',
  },
  {
    label: 'Light',
    body: 'The screens you live beside emit visible light your skin reads as a signal. A resilient barrier meets that signal calmly, and holds its clarity.',
  },
  {
    label: 'Climate',
    body: 'Heat, cold, and dry cabin air move the lipids that hold moisture in place. Given the right lipids, skin restores that architecture on its own.',
  },
  {
    label: 'Rhythm',
    body: 'Late nights and long weeks shift when skin does its repair. Your protocol meets it in that window, so the work still happens.',
  },
]

export function SkinIntelligenceSection() {
  return (
    <section
      aria-label="What your skin is asking for"
      style={{
        background: 'var(--iv-cloud-dancer, #F0F2EB)',
        padding: 'clamp(5rem, 12vh, 9rem) 5vw',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', maxWidth: '60ch', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--iv-font-body)',
              fontSize: 'clamp(9px, 0.85vw, 10px)',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'var(--iv-ochre, #9B4722)',
              marginBottom: '1.4rem',
            }}
          >
            Skin Intelligence™
          </p>

          <h2
            style={{
              fontFamily: 'var(--iv-font-serif)',
              fontWeight: 300,
              fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
              lineHeight: 1.14,
              color: 'var(--iv-charcoal, #1A1614)',
              margin: 0,
            }}
          >
            Your skin already knows
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--iv-ochre, #9B4722)' }}>
              how to perform
            </em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--iv-font-body)',
              fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
              lineHeight: 1.8,
              color: 'var(--iv-text, #3D2B20)',
              margin: '1.6rem auto 0',
            }}
          >
            It renews, defends, and rebuilds every day of your life. Modern living
            simply asks a great deal of it. We formulated the inputs — and matched
            them to your biology, so the work it already does goes further.
          </p>
        </div>

        {/* ── The four asks ──────────────────────────────────────── */}
        <ul
          style={{
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.6rem)',
            margin: 'clamp(3.5rem, 8vh, 6rem) 0 0',
            padding: 0,
          }}
        >
          {ASKS.map((a) => (
            <li key={a.label}>
              <span
                aria-hidden
                style={{
                  display: 'block',
                  width: '28px',
                  height: 1,
                  background: 'var(--iv-champagne-gold, #D6C5A0)',
                  marginBottom: '1.3rem',
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--iv-font-serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                  color: 'var(--iv-charcoal, #1A1614)',
                  margin: '0 0 0.85rem',
                }}
              >
                {a.label}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--iv-font-body)',
                  fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                  lineHeight: 1.78,
                  color: 'var(--iv-text-muted, #5C4438)',
                  margin: 0,
                }}
              >
                {a.body}
              </p>
            </li>
          ))}
        </ul>

        {/* ── The close ──────────────────────────────────────────── */}
        <p
          style={{
            fontFamily: 'var(--iv-font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)',
            lineHeight: 1.6,
            color: 'var(--iv-charcoal, #1A1614)',
            textAlign: 'center',
            maxWidth: '38ch',
            margin: 'clamp(3.5rem, 8vh, 5.5rem) auto 0',
          }}
        >
          Matched to your biology. Proven on your own skin, within forty-eight hours.
        </p>
      </div>
    </section>
  )
}
