import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Ritual Confirmed — Isola Vitale' }

const C = {
  page:      '#FDFAF5',
  parchment: '#F4EAE2',
  charcoal:  '#1A1614',
  espresso:  '#3D2B20',
  muted:     '#7A5C4E',
  gold:      '#913832',
  border:    'rgba(145,56,50,0.14)',
}

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  void searchParams
  return (
    <div style={{ minHeight: '100vh', background: C.page, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 520, textAlign: 'center', padding: '48px 0' }}>

        {/* Icon */}
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(145,56,50,0.08)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <CheckCircle2 size={32} style={{ color: C.gold }} />
        </div>

        {/* Badge */}
        <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
          Ritual Confirmed
        </p>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 16px' }}>
          Your ritual is on its way.
        </h1>

        <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.8, maxWidth: 420, margin: '0 auto 32px', fontWeight: 300 }}>
          A confirmation email has been sent with your order details and tracking information once despatched from our Natural You Srl facility in Isola del Liri, Italy.
        </p>

        {/* What happens next */}
        <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.parchment, padding: '20px 24px', textAlign: 'left', marginBottom: 32 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, margin: '0 0 16px' }}>
            What happens next
          </p>
          {[
            ['Within 48 hours',  'Order picking and quality check at our EU GMP facility'],
            ['3–5 working days', 'Delivery via tracked courier to your address'],
            ['Day of arrival',   'Your 48-hour Time To Wow begins'],
          ].map(([time, desc]) => (
            <div key={time} style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gold, minWidth: 110, marginTop: 2, flexShrink: 0 }}>{time}</span>
              <span style={{ fontSize: '0.8rem', color: C.muted, fontWeight: 300, lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/account/orders"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: C.gold, color: '#FDFAF5', borderRadius: 10, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', border: `1px solid ${C.border}`, color: C.muted, borderRadius: 10, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}
