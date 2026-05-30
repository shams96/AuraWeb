import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = { title: 'Checkout Cancelled — Isola Vitale' }

const C = {
  page:      '#FDFAF5',
  parchment: '#F4EAE2',
  charcoal:  '#1A1614',
  muted:     '#7A5C4E',
  gold:      '#913832',
  border:    'rgba(145,56,50,0.14)',
}

export default function CheckoutCancelPage() {
  return (
    <div style={{ minHeight: '100vh', background: C.page, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 460, textAlign: 'center', padding: '48px 0' }}>

        {/* Icon */}
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(145,56,50,0.06)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <ArrowLeft size={24} style={{ color: C.gold, opacity: 0.7 }} />
        </div>

        <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
          No charge was made
        </p>

        <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 16px' }}>
          Your ritual awaits.
        </h1>

        <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.8, maxWidth: 360, margin: '0 auto 36px', fontWeight: 300 }}>
          Your cart is still saved — return whenever you&apos;re ready. Our concierge team is available if you need any assistance before completing your order.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: C.gold, color: '#FDFAF5', borderRadius: 10, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Return to Shop
          </Link>
          <Link
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', border: `1px solid ${C.border}`, color: C.muted, borderRadius: 10, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Contact Concierge
          </Link>
        </div>

      </div>
    </div>
  )
}
