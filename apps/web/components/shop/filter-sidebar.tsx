'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const PROTOCOLS = [
  { label: 'Preservation Protocol', value: 't1' },
  { label: 'Refinement Protocol',   value: 't2' },
  { label: 'Regeneration Protocol', value: 't3' },
  { label: 'Longevity Protocol',    value: 't4' },
  { label: 'Consumer Series',       value: 'consumer' },
  { label: 'Most Practised',        value: 'best-seller' },
]

const FORMATS = [
  { label: 'Jar Cream',    value: 'jar' },
  { label: 'Pump Bottle',  value: 'pump' },
  { label: 'Dropper',      value: 'dropper' },
  { label: 'Mist / Spray', value: 'mist' },
  { label: 'Eye Pump',     value: 'eye-pump' },
]

const C = {
  border:       'rgba(155, 71, 34,0.14)',
  borderActive: 'rgba(155, 71, 34,0.40)',
  bgActive:     'rgba(155, 71, 34,0.07)',
  text:         '#3D2B20',
  textMuted:    '#7A5C4E',
  gold:         '#9B4722',
}

export function FilterSidebar() {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  const currentTier   = searchParams.get('tier')   || ''
  const currentFormat = searchParams.get('format') || ''

  function setParam(key: string, value: string, current: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (current === value) params.delete(key)
    else params.set(key, value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const hasFilters = currentTier || currentFormat

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Protocol filter */}
      <div>
        <h3 style={{ fontSize: '0.65rem', fontWeight: 900, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '1rem' }}>
          Refine by Protocol
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {PROTOCOLS.map(({ label, value }) => {
            const active = currentTier === value
            return (
              <button
                key={value}
                onClick={() => setParam('tier', value, currentTier)}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '10px 14px', borderRadius: 8,
                  border: `1px solid ${active ? C.borderActive : C.border}`,
                  background: active ? C.bgActive : 'transparent',
                  color: active ? C.gold : C.text,
                  fontSize: '0.78rem', fontWeight: active ? 700 : 500,
                  letterSpacing: '0.02em',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.background = C.bgActive } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent' } }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Format filter */}
      <div>
        <h3 style={{ fontSize: '0.65rem', fontWeight: 900, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '1rem' }}>
          Format
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {FORMATS.map(({ label, value }) => {
            const active = currentFormat === value
            return (
              <button
                key={value}
                onClick={() => setParam('format', value, currentFormat)}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '10px 14px', borderRadius: 8,
                  border: `1px solid ${active ? C.borderActive : C.border}`,
                  background: active ? C.bgActive : 'transparent',
                  color: active ? C.gold : C.text,
                  fontSize: '0.78rem', fontWeight: active ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.background = C.bgActive } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent' } }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={() => router.push(pathname, { scroll: false })}
          style={{
            width: '100%', textAlign: 'center', padding: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: C.textMuted, transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
          onMouseLeave={e => (e.currentTarget.style.color = C.textMuted)}
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
