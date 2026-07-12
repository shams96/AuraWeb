'use client'

/* ═══════════════════════════════════════════════════════════════════════
   THE HOUSE STANDARD — LIRI ROMA
   Replaces: competitor-comparison

   The retired component named La Mer, Augustinus Bader and L'Oréal in a
   checkbox table with red crosses against them. That is comparative
   advertising, and brand law forbids naming competitors at all.

   It also claimed a "Proprietary Cellular Renewal Complex" (a third party's
   trademarked ingredient) and "Structural Support Through Metabolic Change" (a
   prescription drug name). Both are removed permanently.

   A house does not argue against others. It states what it holds itself to.
   ═══════════════════════════════════════════════════════════════════════ */

const STANDARDS = [
  {
    title: 'Proven on your own skin',
    body: 'A result you can feel within forty-eight hours — the TTW™ standard. If it does not arrive, your next refill is ours to send.',
  },
  {
    title: 'Matched to your biology',
    body: 'A two-minute assessment reads your skin and builds your protocol around it. Your biology sets the formula, and your birthdate is never asked.',
  },
  {
    title: 'Made where the waters fall',
    body: 'Formulated and made at Isola del Liri, in Lazio, with a master pharmacist and cosmetic chemist. One town, one laboratory, one standard.',
  },
  {
    title: 'Named for what it does',
    body: 'Every concentration is disclosed. No ingredient hides behind a product name, and no claim is made that the house has not proven itself.',
  },
  {
    title: 'Built for long ownership',
    body: 'Refill architecture on the jars, high-flint glass, and a single champagne mould. The object is made to be kept, and returned to.',
  },
  {
    title: 'Certified manufacture',
    body: 'EU GMP certified. Cruelty-free, and free of the shortcuts that make a formula cheaper to make and lesser to wear.',
  },
]

export function HouseStandard() {
  return (
    <section
      aria-label="The house standard"
      style={{
        background: 'var(--iv-cloud-dancer, #F0F2EB)',
        padding: 'clamp(5rem, 12vh, 9rem) 5vw',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '52ch', margin: '0 auto' }}>
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
            The House Standard
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
            What we hold
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--iv-ochre, #9B4722)' }}>
              ourselves to
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
            Six commitments. Each one is a promise the house can be measured against.
          </p>
        </div>

        <ul
          style={{
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2.4rem, 4.5vw, 4rem) clamp(2.4rem, 5vw, 4.5rem)',
            margin: 'clamp(3.5rem, 8vh, 6rem) 0 0',
            padding: 0,
          }}
        >
          {STANDARDS.map((s) => (
            <li key={s.title}>
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
                  fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)',
                  color: 'var(--iv-charcoal, #1A1614)',
                  margin: '0 0 0.85rem',
                }}
              >
                {s.title}
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
                {s.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
