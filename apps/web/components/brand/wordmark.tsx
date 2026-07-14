/* ═══════════════════════════════════════════════════════════════════════
   THE LIRI ROMA WORDMARK — one treatment, everywhere.
   BRAND-BIBLE: the wordmark sets on ONE line with one uniform styling
   across all placements — never stacked, never restyled per-page.
   LIRI takes the surrounding ink (pass `color` for dark grounds);
   ROMA is always italic Red Ochre.
   ═══════════════════════════════════════════════════════════════════════ */

export function Wordmark({
  size = '1.15rem',
  color = 'var(--iv-charcoal)',
}: {
  /** font-size of the mark (the only thing that may vary between placements) */
  size?: string
  /** ink for "LIRI" — defaults to charcoal for light grounds */
  color?: string
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--iv-font-serif)',
        fontSize: size,
        fontWeight: 600,
        color,
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}
    >
      LIRI <em style={{ color: 'var(--iv-ochre)', fontStyle: 'italic' }}>ROMA</em>
    </span>
  )
}
