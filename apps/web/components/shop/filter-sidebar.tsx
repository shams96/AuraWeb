'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function FilterSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categories = [
    { label: 'T1 Teen (13-19)', value: 't1' },
    { label: 'T2 Twenties (20-29)', value: 't2' },
    { label: 'T3 Thirties+ (30-49)', value: 't3' },
    { label: 'T4 Mature+ (50+)', value: 't4' },
  ]
  
  const formats = ['Serum', 'Cleanser', 'Cream', 'SPF', 'Treatment']
  
  const currentTier = searchParams.get('tier') || ''

  const handleTierChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentTier === value) {
      params.delete('tier')
    } else {
      params.set('tier', value)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Age Tier System</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.value} className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={currentTier === category.value}
                onChange={() => handleTierChange(category.value)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Format</h3>
        <div className="space-y-2">
          {formats.map((format) => (
            <label key={format} className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              {format}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
