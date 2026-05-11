/* Pure CSS scroll-driven progress bar — no JS, no hydration.
   Uses animation-timeline: scroll(root) for Chrome 115+ / Firefox 110+.
   In older browsers the bar simply doesn't appear (progressive enhancement). */
export function ScrollProgressBar() {
  return (
    <div
      aria-hidden="true"
      className="iv-scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 300,
        background: 'linear-gradient(90deg, var(--iv-gold) 0%, var(--iv-gold-light) 50%, var(--iv-champagne-gold) 100%)',
        transformOrigin: 'left center',
        pointerEvents: 'none',
      }}
    />
  )
}
