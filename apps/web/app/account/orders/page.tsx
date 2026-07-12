'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'

interface OrderItem { name: string; quantity: number; price: number }
interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

const C = {
  page:      '#FDFAF5',
  parchment: '#F4EAE2',
  card:      '#EDE8E0',
  charcoal:  '#1A1614',
  espresso:  '#3D2B20',
  muted:     '#7A5C4E',
  gold:      '#9B4722',
  border:    'rgba(155, 71, 34,0.14)',
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Pending',    color: C.muted    },
  CONFIRMED:  { label: 'Confirmed',  color: '#2D6A4F'  },
  PROCESSING: { label: 'Processing', color: C.espresso },
  SHIPPED:    { label: 'Shipped',    color: '#2D6A4F'  },
  DELIVERED:  { label: 'Delivered',  color: '#2D6A4F'  },
  CANCELLED:  { label: 'Cancelled',  color: C.gold     },
  REFUNDED:   { label: 'Refunded',   color: C.gold     },
}

export default function AccountOrdersPage() {
  const { data: session, status } = useSession()
  const router  = useRouter()
  const [orders,  setOrders]  = useState<Order[]>([])
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
    return <div style={{ minHeight: '100vh', background: C.page }} />
  }

  if (!session) return null

  return (
    <div style={{ minHeight: '100vh', background: C.page }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: C.page }}>
        <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Account
        </Link>
        <span style={{ color: C.border }}>·</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.charcoal }}>My Orders</span>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Order History</p>
          <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '2rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: 0 }}>
            Your rituals
          </h1>
        </div>

        {orders.length === 0 ? (
          <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, padding: '56px 24px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(155, 71, 34,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <ShoppingBag size={22} style={{ color: C.gold }} />
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: C.charcoal, marginBottom: 6 }}>No orders yet</p>
            <p style={{ fontSize: '0.8rem', color: C.muted, fontWeight: 300, lineHeight: 1.6, marginBottom: 24 }}>
              Your order history will appear here after your first ritual.
            </p>
            <Link
              href="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: C.gold, color: '#FDFAF5', borderRadius: 10, fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Discover Your Protocol <ArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map(order => {
              const st = STATUS_LABEL[order.status] ?? { label: order.status, color: C.muted }
              return (
                <div key={order.id} style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden' }}>

                  {/* Order header */}
                  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, color: C.charcoal, margin: '0 0 2px' }}>{order.orderNumber}</p>
                      <p style={{ fontSize: '0.75rem', color: C.muted, margin: 0, fontWeight: 300 }}>
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: 800, color: C.charcoal, margin: 0 }}>
                        ${Number(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: st.color, padding: '4px 10px', borderRadius: 99, background: 'rgba(155, 71, 34,0.06)', border: `1px solid ${C.border}` }}>
                        {st.label}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(order.items as OrderItem[]).map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.8rem', color: C.espresso, margin: 0 }}>
                          {item.name} <span style={{ color: C.muted, fontWeight: 300 }}>×{item.quantity}</span>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: C.muted, margin: 0, fontWeight: 300 }}>${Number(item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '10px 20px 14px', display: 'flex', alignItems: 'center' }}>
                    {['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED'].includes(order.status) && (
                      <p style={{ fontSize: '0.75rem', color: C.muted, margin: 0, fontWeight: 300 }}>Delivery within 3–5 working days</p>
                    )}
                    <Link href="/returns" style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none' }}>
                      Request Return →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', gap: 24 }}>
          <Link href="/shop" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>
            Continue Shopping
          </Link>
          <Link href="/returns" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none', marginLeft: 'auto' }}>
            Returns Policy
          </Link>
        </div>

      </div>
    </div>
  )
}
