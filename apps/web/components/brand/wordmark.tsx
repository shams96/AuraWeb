/* ═══════════════════════════════════════════════════════════════════════
   THE CHIAREL WORDMARK — one treatment, everywhere.
   BRAND-BIBLE: the wordmark sets as a single word with one uniform styling
   across all placements — never restyled per-page.
   Ink follows the surrounding ground (pass `color` for dark grounds).
   ═══════════════════════════════════════════════════════════════════════ */

export function Wordmark({
  size = '1.15rem',
  color = 'var(--iv-charcoal)',
}: {
  /** font-size of the mark (the only thing that may vary between placements) */
  size?: string
  /** ink for "Chiarel" — defaults to charcoal for light grounds */
  color?: string
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--iv-font-serif)',
        fontSize: size,
        fontWeight: 600,
        color,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      Chiarel
    </span>
  )
}
