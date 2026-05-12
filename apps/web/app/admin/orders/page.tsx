'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  user: { name: string; email: string } | null
  items: { name: string; quantity: number }[]
}

const STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']

const STATUS_BG: Record<string, string> = {
  PENDING:    'rgba(250,204,21,0.15)',
  CONFIRMED:  'rgba(74,222,128,0.12)',
  PROCESSING: 'rgba(0,95,107,0.20)',
  SHIPPED:    'rgba(74,222,128,0.20)',
  DELIVERED:  'rgba(74,222,128,0.30)',
  CANCELLED:  'rgba(248,113,113,0.15)',
  REFUNDED:   'rgba(145,56,50,0.20)',
}

export default function AdminOrdersPage() {
  const [orders, setOrders]   = useState<Order[]>([])
  const [total, setTotal]     = useState(0)
  const [pages, setPages]     = useState(1)
  const [page, setPage]       = useState(1)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch(`/api/admin/orders?page=${page}&limit=20`)
      const data = await r.json()
      setOrders(data.orders ?? [])
      setTotal(data.total ?? 0)
      setPages(data.pages ?? 1)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      load()
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>Fulfilment</p>
        <h1 className="text-2xl font-bold text-iv-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Orders <span className="text-lg text-iv-cream/40 font-light ml-2">({total})</span>
        </h1>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
        <div
          className="px-6 py-3 grid grid-cols-[140px_1fr_120px_100px_160px] gap-4 text-[10px] font-black uppercase tracking-widest text-iv-cream/30 border-b"
          style={{ borderColor: 'rgba(145,56,50,0.14)' }}
        >
          <span>Order #</span><span>Customer / Items</span><span className="text-right">Total</span><span className="text-right">Date</span><span className="text-center">Status</span>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-iv-cream/40">
            <Loader2 size={24} className="animate-spin mx-auto mb-3" style={{ color: 'var(--iv-gold)' }} />
            Loading…
          </div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-iv-cream/40 text-sm">No orders yet</div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(145,56,50,0.08)' }}>
            {orders.map((o) => (
              <div key={o.id} className="px-6 py-4 grid grid-cols-[140px_1fr_120px_100px_160px] gap-4 items-center">
                <p className="text-xs font-mono font-semibold text-iv-cream/70 truncate">{o.orderNumber}</p>
                <div>
                  <p className="text-sm text-iv-white font-medium">
                    {o.user?.name ?? o.user?.email ?? 'Guest'}
                  </p>
                  <p className="text-xs text-iv-cream/30 mt-0.5 truncate">
                    {(o.items as { name: string; quantity: number }[]).map(i => `${i.name} ×${i.quantity}`).join(', ') || '—'}
                  </p>
                </div>
                <p className="text-sm text-right font-semibold text-iv-white">
                  ${Number(o.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-right text-iv-cream/40">
                  {new Date(o.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </p>
                <div className="flex justify-center">
                  {updating === o.id ? (
                    <Loader2 size={14} className="animate-spin" style={{ color: 'var(--iv-gold)' }} />
                  ) : (
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      className="text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1.5 outline-none cursor-pointer"
                      style={{
                        background: STATUS_BG[o.status] ?? 'rgba(145,56,50,0.12)',
                        color: 'var(--iv-cream)',
                        border: '1px solid rgba(145,56,50,0.18)',
                      }}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
            <p className="text-xs text-iv-cream/40">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-lg disabled:opacity-30 text-iv-cream/60 hover:text-iv-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page >= pages}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-lg disabled:opacity-30 text-iv-cream/60 hover:text-iv-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
