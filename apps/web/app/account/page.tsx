'use client'

import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  RefreshCcw, ShoppingBag, Star, LogOut,
  ChevronRight, User, FlaskConical, Gift,
} from 'lucide-react'

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

const NAV_ITEMS = [
  { label: 'My Orders',         href: '/account/orders',       icon: ShoppingBag, desc: 'View your order history'              },
  { label: 'Ritual Membership', href: '/account/subscription',  icon: RefreshCcw,  desc: 'Manage your monthly ritual'          },
  { label: 'iv Circle',         href: '/loyalty',               icon: Star,        desc: 'Your loyalty points and rewards'     },
  { label: 'iv Ambassador',     href: '/account/referrals',     icon: Gift,        desc: 'Invite friends, earn rewards'        },
  { label: 'Profile',           href: '/account/profile',       icon: User,        desc: 'Email, password, preferences'        },
]

export default function AccountDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: C.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${C.gold}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (!session) return null

  const user      = session.user as { name?: string; email?: string; role?: string }
  const firstName = user.name?.split(' ')[0] ?? 'there'
  const isB2B     = ['PROFESSIONAL', 'ADMIN', 'OWNER'].includes(user.role ?? '')

  return (
    <div style={{ minHeight: '100vh', background: C.page }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.page }}>
        <Link href="/" style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.1rem', fontWeight: 700, color: C.charcoal, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
          Isola <em style={{ color: C.gold }}>Vitale</em>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted }}
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

        {/* Greeting */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>
            {isB2B ? 'Professional Account' : 'Your Account'}
          </p>
          <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: 0 }}>
            Welcome back, {firstName}.
          </h1>
          <p style={{ fontSize: '0.85rem', color: C.muted, marginTop: 4, fontWeight: 300, fontStyle: 'italic', fontFamily: 'var(--iv-font-serif)' }}>
            Your ritual awaits.
          </p>
          <p style={{ fontSize: '0.85rem', color: C.muted, marginTop: 6, fontWeight: 300 }}>
            {user.email}
          </p>
        </div>

        {/* B2B badge */}
        {isB2B && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 12, border: `1px solid ${C.border}`, padding: '12px 18px', background: C.parchment, marginBottom: 32 }}>
            <FlaskConical size={14} style={{ color: C.gold, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, margin: '0 0 2px' }}>Professional Access Active</p>
              <Link href="/professional" style={{ fontSize: '0.75rem', color: C.muted, textDecoration: 'none', fontWeight: 400 }}>
                View your professional portal →
              </Link>
            </div>
          </div>
        )}

        {/* Navigation cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 20px', borderRadius: 14,
                border: `1px solid ${C.border}`, background: C.parchment,
                textDecoration: 'none', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = C.card)}
              onMouseLeave={e => (e.currentTarget.style.background = C.parchment)}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(145,56,50,0.08)`, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} style={{ color: C.gold }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: C.charcoal, margin: '0 0 2px' }}>{label}</p>
                <p style={{ fontSize: '0.7rem', color: C.muted, margin: 0, fontWeight: 300 }}>{desc}</p>
              </div>
              <ChevronRight size={15} style={{ color: C.muted, flexShrink: 0 }} />
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {[
            { label: 'Shop Collections', href: '/shop' },
            { label: 'The Ritual',       href: '/system' },
            { label: 'Skin Consultation', href: '/#skin-scan' },
            { label: 'Contact Concierge', href: '/contact' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
