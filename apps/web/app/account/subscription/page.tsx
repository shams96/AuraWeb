'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RefreshCcw, ArrowLeft, Package, Calendar, CreditCard, Phone } from 'lucide-react'

const C = {
  page:      '#FDFAF5',
  parchment: '#F4EAE2',
  card:      '#EDE8E0',
  charcoal:  '#1A1614',
  espresso:  '#3D2B20',
  muted:     '#7A5C4E',
  gold:      '#913832',
  border:    'rgba(145,56,50,0.14)',
}

export default function SubscriptionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account/subscription')
  }, [status, router])

  if (status === 'loading') return <div style={{ minHeight: '100vh', background: C.page }} />
  if (!session) return null

  return (
    <div style={{ minHeight: '100vh', background: C.page }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: C.page }}>
        <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Account
        </Link>
        <span style={{ color: C.border }}>·</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.charcoal }}>Ritual Membership</span>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Ritual Membership</p>
          <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '2rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: 0 }}>
            Your monthly ritual
          </h1>
        </div>

        {/* Status card */}
        <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <RefreshCcw size={15} style={{ color: C.gold }} />
            <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Subscription Status</p>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <p style={{ fontSize: '0.8rem', color: C.espresso, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
              Subscription management is handled securely through Stripe. To view your active subscriptions,
              update payment details, or cancel your ritual membership, visit your Stripe customer portal.
            </p>
            <a
              href="https://billing.stripe.com/p/login/test_00000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16,
                padding: '12px 20px', borderRadius: 10,
                background: C.gold, color: '#FDFAF5',
                fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <CreditCard size={13} /> Manage in Stripe Portal
            </a>
          </div>
        </div>

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: Package,  label: 'Ships every',  value: '30 days',    sub: 'From Isola del Liri, Italy' },
            { icon: Calendar, label: 'Cancel',        value: 'Anytime',    sub: 'No commitment, no penalty' },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} style={{ borderRadius: 14, border: `1px solid ${C.border}`, background: C.parchment, padding: '18px 20px' }}>
              <Icon size={14} style={{ color: C.gold, marginBottom: 10 }} />
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, margin: '0 0 4px' }}>{label}</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: C.charcoal, margin: '0 0 3px', fontFamily: 'var(--iv-font-serif)' }}>{value}</p>
              <p style={{ fontSize: '0.65rem', color: C.muted, margin: 0, fontWeight: 300 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ borderRadius: 14, border: `1px solid ${C.border}`, background: C.parchment, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Phone size={14} style={{ color: C.gold, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, color: C.charcoal, margin: '0 0 2px' }}>Need help with your membership?</p>
              <p style={{ fontSize: '0.7rem', color: C.muted, margin: 0, fontWeight: 300 }}>
                Our concierge team is available at{' '}
                <a href="tel:+12147143597" style={{ color: C.gold, textDecoration: 'none', fontWeight: 600 }}>+1 214-714-3597</a>
                {' '}or{' '}
                <a href="mailto:shams@1hubsolutions.com" style={{ color: C.gold, textDecoration: 'none', fontWeight: 600 }}>shams@1hubsolutions.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
