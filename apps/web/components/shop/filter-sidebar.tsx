'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const FORMATS = [
  { label: 'Jar Cream',   value: 'jar' },
  { label: 'Pump Bottle', value: 'pump' },
  { label: 'Dropper',     value: 'dropper' },
  { label: 'Mist / Spray',value: 'mist' },
  { label: 'Eye Pump',    value: 'eye-pump' },
]

export function FilterSidebar() {
  const router     = useRouter()
  const pathname   = usePathname()
  const searchParams = useSearchParams()

  const currentFormat = searchParams.get('format') || ''

  function setParam(key: string, value: string, current: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (current === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-10">
      {/* Format filter */}
      <div>
        <h3 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em] mb-5">Format</h3>
        <div className="space-y-2">
          {FORMATS.map(({ label, value }) => {
            const active = currentFormat === value
            return (
              <button
                key={value}
                onClick={() => setParam('format', value, currentFormat)}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'border-iv-gold/40 bg-iv-gold/8 text-iv-gold'
                    : 'border-iv-white/5 hover:border-iv-white/10 text-iv-cream/40'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear filters */}
      {currentFormat && (
        <button
          onClick={() => router.push(pathname, { scroll: false })}
          className="w-full text-center text-[10px] font-black uppercase tracking-widest text-iv-cream/30 hover:text-iv-gold transition-colors py-2"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
