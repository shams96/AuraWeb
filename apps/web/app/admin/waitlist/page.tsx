'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, Download } from 'lucide-react'

interface WaitlistEntry {
  id: string
  email: string
  phone: string
  createdAt: string
  position: number
  isFounding: boolean
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [foundingCap, setFoundingCap] = useState(100)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/waitlist')
      if (r.ok) {
        const data = await r.json()
        setEntries(data.entries)
        setFoundingCap(data.foundingCap)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-iv-white">Waitlist</h1>
          <p className="text-sm text-iv-cream/60 mt-1 font-light">
            {entries.length} signed up · first {foundingCap} receive the founding offer
          </p>
        </div>
        <a
          href="/api/admin/waitlist?format=csv"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest"
          style={{ background: 'var(--iv-gold)', color: 'var(--iv-black)' }}
        >
          <Download size={14} />
          Download CSV
        </a>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-iv-gold" size={28} />
        </div>
      ) : entries.length === 0 ? (
        <p className="text-iv-cream/60 font-light">No signups yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'rgba(155,71,34,0.14)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-iv-cream/50 text-[10px] uppercase tracking-widest" style={{ background: 'var(--iv-deep-green)' }}>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Founding</th>
                <th className="px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id} className="border-t" style={{ borderColor: 'rgba(155,71,34,0.10)' }}>
                  <td className="px-5 py-3 text-iv-cream/70">{e.position}</td>
                  <td className="px-5 py-3 text-iv-white">{e.email}</td>
                  <td className="px-5 py-3 text-iv-cream/70">{e.phone}</td>
                  <td className="px-5 py-3">
                    {e.isFounding && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full" style={{ color: 'var(--iv-gold)', background: 'rgba(155,71,34,0.14)' }}>
                        Founding
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-iv-cream/50 text-xs">{new Date(e.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
