'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

interface ReturnRequest {
  id: string
  orderNumber: string
  email: string
  reason: string
  details: string
  status: string
  createdAt: string
}

const STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED']

const STATUS_BG: Record<string, string> = {
  PENDING:   'rgba(250,204,21,0.15)',
  APPROVED:  'rgba(74,222,128,0.15)',
  REJECTED:  'rgba(248,113,113,0.15)',
  COMPLETED: 'rgba(74,222,128,0.25)',
}

export default function AdminReturnsPage() {
  const [returns, setReturns]   = useState<ReturnRequest[]>([])
  const [loading, setLoading]   = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/returns')
      setReturns(r.ok ? await r.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    try {
      await fetch('/api/admin/returns', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      load()
    } finally {
      setUpdating(null)
    }
  }

  const pending   = returns.filter(r => r.status === 'PENDING').length
  const approved  = returns.filter(r => r.status === 'APPROVED').length

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>After-Sales</p>
        <h1 className="text-2xl font-bold text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
          Returns <span className="text-lg text-iv-cream/40 font-light ml-2">({returns.length})</span>
        </h1>
      </div>

      {/* Summary chips */}
      {returns.length > 0 && (
        <div className="flex gap-3 mb-6">
          {[
            { label: 'Pending',  count: pending,  bg: 'rgba(250,204,21,0.12)',  c: '#facc15' },
            { label: 'Approved', count: approved, bg: 'rgba(74,222,128,0.10)', c: '#4ade80' },
          ].map(({ label, count, bg, c }) => (
            <div key={label} className="rounded-xl px-4 py-2 text-xs font-semibold" style={{ background: bg, color: c }}>
              {count} {label}
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
        <div
          className="px-6 py-3 grid grid-cols-[130px_1fr_180px_120px_140px] gap-4 text-[10px] font-black uppercase tracking-widest text-iv-cream/30 border-b"
          style={{ borderColor: 'rgba(145,56,50,0.14)' }}
        >
          <span>Order #</span><span>Customer / Reason</span><span>Date</span><span className="text-center">Status</span><span />
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-iv-cream/40">
            <Loader2 size={24} className="animate-spin mx-auto mb-3" style={{ color: 'var(--iv-gold)' }} />
            Loading…
          </div>
        ) : returns.length === 0 ? (
          <div className="px-6 py-16 text-center text-iv-cream/40 text-sm">No return requests yet</div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(145,56,50,0.08)' }}>
            {returns.map((r) => (
              <div key={r.id}>
                <div className="px-6 py-4 grid grid-cols-[130px_1fr_180px_120px_140px] gap-4 items-center">
                  <p className="text-xs font-mono font-semibold text-iv-cream/70 truncate">{r.orderNumber}</p>
                  <div>
                    <p className="text-sm text-iv-white font-medium">{r.email}</p>
                    <p className="text-xs text-iv-cream/40 mt-0.5 truncate">{r.reason}</p>
                  </div>
                  <p className="text-xs text-iv-cream/40">
                    {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <div className="flex justify-center">
                    {updating === r.id ? (
                      <Loader2 size={14} className="animate-spin" style={{ color: 'var(--iv-gold)' }} />
                    ) : (
                      <select
                        value={r.status}
                        onChange={e => updateStatus(r.id, e.target.value)}
                        className="text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1.5 outline-none cursor-pointer"
                        style={{
                          background: STATUS_BG[r.status] ?? 'rgba(145,56,50,0.12)',
                          color: 'var(--iv-cream)',
                          border: '1px solid rgba(145,56,50,0.18)',
                        }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    )}
                  </div>
                  <button
                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                    className="text-[10px] font-black uppercase tracking-widest text-right"
                    style={{ color: 'var(--iv-gold)' }}
                  >
                    {expanded === r.id ? 'Hide' : 'Details'} →
                  </button>
                </div>
                {expanded === r.id && r.details && (
                  <div className="px-6 pb-4">
                    <div className="rounded-xl px-4 py-3 text-sm text-iv-cream/60 font-light" style={{ background: 'rgba(145,56,50,0.06)', border: '1px solid rgba(145,56,50,0.10)' }}>
                      {r.details}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
