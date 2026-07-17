import { Wordmark } from '@/components/brand/wordmark'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ritual Confirmed — Chiarelle',
  description: 'Your Chiarelle order is confirmed. Your ritual is on its way.',
}

const C = {
  page:    'var(--iv-black)',
  parch:   'var(--iv-deep-green)',
  card:    'var(--iv-green)',
  charcoal:'var(--iv-charcoal)',
  muted:   'var(--iv-text-muted)',
  gold:    'var(--iv-gold)',
  border:  'rgba(155, 71, 34,0.14)',
}

export default function SuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: C.page }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Wordmark size="1.1rem" />
        </Link>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: `rgba(155, 71, 34,0.08)`, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <CheckCircle2 size={32} style={{ color: C.gold }} />
        </div>

        {/* Badge */}
        <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>
          Skin Intelligence™
        </p>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--iv-garden)', margin: '0 0 16px', lineHeight: 1.15 }}>
          Your ritual is on its way.
        </h1>
        <p style={{ fontSize: '0.95rem', color: C.muted, lineHeight: 1.8, marginBottom: 40, fontWeight: 300, maxWidth: 480, margin: '0 auto 40px' }}>
          A confirmation has been sent to your email. Your formulation will be despatched from Isola del Liri within 1–2 working days.
        </p>

        {/* Steps */}
        <div style={{ background: C.parch, border: `1px solid ${C.border}`, borderRadius: 16, padding: '32px 28px', marginBottom: 40, textAlign: 'left' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>
            What happens next
          </p>
          {[
            { n: '01', title: 'Confirmation email', body: 'Your order summary and number arrive in your inbox within a few minutes.' },
            { n: '02', title: 'Formulation despatched', body: 'Your ritual ships from Isola del Liri within 1–2 working days, packaged with care.' },
            { n: '03', title: 'Ritual begins', body: 'Follow the enclosed protocol card — morning and evening, as intended.' },
          ].map(({ n, title, body }) => (
            <div key={n} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `rgba(155, 71, 34,0.08)`, border: `1px solid ${C.border}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: C.gold }}>{n}</span>
              </div>
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: C.charcoal, margin: '4px 0 4px' }}>{title}</p>
                <p style={{ fontSize: '0.75rem', color: C.muted, lineHeight: 1.6, fontWeight: 300, margin: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <Link
            href="/account/orders"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.gold, color: '#fff', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}
          >
            View My Orders <ArrowRight size={13} />
          </Link>
          <Link
            href="/shop"
            style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}
          >
            Continue exploring the collection
          </Link>
        </div>

        {/* Support */}
        <p style={{ marginTop: 48, fontSize: '0.75rem', color: C.muted, fontWeight: 300 }}>
          Questions? Our concierge team is at{' '}
          <a href="mailto:ritual@chiarelle.com" style={{ color: C.gold, fontWeight: 600, textDecoration: 'none' }}>
            ritual@chiarelle.com
          </a>
        </p>
      </div>
    </div>
  )
}
