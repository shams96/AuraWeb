'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Loader2, ArrowRight } from 'lucide-react'

interface OrderItem { name: string; quantity: number; price: number }
interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

const STATUS_COLOUR: Record<string, string> = {
  PENDING:    '#facc15',
  CONFIRMED:  '#4ade80',
  PROCESSING: '#38bdf8',
  SHIPPED:    '#4ade80',
  DELIVERED:  '#4ade80',
  CANCELLED:  '#f87171',
  REFUNDED:   '#f87171',
}

export default function AccountOrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account/orders')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/account/orders')
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-iv-black flex items-center justify-center">
        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--iv-gold)' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-iv-black px-4 py-20">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--iv-gold)' }}>Account</p>
          <h1 className="text-3xl font-bold text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
            Your Orders
          </h1>
          {session?.user?.name && (
            <p className="text-iv-cream/40 text-sm mt-1 font-light">{session.user.name} · {session.user.email}</p>
          )}
        </div>

        {orders.length === 0 ? (
          <div
            className="rounded-2xl p-16 text-center"
            style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(145,56,50,0.10)' }}>
              <ShoppingBag size={24} style={{ color: 'var(--iv-gold)' }} />
            </div>
            <p className="text-iv-white font-semibold mb-2">No orders yet</p>
            <p className="text-iv-cream/40 text-sm font-light mb-8">Your order history will appear here after your first purchase.</p>
            <Link href="/shop" className="btn-luxury inline-flex items-center gap-2" style={{ padding: '12px 28px', fontSize: '0.7rem', letterSpacing: '0.18em' }}>
              Discover Your Protocol <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
              >
                {/* Order header */}
                <div
                  className="px-6 py-4 flex items-center justify-between border-b"
                  style={{ borderColor: 'rgba(145,56,50,0.10)' }}
                >
                  <div>
                    <p className="text-xs font-mono font-semibold text-iv-cream/60">{order.orderNumber}</p>
                    <p className="text-xs text-iv-cream/30 mt-0.5 font-light">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-iv-white">
                      ${Number(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ color: STATUS_COLOUR[order.status] ?? '#888', background: 'rgba(145,56,50,0.10)' }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-2">
                  {(order.items as OrderItem[]).map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <p className="text-sm text-iv-cream/70">{item.name} <span className="text-iv-cream/30">×{item.quantity}</span></p>
                      <p className="text-sm text-iv-cream/50">${Number(item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="px-6 pb-4 flex items-center gap-4">
                  {['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED'].includes(order.status) && (
                    <span className="text-xs text-iv-cream/30 font-light">Delivery within 3–5 working days</span>
                  )}
                  <Link
                    href="/returns"
                    className="ml-auto text-[10px] font-black uppercase tracking-widest"
                    style={{ color: 'var(--iv-gold)' }}
                  >
                    Request Return →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link href="/shop" className="text-xs text-iv-cream/40 hover:text-iv-cream transition-colors font-light">
            ← Continue Shopping
          </Link>
          <Link href="/returns" className="text-xs text-iv-cream/40 hover:text-iv-cream transition-colors font-light ml-auto">
            Returns Policy
          </Link>
        </div>

      </div>
    </div>
  )
}
